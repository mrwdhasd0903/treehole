package cn.wdhhh.service;

import cn.wdhhh.dao.LeaveRepository;
import cn.wdhhh.domain.Leave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 23:45
 */
@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Override
    public Page<Leave> listLeave(Pageable pageable) {
        return leaveRepository.findAll(pageable);
    }

    @Transactional
    @Override
    public Leave saveLeave(Leave leave) {
        leave.setCreateTime(new Date());
        return leaveRepository.save(leave);
    }

    @Transactional
    @Override
    public void deleteLeave(Long id) {
        leaveRepository.deleteById(id);
    }
}
