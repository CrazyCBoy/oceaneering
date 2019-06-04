<template>
    <div id="warning-pop">
        <div id="warningMassage">
            <div class="pop-zoom" v-if="warningMassageShow" @click="showWarningMassage"><i class='el-icon-arrow-left'></i></div>
            <div class="pop-zoom pop-hide" v-else  @click="showWarningMassage">最新告警<i class='el-icon-arrow-right'></i></div>
            <div class="warning-con" v-if="warningMassageShow">
                <el-row>
                  <el-col :span="24"><i class="el-icon-bell"></i><span> 最新海上警告：</span></el-col>
                </el-row>
                <el-row v-for="item in warningMassageDate">
                  <el-col :span="12"><div class="bg-img wind-img"><span>{{item.wind}}条</span></div></el-col>
                  <el-col :span="12"><div class="bg-img fog-img"><span>{{item.fog}}条</span></div></el-col>
                </el-row>
            </div>
        </div>
        <div id="warningWindow">
            <div class="pop-zoom" v-if="warningWindowShow" @click="showWarningWindow"><i class='el-icon-arrow-left'></i></div>
            <div class="pop-zoom pop-hide" v-else  @click="showWarningWindow">最新告警<i class='el-icon-arrow-right'></i></div>
            <div  class="warningWindowCon u-popup"  v-if="warningWindowShow">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
                  <el-radio-button :label="false">全部</el-radio-button>
                  <el-radio-button :label="true">告警</el-radio-button>
                </el-radio-group>
                <div v-if="!isCollapse">
                    <el-input class="u-search" size="small" clearable placeholder="输入站点或站号查询" suffix-icon="el-icon-search" v-model="inputVal"></el-input>
                    <template>
                      <el-table :data="allWarningDate" style="width: 100%" border :row-class-name="tableRowClassName">
                        <el-table-column prop="site" label="站点">
                        </el-table-column>
                        <el-table-column prop="id" label="站号">
                        </el-table-column>
                        <el-table-column prop="visibility" sortable width="110" label="能见度km">
                        </el-table-column>
                        <el-table-column prop="grade"  width="64" label="等级">
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
                <div v-else>
                    <el-input class="u-search" size="small" clearable placeholder="输入站点或站号查询" suffix-icon="el-icon-search" v-model="inputVal"></el-input>
                    <template>
                      <el-table :data="warningDate" style="width: 100%" border :row-class-name="tableRowClassName">
                        <el-table-column prop="site" label="站点">
                        </el-table-column>
                        <el-table-column prop="id" label="站号">
                        </el-table-column>
                        <el-table-column prop="visibility" sortable width="110" label="能见度km">
                        </el-table-column>
                        <el-table-column prop="grade"  width="64" label="等级">
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'warning',
    data() {
        return {
            warningMassageShow:"true",
            warningWindowShow:"true",
            warningMassageDate:[{'wind':'10','fog':'5'}],
            isCollapse:false,
            inputVal: '',
            allWarningDate:[{'site':'马迹山','id':'26901','visibility':'20','grade':'特浓雾','warning':'warning'},
                {'site':'马迹山','id':'26901','visibility':'20','grade':'轻雾'}],
            warningDate:[{'site':'马迹山','id':'26901','visibility':'20','grade':'特浓雾','warning':'warning'},
                {'site':'马迹山','id':'26901','visibility':'20','grade':'轻雾','warning':'warning'}],
        };
    },
    methods:{
        showWarningMassage(){
            this.warningMassageShow = !this.warningMassageShow;
        },
        showWarningWindow(){
            this.warningWindowShow = !this.warningWindowShow;
        },
        tableRowClassName({row, rowIndex}) {
                if (row.warning === "warning") {
                  return 'warning-row';
                }
                return '';
              }
    }
}
</script>
<style>
#warningMassage{
    box-shadow: 0 0 2px #ccc;
    margin-bottom: 20px;
    margin: 10px;
    width: 200px;
    position: absolute;
}
.warning-con{
    text-align: center;
    padding: 10px;
    color: #AFAFAF;
}
.bg-img{
    width: 80px;
    height: 80px;
    background: no-repeat;
    margin-top: 12px;
    margin-left: 5px;
    position: relative;
}
.wind-img{
    background-image: url('../../../assets/img/warning/wind.png');
}
.fog-img{
    background-image: url('../../../assets/img/warning/fog.png');
}
.bg-img span{
    position: absolute;
    top: 40px;
    left: 30px;
    color: #fff;
}
#warningWindow {
    box-shadow: 0 0 2px #ccc;
    margin-bottom: 20px;
    margin: 10px;
    width: 360px;
    position: absolute;
    top: 200px;
}
.u-search{
    margin-bottom: 10px;
}
.warningWindowCon{
    padding: 10px;
}
#warningWindow .el-table th,
#warningWindow .el-table td{
    padding: 6px 0;
    text-align: center;
}
.el-table .warning-row {
    background: #FDE8E7;
}
</style>