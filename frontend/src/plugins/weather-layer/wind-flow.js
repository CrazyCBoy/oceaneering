/*  Global class for simulating the movement of particle through a 1km wind grid

 credit: All the credit for this work goes to: https://github.com/cambecc for creating the repo:
 https://github.com/cambecc/earth. The majority of this code is directly take nfrom there, since its awesome.

 This class takes a canvas element and an array of data (1km GFS from http://www.emc.ncep.noaa.gov/index.php?branch=GFS)
 and then uses a mercator (forward/reverse) projection to correctly map wind vectors in "map space".

 The "start" method takes the bounds of the map at its current extent and starts the whole gridding,
 interpolation and animation process.
 */

export const Windy = function Windy(params) {

  let VELOCITY_SCALE = 0.01 * (Math.pow(window.devicePixelRatio, 1 / 3) || 1); // scale for wind velocity (completely arbitrary--this value looks nice)
  let MIN_TEMPERATURE_K = 261.15; // step size of particle intensity color scale
  let MAX_TEMPERATURE_K = 317.15; // wind velocity at which particle intensity is maximum (m/s)
  let INTENSITY_SCALE_STEP = 1;            // step size of particle intensity color scale
  let MAX_WIND_INTENSITY = 10;              // wind velocity at which particle intensity is maximum (m/s)
  let MAX_PARTICLE_AGE = 90; // max number of frames a particle is drawn before regeneration
  let PARTICLE_LINE_WIDTH = 1; // line width of a drawn particle
  let PARTICLE_MULTIPLIER = 1 / 200; // particle count scalar (completely arbitrary--this values looks nice) 决定粒子密度，是线状还是点状
  let PARTICLE_REDUCTION = Math.pow(window.devicePixelRatio, 1 / 3) || 1.6; // multiply particle count for mobiles by this amount
  let FRAME_RATE = 15,
    FRAME_TIME = 1000 / FRAME_RATE; // desired frames per second

  let NULL_WIND_VECTOR = [NaN, NaN, null]; // singleton for no wind in the form: [u, v, magnitude]

  let builder;
  let grid;
  let date;
  let λ0, φ0, Δλ, Δφ, ni, nj;

  // interpolation for vectors like wind (u,v,m)
  let bilinearInterpolateVector = function bilinearInterpolateVector(x, y, g00, g10, g01, g11) {
    let rx = 1 - x;
    let ry = 1 - y;
    let a = rx * ry,
      b = x * ry,
      c = rx * y,
      d = x * y;
    let u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
    let v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
    /*let tmp = g00[2] * a + g10[2] * b + g01[2] * c + g11[2] * d;*/
    let tmp = Math.sqrt(u * u + v * v);
    return [u, v, tmp];
  };

  let createWindBuilder = function createWindBuilder(uComp, vComp) {
    let uData = uComp.data,
      vData = vComp.data;
    return {
      header: uComp.header,
      //recipe: recipeFor("wind-" + uComp.header.surface1Value),
      data: function data(i) {
        return [uData[i], vData[i], Math.sqrt(uData[i] * uData[i] + vData[i] * vData[i])];
      },
      interpolate: bilinearInterpolateVector
    };
  };

  let createBuilder = function createBuilder(data) {
    let uComp = null, vComp = null;
      //scalar = null;

    data.forEach(function (record) {
      switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
        case "0,192"://current
        case "0,194"://swell wave height
        case "0,196"://swell wave period
        case "0,10": // new swell wave
        case "2,2": // wind
        case "0,6": // wind wave
          uComp = record;
          break;
        case "0,193":
        case "0,195":
        case "0,197":
        case "0,11":
        case "2,3":
        case "0,4":
          vComp = record;
          break;
        case "0,0":
          //temp = record;
          break;
        default:
          //scalar = record;
      }
    });

    return createWindBuilder(uComp, vComp);
  };

  let buildGrid = function buildGrid(data, callback) {

    builder = createBuilder(data);
    let header = builder.header;

    λ0 = header.lo1;
    φ0 = header.la1; // the grid's origin (e.g., 0.0E, 90.0N)

    Δλ = header.dx;
    Δφ = header.dy; // distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)

    ni = header.nx;
    nj = header.ny; // number of grid points W-E and N-S (e.g., 144 x 73)

    date = new Date(header.refTime);
    date.setHours(date.getHours() + header.forecastTime);

    // Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
    // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
    grid = [];
    let p = 0;
    let isContinuous = Math.floor(ni * Δλ) >= 360;

    for (let j = 0; j < nj; j++) {
      let row = [];
      for (let i = 0; i < ni; i++, p++) {
        row[i] = builder.data(p);
      }
      if (isContinuous) {
        // For wrapped grids, duplicate first column as last column to simplify interpolation logic
        row.push(row[0]);
      }
      grid[j] = row;
    }

    callback({
      date: date,
      interpolate: interpolate
    });
  };

  /**
   * Get interpolated grid value from Lon/Lat position
   * @param λ {Float} Longitude
   * @param φ {Float} Latitude
   * @returns {Object}
   */
  let interpolate = function interpolate(λ, φ) {

    if (!grid) return null;

    let i = floorMod(λ - λ0, 360) / Δλ; // calculate longitude index in wrapped range [0, 360)
    let j = (φ0 - φ) / Δφ; // calculate latitude index in direction +90 to -90

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
          // All four points found, so interpolate the value.
          return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11);
        }
      }
    }
    return null;
  };

  /**
   * @returns {Boolean} true if the specified value is not null and not undefined.
   */
  let isValue = function isValue(x) {
    if (!x || x[0] == 9999.0 || x[1] == 9999.0) {
      return false;
    }
    return x !== null && x !== undefined;
  };

  /**
   * @returns {Number} returns remainder of floored division, i.e., floor(a / n). Useful for consistent modulo
   *          of negative numbers. See http://en.wikipedia.org/wiki/Modulo_operation.
   */
  let floorMod = function floorMod(a, n) {
    return a - n * Math.floor(a / n);
  };

  /**
   * @returns {Number} the value x clamped to the range [low, high].
   */
  // let clamp = function clamp(x, range) {
  //   return Math.max(range[0], Math.min(x, range[1]));
  // };

  /**
   * @returns {Boolean} true if agent is probably a mobile device. Don't really care if this is accurate.
   */
  let isMobile = function isMobile() {
    return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent)
    );
  };

  /**
   * Calculate distortion of the wind vector caused by the shape of the projection at point (x, y). The wind
   * vector is modified in place and returned by this function.
   */
  let distort = function distort(projection, λ, φ, x, y, scale, wind, windy) {
    let u = wind[0] * scale;
    let v = wind[1] * scale;
    let d = distortion(projection, λ, φ, x, y, windy);

    // Scale distortion vectors by u and v, then add.
    wind[0] = d[0] * u + d[2] * v;
    wind[1] = d[1] * u + d[3] * v;
    return wind;
  };

  let distortion = function distortion(projection, λ, φ, x, y, windy) {
    let τ = 2 * Math.PI;
    let H = Math.pow(10, -5.2);
    let hλ = λ < 0 ? H : -H;
    let hφ = φ < 0 ? H : -H;

    let pλ = project(φ, λ + hλ, windy);
    let pφ = project(φ + hφ, λ, windy);

    // Meridian scale factor (see Snyder, equation 4-3), where R = 1. This handles issue where length of 1º λ
    // changes depending on φ. Without this, there is a pinching effect at the poles.
    let k = Math.cos(φ / 360 * τ);
    return [(pλ[0] - x) / hλ / k, (pλ[1] - y) / hλ / k, (pφ[0] - x) / hφ, (pφ[1] - y) / hφ];
  };

  let createField = function (rows, bounds, callback) {
    let xMin = bounds.x;
    let field = {};

    field.release = function () {
      rows = [];
    };

    /**
     * Copies the array [x, y, u, v, m] into Array 'a' starting at index i. If x or y is out of bounds,
     * then sets the u value to NaN.
     *
     * @param x {Number}
     * @param y {Number}
     * @param a {Float32Array}
     * @param i {Number}
     */
    field.move = function (x, y, a, i) {
      let k = Math.round(y);
      if (0 <= k && k < rows.length) {
        let row = rows[k];
        let j = (Math.round(x) - xMin) * 3;
        if (row && 0 <= j && j < row.length) {
          a[i] = x;
          a[i + 1] = y;
          a[i + 2] = row[j];
          a[i + 3] = row[j + 1];
          a[i + 4] = row[j + 2];
          return;
        }
      }
      a[i] = x;
      a[i + 1] = y;
      a[i + 2] = NaN;
      a[i + 3] = NaN;
      a[i + 4] = NaN;
    };

    /**
     * @returns {boolean} true if the field is valid at the point (x, y)
     */
    field.isDefined = function (x, y) {
      let k = Math.round(y);
      if (0 <= k && k < rows.length) {
        let row = rows[k];
        let j = (Math.round(x) - xMin) * 3;
        if (row && 0 <= j && j < row.length) {
          return row[j] === row[j];
        }
      }
      return false;
    };

    /**
     * @returns {boolean} true if the point (x, y) lies inside the outer boundary of the vector field, even if
     *          the vector field has a hole (is undefined) at that point, such as at an island in a field of
     *          ocean currents.
     */
    field.isInsideBoundary = function (x, y) {
      let a = new Float32Array(5);  // [x, y, u, v, m]
      field.move(x, y, a, 0);
      return a[4] === a[4];  // true if magnitude is defined or is HOLE_VECTOR
    };

    callback(bounds, field);
  };

  let buildBounds = function buildBounds(bounds, width, height) {
    let upperLeft = bounds[0];
    let lowerRight = bounds[1];
    let x = Math.round(upperLeft[0]); //Math.max(Math.floor(upperLeft[0], 0), 0);
    let y = Math.max(Math.floor(upperLeft[1], 0), 0);
    let xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1);
    let yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1);
    return {x: x, y: y, xMax: width, yMax: yMax, width: width, height: height};
  };

  let deg2rad = function deg2rad(deg) {
    return deg / 180 * Math.PI;
  };

  let rad2deg = function rad2deg(ang) {
    return ang / (Math.PI / 180.0);
  };

  let invert = function invert(x, y, windy) {
    let mapLonDelta = windy.east - windy.west;
    let worldMapRadius = windy.width / rad2deg(mapLonDelta) * 360 / (2 * Math.PI);
    let mapOffsetY = worldMapRadius / 2 * Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south)));
    let equatorY = windy.height + mapOffsetY;
    let a = (equatorY - y) / worldMapRadius;

    let lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
    let lon = rad2deg(windy.west) + x / windy.width * rad2deg(mapLonDelta);
    return [lon, lat];
  };

  let mercY = function mercY(lat) {
    return Math.log(Math.tan(lat / 2 + Math.PI / 4));
  };

  let project = function project(lat, lon, windy) {
    // both in radians, use deg2rad if neccessary
    let ymin = mercY(windy.south);
    let ymax = mercY(windy.north);
    let xFactor = windy.width / (windy.east - windy.west);
    let yFactor = windy.height / (ymax - ymin);

    let y = mercY(deg2rad(lat));
    let x = (deg2rad(lon) - windy.west) * xFactor;
    y = (ymax - y) * yFactor; // y points south
    return [x, y];
  };

  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  let interpolateField = function (bounds, extent, callback) {

    let projection = {};

    let mapArea = (extent.south - extent.north) * (extent.west - extent.east);
    let velocityScale = params.particles.velocityScale / Math.pow(2, (params.zoom - params.minZoom));

    let rows = [];
    let y = bounds.y;

    function interpolateRow(y) {
      let row = new Float32Array(bounds.width * 3); // [u0, v0, m0, u1, v1, m1, ...]
      for (let x = bounds.x, i = 0; x <= bounds.xMax; x += 2, i += 6) {
        let coord = invert(x, y, extent);
        if (coord) {
          let λ = coord[0], φ = coord[1];
          if (λ === λ) {
            let wind = interpolate(λ, φ);
            if (wind) {
              wind = distort(projection, λ, φ, x, y, velocityScale, wind, extent);
              row[i] = wind[0];
              row[i + 1] = wind[1];
              row[i + 2] = wind[2];
              row[i + 3] = wind[0];
              row[i + 4] = wind[1];
              row[i + 5] = wind[2];
            }
          }
        }
      }
      rows[y + 1] = rows[y] = row;
    }

    let startTime = new Date().getTime();
    for (; y < bounds.yMax; y += 2) {
      interpolateRow(y);
    }
    let endTime = new Date().getTime();
    let second = endTime - startTime
    // console.log('风场流线图数据处理耗时*********：' + second + 'ms');

    createField(rows, bounds, callback);
  };

  function asColorStyle(r, g, b, a) {
    return "rgba(" + 243 + ", " + 243 + ", " + 238 + ", " + a + ")";
  }

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }

  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }

  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }

  function cutHex(h) {
    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
  }

  function windIntensityColorScale(step, maxWind) {
    let opacity = 1;
    let result = [
      /*"rgba(" + hexToR('#00ffff') + ", " + hexToG('#00ffff') + ", " + hexToB('#00ffff') + ", " + opacity + ")",
      "rgba(" + hexToR('#64f0ff') + ", " + hexToG('#64f0ff') + ", " + hexToB('#64f0ff') + ", " + opacity + ")",
      "rgba(" + hexToR('#87e1ff') + ", " + hexToG('#87e1ff') + ", " + hexToB('#87e1ff') + ", " + opacity + ")",
      "rgba(" + hexToR('#a0d0ff') + ", " + hexToG('#a0d0ff') + ", " + hexToB('#a0d0ff') + ", " + opacity + ")",
      "rgba(" + hexToR('#b5c0ff') + ", " + hexToG('#b5c0ff') + ", " + hexToB('#b5c0ff') + ", " + opacity + ")",
      "rgba(" + hexToR('#c6adff') + ", " + hexToG('#c6adff') + ", " + hexToB('#c6adff') + ", " + opacity + ")",
      "rgba(" + hexToR('#d49bff') + ", " + hexToG('#d49bff') + ", " + hexToB('#d49bff') + ", " + opacity + ")",
      "rgba(" + hexToR('#e185ff') + ", " + hexToG('#e185ff') + ", " + hexToB('#e185ff') + ", " + opacity + ")",
      "rgba(" + hexToR('#ec6dff') + ", " + hexToG('#ec6dff') + ", " + hexToB('#ec6dff') + ", " + opacity + ")",
      "rgba(" + hexToR('#ff1edb') + ", " + hexToG('#ff1edb') + ", " + hexToB('#ff1edb') + ", " + opacity + ")"*/

      // "rgba(" + hexToR('#FFDC73') + ", " + hexToG('#FFDC73') + ", " + hexToB('#FFDC73') + ", " + opacity + ")",
      // "rgba(" + hexToR('#FF746B') + ", " + hexToG('#FF746B') + ", " + hexToB('#FF746B') + ", " + opacity + ")",
      // "rgba(" + hexToR('#E77769') + ", " + hexToG('#E77769') + ", " + hexToB('#E77769') + ", " + opacity + ")",
      // "rgba(" + hexToR('#ff0000') + ", " + hexToG('#ff0000') + ", " + hexToB('#ff0000') + ", " + opacity + ")",
      // "rgba(" + hexToR('#ec6dff') + ", " + hexToG('#ec6dff') + ", " + hexToB('#ec6dff') + ", " + opacity + ")",
      // "rgba(" + hexToR('#ff1edb') + ", " + hexToG('#ff1edb') + ", " + hexToB('#ff1edb') + ", " + opacity + ")",
      "rgba(" + hexToR('#ff1edb') + ", " + hexToG('#ff1edb') + ", " + hexToB('#ff1edb') + ", " + opacity + ")"
    ]
    result.indexFor = function (m) {  // map wind speed to a style
      return Math.floor(Math.min(m, maxWind) / maxWind * (result.length - 1));
    };
    return result;
  }

  let particles, animationLoop;
  let animate = function (bounds, field, extent) {

    let colorStyles = windIntensityColorScale(INTENSITY_SCALE_STEP, params.particles.maxIntensity);
    let buckets = colorStyles.map(function () {
      return [];
    });
    let mapArea = (extent.south - extent.north) * (extent.west - extent.east);

    let particleCount = Math.round(bounds.width * bounds.height * params.particles.multiplier * Math.pow(mapArea, 0.24));
    if (isMobile()) {
      particleCount = Math.floor(particleCount * PARTICLE_REDUCTION);
    }

    let particles = new Float32Array(particleCount * 5);
    let ages = new Int32Array(particleCount);
    let batches = colorStyles.map(function () {
      return new Float32Array(particleCount * 4);
    });
    let sizes = new Int32Array(batches.length);
    let xMin = bounds.x, yMin = bounds.y, width = bounds.width, height = bounds.height;

    function randomize(i) {
      let x = xMin + Math.random() * width;
      let y = yMin + Math.random() * height;
      field.move(x, y, particles, i);
    }

    function randomizeWell(i) {  // This function is hrm, but avoids "pulsing"
      for (let attempts = 0; attempts < 10; attempts++) {
        randomize(i);
        if (particles[i + 2] === particles[i + 2]) return;
      }
    }

    let g = params.canvas.getContext("2d");
    g.lineWidth = params.particles.lineWidth;

    let maxAge, evolve;
    if (params.particles.waves) {
      maxAge = 200;
      evolve = evolveWaves;
      g.fillStyle = "rgba(0, 0, 0, 0.90)";
    } else {
      maxAge = 100;
      evolve = evolveParticles;
      g.fillStyle = "rgba(0, 0, 0, 0.97)";//µ.isFF() ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.97)";  // FF Mac alpha behaves oddly
    }

    for (let i = 0, j = 0; i < particleCount; i += 1, j += 5) {
      if (params.particles.waves) {
        ages[i] = random(0, maxAge);
      } else {
        ages[i] = random(0, maxAge);
      }
      randomizeWell(j);
    }

    let easeFactor = new Float32Array(maxAge);
    for (let k = 0; k < easeFactor.length; k++) {
      easeFactor[k] = (Math.sin(-Math.PI / 2 + k / 7) / 2 + 1 / 2);  // fade in/out line intensity
    }

    function evolveWaves() {
      for (let s = 0; s < sizes.length; s++) {
        sizes[s] = 0;
      }
      for (let i = 0, j = 0; i < particleCount; i += 1, j += 5) {
        if (++ages[i] >= maxAge) {
          ages[i] = 0;
          randomize(j);
        }

        let x = particles[j];
        let y = particles[j + 1];
        let u = particles[j + 2];
        let v = particles[j + 3];
        let xt = x + u * 1.5;
        let yt = y + v * 1.5;
        let m = particles[j + 4];

        if (m !== m || !field.isDefined(xt, yt)) {
          ages[i] = maxAge;  // particle has escaped the game grid
        } else {
          particles[j] = xt;
          particles[j + 1] = yt;

          // width of wave
          let mag = Math.sqrt(u * u + v * v) / 2.5;  // CONSIDER: would be nice to retain unscaled m...
          let du = u / mag, dv = v / mag;

          // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
          let si = colorStyles.indexFor(m * easeFactor[ages[i]]);
          let sj = 4 * sizes[si]++;
          let batch = batches[si];
          batch[sj] = x - dv;
          batch[sj + 1] = y + du;
          batch[sj + 2] = x + dv;
          batch[sj + 3] = y - du;
        }
      }
    }

    function evolveParticles() {
      for (let s = 0; s < sizes.length; s++) {
        sizes[s] = 0;
      }
      for (let i = 0, j = 0; i < particleCount; i += 1, j += 5) {
        if (++ages[i] >= maxAge) {
          ages[i] = 0;
          randomize(j);
        }

        let x = particles[j];         // x
        let y = particles[j + 1];       // y
        let xt = x + particles[j + 2];  // u
        let yt = y + particles[j + 3];  // v
        let m = particles[j + 4];       // m

        if (xt === xt) {
          field.move(xt, yt, particles, j);
          let u = particles[j + 2];
          if (u === u) {
            // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
            let si = colorStyles.indexFor(m);
            let sj = 4 * sizes[si]++;
            let batch = batches[si];
            batch[sj] = x;
            batch[sj + 1] = y;
            batch[sj + 2] = xt;
            batch[sj + 3] = yt;
          } else {
            ages[i] = maxAge;  // particle has escaped the game grid
          }
        } else {
          ages[i] = maxAge;  // particle has escaped the game grid
        }
      }
    }

    function draw() {
      // Fade existing trails.
//	        g.globalCompositeOperation = "destination-in";
//	        g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
//	        g.globalCompositeOperation = "source-over";

      g.save();
      g.globalAlpha = .16;
      g.globalCompositeOperation = 'destination-out';
      g.fillStyle = '#000';
      g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
      g.restore();

      // Draw new trails.
      for (let i = 0; i < batches.length; i++) {
        let batch = batches[i];
        let size = 4 * sizes[i];
        if (size > 0) {
          g.beginPath();

          if (params.curOverlay == 'wind') {
            g.strokeStyle = colorStyles[i];
          } else {
            g.strokeStyle = "rgba(225, 225, 225, 1)"
          }

          for (let j = 0; j < size; j += 4) {
            g.moveTo(batch[j], batch[j + 1]);
            g.lineTo(batch[j + 2], batch[j + 3]);
          }
          g.stroke();
        }
      }
      //let value = g.canvas.toDataURL("image/png")
    }

    let then = Date.now();
    (function frame() {
      animationLoop = requestAnimationFrame(frame);
      let now = Date.now();
      let delta = now - then;
      if (delta > FRAME_TIME) {
        then = now - delta % FRAME_TIME;
        evolve();
        draw();
      }
    })();
  };

  /**
   velocityScale: 速度[线长]
   multiplier： 密集程度
   */
  let updateOverlayConfig = function (overlay) {
    if (!overlay) return;
    params.particles = {};
    let particlesConfigs = {
      'wind': {velocityScale: 0.06, maxIntensity: 10, lineWidth: 1, multiplier: 1 / 500},
      'oceanCurrent': {velocityScale: 0.5, maxIntensity: 0.7, lineWidth: 1, multiplier: 1 / 50},
      'wave': {velocityScale: 0.003, maxIntensity: 12, waves: true, lineWidth: 1.5, multiplier: 1 / 200},
      'windWave': {velocityScale: 0.005, maxIntensity: 12, waves: true, lineWidth: 1.5, multiplier: 1 / 200}
    };
    let particlesConfig = (overlay == 'swellFirst' || overlay == 'swellSecond') ? particlesConfigs['wave'] : particlesConfigs[overlay];
    params.curOverlay = overlay;
    for (let k in particlesConfig) {
      params.particles[k] = particlesConfig[k];
    }
  };

  let start = function start(bounds, extent, overlay, data, zoom, minZoom) {
    updateOverlayConfig(overlay);

    params.zoom = zoom;
    params.minZoom = minZoom;

    let mapBounds = {
      west: deg2rad(extent[0]),
      south: deg2rad(extent[1]),
      east: deg2rad(extent[2]),
      north: deg2rad(extent[3]),
      width: bounds[1][0],
      height: bounds[1][1]
    };
    stop(true);
    // build grid
    buildGrid(data, function (grid) {
      // interpolateField
      interpolateField(buildBounds(bounds, bounds[1][0], bounds[1][1]), mapBounds, function (bounds, field) {
        // animate the canvas with random points
        windy.field = field;
        animate(bounds, field, mapBounds);
      });
    });
  };

  let stop = function stop(flag) {
    if (!flag && params.canvas) {
      let canvas = params.canvas,
        w = canvas.width,
        h = canvas.height,
        ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);
    }

    if (windy.field) windy.field.release();
    if (animationLoop) cancelAnimationFrame(animationLoop);
  };

  let shift = function shift(dx, dy) {
    let canvas = params.canvas,
      w = canvas.width,
      h = canvas.height,
      ctx = canvas.getContext("2d");
    if (w > dx && h > dy) {
      let clamp = function clamp(high, value) {
        return Math.max(0, Math.min(high, value));
      };
      let imageData = ctx.getImageData(clamp(w, -dx), clamp(h, -dy), clamp(w, w - dx), clamp(h, h - dy));
      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(imageData, clamp(w, dx), clamp(h, dy));
      for (let i = 0, pLength = particles.length; i < pLength; i++) {
        particles[i].x += dx;
        particles[i].y += dy;
      }
    }
  };

  // shim layer with setTimeout fallback
  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / FRAME_RATE);
    };
  }();

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  let windy = {
    params: params,
    start: start,
    stop: stop,
    shift: shift,
    createField: createField,
    interpolatePoint: interpolate
  };

  return windy;
};


