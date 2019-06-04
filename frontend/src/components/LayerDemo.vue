<template>
    <div id="map" ref="rootmap">

    </div>
</template>

<script>
    import "ol/ol.css"
    import { Map, View } from "ol"
    import mapconfig from '../config/mapconfig'
    import VectorLayer from "ol/layer/Vector";
    import VectorSource from "ol/source/Vector";
    import Feature from "ol/Feature";
    import Point from "ol/geom/Point";
    import Icon from "ol/style/Icon";
    import Style from "ol/style/Style";
    export default {
        name:"LayerDemo",
        data() {
            return {
                map: null,
                features: [],

                coordinates:mapconfig.coordinates
            };
        },
        mounted() {
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
            //this.addLayerFeature()
        },
        methods:{
           /* addLayerFeature () {
                const _that = this
                // 设置图层
                _that.flagLayer = new VectorLayer({
                    source: new VectorSource()
                })
                // 添加图层
                _that.map.addLayer(_that.flagLayer)
                // 循环添加feature
                for (let i = 0; i < this.coordinates.length; i++) {
                    // 创建feature
                    let feature = new Feature({
                        geometry: new Point([_that.coordinates[i].x, _that.coordinates[i].y])
                    })
                    feature.setStyle(_that.getStylss(feature))
                    // 放入features
                    _that.features.push(feature)
                }
                // 批量添加feature
                _that.flagLayer.getSource().addFeatures(_that.features)
            },
            getStylss (feature) {
                let Styles = []
                Styles.push(
                    new Style({
                        image: new Icon({
                            //src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559048165237&di=83695e427fe3eb0453ee61cb88ab5a5c&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D057388a5389b033b2c88fcda25cf3620%2F8c1001e93901213f6957db7d58e736d12f2e952f.jpg',
                            src:'http://weilin.me/ol3-primer/img/anchor.png',
                            anchor: [1, 1]
                        })
                    })
                )
                // 绘制圆角矩形
                let canvas = document.createElement('canvas')
                let context = canvas.getContext('2d')
                let length = (feature.id_ + '标记点').length + 1
                canvas.width = length * 15
                canvas.height = 35
                let x = 0
                let y = 0
                let w = canvas.width
                let h = canvas.height
                let r = 15
                Styles.push(
                    new Style({
                        image: new Icon({
                            img: canvas,
                            imgSize: [w, h],
                            anchor: [0, 1]
                        }),
                        text: new Text({
                            textAlign: 'center',
                            text: '点----------1' + feature.id_,
                            offsetX: 28,
                            offsetY: -17
                        })
                    })
                )
                return Styles
            },*/
        }
    };
</script>

<style>
    #map{height:100%;}
    /*隐藏ol的一些自带元素*/
    .ol-attribution,.ol-zoom { display: none;}

</style>
