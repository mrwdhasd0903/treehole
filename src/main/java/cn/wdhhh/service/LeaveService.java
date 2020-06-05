package cn.wdhhh.service;

import cn.wdhhh.domain.Leave;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 23:39
 */
public interface LeaveService {
    Page<Leave> listLeave(Pageable pageable);

    Leave saveLeave(Leave leave);

    void deleteLeave(Long id);
}