import {getPixelFromLngLat, getWorldPixelWidth, getViewportExtent_EPSG4326, getWorldMaxNum, getFirstWordOffsetX} from '../../util/ol-util'

export function Isoline(options) {

  let _canvas = options.canvas;
  let _map = options.map;
  let _lineColor = options.lineColor || '#0000FF';
  let _lineWidth = options.lineWidth || 1;
  let _markBgColor = options.markBgColor || 'rgba(0, 0, 255, 0.4)';
  let _markTextColor = options.markTextColor || '#FFFFFF';

  /**
   * @Description: 绘制等值线
   * @Author: songwj
   * @Date: 2018年5月23日 下午5:30:44
   * @param isolineCtx 画笔对象
   * @param productType 产品类型
   * @param zoom 地图缩放等级
   * @param level 线条等级
   * @param linePoints 线条像素坐标点数据
   * @param leftDelta 左边偏移量
   * @param rightDelta 右边偏移量
   * @param zeroDegreeXPxl
   * @param zeroDegreeYPxl
   * @param twentyDegreeYPxl
   * @param earthW
   */
  function drawContour(isolineCtx, productType, zoom, level, linePoints, unit, canvasW, canvasH, lonPixelOffset) {
    isolineCtx.strokeStyle = _lineColor;// 线条颜色
    isolineCtx.lineWidth = _lineWidth;// 线宽
    let pntsNum = linePoints.length;// 线条点数
    let points = [];// 存放矫正后的所有点
    let allShowPnts = [];// 存放所有可视点

    for (let k = 0; k < pntsNum; k++) {
      let linePoint = linePoints[k];
      let pntPxl_x = linePoint.x + lonPixelOffset;
      let pntPxl_y = linePoint.y;

      if (0 <= pntPxl_x && pntPxl_x <= canvasW && 0 <= pntPxl_y && pntPxl_y <= canvasH) {
        allShowPnts.push({x: pntPxl_x, y: pntPxl_y});
      }

      points.push({x: pntPxl_x, y: pntPxl_y});
    }

    isolineCtx.beginPath();
    for (let i = 0; i < pntsNum; i++) {
      if (i == 0) {
        isolineCtx.moveTo(points[0].x, points[0].y);// 重置绘制的起始点
      } else {
        isolineCtx.lineTo(points[i].x, points[i].y);
      }
    }
    isolineCtx.stroke();

    // 绘制标注，3级别以上且88个点及以上线条才添加标注
    if (zoom > 3 && pntsNum >= 88) {
      let linePoint = null;
      // 取中间点坐标
      let pntsLen = allShowPnts.length;
      if (pntsLen > 0) {
        let idx = pntsLen == 1 ? 1 : Math.floor(pntsLen / 2);
        linePoint = allShowPnts[idx - 1];
      } else {
        let idx = Math.floor(pntsNum / 2);
        linePoint = points[idx - 1];
      }
      let pntPxl_x = linePoint.x;
      let pntPxl_y = linePoint.y;
      // 绘制标注外部样式
      isolineCtx.font = "10px Arial";
      level = getLevelTxt(level, productType, unit);
      let halfTxtWidth = isolineCtx.measureText(level).width >> 1;// 文本宽度的一半
      // 绘制标注背景
      isolineCtx.strokeStyle = _markBgColor;
      isolineCtx.lineWidth = 15;
      isolineCtx.lineJoin = "round";// 圆角
      isolineCtx.beginPath();
      isolineCtx.moveTo(pntPxl_x - halfTxtWidth, pntPxl_y);
      isolineCtx.lineTo(pntPxl_x + halfTxtWidth, pntPxl_y);
      isolineCtx.closePath();
      isolineCtx.stroke();
      // 绘制标注
      isolineCtx.fillStyle = _markTextColor;
      isolineCtx.textBaseline = "middle";
      isolineCtx.textAlign = "center";
      isolineCtx.fillText(level, pntPxl_x, pntPxl_y);
    }
  }

  // 各要素单位换算
  function getLevelTxt(level, productType, unit) {
    switch (productType) {
      case "msl":// 海平面气压
        if (unit == "mmHg")
          return (level / 133.322387415).toFixed(0);
        else if (unit == "inHg")
          return (level / 3386.389).toFixed(1);
        else
          return (level / 100).toFixed(0);
      case "oceanCurrent":// 海表洋流
        if (unit == "km/s")
          return (level * 3.6).toFixed(1);
        else if (unit == "kn")
          return (level * 1.943844).toFixed(1);
        else if (unit == "mph")
          return (level * 2.236936).toFixed(1);
        else
          return level.toFixed(1);
      case "sst":// 海表温度
      case "d2":// 2米露点温度
      case "t2":// 2米气温
        if (unit == "°F")
          return (level * 9 / 5 - 459.67).toFixed(1);
        else if (unit == "K")
          return level.toFixed(1);
        else
          return (level - 273.16).toFixed(0);
      case "vis":
        level = level / 1000;
        return (Math.floor(level) == level ? level : level.toFixed(0));
      case "rain":
        if (level == 0.1)
          return "小雨";
        else if (level == 5.0)
          return "中雨";
        else if (level == 15.0)
          return "大雨";
        else if (level == 30.0)
          return "暴雨";
        else if (level == 70.0)
          return "大暴雨";
        else
          return "特大暴雨";
      default:
        return (Math.floor(level) == level ? level : level.toFixed(1));
    }
  }

  /**
   * 绘制高低压标志
   * @param isolineCtx
   * @param zoom
   * @param highData
   * @param lowData
   * @param leftOffset
   * @param rightOffset
   * @param zeroDegreeXPxl
   * @param zeroDegreeYPxl
   * @param twentyDegreeYPxl
   * @param earthW
   */
  function drawHighLowMark(isolineCtx, highData, lowData, lonPixelOffset) {
    isolineCtx.fillStyle = _lineColor;
    isolineCtx.textBaseline = "middle";
    isolineCtx.textAlign = "center";
    isolineCtx.font = "10px Arial";
    let regex = /^[-+]?\d+(\.\d+([eE][-+]\d+)?)?$/;// 数据类型校验正则

    // 绘制高压
    for (let i = 0, len = highData.length; i < len; i += 3) {
      let x = highData[i] + lonPixelOffset;
      let y = highData[i + 1];
      let val = highData[i + 2];
      isolineCtx.fillText("H", x, y - 5);
      if (regex.test(val)) {
        isolineCtx.fillText(val.toFixed(0), x, y + 7);
      }
    }

    // 绘制低压
    for (let i = 0, len = highData.length; i < len; i += 3) {
      let x = lowData[i] + lonPixelOffset;
      let y = lowData[i + 1];
      let val = lowData[i + 2];
      isolineCtx.fillText("L", x, y - 5);
      if (regex.test(val)) {
        isolineCtx.fillText(val.toFixed(0), x, y + 7);
      }
    }
  }

  /**
   * @Description: 计算获取拟合曲线上的点坐标
   *         三次B样条曲线方程：P(t)=P0 * F0,3(t) + P1 * F1,3(t) + P2 * F2,3(t) + P3 * F3,3(t)
   * @Author: songwj
   * @Date: 2018年6月27日 下午1:11:54
   * @param t 拟合曲线变量
   * @param pnt0 特征点0
   * @param pnt1 特征点1
   * @param pnt2 特征点2
   * @param pnt3 特征点3
   */
  function getLinePoints(t, pnt0, pnt1, pnt2, pnt3) {
    let a1 = Math.pow((1 - t), 3) / 6;
    let a2 = (3 * Math.pow(t, 3) - 6 * Math.pow(t, 2) + 4) / 6;
    let a3 = (-3 * Math.pow(t, 3) + 3 * Math.pow(t, 2) + 3 * t + 1) / 6;
    let a4 = Math.pow(t, 3) / 6;

    let pnt0x = pnt0.x;
    let pnt1x = pnt1.x;
    let pnt2x = pnt2.x;
    let pnt3x = pnt3.x;

    // 计算拟合曲线上对应的x,y,lon值
    let x = a1 * pnt0x + a2 * pnt1x + a3 * pnt2x + a4 * pnt3x;
    let y = a1 * pnt0.y + a2 * pnt1.y + a3 * pnt2.y + a4 * pnt3.y;
    return {x: x, y: y};
  }

  function dealIsolineData(data, isPressure, extent) {
    let productType = data.productType;// 产品类型
    let srcData = isPressure ? data.srcData[0]["isoline"] : data.srcData;
    let returnData = [];// 存放最终返回数据
    let minLon = extent[0], minLat = extent[1], maxLon = extent[2], maxLat = extent[3];

    for (let i = 0, srcLen = srcData.length; i < srcLen; i++) {
      let levelDatas = {};// 存放同级别数据
      let level = srcData[i].level;// 等级
      let lines = srcData[i].lines;// 等级对应的所有线条
      let linesPoints = [];// 同级别所有线条的像素点坐标数据

      for (let j = 0; j < lines.length; j++) {
        let line = lines[j];// 线条数据
        let linePoints = [];// 单线条的像素点坐标数据
        let len = line.length;
        let pntNum = len / 2;// 总点数

        // 原始数据只处理8个以上点
        if (pntNum < 8) {
          continue;
        }

        // 标记状态：线条所有点都不在当前视窗范围内
        /*let allNotInViewPort = true;*/
        let lineXYPnts = [];// 存放转换后的像素点x,y点坐标
        for (let k = 0; k < len; k += 2) {
          let lon = line[k];// 经度
          let lat = line[k + 1];// 纬度
          /*if(allNotInViewPort &&
              Tools.isRange(minLon, true, maxLon, true, lon) && Tools.isRange(minLat, true, maxLat, true, lat)) {
              allNotInViewPort = false;
          }*/
          let pntPxl = getPixelFromLngLat([lon, lat], _map);
          lineXYPnts.push({x: pntPxl.x, y: pntPxl.y});
        }
        /*if(allNotInViewPort) {
            continue;
        }*/

        // 闭合曲线
        if (line[0] == line[len - 2] && line[1] == line[len - 1]) {
          for (let n = 0; n < pntNum; n++) {
            if (n <= pntNum - 4) {
              for (let t = 0.0; t <= 1.0; t += 0.1) {
                let pnt0 = lineXYPnts[n];
                let pnt1 = lineXYPnts[n + 1];
                let pnt2 = lineXYPnts[n + 2];
                let pnt3 = lineXYPnts[n + 3];
                linePoints.push(getLinePoints(t, pnt0, pnt1, pnt2, pnt3));
              }
            } else if (n == pntNum - 3) {
              for (let t = 0.0; t <= 1.0; t += 0.1) {
                let pnt0 = lineXYPnts[n];
                let pnt1 = lineXYPnts[n + 1];
                let pnt2 = lineXYPnts[n + 2];
                let pnt3 = lineXYPnts[0];
                linePoints.push(getLinePoints(t, pnt0, pnt1, pnt2, pnt3));
              }
            } else if (n == pntNum - 2) {
              for (let t = 0.0; t <= 1.0; t += 0.1) {
                let pnt0 = lineXYPnts[n];
                let pnt1 = lineXYPnts[n + 1];
                let pnt2 = lineXYPnts[0];
                let pnt3 = lineXYPnts[1];
                linePoints.push(getLinePoints(t, pnt0, pnt1, pnt2, pnt3));
              }
            } else if (n == pntNum - 1) {
              for (let t = 0.0; t <= 1.0; t += 0.1) {
                let pnt0 = lineXYPnts[n];
                let pnt1 = lineXYPnts[0];
                let pnt2 = lineXYPnts[1];
                let pnt3 = lineXYPnts[2];
                linePoints.push(getLinePoints(t, pnt0, pnt1, pnt2, pnt3));
              }
            }
          }
          // 不闭合曲线
        } else {
          linePoints.push({x: lineXYPnts[0].x, y: lineXYPnts[0].y});
          for (let n = 0; n < pntNum; n++) {
            if (n <= pntNum - 4) {
              for (let t = 0.0; t <= 1.0; t += 0.1) {
                let pnt0 = lineXYPnts[n];
                let pnt1 = lineXYPnts[n + 1];
                let pnt2 = lineXYPnts[n + 2];
                let pnt3 = lineXYPnts[n + 3];
                linePoints.push(getLinePoints(t, pnt0, pnt1, pnt2, pnt3));
              }
            }
          }
          linePoints.push({x: lineXYPnts[pntNum - 1].x, y: lineXYPnts[pntNum - 1].y});
        }

        linesPoints.push(linePoints);
      }

      levelDatas['level'] = level;
      levelDatas['linesPoints'] = linesPoints;
      returnData.push(levelDatas);
    }

    let returnMslData = {};
    // 气压增加高低压处理
    if (isPressure) {
      returnMslData["isoline"] = returnData;
      let high = [];// 存放转换后的高压数据
      let low = [];// 存放转换后的低压数据
      let highArr = data.srcData[0]["high"];
      let lowArr = data.srcData[0]["low"];

      // 高压数据转换
      for (let i = 0, len = highArr.length; i < len; i += 3) {
        let lon = highArr[i];
        let lat = highArr[i + 1];
        let mslVal = highArr[i + 2];
        let pntPxl = getPixelFromLngLat([lon, lat], _map);
        high.push(pntPxl.x);
        high.push(pntPxl.y);
        high.push(mslVal);
      }

      // 低压数据转换
      for (let i = 0, len = lowArr.length; i < len; i += 3) {
        let lon = lowArr[i];
        let lat = lowArr[i + 1];
        let mslVal = lowArr[i + 2];
        let pntPxl = getPixelFromLngLat([lon, lat], _map);
        low.push(pntPxl.x);
        low.push(pntPxl.y);
        low.push(mslVal);
      }

      returnMslData["high"] = high;
      returnMslData["low"] = low;
    }

    return isPressure ? returnMslData : returnData;
  }

  let isoline = {
    clear: function () {
      let size = _map.getSize();
      let canvasW = size[0];
      let canvasH = size[1];
      let isolineCtx = _canvas.getContext("2d");
      isolineCtx.clearRect(0, 0, canvasW, canvasH);
    },
    draw: function (data) {
      let size = _map.getSize();
      let view = _map.getView();
      let zoom = view.getZoom();

      // 计算0-360经度的屏幕宽度
      let earthWidth = getWorldPixelWidth(_map);

      // 获取浏览器视窗内最小经度、最大经度
      let extent = getViewportExtent_EPSG4326(view.calculateExtent());
      let leftLon = extent[0];
      let rightLon = extent[2];

      // 计算视窗内有几个世界宽度
      let worldWidthNum = getWorldMaxNum(leftLon, rightLon);

      // 计算第一屏世界需要在0-360基础上的宽度偏移量
      let firstOffsetX = getFirstWordOffsetX(leftLon, earthWidth);

      let productType = data.productType;
      let isPressure = productType == "msl";

      let responseData = dealIsolineData(data, isPressure, extent);

      _canvas.width = size[0];
      _canvas.height = size[1];
      let canvasW = size[0];
      let canvasH = size[1];

      let isolineCtx = _canvas.getContext("2d");
      isolineCtx.clearRect(0, 0, canvasW, canvasH);

      let resData = isPressure ? responseData["isoline"] : responseData;
      let highData = null;
      let lowData = null;
      if (isPressure) {
        highData = responseData["high"];
        lowData = responseData["low"];
      }

      for (let i = 0, len1 = resData.length; i < len1; i++) {
        let level = resData[i].level;// 等级
        let linesPoints = resData[i].linesPoints;// 等级对应的所有线条像素点坐标

        for (let j = 0, len2 = linesPoints.length; j < len2; j++) {
          let linePoints = linesPoints[j];// 线条像素点坐标数据

          // 循环多屏世界个数，绘制同一条等值线
          for (let k = 0; k < worldWidthNum; k++) {
            let offsetX = firstOffsetX + earthWidth * k;
            drawContour(isolineCtx, productType, zoom, level, linePoints, null, canvasW, canvasH, offsetX);
            if (isPressure && highData != null && lowData != null) {
              drawHighLowMark(isolineCtx, highData, lowData, offsetX);
            }
          }

        }
      }

    }
  };

  return isoline;
}
