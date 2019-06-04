package cn.webyun.mmspweb;

import cn.webyun.mmspweb.model.LonLat;
import cn.webyun.mmspweb.service.SiteServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MmspWebApplicationTests {
@Resource
    SiteServiceImpl siteService;


    @Test
    public void contextLoads() {
        LonLat lonLat = new LonLat();
        lonLat.setLatmax(22f);
        lonLat.setLatmin(21f);
        lonLat.setLonmax(109f);
        lonLat.setLonmin(108f);
        //List<String> select = siteService.select(lonLat);
        //System.out.println(select);
    }

}
