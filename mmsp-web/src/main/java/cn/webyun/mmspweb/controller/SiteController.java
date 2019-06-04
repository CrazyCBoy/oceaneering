package cn.webyun.mmspweb.controller;


import cn.webyun.mmspweb.entity.sys.SiteBaseInfo;
import cn.webyun.mmspweb.model.LonLat;
import cn.webyun.mmspweb.model.ResponseBase;
import cn.webyun.mmspweb.service.SiteServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/site")
public class SiteController {
    @Resource
    SiteServiceImpl siteService;

    @RequestMapping ("/station")
    public ResponseEntity<?> LonLatRange(@Valid LonLat lonLat) {
        List<SiteBaseInfo> station = siteService.select(lonLat);
        if(station.equals(null)){
         return ResponseEntity.ok(new ResponseBase(false, "这个经纬度没有站点"));
         }
        return ResponseEntity.ok(new ResponseBase(true, "查询成功",station));
}}