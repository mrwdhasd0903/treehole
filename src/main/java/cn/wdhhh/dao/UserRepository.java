package cn.wdhhh.dao;

import cn.wdhhh.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 22:31
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);
}
