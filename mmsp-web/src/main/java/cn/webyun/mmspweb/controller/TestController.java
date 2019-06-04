package cn.webyun.mmspweb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Comment:测试用的，之后会去掉
 * @Author:gaos@webyun.cn
 * @Date:2019/5/29
 */
@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("")
    public String hello() {
        return "hello! human";
    }
}
