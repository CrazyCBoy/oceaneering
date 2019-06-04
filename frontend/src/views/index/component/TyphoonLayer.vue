<template>

</template>
<script>
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import Feature from 'ol/Feature'
  import Circle from 'ol/geom/Circle'
  import {Style,Stroke,Fill} from 'ol/style'
  import LineString from 'ol/geom/LineString'
  import {TYPHOON_AREA_LEVEL} from '../../../const/common'
  import {EPSG3857, EPSG4326, transform2Coordinate} from '../../../util/ol-util'

 // let typhoonData = require('../../../assets/file/typhoon/typhoon-data');

  export default {
    data() {
      return {
        typhoonLayer: null,
        typhoonSource: null,
        typhoonCircleFeature: {}
      }
    },
    created() {
      let vm = this;
      vm.bus.$on('event.initTyphoonLayer', function () {
        vm.initTyphoonLayer();
      });
    },
    methods: {
      initTyphoonLayer: function () {
        let vm = this;
        let pvm = vm.$parent;
        let olMap = pvm.olMap;
        let typhoonSource = new VectorSource();
        let typhoonLayer = new VectorLayer({
          style: null,
          source: typhoonSource
        });
        vm.typhoonSource = typhoonSource;
        vm.typhoonLayer = typhoonLayer;
      },
      drawTyphoonCircle: function (typhoonCode, c_point_7, c_point_10, c_point_12, lon, lat) {
        let vm = this;
        let circle_7 = new Feature({
          geometry: new Circle(transform2Coordinate(lon, lat), c_point_7 * 1000)
        });
        let circle_10 = new Feature({
          geometry: new Circle(transform2Coordinate(lon, lat), c_point_10 * 1000)
        });
        let circle_12 = new Feature({
          geometry: new Circle(transform2Coordinate(lon, lat), c_point_12 * 1000)
        });
        circle_7.setStyle(vm.generateStyle(247, 211, 45));
        circle_10.setStyle(vm.generateStyle(247, 49, 45));
        circle_12.setStyle(vm.generateStyle(244, 67, 215));
        vm.typhoonSource.addFeatures([circle_7, circle_10, circle_12]);
        vm.typhoonCircleFeature[typhoonCode] = {
          '7': circle_7,
          '10': circle_10,
          '12': circle_12
        };
      },
      drawTyphoonLine: function() {
        let lonlatArr = [];
        for (let k in typhoonData) {
          lonlatArr.push(transform2Coordinate(typhoonData[k]['lon'], typhoonData[k]['lat']))
        };
      },
      generateStyle: function (r, g, b) {
        return new Style({
          stroke: new Stroke({
            color: 'rgba(' + r + ', ' + g + ', ' + b + ', 1)',
            width: 1
          }),
          fill: new Fill({
            color: 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)'
          })
        });
      }
    }
  }

</script>