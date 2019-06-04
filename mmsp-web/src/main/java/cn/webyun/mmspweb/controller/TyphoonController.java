package cn.webyun.mmspweb.controller;

/*
*台风数据查询接口
1、根据年份查询台风列表
过滤要求：去重
条件：年份
返回字段：台风数据绝对时间、起编时间、台风编号、国际编号、台风名称、台风数据类型
2、根据国际编号/台风编号查询台风详情数据
参考问海querytyphoonByCode接口，*/

import cn.webyun.mmspweb.entity.sys.Typhoon;
import cn.webyun.mmspweb.model.ResponseBase;
import cn.webyun.mmspweb.service.TyPhoonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/typhoon")
public class TyphoonController {
    @Autowired
    TyPhoonServiceImpl tyPhoonServiceImpl;

/*
* 根据起波时间查询台风列表
过滤要求：去重
条件：年份
返回字段：台风数据绝对时间、起编时间、台风编号、国际编号、台风名称、台风数据类型*/
    @RequestMapping("/{startingTime}")
    public ResponseEntity<?>  queryTyphoonByStartingTime(@PathVariable String startingTime) {
        List<Typhoon> typhoonInfo= tyPhoonServiceImpl.typhoonByStartingTime(startingTime);

        if(typhoonInfo.isEmpty()){
            return ResponseEntity.ok(new ResponseBase(false, "数据不存在"));
        }
        return ResponseEntity.ok(new ResponseBase(true, "根据起波时间查询台风数据",typhoonInfo));
    }
    @RequestMapping("/{code}/{numInati}")
    public ResponseEntity<?> querytyInfoByCode(@PathVariable String code, @PathVariable String numInati){
       List<Typhoon> typhoonInfo= tyPhoonServiceImpl.typhoonInfoByCode(code,numInati);
       if(typhoonInfo.isEmpty()){
           return ResponseEntity.ok(new ResponseBase(false, "数据不存在"));
       }
        return ResponseEntity.ok(new ResponseBase(true, "根据编号查询台风数据",typhoonInfo));
    }
}
