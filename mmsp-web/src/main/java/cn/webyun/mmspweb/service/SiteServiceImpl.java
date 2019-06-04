package cn.webyun.mmspweb.service;

import cn.webyun.mmspweb.dao.SiteMapper;
import cn.webyun.mmspweb.entity.sys.SiteBaseInfo;
import cn.webyun.mmspweb.model.LonLat;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SiteServiceImpl {
    @Resource
    SiteMapper siteMapper;

    // 根据经纬度查找范围
    public List<SiteBaseInfo> select(LonLat lonLat) {
        List<SiteBaseInfo> station = siteMapper.selectSite(lonLat.getLonmin(), lonLat.getLonmax(), lonLat.getLatmin(), lonLat.getLatmax());
    return station;
    }
}
