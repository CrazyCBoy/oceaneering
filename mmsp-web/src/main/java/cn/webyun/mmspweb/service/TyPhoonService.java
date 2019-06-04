package cn.webyun.mmspweb.service;

import cn.webyun.mmspweb.entity.sys.Typhoon;

import java.util.List;

public interface TyPhoonService {
    /*根据年份查询台风列表*/
    List<Typhoon> typhoonByStartingTime(String year);
    /*根据国际编号/台风编号查询台风详情数据*/
    List<Typhoon> typhoonInfoByCode(String code,String numInati);
}
