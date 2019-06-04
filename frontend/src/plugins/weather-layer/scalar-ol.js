import Tile from 'ol/Tile';
import TileSource from 'ol/source/Tile';
import TileLayer from 'ol/layer/Tile'
import TileState from 'ol/TileState';
import OSM from 'ol/source/OSM'
import {createCanvasContext2D} from 'ol/dom';
import {toSize} from 'ol/size';
import {getKeyZXY} from 'ol/tilecoord';
import {createEmpty} from 'ol/extent';
import {transform} from 'ol/proj'

class CanvasTile extends Tile {
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../size.js").Size} tileSize Tile size.
   * @param {string} text Text.
   */
  constructor(tileCoord, tileSize, tileExtentStr, pixelExtent, tileResolution, dataHandler, map) {

    super(tileCoord, TileState.LOADED);

    this.tileSize_ = tileSize;
    this.canvas_ = null;
    this.tmpExtent_ = createEmpty();

    this.pixelExtent_ = pixelExtent;
    this.tileResolution_ = tileResolution;
    this.tileExtentStr_ = tileExtentStr;
    this.dataHandler_ = dataHandler;
    this.rendered_ = false;
    this.map_ = map;
  }

  /**
   * Get the image element for this tile.
   * @return {HTMLCanvasElement} Image.
   */
  getImage() {
    if (this.canvas_ && this.rendered_) {
      return this.canvas_;
    } else {
      let tileSize = this.tileSize_;
      let context = createCanvasContext2D(tileSize[0], tileSize[1]);

      if (this.map_.getView().getZoom() % 1 == 0) {
        this.rendered_ = true;

        let tileExtent = this.tileExtentStr_.split(",");
        for (let i = 0; i < 4; i++) {
          tileExtent[i] = new Number(tileExtent[i]);
        }
        let tileResolution = this.tileResolution_;

        let imageData = context.getImageData(0, 0, tileSize[0], tileSize[1]);
        let rgbaArr = imageData.data;

        let colorScale = this.dataHandler_.colorScale();
        for (let x = 0; x < tileSize[0]; x += 2) {
          for (let y = 0; y <= tileSize[1]; y += 2) {

            let lnglat = transform([tileExtent[0] + x * tileResolution, tileExtent[3] - y * tileResolution], "EPSG:3857", "EPSG:4326");
            let scalar = this.dataHandler_.interpolatePoint(lnglat[0], lnglat[1]);
            let color = colorScale.gradient(scalar, 255);

            this.dataHandler_.imageDataUtil.set(rgbaArr, tileSize[0], x, y, color)
              .set(rgbaArr, tileSize[0], x + 1, y, color)
              .set(rgbaArr, tileSize[0], x, y + 1, color)
              .set(rgbaArr, tileSize[0], x + 1, y + 1, color);
          }
        }
        context.putImageData(imageData, 0, 0);
      }
      this.canvas_ = context.canvas;
      return context.canvas;
    }
  }

  /**
   * @override
   */
  load() {
  }
}

class TileCanvas extends TileSource {
  /**
   * @param {Options} options Debug tile options.
   */
  constructor(options) {

    super({
      opaque: false,
      projection: options.projection,
      tileGrid: options.tileGrid,
      wrapX: options.wrapX !== undefined ? options.wrapX : true
    });

    this.tmpExtent_ = createEmpty();
    this.dataHandler_ = options.dataHandler;
    this.map_ = options.map;
  }

  /**
   * @inheritDoc
   */
  getTile(z, x, y, pixelRatio, projection) {
    let tileCoordKey = getKeyZXY(z, x, y);
    if (this.tileCache.containsKey(tileCoordKey)) {
      return (this.tileCache.get(tileCoordKey));
    } else {
      let tileGrid = this.getTileGrid();
      if (!tileGrid) {
        tileGrid = this.getTileGridForProjection(projection);
      }
      if (tileGrid.getResolutions().length <= z) {
        return undefined;
      }
      let tileCoord = [z, x, y];

      let tileResolution = tileGrid.getResolution(tileCoord[0]);
      let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);

      // top left
      let pixelXY1 = this.map_.getPixelFromCoordinate([tileExtent[0], tileExtent[3]]);
      // bottom right
      let pixelXY2 = this.map_.getPixelFromCoordinate([tileExtent[2], tileExtent[1]]);
      let pixelExtent = [pixelXY1, pixelXY2];
      let tileExtentStr = tileExtent.join(',');//3857

      let tileSize = toSize(this.tileGrid.getTileSize(z));

      let tile = new CanvasTile(tileCoord, tileSize, tileExtentStr, pixelExtent, tileResolution, this.dataHandler_, this.map_);
      this.tileCache.set(tileCoordKey, tile);
      return tile;
    }
  }
}

let ScalarDataHandler = function () {
  let lo1, la1, dx, dy, nx, ny;
  let grid = [];
  let builder;

  let colorScaleUtil = null;

  let handle = function (scalarData, factor) {
    builder = createBuilder(scalarData);
    buildGrid();
    colorScaleUtil = colorScaleCreator(factor);
  };

  let createBuilder = function (data) {
    let header = data[0].header;
    lo1 = header.lo1, la1 = header.la1, dx = header.dx, dy = header.dy, nx = header.nx, ny = header.ny;

    if (data.length == 1) {
      let scalarData = data[0].data;
      return {
        data: function (i) {
          return scalarData[i];
        },
        bilinearInterpolate: bilinearInterpolateScalar,
        isScalar: true
      };
    } else if (data.length == 2) {
      let uData = data[0].data, vData = data[1].data;
      return {
        data: function (i) {
          return [uData[i], vData[i]];
        },
        bilinearInterpolate: bilinearInterpolateVector,
        isScalar: false
      };
    }
  };

  let buildGrid = function () {
    grid = [];
    let p = 0;
    let isContinuous = Math.floor(nx * dx) >= 360;

    for (let j = 0; j < ny; j++) {
      let row = [];
      for (let i = 0; i < nx; i++, p++) {
        row[i] = builder.data(p);
      }
      if (isContinuous) {
        row.push(row[0]);
      }
      grid[j] = row;
    }
  };

  let interpolatePoint = function (lon, lat) {
    let i = floorMod(lon - lo1, 360) / dx;
    let j = (la1 - lat) / dy;

    let fi = Math.floor(i),
      ci = fi + 1;
    let fj = Math.floor(j),
      cj = fj + 1;

    let row = grid[fj];
    if (row) {
      let g00 = row[fi];
      let g10 = row[ci];
      if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
        let g01 = row[fi];
        let g11 = row[ci];
        if (isValue(g01) && isValue(g11)) {
          return builder.bilinearInterpolate(i - fi, j - fj, g00, g10, g01, g11);
        }
      }
    }
    return null;
  };

  let bilinearInterpolateScalar = function (x, y, g00, g10, g01, g11) {
    let rx = (1 - x);
    let ry = (1 - y);
    return g00 * rx * ry + g10 * x * ry + g01 * rx * y + g11 * x * y;
  };
  let bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) {
    let rx = 1 - x;
    let ry = 1 - y;
    let a = rx * ry, b = x * ry,
      c = rx * y,
      d = x * y;
    let u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
    let v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
    return Math.sqrt(u * u + v * v);
  };

  let isValue = function (x) {
    return (x == null || x == undefined || x == 'NaN') ? false : (x[0] == 9999 || x[1] == 9999 ? false : true);
  };
  let floorMod = function (a, n) {
    return a - n * Math.floor(a / n);
  };

  let colorScaleCreator = function (factor) {
    let segments = [];
    switch (factor) {
      case 'sst': // 海温
      case 'dewpoint': // 露点温度
      case 'temp': // 温度层 （°C）
        segments = [

          [273.16 - 26, [25, 18, 252]],
          [273.16 - 24, [15, 125, 255]],
          [273.16 - 22, [1, 158, 230]],
          [273.16 - 20, [12, 201, 246]],
          [273.16 - 18, [21, 238, 251]],
          [273.16 - 16, [0, 255, 243]],
          [273.16 - 14, [29, 251, 221]],
          [273.16 - 12, [1, 255, 181]],
          [273.16 - 10, [19, 246, 147]],
          [273.16 - 8, [10, 250, 129]],
          [273.16 - 6, [18, 255, 96]],
          [273.16 - 4, [6, 253, 79]],
          [273.16 - 2, [4, 255, 65]],
          [273.16 + 0, [4, 255, 63]],
          [273.16 + 2, [3, 255, 63]],
          [273.16 + 4, [18, 247, 65]],
          [273.16 + 6, [6, 253, 61]],
          [273.16 + 8, [109, 255, 56]],
          [273.16 + 10, [157, 255, 53]],
          [273.16 + 12, [211, 255, 49]],
          [273.16 + 14, [252, 250, 35]],
          [273.16 + 16, [254, 228, 18]],
          [273.16 + 18, [255, 195, 0]],
          [273.16 + 20, [255, 209, 0]],
          [273.16 + 22, [255, 174, 0]],
          [273.16 + 24, [255, 141, 4]],
          [273.16 + 26, [255, 97, 0]],
          [273.16 + 28, [255, 26, 0]],
          [273.16 + 30, [255, 0, 0]],
          [273.16 + 32, [236, 0, 5]],
          [273.16 + 34, [206, 0, 0]],
          [273.16 + 36, [169, 12, 0]],
          [273.16 + 38, [132, 10, 2]],
          [273.16 + 40, [100, 4, 3]]
        ];
        break;
      case 'wind':  // 风层（m/s）
        segments = [
          [0, [98, 113, 183]],
          [1, [57, 97, 159]],
          [3, [74, 148, 169]],
          [5, [77, 141, 123]],
          [7, [83, 165, 83]],
          [9, [53, 159, 53]],
          [11, [167, 157, 81]],
          [13, [159, 127, 58]],
          [15, [161, 108, 92]],
          [17, [129, 58, 78]],
          [19, [175, 80, 136]],
          [21, [117, 74, 147]],
          [24, [109, 97, 163]],
          [27, [68, 105, 141]],
          [29, [92, 144, 152]]
        ];
        break;
      case 'msl': // 气压（hPa）
        segments = [
          [900 * 100, [69, 41, 51]],
          [920 * 100, [77, 34, 60]],
          [940 * 100, [95, 23, 61]],
          [960 * 100, [107, 40, 67]],
          [980 * 100, [125, 39, 64]],
          [990 * 100, [165, 60, 81]],   // 气压颜色反转
          [995 * 100, [170, 84, 67]],
          [1000 * 100, [173, 136, 57]],
          [1003 * 100, [159, 161, 65]],
          [1006 * 100, [58, 117, 53]],
          [1009 * 100, [35, 101, 30]],
          [1012 * 100, [57, 91, 147]],
          [1015 * 100, [57, 118, 147]],
          [1019 * 100, [57, 131, 147]],
          [1022 * 100, [69, 167, 166]],
          [1025 * 100, [104, 180, 179]],
          [1030 * 100, [142, 179, 184]],
          [1040 * 100, [175, 208, 213]],
          [1050 * 100, [206, 230, 233]]
        ];
        break;
      case 'oceanCurrent': // 洋流（m/s）
        segments = [
          [0, [64, 77, 143]],
          [0.02, [50, 86, 142]],
          [0.06, [50, 123, 142]],
          [0.1, [64, 120, 103]],
          [0.15, [50, 133, 50]],
          [0.2, [50, 141, 50]],
          [0.3, [142, 132, 50]],
          [0.4, [142, 113, 50]],
          [0.5, [130, 77, 61]],
          [0.6, [115, 50, 68]],
          [0.7, [142, 50, 104]],
          [0.8, [105, 68, 131]],
          [0.85, [81, 70, 131]],
          [0.9, [65, 98, 131]],
          [1, [73, 122, 131]],
          [1.5, [143, 143, 143]],
        ];
        break;
      case 'swellFirst':// 涌浪（m）
      case 'swellSecond':
      case 'windWave':
      case 'swh':
      case 'oceanWave': // 海浪（m）
        segments = [
          [0, [220, 229, 231]],
          [0.5, [192, 215, 221]],
          [1, [157, 184, 207]],
          [1.5, [161, 219, 218]],
          [2, [63, 183, 209]],
          [2.5, [208, 229, 123]],
          [3, [202, 243, 75]],
          [4, [182, 223, 18]],
          [5, [191, 166, 51]],
          [7, [227, 153, 120]],
          [10, [235, 115, 127]],
          [12, [231, 73, 88]],
          [13, [229, 134, 215]],
          [14, [211, 76, 223]]
        ];
        break;
      case 'visibility':
        segments = [
          [0.2 * 1000, [179, 0, 62]],
          [0.5 * 1000, [220, 10, 0]],
          [1 * 1000, [250, 50, 10]],
          [2 * 1000, [250, 120, 20]],
          [3 * 1000, [255, 190, 10]],
          [4 * 1000, [255, 230, 10]],
          [5 * 1000, [210, 250, 50]],
          [6 * 1000, [0, 255, 0]],
          [7 * 1000, [50, 250, 170]],
          [8 * 1000, [100, 200, 230]],
          [10 * 1000, [150, 220, 240]],
          [15 * 1000, [200, 235, 235]]
        ];
        break;
      case 'rain':
        segments = [
          [0, [111, 111, 111]],
          [0.6, [60, 116, 160]],
          [6, [59, 161, 161]],
          [8, [59, 161, 61]],
          [10, [130, 161, 59]],
          [15, [161, 161, 59]],
          [20, [161, 59, 59]],
          [31, [161, 59, 161]],
        ];
        break;
      default:
        break;
    }
    return {
      bounds: [segments[0][0], segments[segments.length - 1][0]],
      gradient: segmentedColorScale(segments)
    };
  };

  function segmentedColorScale(segments) {
    let points = [], interpolators = [], ranges = [];
    for (let i = 0; i < segments.length - 1; i++) {
      points.push(segments[i + 1][0]);
      interpolators.push(colorInterpolator(segments[i][1], segments[i + 1][1]));
      ranges.push([segments[i][0], segments[i + 1][0]]);
    }

    return function (point, alpha) {
      let i;
      for (i = 0; i < points.length - 1; i++) {
        if (point <= points[i]) {
          break;
        }
      }
      let range = ranges[i];
      return interpolators[i](proportion(point, range[0], range[1]), alpha);
    };
  }

  function colorInterpolator(start, end) {
    let r = start[0], g = start[1], b = start[2];
    let xr = end[0] - r, xg = end[1] - g, xb = end[2] - b;
    return function (i, a) {
      return [Math.floor(r + i * xr), Math.floor(g + i * xg), Math.floor(b + i * xb), a];
    };
  }

  function proportion(x, low, high) {
    return (clamp(x, low, high) - low) / (high - low);
  }

  function clamp(x, low, high) {
    return Math.max(low, Math.min(x, high));
  }

  return {
    handle: handle,
    interpolatePoint: interpolatePoint,
    colorScale: function () {
      return colorScaleUtil;
    },
    imageDataUtil: {
      isVisible: function (data, canvasWidth, x, y) {
        let i = (y * canvasWidth + x) * 4;
        return data[i + 3] > 0;
      },
      set: function (data, canvasWidth, x, y, rgba) {
        let i = (y * canvasWidth + x) * 4;
        data[i] = rgba[0];
        data[i + 1] = rgba[1];
        data[i + 2] = rgba[2];
        data[i + 3] = rgba[3];
        return this;
      }
    }
  };
};

export const CanvasScalarControl = function () {
  let scalarDataHandler = null;
  let tileCanvasLayer = null;
  let isVisible_ = false;

  function visible(display) {
    isVisible_ = display;
    if (tileCanvasLayer) tileCanvasLayer.setVisible(display);
  }

  function clear(map) {
    if (tileCanvasLayer) map.removeLayer(tileCanvasLayer);
  }

  function addCanvasTileForMap(map, scalarDataHandler) {
    clear(map);
    tileCanvasLayer = new TileLayer({
      opacity: 0.5,
      source: new TileCanvas({
        projection: 'EPSG:3857',
        tileGrid: new OSM().getTileGrid(),
        dataHandler: scalarDataHandler,
        map: map
      })
    });
    map.addLayer(tileCanvasLayer);
  }

  return {
    draw: function (map, scalarData, factor) {
      if (scalarDataHandler == null) {
        scalarDataHandler = ScalarDataHandler();
        scalarDataHandler.handle(scalarData, factor);
        addCanvasTileForMap(map, scalarDataHandler);
      }
    },
    clear: clear,
    hide: function () {
      visible(false);},
    show: function () {
      visible(true);
    },
    isVisible: function () {
      return isVisible_;
    }
  };
}();