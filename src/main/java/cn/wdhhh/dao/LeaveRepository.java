package cn.wdhhh.dao;

import cn.wdhhh.domain.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 22:31
 */
public interface LeaveRepository extends JpaRepository<Leave, Long> {
}
