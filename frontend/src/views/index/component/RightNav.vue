<template>
  <div class="u-nav">
    <div class="u-logo">
      <router-link to="/">
        <el-button size="mini"><span class="icon iconfont iconzhuxiaodenglu"></span>登录</el-button>
      </router-link>
    </div>
    <transition name="slide-fade">
    <div  id="overlay"  :class="menuShow?'overlayShow':''">
      <nav>
        <a><div class="icon iconfont icondingwei"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','spot')">站点-风</div></a>
        <a><div class="icon u-en">E</div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','spot')">EC</div></a>
        <a><div class="icon u-en">N</div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','spot')">NCEP</div></a>
        <a><div class="icon iconfont iconweixing1 size14"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','spot')">云图-风</div></a>
        <a><div class="icon iconfont icondangqian"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','spot')">站点-雾</div></a>
        <a><div class="icon iconfont iconkejian size12"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">能见度</div></a>
        <a><div class="icon iconfont iconxiangduishidu"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">相对湿度</div></a>
        <a><div class="icon iconfont iconqiwen"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">气温</div></a>
        <a><div class="icon iconfont iconicon-test"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">云图-雾</div></a>
        <a><div class="icon iconfont iconweixing2"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">雷达</div></a>
        <a><div class="icon iconfont iconshandian"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">闪电</div></a>
        <a><div class="icon iconfont iconweixing7"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">卫星</div></a>
        <a><div class="icon iconfont icondingwei2"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">站点-强对流</div></a>
        <a><div class="icon iconfont iconshuju"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">模式</div></a>
        <a><div class="icon iconfont icontaifeng"></div><div class="menu-text" v-if="!menuShow" @click="updateModeLayer('wind','isoline')">台风</div></a>
        <a @click="showMenu" v-if="!menuShow"><div class="icon el-icon-arrow-left"></div><div class="menu-text">更多图层</div></a>
        <a @click="showMenu" v-if="menuShow"><div class="icon el-icon-arrow-right active"></div><div class="menu-text" v-if="!menuShow">更多图层</div></a>
      </nav>
    </div>
    </transition>
    <transition name="slide-fade">
    <div id="menu" v-if="menuShow">
        <div class="u-close" @click="showMenu"><span class="el-icon-close"></span></div>
        <nav  class="menu">
            <a>
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text">风</div>
                <div class="icon iconfont icondafenglanseyujing"></div>
            </a>
             <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','spot')">站点</div>
                <div class="icon iconfont icondingwei active"></div>
             </a>
             <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','spot')">EC</div>
                <div class="icon u-en">E</div>
             </a>
             <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','spot')">NCEP</div>
                <div class="icon u-en">N</div>
             </a>
             <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                 <div class="menu-text" @click="updateModeLayer('wind','spot')">云图</div>
                 <div class="icon iconfont iconweixing1 size14"></div>
             </a>
            <a>
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text noselect notap">雾</div>
                <div class="icon iconfont iconwu1"></div>
            </a>
            <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','spot')">站点</div>
                <div class="icon iconfont icondangqian"></div>
            </a>
            <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">能见度</div>
                <div class="icon iconfont iconkejian size12"></div>
            </a>
            <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">相对湿度</div>
                <div class="icon iconfont iconxiangduishidu"></div>
            </a>
            <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">气温</div>
                <div class="icon iconfont iconqiwen"></div>
            </a>
            <a class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">云图</div>
                <div class="icon iconfont iconicon-test"></div>
            </a>
            <a>
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text noselect notap">强对流</div>
                <div class="icon iconfont iconqiangduiliu size19"></div>
            </a>
            <a  class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">雷达</div>
                <div class="icon iconfont iconweixing2"></div>
            </a>
            <a  class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">闪电</div>
                <div class="icon iconfont iconshandian"></div>
            </a>
            <a  class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">卫星</div>
                <div class="icon iconfont iconweixing7"></div>
            </a>
            <a  class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">站点</div>
                <div class="icon iconfont icondingwei2"></div>
            </a>
            <a  class="paddingLeft30">
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text" @click="updateModeLayer('wind','isoline')">模式</div>
                <div class="icon iconfont iconshuju"></div>
            </a>
            <a>
                <div class="icon iconfont iconswitch-on"></div>
                <div class="menu-text noselect notap">台风</div>
                <div class="icon iconfont icontaifeng"></div>
            </a>
        </nav>
    </div>
    </transition>
    <div class="u-base-map">
        <p @click="updateMapLayer('gaodeLayer')">高德</p>
        <p @click="updateMapLayer('googleLayer')">卫星</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RightNav',
    data(){
        return {
            menuShow:false,
        }
    },
    methods: {
      updateModeLayer: function (factor, style) {
        this.bus.$emit("event.updateModeLayer", {
          factor: factor,
          style: style
        });
      },
      updateMapLayer: function (name) {
        this.bus.$emit("event.updateMapLayer", {
          name: name,
        });
      },
      showMenu(){
        this.menuShow = !this.menuShow
      },
    }
  }
</script>
<style>
  .u-nav > div {
    z-index: 10;
  }
  .u-logo {
    right: 50px;
    margin-top: 10px;
    position: absolute;
  }
  .u-logo .icon{
    margin-right: 4px;
  }
  .u-logo button,
  .u-logo button:active,
  .u-logo button:hover,
  .u-logo button:focus {
    background-color: rgba(48, 74, 101, .8);
    color: #fff;
    border: none;
    font-size: 14px;
  }
  #overlay,
  #menu{
    right: 10px;
    margin-top: 68px;
    background-color: rgba(48, 74, 101, .8);
    color: #e6eeff;
    position: absolute;
    border-radius: 4px;
    width: 25px;
    margin-bottom: 25px;
    padding: 10px 0;
  }
  #overlay.overlayShow{
    right: 180px;
  }
  #overlay a {
    padding: 0;
    margin: .15em 0;
    color: #fff3e1;
    cursor: pointer;
    position: relative;
    display: block;
    list-style: none;
  }
  #overlay a .icon {
    height: 25px;
    width: 25px;
    text-align: center;
    line-height: 25px;
    padding-top: 1px;
  }
  #overlay a .menu-text {
    height: 22px;
    position: absolute;
    text-shadow: 0 0 4px black;
    line-height: 1.4;
    padding-left: 11px;
    padding-right: 11px;
    margin-top: 1.5px;
    right: 22px;
    top: 0;
    border-radius: 1.2em;
    vertical-align: middle;
    width: 100px;
    text-align: right;
  }
  .u-base-map {
    margin-top: 556px;
    padding: 4px;
    cursor: pointer;
    right: 10px;
    background-color: rgba(48, 74, 101, .8);
    color: #e6eeff;
    position: absolute;
    border-radius: 4px;
  }
a .icon.u-en {
    font-weight: 700;
    font-size: 16px;
}
.size14{
    font-size: 14px;
}
.icon.size12{
    font-size: 12px;
}
.icon.size19{
    font-size: 19px;
    font-weight: 700;
}
#overlay .icon:hover,
#overlay .icon.active{
    background-color:#2875F9;
    color: #fff;
}
#menu{
    right: 10px;
    width: 140px;
    padding: 10px;
    color: #F3F4F6;
}
#menu .icon{
    color: #b0c2e9 ;
    cursor: pointer;
}
#menu .u-close span{
    font-size: 22px;
    color: #fff;
    position: absolute;
    right: 3px;
}
#menu a{
    display: block;
    clear: both;
}
#menu .paddingLeft30{
    padding-left: 30px;
}
#menu a div{
    float: left;
    margin-top: 7px;
}
#menu .menu-text{
    margin: 4px 10px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>