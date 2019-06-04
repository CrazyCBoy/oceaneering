<template>
    <section style="display: flex">
        <section style="height: 600px; width: 1200px;border: 1px red solid; margin: 10px 10px 10px 50px;">
            <section id="Map" style="width: 100%; height: 100%;"></section>
        </section>
        <section style="height: 600px; width: 300px;border: 1px gray solid; margin: 10px">
            <section>
                <el-button type="text">X:{{x}}</el-button>
                <el-button type="text">Y:{{y}}</el-button>
            </section>
            <section>
            </section>
        </section>
    </section>
</template>

<script>
    import 'ol/ol.css'
    import TileLayer from 'ol/layer/Tile'
    import VectorLayer from 'ol/layer/Vector'
    import VectorSource from 'ol/source/Vector'
    import XYZ from 'ol/source/XYZ'
    import { Map, View, Feature } from 'ol'
    import { Style, Icon } from 'ol/style'
    import Text from 'ol/style/Text'
    // import Fill from 'ol/style/Fill'
    import { Point } from 'ol/geom'
    import {defaults} from 'ol/control/util.js'
    export default {
        name: 'FeatureDemo',
        data () {
            return {
                map: null,
                x: 0,
                y: 0,
                coordinates: [
                    {
                        x: 112.87197876066057,
                        y: 28.22084712811648
                    },
                    {
                        x: 112.8720016491825,
                        y: 28.225383281160706
                    },
                    {
                        x: 112.87314605792562,
                        y: 28.228450298111515
                    },
                    {
                        x: 112.87527465926178,
                        y: 28.23101377452122
                    },
                    {
                        x: 112.87994384801641,
                        y: 28.232203960351857
                    },
                    {
                        x: 112.88353729301525,
                        y: 28.23128843224413
                    },
                    {
                        x: 112.8825531017319,
                        y: 28.225932597479645
                    }
                ],
                features: [],
                flagLayer: null
            }
        },
        computed: {
        },
        methods: {
            /**
             * 初始化地图
             */
            initMap () {
                this.map = new Map({
                    target: 'Map',
                    controls: defaults({zoom: false}),
                    layers: [
                        new TileLayer({
                            source: new XYZ({
                                url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
                            })
                        })
                    ],
                    view: new View({
                        // 指定地图投影模式
                        projection: 'EPSG:4326',
                        // 定义地图显示的坐标
                        center: [112.87, 28.23],
                        // 限制地图中心范围，但无法限制缩小范围
                        // extent: [110, 26, 114, 30],
                        // 定义地图显示层级为16
                        zoom: 16,
                        // 限制缩放级别，可以和extent同用限制范围
                        maxZoom: 19,
                        // 最小级别，越大则面积越大
                        minZoom: 5
                    })
                })
            },
            /**
             * 变换XY坐标
             * @param e
             */
            changeXY (e) {
                const _that = this
                _that.x = e.coordinate[0]
                _that.y = e.coordinate[1]
                console.log(_that.x, _that.y)
            },
            /**
             * 批量添加坐标点
             */
            handleAddBatchFeature () {
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
                    // 设置ID
                    feature.setId(i)
                    // 设置样式
                    feature.setStyle(_that.getStyls(feature))
                    // 放入features
                    _that.features.push(feature)
                } // for 结束
                // 批量添加feature
                _that.flagLayer.getSource().addFeatures(_that.features)
            },
            /**
             * 设置Style
             */
            getStyls (feature) {
                let Styles = []
                Styles.push(
                    new Style({
                        image: new Icon({
                            src: 'http://weilin.me/ol3-primer/img/anchor.png',
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
                // 缩放
                context.scale(0.8, 0.8)
                context.fillStyle = 'rgba(255,255,255,1)'
                // 绘制圆角矩形
                context.beginPath()
                context.moveTo(x + r, y)
                context.arcTo(x + w, y, x + w, y + h, r)
                context.arcTo(x + w, y + h, x, y + h, r)
                context.arcTo(x, y + h, x, y, r)
                context.arcTo(x, y, x + w, y, r)
                // 设置阴影
                context.shadowColor = 'rgba(0, 0, 0, 0.2)' // 颜色
                context.shadowBlur = 5 // 模糊尺寸
                context.shadowOffsetX = 2 // 阴影Y轴偏移
                context.shadowOffsetY = 2 // 阴影X轴偏移
                // ----
                context.closePath()
                // 填充
                context.fill()
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
                            text: '标记点' + feature.id_,
                            offsetX: 28,
                            offsetY: -17
                        })
                    })
                )
                return Styles
            }
        },
        mounted () {
            this.initMap()
            this.handleAddBatchFeature()
            this.map.on('singleclick', this.changeXY)
        },
        created () {
        }
    }
</script>

<style scoped>

</style>