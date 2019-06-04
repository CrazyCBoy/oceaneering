<template>
    <div>

        <h2 style="color:#3656ff;padding-top: 20px">StationsWeather</h2>
        <div style="text-align: right;margin: 0 300px 10px 0">
            <el-button type="primary">坐标</el-button>
            <el-button type="primary">X:{{x.toFixed(5)}}&emsp;&emsp;&emsp;Y:{{y.toFixed(5)}}</el-button>
        </div>
        <div id="map" style="width: 1400px;height: 800px;margin: 0 auto" ref="rootmap"></div>
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import VectorLayer from 'ol/layer/Vector'
    import VectorSource from 'ol/source/Vector'
    import { Map, View, Feature } from 'ol'
    import { Style, Icon } from 'ol/style'
    import Text from 'ol/style/Text'
    import { Point } from 'ol/geom'
    import mapconfig from "../config/mapconfig";

    export default {
        name: "StationsWeather",
        data() {
            return {
                map: null,
                features: [],
                newlay:null,
                coordinates: mapconfig.coordinates,
                x:0,
                y:0,
            };
        },
        mounted() {
            this.initMap();
            this.addLayerFeature();
            this.map.on('singleclick', this.changeXY);
        },
        methods:{
            initMap(){
               /* this.map = new Map({
                    target: "map",
                    layers: [
                        /!*new TileLayer({
                            source: new OSM(),
                        }),*!/
                     /!*   new TileLayer({
                            source: new XYZ({
                                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
                            })
                        }),*!/
                        new TileLayer({
                            source:new TileArcGISRest({
                                url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                            })
                        })
                    ],
                    view: new View({
                        projection: "EPSG:4326",    //选择坐标系
                        center: [118.068, 24.51],  //选择中心位置
                        zoom:8 //缩放
                    })
                });*/
                var mapcontainer = this.$refs.rootmap;
                this.map = new Map({
                    target: mapcontainer,
                    layers: mapconfig.streetmap(),
                    view: new View({
                        projection: "EPSG:4326",    //使用这个坐标系
                        center: [mapconfig.x,mapconfig.y],  //深圳
                        zoom: mapconfig.zoom
                    })
                });
            },
            changeXY (e) {
                const _that = this;
                _that.x = e.coordinate[0];
                _that.y = e.coordinate[1];
                console.log(_that.x, _that.y)
                //alert(_that.x+"---------"+_that.y)
            },
            addLayerFeature () {
                const _that = this;
                // 设置图层
                _that.flagLayer = new VectorLayer({
                    source: new VectorSource()
                });
                // 添加图层
                _that.map.addLayer(_that.flagLayer);
                // 循环添加feature
                for (let i = 0; i < this.coordinates.length; i++) {
                    // 创建feature
                    let feature = new Feature({
                        geometry: new Point([_that.coordinates[i].x, _that.coordinates[i].y])
                    });
                    feature.setId(i);
                    feature.setStyle(_that.getStyls(feature));
                    // 放入features
                    _that.features.push(feature)
                }
                // 批量添加feature
                _that.flagLayer.getSource().addFeatures(_that.features)
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
            layerbtOne(){
                alert("-----layerbtOne------")
            },
            layerbtTwo(){
                alert("-----layerbtTwo------")
            },
            /*checkOsm(elem) {
                osmLayer.setVisible(elem.checked);
                _that.flagLayer.setVisible()
            }*/
            /*getIconMakers(map) {
                var pos = ol.proj.fromLonLat([118.208889, 35.3725]);
                var pos2 = ol.proj.fromLonLat([112.208889, 34.3725]);
                console.dir(pos);

                var startMarker = new ol.Feature({
                    type: 'icon',
                    name: 'museum',
                    geometry: new ol.geom.Point(pos)
                });
                var vectorSource = new ol.source.Vector({});
                vectorSource.addFeature(startMarker);

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
                        })
                    })
                });
                map.addOverlay(vectorLayer);

                var element = document.getElementById('popup1');
                var popup = new ol.Overlay({
                    element: element,
                    positioning: 'bottom-center',
                    stopEvent: false,
                    offset: [0, -50]
                });
                map.addOverlay(popup);

                map.on('click', function (evt) {
                    var pixel = map.getEventPixel(evt.originalEvent);
                    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                        return feature;
                    });
                    let iconName = feature.get('name');
                    if (feature) {
                        var coordinates = feature.getGeometry().getCoordinates();
                        popup.setPosition(coordinates);
                        $(element).popover({
                            'placement': 'top',
                            'html': true,
                            'content': feature.get('name')
                        });
                        $(element).popover('show');
                    } else {
                        $(element).popover('destroy');
                    }
                });
// 鼠标移动的事件
                map.on('pointermove', function (e) {
                    if (evt.dragging) {   //如果是拖动地图造成的鼠标移动，则不作处理
                        return;
                    }
                    var pixel = map.getEventPixel(e.originalEvent);
                    var hit = map.hasFeatureAtPixel(pixel);
                    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
                });
            }*/

        }

    }
</script>

<style scoped>

</style>