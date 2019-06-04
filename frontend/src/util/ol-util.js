import {transformExtent, transform} from 'ol/proj'

export const EPSG3857 = 'EPSG:3857';
export const EPSG4326 = 'EPSG:4326';

export function transform2Coordinate(lon, lat) {
  if(typeof(lon) != 'number') {
    lon = lon.indexOf('.') > 0 ? parseFloat(lon.substring(0, lon.indexOf('.') + 4)) : lon;
  }
  if(typeof(lat) != 'number') {
    lat = lat.indexOf('.') > 0 ? parseFloat(lat.substring(0, lat.indexOf('.') + 4)) : lat;
  }
  return transform([lon, lat], EPSG4326, EPSG3857);
}

export function convertLngIn0_360(slon) {
  slon = slon % 360;
  if (slon < 0) {
    slon += 360;
  }
  return slon;
}

export function getViewportExtent_EPSG4326(viewportExtent3857) {
  // view.calculateExtent() -> viewportExtent3857
  return transformExtent(viewportExtent3857, EPSG3857, EPSG4326);
}

export function getBBOXGeom_EPSG4326(viewportExtent3857) {
  return 'BBOX(geom,' + getViewportExtent_EPSG4326(viewportExtent3857).toString() + ')';
}

export function getWorldPixelWidth(map) {
  let lon0ToPixel = getPixelFromLngLat([0, 0], map).x;
  let lon360ToPixel = getPixelFromLngLat([360, 0], map).x;
  let earthWidth = lon360ToPixel - lon0ToPixel;
  return earthWidth;
}

// 通过4326经纬度数组，获取屏幕像素宽高坐标
export function getPixelFromLngLat(lngLat, map) {
  let coordinate = transform(lngLat, EPSG4326, EPSG3857);
  let pixel = map.getPixelFromCoordinate(coordinate);
  return {x: pixel[0], y: pixel[1]};
}

export function getLngLatByPixel(pixel, map) {
  let coordinate = map.getCoordinateFromPixel(pixel);
  return transform(coordinate, EPSG3857, EPSG4326);
}

// 根据屏幕最左边的经度以及世界[0-360]可占据得宽度，算出最左边经度所在世界与世界[0-360]的像素偏移量
export function getFirstWordOffsetX(leftLon, earthWidth) {
  let firstOffsetX = 0;
  if (leftLon < 0) {
    firstOffsetX = -Math.ceil(-leftLon / 360) * earthWidth;
  } else {
    firstOffsetX = Math.floor(leftLon / 360) * earthWidth;
  }
  return firstOffsetX;
}

// 根据屏幕最左边经度和最右边经度，计算屏幕可能容纳世界的最大个数
export function getWorldMaxNum(leftLon, rightLon) {
  return Math.ceil((rightLon - leftLon) / 360) + 1;
}

export function getViewportLng(sourceLng, viewportExtent3857) {
  let viewport = getViewportExtent_EPSG4326(viewportExtent3857);
  let minLng = viewport[0];
  let maxLng = viewport[2];

  let tempLng;
  if (minLng >= sourceLng) {
    tempLng = sourceLng + Math.ceil((minLng - sourceLng) / 360) * 360;
  } else if (maxLng <= sourceLng) {
    tempLng = sourceLng - Math.ceil((sourceLng - maxLng) / 360) * 360;
  } else {
    tempLng = sourceLng;
  }

  let firstLng = null, secondLng = null;
  if (tempLng - 360 >= minLng) {
    firstLng = tempLng - 360;
    secondLng = tempLng;
  } else if (tempLng + 360 <= maxLng) {
    firstLng = tempLng;
    secondLng = tempLng + 360;
  } else {
    firstLng = tempLng;
  }
  return [firstLng, secondLng];
}

export function getWindScaleBySpeed(speed) {
  let s = Math.round(speed * 1.943844); //单位转换成节kn
  if (s == 0) {
    s = 1;
  } else if (s <= 2) {
    s = 2;
  } else if (s <= 7) {
    s = 3;
  } else if (s <= 12) {
    s = 4;
  } else if (s <= 17) {
    s = 5;
  } else if (s <= 22) {
    s = 6;
  } else if (s <= 27) {
    s = 7;
  } else if (s <= 32) {
    s = 8;
  } else if (s <= 37) {
    s = 9;
  } else if (s <= 42) {
    s = 10;
  } else if (s <= 47) {
    s = 11;
  } else if (s <= 52) {
    s = 12;
  } else if (s <= 57) {
    s = 13;
  } else if (s <= 62) {
    s = 14;
  } else if (s <= 67) {
    s = 15;
  } else if (s <= 72) {
    s = 16;
  } else if (s <= 77) {
    s = 17;
  } else if (s <= 82) {
    s = 18;
  } else if (s <= 87) {
    s = 19;
  } else if (s <= 92) {
    s = 20;
  } else if (s <= 97) {
    s = 21;
  } else if (s <= 102) {
    s = 22;
  } else if (s <= 108) {
    s = 23;
  }
  return s;
}

export function speedUnitConverter(unit) {
  let units = {
    "m/s": {
      label: "m/s", conversion: function (x) {
        return x;
      }, precision: 1, index: 0
    },
    "km/h": {
      label: "km/h", conversion: function (x) {
        return x * 3.6;
      }, precision: 0, index: 1
    },
    "kn": {
      label: "kn", conversion: function (x) {
        return x * 1.943844;
      }, precision: 0, index: 2
    },
    "mph": {
      label: "mph", conversion: function (x) {
        return x * 2.236936;
      }, precision: 0, index: 3
    }
  };
  return units[unit];
}