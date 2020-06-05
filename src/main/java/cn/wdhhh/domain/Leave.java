package cn.wdhhh.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 21:16
 */
@Entity
@Table(name = "t_leave")
public class Leave {
    @Id
    @GeneratedValue
    private Long id;
    private String content;
    private String imglist;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImglist() {
        return imglist;
    }

    public void setImglist(String imglist) {
        this.imglist = imglist;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Leave{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", imglist='" + imglist + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
