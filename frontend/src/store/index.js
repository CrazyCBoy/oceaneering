import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

import {
  TEST_URL,
  STATION_URL,
  TYPHOON_URL
} from "./constants";

const service = Axios.create({
  baseURL: "http://localhost:8090",
  timeout: 100000000000
})

export default new Vuex.Store({
  state:{
    featureInfo:{},
    testData:"",
    stationList:[],
    typhoonData:{},
  },
  getters:{
    getTestInfo: (state) =>{
      return state.testData
    },
    getStationInfo: (state) => {
      return state.stationList
    },
    getTyphoonInfo: (state) => (id) => {
      return 'getTyphoonInfo-----------站点编号'+id;
    },
  },
  mutations: {
    setTestData (state,test) {
        state.testData=test;
      },
    setStationData (state,lonlat) {
      //改变state中的StationData数据为
      state.StationData=lonlat;
    },
    setTyphoonData (state,list) {
      state.StationData=list;
    }
    },
  actions:{
    async getTestInfoData(context,dat) {
      let response=await service.get(TEST_URL,{params:{A:dat}});
      //响应成功将返回的数据传入，提交到mutations
        context.commit('setTestData',response.data);
    },
    async getStationInfoData(context,lonLat) {
      //let response=await service.get(STATION_URL,{params:{lonLat}});
      let lonlatJson = {
        lonmin: lonLat[0],
        latmin: lonLat[1],
        lonmax: lonLat[2],
        latmax: lonLat[3]
      };
      let response=await service.get(STATION_URL,{params: lonlatJson});
      console.log("getStationInfoData--------response.data"+response.data);
      context.commit('setStationData',response.data);
    },
    async getTyphoonInfoData(context,dat) {
      let response=await service.get(TYPHOON_URL,{params:{A:dat}});
      if(response.data.success==true){
        context.commit('setFeatureData',response.data);
      }
    },
  },
})
