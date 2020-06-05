package cn.wdhhh.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 21:10
 */
@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String nickname;
    private String username;
    private String password;
    private String avatar;

    @OneToMany(mappedBy = "user")
    private List<Leave> Leaves = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<Leave> getLeaves() {
        return Leaves;
    }

    public void setLeaves(List<Leave> leaves) {
        Leaves = leaves;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", avatar='" + avatar + '\'' +
                ", Leaves=" + Leaves +
                '}';
    }
}
