<template>
<div class="site">

</div>
</template>

<script>
    import 'ol/ol.css'
    import VectorLayer from 'ol/layer/Vector'
    import VectorSource from 'ol/source/Vector'
    import XYZ from 'ol/source/XYZ'
    import {Map, View, Feature} from 'ol'
    import { Style, Icon } from 'ol/style'
    import Text from 'ol/style/Text'
    // import Fill from 'ol/style/Fill'
    import { Point } from 'ol/geom'
    import {defaults} from 'ol/control/util.js'
    import TileArcGISRest from "ol/source/TileArcGISRest";
    import mapconfig from "../../../config/mapconfig";
    import {transform, transformExtent} from 'ol/proj';
    import {EPSG3857, EPSG4326} from "../../../util/ol-util";
    import {mapActions, mapGetters, mapState} from "vuex";


    export default {
        name: "SiteStations",
        data() {
            return {
                features: [],
                coordinates: mapconfig.coordinates,
                x:0,
                y:0,
            };
        },
        computed:{
            ...mapState({
                //将后台返回到数据映射到stat中的testData,
                testData: state => state.testData,
                stationList:state=>state.stationList,
            }),
            ...mapGetters({
                stationInfo:'getStationInfo'
            })
        },
        methods:{
            ...mapActions({
                getTestInfoData: "getTestInfoData",
                getStationInfoData:"getStationInfoData"
            }),
            initSiteStations:function () {
                let vm = this;
                let pvm = this.$parent;
                let olMap = pvm.olMap;
                // 设置图层
                vm.flagLayer = new VectorLayer({
                    source: new VectorSource()
                });
                // 添加图层
                olMap.addLayer(vm.flagLayer);
                // 循环添加feature
                for (let i = 0; i < this.coordinates.length; i++) {
                    //需要单独定义然后再放入transform
                    var latitude=[vm.coordinates[i].x, vm.coordinates[i].y];
                    // 创建feature
                    let feature = new Feature({
                        geometry: new Point(transform(latitude,EPSG4326,EPSG3857))
                    });
                    feature.setId(i);
                    feature.setStyle(vm.getStyls(feature));
                    vm.features.push(feature)
                }
                // 批量添加feature
                vm.flagLayer.getSource().addFeatures(vm.features);
                /*olMap.on("click", evt => {
                    let pixel = olMap.getEventPixel(evt.originalEvent);
                   let coords = olMap.getCoordinateFromPixel(pixel);
                    alert(coords+"-coords------------------pixel---"+pixel)
                    vm.showFeatureInfo(coords, pixel);
                });*/
                olMap.on('singleclick',  evt => {
                    let pixel = olMap.getEventPixel(evt.originalEvent);
                    let coords = olMap.getCoordinateFromPixel(pixel);
                    olMap.forEachFeatureAtPixel(evt.pixel, (feature, layer)=> {
                        vm.$alert(this.stationInfo, 'Store中Getters数据', {
                            confirmButtonText: '确定',
                            callback: action => {
                                vm.$message({
                                    type: 'info',
                                    message: 'getters中的数据是暴露的'
                                });
                            }
                        });
                    });
                });
                olMap.on('pointermove', evt => {
                    olMap.forEachFeatureAtPixel(evt.pixel, (feature, layer)=> {
                        vm.$message({
                                message:'这里是鼠标移入站点的鼠标移入事件',
                            type:''
                        });
                    })
                });

            },
            getLonLat:function(){
                let vm = this;
                let pvm = this.$parent;
                let olMap = pvm.olMap;
                let lonLat=transformExtent(olMap.getView().calculateExtent(), EPSG3857, EPSG4326);
               return lonLat;
            },
            showFeatureInfo(coords, pixel) {
                console.log("----showFeatureInfo()-----")
                /*let vm = this;
                let pvm = this.$parent;
                let olMap = pvm.olMap;
                //vm.$store.commit(types.CHANGE_OVERLAYSTATE, true);
                let feature = olMap.forEachFeatureAtPixel(pixel, (feature, layer) => {
                    return feature;
                });
                if (feature) {
                    let properties = feature.getProperties();
                    vm.updateFeatureInfo({
                        name: properties.name,
                        type: properties.type,
                        coords: coords
                    });
                    vm.overlay.setPosition(coords);
                    olMap.addOverlay(vm.overlay);
                }*/
            },
            getStyls (feature) {
                let Styles = [];
                Styles.push(
                   new Style({
                        image: new Icon({
                            //src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559048165237&di=83695e427fe3eb0453ee61cb88ab5a5c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D057388a5389b033b2c88fcda25cf3620%2F8c1001e93901213f6957db7d58e736d12f2e952f.jpg',
                            src:'http://weilin.me/ol3-primer/img/anchor.png',
                            //src:'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
                            anchor: [1, 1],
                        })
                    })
                );
                // 绘制圆角矩形
                let canvas = document.createElement('canvas');
                let length = (feature.id_ + '站点').length + 1;
                canvas.width = length * 15;
                canvas.height = 35;
                let x = 0;
                let y = 0;
                let w = canvas.width;
                let h = canvas.height;
                let r = 15;
                // 设置style
                Styles.push(
                    new Style({
                        image: new Icon({
                            img: canvas,
                            imgSize: [w, h],
                            anchor: [0, 1]
                        }),
                        text: new Text({
                            textAlign: 'center',
                            text: '站点' + feature.id_,
                            offsetX: 21,
                            offsetY: -17,
                        })
                    })
                );
                return Styles
            },
            loadData(){
                this.getStationInfoData(this.getLonLat());
            },
        },
        created() {
            let vm = this;
            vm.bus.$on('event.initSiteStations', function () {
                vm.initSiteStations();
            });
            vm.bus.$on('event.moveSiteStations', function () {
                vm.loadData();
            });
        }
    }
</script>

<style scoped>
.site{
    position: absolute;
}
</style>