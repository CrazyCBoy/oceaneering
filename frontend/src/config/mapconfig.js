import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'

import {default as view, Map, View} from "ol"
import "ol/ol.css"
import {EPSG3857, EPSG4326} from "../util/ol-util";

import {transformExtent} from "ol/proj";
//添加坐标文件
const coordinates= [
    {x: 119.019, y: 25.322}, {x: 118.743, y: 24.855}, {x: 118.703, y: 24.185}, {x: 118.713, y: 24.005},{x: 118.532031, y: 23.71282},
    {x: 119.442697, y: 23.602661},{x: 118.513634, y: 23.02067},{x: 118.187082, y: 23.258875},{x: 119.599074, y: 24.92668},{x:120.845491, y: 25.182261},
    {x: 121.250232, y: 25.199002},{x: 120.03601, y: 25.127838},{x: 120.827094, y: 25.633436},{x: 117.018853, y: 22.86305},{x: 117.796139, y: 22.662563},
    {x: 119.691061, y: 22.628408},{x:113.84532,y:21.999291},{x:114.700794,y:22.127915},{x:115.565467,y:21.569696},{x:116.623312,y:22.273545},
    {x:118.389452,y:22.487428}, {x:117.957116,y:21.19921},
    {x: 114.019, y: 25.322}, {x: 114.743, y: 24.855}, {x: 114.703, y: 23.185}, {x: 114.713, y: 20.005},{x: 115.532031, y: 23.71282},
    {x: 114.442697, y: 23.602661},{x: 114.513634, y: 23.02067},{x: 114.187082, y: 23.258875},{x: 114.599074, y: 24.92668},{x:113.845491, y: 20.182261},
    {x: 114.250232, y: 25.199002},{x: 113.03601, y: 25.127838},{x: 113.827094, y: 21.633436},{x: 11.018853, y: 22.86305},{x: 116.796139, y: 23.662563},
    {x: 116.691061, y: 19.628408},{x:113.84532,y:21.999291},{x:114.700794,y:22.127915},{x:114.565467,y:21.569696},{x:115.623312,y:22.273545},
    {x:113.389452,y:17.487428}, {x:113.957116,y:18.19921},
    {x: 115.019, y: 19.322}, {x: 115.743, y: 19.855}, {x: 115.703, y: 19.185}, {x: 115.713, y: 20.005},{x: 115.532031, y: 19.71282},
    {x: 114.442697, y: 19.602661},{x: 114.513634, y: 23.02067},{x: 114.187082, y: 23.258875},{x: 115.599074, y: 18.92668},{x:115.845491, y: 20.182261},
    {x: 115.250232, y: 19.199002},{x: 115.03601, y: 19.127838},{x: 115.827094, y: 20.633436},{x: 115.018853, y: 19.86305},{x: 116.796139, y: 18.662563},
    {x: 115.691061, y: 19.628408},{x:115.84532,y:19.999291},{x:115.700794,y:18.127915},{x:115.565467,y:19.569696},{x:115.623312,y:20.273545},
    {x:115.389452,y:17.487428}, {x:115.957116,y:19.19921},
];

//let maptype=2

const streetmap=function(){
    var maplayer=null;
    maplayer=new TileLayer({
        source:new TileArcGISRest({
            url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
        })
    });
    return [maplayer];
};
/*var addlayerfeature=function () {
    var mapfeature=null;
    const _that = this;
    //添加feature
    _that.mapfeature=new VectorLayer({
        source: new VectorSource()
    });
    _that.map.addLayer(_that.mapfeature);
    for (let i = 0; i < this.coordinates.length; i++) {
        let feature = new Feature({
            geometry: new Point([_that.coordinates[i].x, _that.coordinates[i].y])
        });
        feature.setId(i);
        feature.setStyle(getStyls(feature));
        _that.features.push(feature)
    }
    _that.mapfeature.getSource().addFeatures(_that.features_);
    console.log("addfeature");
    return mapfeature;
};

function addStyle(feature) {
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
    /!*  // 缩放
      context.scale(0.8, 0.8)
      context.fillStyle = 'rgba(255,255,255,1)'*!/
    /!* // 绘制圆角矩形
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
     context.fill()*!/
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
}*/

const mapconfig={
    x:119.019,     //中心点经度和纬度
    y:25.322,
    zoom:8,          //地图缩放级别
    streetmap:streetmap,
    coordinates:coordinates,
    /*addlayerFeature:addlayerfeature,
    addStyle:addStyle,*/


};
export default mapconfig
