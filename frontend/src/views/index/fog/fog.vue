<template>
    <div id="fogInfo" >
        <el-popover placement="top" title="站点信息" width="270" trigger="hover">
            <span class="decorative-line"></span>
            <div class="fog-con" v-for="item in fogInfoData">
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
            <el-button slot="reference" @click="visible = !visible">雾站点信息</el-button>
        </el-popover>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        fogInfoData:[{'name':'马迹山','id':'26901','longitude':'119.82','latitude':'34.99','visibility':'8km','grade':'大雾'}]
      };
    },
  };
</script>
<style>
#fogInfo{ padding-top: 300px; }
.fog-con .el-row{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #EDEDED;
    text-align: center;
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
</style>