package cn.webyun.mmspweb;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("cn.webyun.mmspweb")
@SpringBootApplication
public class MmspWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MmspWebApplication.class, args);
    }

}
