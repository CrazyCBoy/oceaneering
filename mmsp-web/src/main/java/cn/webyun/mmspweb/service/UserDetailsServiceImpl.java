package cn.webyun.mmspweb.service;

import cn.webyun.mmspweb.entity.sys.JwtUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

/**
 * @Comment:用户服务
 * @Author:gaos@webyun.cn
 * @Date:2019/5/29
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Set<SimpleGrantedAuthority> role_user = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
        String password = bCryptPasswordEncoder.encode("admin");
        JwtUser jwtUser = new JwtUser(1, "admin", password, role_user);
        return jwtUser;
    }
}
