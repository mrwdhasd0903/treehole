package cn.wdhhh.service;

import cn.wdhhh.dao.UserRepository;
import cn.wdhhh.domain.User;
import cn.wdhhh.exception.NotFoundException;
import cn.wdhhh.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 23:47
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User checkUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, MD5Utils.code(password));
        return user;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User u = userRepository.findById(id).get();
        if (u == null) {
            throw new NotFoundException("用户不存在");
        }
        return userRepository.save(user);
    }
}
