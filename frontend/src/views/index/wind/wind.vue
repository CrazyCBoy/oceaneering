<template>
    <div id="wind-pop" >
        <div id="windMassage">
            <el-popover placement="top" title="站点信息" width="270" trigger="hover">
                <span class="decorative-line"></span>
                <div class="wind-con" v-for="item in windInfoData">
                    <el-row>
                      <el-col :span="12"><span>经度：</span><span>{{item.longitude}}</span></el-col>
                      <el-col :span="12"><span>纬度：</span><span>{{item.latitude}}</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12"><span>风速：</span><span>{{item.speed}}</span></el-col>
                      <el-col :span="12"><span>风向：</span><span>{{item.direction}}</span></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><span>预报时间：</span><span>{{item.time}}</span></el-col>
                    </el-row>
                </div>
                <el-button slot="reference" @click="visible = !visible">大风点信息</el-button>
            </el-popover>
        </div>
        <div id="windWindow">
            <el-popover placement="top" width="360" trigger="click">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;" class="windWindowCon u-popup" >
                    <el-radio-button label="site">站点信息</el-radio-button>
                    <el-radio-button label="gale">大风变化趋势</el-radio-button>
                    <el-radio-button label="contrast">海上大风对比</el-radio-button>
                </el-radio-group>
                <div v-if="isCollapse =='site'">
                    <div class="wind-con" v-for="item in siteData">
                        <el-row>
                          <el-col :span="12"><span>站点名：</span><span>{{item.name}}</span></el-col>
                          <el-col :span="12"><span>站号：</span><span>{{item.id}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>经度：</span><span>{{item.longitude}}</span></el-col>
                          <el-col :span="12"><span>纬度：</span><span>{{item.latitude}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>能见度：</span><span>{{item.visibility}}</span></el-col>
                          <el-col :span="12"><span>等级：</span><span>{{item.grade}}</span></el-col>
                        </el-row>
                    </div>
                </div>
                <div v-if="isCollapse =='gale'">
                    <div class="wind-con" v-for="item in siteData">
                        <el-row>
                          <el-col :span="12"><span>站点名：</span><span>{{item.name}}</span></el-col>
                          <el-col :span="12"><span>站号：</span><span>{{item.id}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>经度：</span><span>{{item.longitude}}</span></el-col>
                          <el-col :span="12"><span>纬度：</span><span>{{item.latitude}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>能见度：</span><span>{{item.visibility}}</span></el-col>
                          <el-col :span="12"><span>等级：</span><span>{{item.grade}}</span></el-col>
                        </el-row>
                    </div>
                </div>
                <div v-if="isCollapse =='contrast'">
                    <div class="wind-con" v-for="item in siteData">
                        <el-row>
                          <el-col :span="12"><span>站点名：</span><span>{{item.name}}</span></el-col>
                          <el-col :span="12"><span>站号：</span><span>{{item.id}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>经度：</span><span>{{item.longitude}}</span></el-col>
                          <el-col :span="12"><span>纬度：</span><span>{{item.latitude}}</span></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12"><span>能见度：</span><span>{{item.visibility}}</span></el-col>
                          <el-col :span="12"><span>等级：</span><span>{{item.grade}}</span></el-col>
                        </el-row>
                    </div>
                </div>
                <el-button slot="reference" @click="visible = !visible">站点信息</el-button>
            </el-popover>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        windInfoData:[{'longitude':'119.82','latitude':'34.99','speed':'20m/s','direction':'305','time':'2019-05-08 09时'}],
        isCollapse:"site",
        siteData:[{'name':'马迹山','id':'26901','longitude':'119.82','latitude':'34.99','visibility':'8km','grade':'大雾'}]
      };
    },
  };
</script>
<style>
#windMassage{ padding-top: 300px; }
.wind-con .el-row{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #EDEDED;
    text-align: left;
    padding-left: 10px;
}
.el-popover__title {
    margin-left: 10px;
}
.decorative-line{
    height: 23px;
    border-left: 4px solid #2875F9;
    position: absolute;
    top: 10px;
}
#windWindow{
    margin-top: 20px;
}
</style>