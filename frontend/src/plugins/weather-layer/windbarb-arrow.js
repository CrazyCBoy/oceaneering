import {
  getPixelFromLngLat, getWorldPixelWidth, getViewportExtent_EPSG4326, getWorldMaxNum, getFirstWordOffsetX,
  convertLngIn0_360, getWindScaleBySpeed
} from '../../util/ol-util'

export function Arrow(options) {

  let _map = options.map;
  let _canvas = options.canvas;

  let arrowImg;// 图片数组
  let imgObj = {};

  loadArrowImg();
  loadBarbImg();

  /**
   * 加载方向箭头图标,图片数组、元素量
   */
  function loadArrowImg() {//
    arrowImg = document.createElement("img");
    arrowImg.src = require('../../assets/img/arrow.png');
  }

  /**
   * 加载方向箭头图标,图片数组、元素量
   */
  function loadBarbImg() {
    imgObj["2"] = document.createElement("img");
    imgObj["2"].src = require("../../assets/img/wind/2.png");
    for (let i = 3; i < 24; i++) {
      imgObj[i] = document.createElement("img");
      imgObj[i].src = require("../../assets/img/wind/" + i + ".png");
      //镜像版
      imgObj[i + "-m"] = document.createElement("img");
      imgObj[i + "-m"].src = require("../../assets/img/wind/" + i + "-m.png");
    }
  }

  /**
   * 根据uv分量获取速度和角度
   */
  function getWindSpeedAndDirection(u, v) {
    // Map<String, String> data = new HashMap<>();
    let data = {
      speed: "",
      direction: ""
    };
    if (u == 9999.0 && v == 9999.0) {// 9999为缺值
      data.speed = "-1";
      data.direction = "-1";
      return data;
    }
    // 风速
    let speed = 0.0;
    // 风向
    let direction = 0.0;
    // 当水平和垂直风不同时为0时做如下处理
    if (!(u == 0 && v == 0)) {
      speed = Math.sqrt(u * u + v * v);

      if (u >= 0) {
        direction = Math.PI * 3 / 2 - Math.atan(v / u);
      } else {
        direction = Math.PI * 1 / 2 - Math.atan(v / u);
      }

      direction = (direction * 180 / Math.PI) + 180;
    }
    //data.speed = speedToScale(speed);
    data.speed = speed;
    data.direction = direction.toString();
    return data;
  }

  /**
   * 稀释级别
   */
  function getDilutedAndImgSizeByZoom(zoom) {
    let diluted = 0;
    let imgSize = 0;
    //zoom转换为grade
    if (zoom <= 4) {
      diluted = 6;
      imgSize = 16;
    } else if (zoom <= 6) {
      diluted = 4;
      imgSize = 16;
      if (zoom == 6) {
        imgSize = 20;
      }
    } else if (zoom <= 7) {
      diluted = 2;
      imgSize = 25;
    } else if (zoom <= 8) {
      diluted = 1;
      imgSize = 30;
    } else if (zoom <= 19) {
      diluted = 1;
      imgSize = 36;
    }
    return {diluted: diluted, imgSize: imgSize};
  }

  /**
   * @Description: 绘制箭头
   * @Author: wuzd
   * @Date: 2018年5月13日 下午8:21:07
   * @param ctx 画笔对象
   * @param x 水平像素
   * @param y 垂直像素
   * @param d 方向
   */
  function drawArrow(ctx, x, y, d, img, size) {// 绘制元素
    // 开始绘制
    ctx.save();
    ctx.translate(x, y);// 设置中心点
    ctx.rotate(d * Math.PI / 180);// 旋转角度

    if (img) {
      ctx.drawImage(img, (0 - size / 2), (0 - size / 2), size, size);// 图标、中心点、图标大小
    }
    ctx.restore();// 恢复画布状态
  }

  function clear() {
    if (!_map) return null;
    let size = _map.getSize();
    _canvas.width = size[0];
    _canvas.height = size[1];
    let ctx2d = _canvas.getContext("2d");
    ctx2d.clearRect(0, 0, size[0], size[1]);
    return ctx2d;
  }

  function draw(data) {
    let ctx2d = clear();
    let view = _map.getView();
    let viewportExtent3857 = view.calculateExtent();

    let viewportExtent = getViewportExtent_EPSG4326(viewportExtent3857);
    let viewportMinLat = viewportExtent[1];
    let viewportMaxLat = viewportExtent[3];

    // 获取浏览器视窗内最小经度、最大经度
    let leftLon = viewportExtent[0];
    let rightLon = viewportExtent[2];

    // 计算0-360经度的屏幕宽度
    let earthWidth = getWorldPixelWidth(_map);

    // 计算视窗内有几个世界宽度
    let worldWidthNum = getWorldMaxNum(leftLon, rightLon);

    // 计算第一屏世界需要在0-360基础上的宽度偏移量
    let firstOffsetX = getFirstWordOffsetX(leftLon, earthWidth);

    let productType = data.productType;
    let isUV = productType == 'wind' || productType == 'oceanCurrent';
    let key = data.key;
    let srcData = data.srcData;

    let header = srcData[0].header;
    // 坐标点计算
    let nx = header.nx;// 格点数
    let ny = header.ny;
    let lo1 = header.lo1;// 起始和结束经纬度
    let la1 = header.la1;
    let lo2 = header.lo2;
    let la2 = header.la2;
    let dx = header.dx;// 格距
    let dy = header.dy;

    let uarray = srcData[0].data;
    let varray = isUV ? srcData[1].data : null;

    let diluted = Math.pow(2, 1 - _map.getView().getZoom()) * 12;
    diluted = diluted < 1 ? 1 : Math.ceil(diluted);
    let imgSize = 16;

    let d_dx = diluted;// 格距
    let d_dy = diluted;

    let lo = null;
    let la = null;
    for (let y = 0; y < ny; y = y + d_dy) {
      la = la1 - y;// 纬度
      if (la > viewportMaxLat) {
        continue;
      }
      if (la < viewportMinLat) {// 纬度超出
        break;
      }
      //纬度判断南北半球
      let latN = la > 0;

      for (let x = 0; x < nx; x = x + d_dx) {
        lo = lo1 + x;// 经度
        if (lo > lo2) {
          break;
        }
        lo = convertLngIn0_360(lo); // 转换为0-360范围经度

        let ut = 9999;
        let vt = 9999;

        if (uarray) {
          ut = uarray[(1 / dy * y) * nx + 1 / dx * x];
          if (ut == 9999 || !ut || ut == "null" || ut == "NaN") {//缺测数据
            continue;
          }
        }
        if (varray) {
          vt = varray[(1 / dy * y) * nx + 1 / dx * x];
          if (vt == 9999 || !vt || vt == "null" || vt == "NaN") {//缺测数据
            continue;
          }
        }

        let dtemp = ut;
        let img = null;
        let sd = null;
        let imgFoot = null;

        switch (productType) {
          case "wind":
            sd = getWindSpeedAndDirection(ut, vt);// 获取速度和方向
            dtemp = 180 + parseFloat(sd.direction);
            imgFoot = getWindScaleBySpeed(sd.speed);//风速转风级
            img = latN ? imgObj[imgFoot] : imgObj[imgFoot + '-m'];
            break;
          case "oceanCurrent":
            sd = getWindSpeedAndDirection(ut, vt);// 获取速度和方向
            dtemp = sd.direction;
            img = arrowImg;
            break;
          default:
            dtemp = ut * 180 / Math.PI;
            dtemp = dtemp < 0 ? dtemp + 360 : dtemp;
            img = arrowImg;
            break;
        }

        // 坐标转换
        let pix = getPixelFromLngLat([lo, la], _map);
        let pix_x = pix.x;
        let pix_y = pix.y;

        // 循环多屏世界个数，绘制同一条等值线
        for (let k = 0; k < worldWidthNum; k++) {
          let offsetX = firstOffsetX + earthWidth * k;
          let pix_x_k = pix_x + offsetX;
          if (pix_x_k >= 0 && pix_x_k <= _canvas.width)
            drawArrow(ctx2d, pix_x_k, pix_y, dtemp, img, imgSize);
        }
      }
    }

  }

  return {
    clear: clear,
    draw: draw
  };

}
