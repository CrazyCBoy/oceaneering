package cn.webyun.mmspweb.dao;

import cn.webyun.mmspweb.entity.sys.SiteBaseInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper

public interface SiteMapper {

    //根据经纬度范围查询站点列表

    @Select("select station_name stationName,lat,lon,station_id_c stationIdC,stations_id_d stationIdD,station_type stationType  from station_base where lon >= #{lonmin} and lon <= #{lonmax} and lat >= #{latmin} and lat <= #{latmax}")
    List<SiteBaseInfo> selectSite(float lonmin, float lonmax, float latmin, float latmax);




}
