<template>
  <div class="content">
    <div id="olMap"></div>
    <Stations></Stations>
    <right-nav/>
    <mode-layer/>
    <typhoon-layer/>
  </div>
</template>

<script>
  import 'ol/ol.css';
  import {Map, View,} from "ol";
  import TileLayer from "ol/layer/Tile";
  import XYZ from "ol/source/XYZ";
  import {transform} from 'ol/proj';
  import {defaults as defaultControls} from 'ol/control';
  import MousePosition from 'ol/control/MousePosition';
  import {defaults as defaultInteractions, PinchZoom} from 'ol/interaction';

  import {EPSG3857, EPSG4326} from '../../util/ol-util'

  import ModeLayer from './component/ModeLayer'
  import RightNav from './component/RightNav'
  import TyphoonLayer from './component/TyphoonLayer'
  import Site from './component/SiteStations'
  import Stations from './component/SiteStations'

  export default {
    name: 'index',
    components: {
        'Stations':Stations,
      'right-nav': RightNav,
      'mode-layer': ModeLayer,
      'typhoon-layer': TyphoonLayer
    },
    data() {
      return {
        olMap: null,
        mapFirstLoadComplete: false,
        mapLayers: {}
      }
    },
    mounted() {
      let vm = this;
      this.initOlMap();
      this.bus.$emit('event.initModeLayer', true);
      this.bus.$on('event.updateMapLayer', function (data) {
        let mapLayer = vm.mapLayers[data.name];
        mapLayer.setVisible(! mapLayer.getVisible());
      });
      this.bus.$emit('event.initSiteStations', true);
    },
    methods: {
      initOlMap: function () {
        let vm = this;
        let gaodeLayer = new TileLayer({
          source: new XYZ({url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'})
        });
        vm.$set(this.mapLayers, 'gaodeLayer', gaodeLayer);
        let googleLayer = new TileLayer({
          visible: false,
          preload: false,
          opacity: 0.8,
          source: new XYZ({
            attributions: [
              '© <a href="http://www.google.cn/maps/" target="_blank">谷歌地图</a>'
            ],
            url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
          })
        });
        vm.$set(this.mapLayers, 'googleLayer', googleLayer);
        let map = new Map({
          target: "olMap",
          interactions: defaultInteractions({pinchZoom: false}).extend([
            new PinchZoom({
              constrainResolution: true // force zooming to a integer zoom
            })
          ]),
          controls: defaultControls().extend([new MousePosition({
            undefinedHTML: '经纬度显示',
            projection: EPSG4326,
            coordinateFormat: function (coordinate) {
              return " 纬度:" + coordinate[1] + " 经度:" + coordinate[0];
            }
          })]),
          layers: [
            gaodeLayer,
            googleLayer,
          ],
          view: new View({
            projection: EPSG3857,    //使用这个坐标系
            center: transform([115.43621, 30.22617], EPSG4326, EPSG3857),  //深圳
            zoom: 5
          })
        });
        map.on('movestart', function (evt) {
          vm.bus.$emit('event.moveModeLayer', 'clear');
        });
        map.on('moveend', function (evt) {
          vm.mapFirstLoadComplete = true;
          vm.bus.$emit('event.moveModeLayer', 'show');
        });
        map.on('movestart', (evt) =>{
              vm.bus.$emit('event.moveSiteStations', 'clear');
          });
        map.on('moveend',(evt) =>{
              vm.mapFirstLoadComplete = true;
              vm.bus.$emit('event.moveSiteStations', 'show');
          });
        vm.olMap = map;
      },

    }
  }
</script>
<style>
  .content {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  #olMap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .canvasMap {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    top: 0;
    left: 0;
  }

</style>