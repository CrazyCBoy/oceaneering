<template>
    <div id="typhoon-pop">
        <div id="typhoonWindow">
            <div  class="typhoonWindowCon u-popup" v-if="typhoonWindowShow">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
                  <el-radio-button :label="false">当前台风列表</el-radio-button>
                  <el-radio-button :label="true">历史台风列表</el-radio-button>
                </el-radio-group>
                <div v-if="!isCollapse">
                      <el-button type="primary" size="mini">上一年</el-button>
                      <span>台风年 ：</span>
                      <el-select v-model="value" placeholder="请选择">
                          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                      </el-select>
                      <el-button type="primary" size="mini">下一年</el-button>
                      <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%">
                        <el-table-column type="selection" width="30">
                        </el-table-column>
                          <el-table-column prop="id" label="编号" width="100">
                        </el-table-column>
                        </el-table-column>
                          <el-table-column prop="name" label="台风名称" width="100">
                        </el-table-column>
                        <el-table-column prop="date" label="起编时间" show-overflow-tooltip>
                        </el-table-column>
                      </el-table>
                </div>
                <div v-else>
                 <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%">
                       <el-table-column type="selection" width="30">
                       </el-table-column>
                         <el-table-column prop="id" label="编号" width="100">
                       </el-table-column>
                       </el-table-column>
                         <el-table-column prop="name" label="台风名称" width="100">
                       </el-table-column>
                       <el-table-column prop="date" label="起编时间" show-overflow-tooltip>
                       </el-table-column>
                 </el-table>
                </div>
            </div>
            <div class="pop-zoom" v-if="typhoonWindowShow" @click="showTyphoonWindow"><i class='el-icon-arrow-left'></i></div>
            <div class="pop-zoom pop-hide"  v-else @click="showTyphoonWindow">台风列表<i class='el-icon-arrow-right'></i></div>
        </div>
        <div id="typhoonMassage">
            <div class="pop-zoom" v-if="typhoonMassageShow" @click="showTyphoonMassage"><i class='el-icon-arrow-left'></i></div>
            <div class="pop-zoom pop-hide" v-else @click="showTyphoonMassage">台风图例<i class='el-icon-arrow-right'></i></div>
            <div class="typhoonMassageCon" v-if="typhoonMassageShow">
                <el-select v-model="massageValue" placeholder="请选择">
                    <el-option v-for="item in massageData" :key="item.massageValue" :label="item.label" :value="item.massageValue">
                    </el-option>
                </el-select>
                <table>
                    <tr class='tropicalDepression' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg green'></div></td>
                        <td><label>热带低压</label></td>
                    </tr>
                    <tr class='lowPressure' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg green'></div></td>
                        <td><label>低压</label></td>
                    </tr>
                    <tr class='deepLowPressure' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg blue'></div></td>
                        <td><label>深低压</label></td>
                    </tr>
                    <tr class='tropicalStorm' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg blue'></div></td>
                        <td><label>热带风暴</label></td>
                    </tr>
                    <tr class='severeTropicalStorm' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg yellow'></div></td>
                        <td><label>强热带风暴</label></td>
                    </tr>
                    <tr class='cycloneStorm' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg yellow'></div></td>
                        <td><label>气旋风暴</label></td>
                    </tr>
                    <tr class='cycloneStormStrong' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg orange'></div></td>
                        <td><label>强气旋风暴</label></td>
                    </tr>
                    <tr class='verySevereCyclonicStorm' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg purple'></div></td>
                        <td><label>特强气旋风暴</label></td>
                    </tr>
                    <tr class='superCyclonicStorm' v-if="massageValue == '选项1'">
                        <td></td>
                        <td><div class='typhoonImg red'></div></td>
                        <td><label>超级气旋风暴</label></td>
                    </tr>
                    <tr class='typhoon' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg orange'></div></td>
                        <td><label>台风</label></td>
                    </tr>
                    <tr class='violentTyphoon' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg purple'></div></td>
                        <td><label>强台风</label></td>
                    </tr>
                    <tr class='superStrongTyphoon' v-if="massageValue == '选项2'">
                        <td></td>
                        <td><div class='typhoonImg red'></div></td>
                        <td><label>超强台风</label></td>
                    </tr>
                    <tr class='j-route'>
                        <td></td>
                        <td><div style="width:99%;height:0px;border:1px solid #FFF600" ></div></td>
                        <td><label>台风已经过路径</label></td>
                    </tr>
                    <tr class='j-route'>
                        <td></td>
                        <td><div style="width:99%;height:0px;border:1px dashed #2CE331" ></div></td>
                        <td><label>cimiss台风预报路径</label></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'typhoon',
    data() {
        return {
          isCollapse: false,
          options:[{ value: '选项1',label: '2015' },{value: '选项2',label: '2016'},{value: '选项3',label: '2017'},
            {value: '选项4',label: '2018'}, {value: '选项5',label: '2019'}],
          value: '选项5',
          tableData: [{id: '1902',name: 'WUTIP',date: '2016-05-03'}, {id: '1903',name: 'PABUK',date: '2016-05-02'}],
          massageData:[{massageValue: '选项1',label: '北印度洋热带气旋'},{massageValue: '选项2',label: '西北太平洋和南海热带气旋'}],
          massageValue: '选项2',
          typhoonWindowShow:'true',
          typhoonMassageShow:'true',
        };
    },
    methods:{
        showTyphoonMassage(){
            this.typhoonMassageShow = !this.typhoonMassageShow;
        },
        showTyphoonWindow(){
            this.typhoonWindowShow = !this.typhoonWindowShow;
        }
    }
}
</script>
<style>
#typhoon-pop{
    width: 400px;
    padding: 40px;
}

#typhoonWindow .el-select{
    width: 30%;
    margin-bottom: 10px;
}
#typhoon-pop .el-input__inner{
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
}
#typhoon-pop .el-input__icon{
    line-height: 30px;
}
#typhoon-pop .el-table th,
#typhoon-pop .el-table td{
    padding: 6px 0;
}
#typhoonMassage {
    margin-top: 300px;
    width: 230px;
}
.typhoonImg {
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-position: center;
}
#typhoonMassage td {
    padding-left: 3px;
    padding-right: 3px;
    text-align: left;
}
#typhoonMassage .el-input__inner{
    background-color: #5292FE;
    color: #fff;
}
#typhoonMassage .typhoonImg.green {
    background-image: url('../../../assets/img/typhoon/green.png');
}
#typhoonMassage .typhoonImg.blue {
    background-image: url('../../../assets/img/typhoon/blue.png');
}
#typhoonMassage .typhoonImg.yellow {
    background-image: url('../../../assets/img/typhoon/yellow.png');
}
#typhoonMassage .typhoonImg.orange {
    background-image: url('../../../assets/img/typhoon/orange.png');
}
#typhoonMassage .typhoonImg.purple {
    background-image: url('../../../assets/img/typhoon/purple.png');
}
#typhoonMassage .typhoonImg.red {
    background-image: url('../../../assets/img/typhoon/red.png');
}
#typhoonWindow,
#typhoonMassage{
    box-shadow: 0 0 2px #ccc;
    position: absolute;
}
.typhoonMassageCon,
.typhoonWindowCon{
    padding: 10px;
}
#typhoonMassage .pop-hide{
    margin-top: 180px;
}
</style>