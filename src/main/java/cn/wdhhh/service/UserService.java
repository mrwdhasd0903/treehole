package cn.wdhhh.service;

import cn.wdhhh.domain.User;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 23:39
 */

public interface UserService {
    User checkUser(String username, String password);

    User getUserByUsername(String username);

    User saveUser(User user);

    User updateUser(Long id, User user);
}
