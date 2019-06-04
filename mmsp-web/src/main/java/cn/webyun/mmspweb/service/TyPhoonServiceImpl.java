package cn.webyun.mmspweb.service;

import cn.webyun.mmspweb.entity.sys.Typhoon;
import cn.webyun.mmspweb.entity.sys.TyphoonCriteria;
import cn.webyun.mmspweb.mapper.TyphoonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TyPhoonServiceImpl implements TyPhoonService{
    @Autowired
    TyphoonMapper typhoonMapper;
    @Override
    public List<Typhoon> typhoonByStartingTime(String startingTime) {
        TyphoonCriteria criteria = new TyphoonCriteria();
        criteria.createCriteria().andStartingtimeEqualTo(startingTime);
        List<Typhoon> list = typhoonMapper.selectByExample(criteria);
        return list;
    }
    @Override
    public List<Typhoon> typhoonInfoByCode(String code, String numInati) {
        TyphoonCriteria criteria = new TyphoonCriteria();
        criteria.createCriteria().andNumInatiEqualTo(numInati).andTyphoonCodeEqualTo(code);
        List<Typhoon> typhoonInfoList = typhoonMapper.selectByExample(criteria);
        return typhoonInfoList;
    }
}
