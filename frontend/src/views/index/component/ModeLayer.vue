<template>
  <div id="mode-layer">
    <canvas ref="windyCanvas" class="canvasMap"></canvas>
    <canvas ref="isolineCanvas" class="canvasMap"></canvas>
    <canvas ref="arrowCanvas" class="canvasMap"></canvas>
  </div>
</template>
<script>
  import {transform, transformExtent} from 'ol/proj';

  import {EPSG3857, EPSG4326} from '../../../util/ol-util'

  import {CanvasScalarControl} from '../../../plugins/weather-layer/scalar-ol';
  import {Windy} from '../../../plugins/weather-layer/wind-flow';
  import {Isoline} from '../../../plugins/weather-layer/isoline';
  import {Arrow} from '../../../plugins/weather-layer/windbarb-arrow';

  let spotData = require('../../../assets/file/spot/t2');
  let flowData = require('../../../assets/file/flow/uv10');
  let isolineData = require('../../../assets/file/isoline/t2');
  let arrowDataRtofs = require('../../../assets/file/arrow/rtofs_uv');
  let arrowDataWind = require('../../../assets/file/arrow/uv10');

  export default {
    name: 'ModeLayer',
    data() {
      return {
        overlayStyles: [{text: '粒子动画', key: 'flow'}, {text: '填色', key: 'spot'}, {
          text: '方向标',
          key: 'arrow'
        }, {text: '等值线', key: 'isoline'}],
        checkedOverlayStyles: [],
        SpotLayer: null,
        WindLayer: null,
        IsolineLayer: null,
        ArrowLayer: null,
      }
    },
    watch: {
      checkedOverlayStyles: function (newVal, oldVal) {
        this.updateWeatherLayers('show');
      }
    },
    created(){
      let vm = this;
      vm.bus.$on('event.initModeLayer', function (data) {
        vm.initModeLayer();
      });
      vm.bus.$on('event.updateModeLayer', function (data) {
        let index = vm.checkedOverlayStyles.indexOf(data.style);
        if(index != -1) {
          vm.checkedOverlayStyles.splice(index, 1);
        } else {
          vm.checkedOverlayStyles.push(data.style)
        }
      });
      vm.bus.$on('event.moveModeLayer', function (data) {
        vm.updateWeatherLayers(data);
      });

    },
    methods: {
      initModeLayer: function () {
        let vm = this;
        let pvm = this.$parent;
        let olMap = pvm.olMap;
        vm.SpotLayer = function () {
          let lastestData = spotData;
          return {
            update: function () {
              let checkedSpot = vm.checkedOverlayStyles.indexOf('spot') != -1;
              if (!checkedSpot) {
                CanvasScalarControl.hide();
                return;
              }
              CanvasScalarControl.show();
              if (lastestData) {
                CanvasScalarControl.draw(olMap, lastestData, 'temp');
              }
            }
          };
        }();

        vm.WindLayer = function () {
          let windy;
          let windCanvas = vm.$refs.windyCanvas;

          function refreshWindy(windJSON, overlay) {
            if (!windy) {
              windy = new Windy({canvas: windCanvas});
            }

            let mapSize = olMap.getSize();
            let view = olMap.getView();
            let extent = transformExtent(view.calculateExtent(mapSize), EPSG3857, EPSG4326);

            windCanvas.width = mapSize[0];
            windCanvas.height = mapSize[1];

            let zoom = view.getZoom();
            let minZoom = view.getMinZoom();

            windy.start(
              [[0, 0], [mapSize[0], mapSize[1]]],
              extent, overlay, windJSON, zoom, minZoom
            );
          }

          function updateWind() {
            let fileName = null, filePath = null;
            let checkedFlow = vm.checkedOverlayStyles.indexOf('flow') != -1;
            if (!checkedFlow) {
              stop();
              return;
            }

            if (flowData) {
              refreshWindy(flowData, 'wind');
            } else {
              stop();
            }
          }

          function stop() {
            windy && windy.stop();
          }

          return {
            'update': updateWind,
            'stop': stop
          };
        }();

        vm.IsolineLayer = function () {
          let isoline = null;
          let isolineCanvas = vm.$refs.isolineCanvas;

          function clear() {
            isoline && isoline.clear();
          }

          function drawIsoline(isolineJSON, productType) {
            if (!isoline) {
              isoline = new Isoline({'canvas': isolineCanvas, 'map': olMap});
            }
            isoline.draw({'srcData': isolineJSON, 'productType': productType});
          }

          function update() {
            let checkedIsoline = vm.checkedOverlayStyles.indexOf('isoline') != -1;
            if (!checkedIsoline) {
              clear();
              return;
            }

            if (isolineData) {
              drawIsoline(isolineData, 'temp');
            } else {
              clear();
            }
          }

          return {
            'update': update,
            'clear': clear
          };
        }();

        vm.ArrowLayer = function () {
          let arrow = new Arrow({'canvas': vm.$refs.arrowCanvas, 'map': olMap});
          let productType = 'wind';
          let lastestData = arrowDataWind;

          function draw(data, productType, key) {
            arrow.draw({'srcData': data, 'productType': productType});
          }

          function update() {
            let checked = vm.checkedOverlayStyles.indexOf('arrow') != -1;
            if (!checked) {
              clear();
              swtich();// 关闭时切换一次数据
              return;
            }

            draw(lastestData, productType);
          }

          function clear() {
            arrow && arrow.clear();
          }

          function swtich() {
            if (productType == 'wind') {
              productType = 'oceanCurrent';
              lastestData = arrowDataRtofs;
            } else {
              productType = 'wind';
              lastestData = arrowDataWind;
            }
          }

          return {
            'update': update,
            'clear': clear,
            'swtich': swtich
          };
        }();
      },
      updateWeatherLayers: function (operation) {
        if (this.$parent.mapFirstLoadComplete) {
          if (operation == 'show') {
            this.SpotLayer.update();
            this.WindLayer.update();
            this.IsolineLayer.update();
            this.ArrowLayer.update();

          } else if (operation == 'clear') {
            this.WindLayer.stop();
            this.IsolineLayer.clear();
            this.ArrowLayer.clear();
          }
        }
      }
    }
  }

</script>
<style>
.ol-mouse-position {
    top: 10px;
    right: 140px;
    position: absolute;
    background-color: rgba(48, 74, 101, .8);
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
}
.ol-zoom {
    top: 10px;
    left: auto;
    right: 10px;
}
.ol-control button{
  background-color: rgba(48, 74, 101, .8);
}
</style>
