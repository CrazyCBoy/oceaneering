<template>
   <div class="u-nav">
        <div class="u-logo">
            <router-link to="/">
                <el-button size="mini" icon="el-icon-s-unfold">登录</el-button>
            </router-link>
        </div>
        <div class="u-right-nav">
            <nav id="overlay">
                <a>
                    <div class="u-icon el-icon-wind-power"></div>
                    <div class="menu-text">风</div>
                </a>
                <a>
                    <div class="u-icon el-icon-s-operation"></div>
                    <div class="menu-text">雾</div>
                </a>
                <a>
                    <div class="u-icon el-icon-light-rain"></div>
                    <div class="menu-text">风云四</div>
                </a>
                <a>
                    <div class="u-icon el-icon-lightning"></div>
                    <div class="menu-text">强对流</div>
                </a>
                <a>
                    <div class="u-icon el-icon-heavy-rain"></div>
                    <div class="menu-text">风场</div>
                </a>
                <a>
                    <div class="u-icon el-icon-sunset"></div>
                    <div class="menu-text">台风</div>
                </a>
                <a>
                    <div class="u-icon el-icon-arrow-left"></div>
                    <div class="menu-text">更多图层</div>
                </a>
            </nav>
        </div>
        <div class="u-base-map">
          <p>高德</p>
          <p>卫星</p>
        </div>
   </div>
</template>
<script>
export default{
    name: 'RightNav'
}
</script>
<style>
.u-logo{
    right: 50px;
    margin-top: 10px;
    position: absolute;
}
.u-logo button,
.u-logo button:active,
.u-logo button:hover,
.u-logo button:focus{
    background-color: rgba(48,74,101,.8);
    color: #fff;
    border: none;
}
.u-right-nav,
.u-base-map{
    right: 10px;
    margin-top: 50px;
    background-color: rgba(48,74,101,.8);
    color: #fff;
    position: absolute;
    border-radius: 4px;
    width: 25px;
    margin-bottom: 25px;
    padding: 10px 0;
}
.u-right-nav a{
    padding: 0;
    margin: .15em 0;
    color: #fff3e1;
    cursor: pointer;
    position: relative;
    display: block;
    list-style: none;
}
#overlay a .u-icon {
    height: 25px;
    width: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 16px;
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
#overlay .u-icon:hover{
    background-color:#2875F9;
    color: #fff;
}
.u-base-map{
    margin-top: 300px;
    padding: 4px;
    cursor: pointer;
}
</style>