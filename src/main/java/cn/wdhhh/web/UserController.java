package cn.wdhhh.web;

import cn.wdhhh.domain.Leave;
import cn.wdhhh.domain.User;
import cn.wdhhh.service.LeaveService;
import cn.wdhhh.service.UserService;
import cn.wdhhh.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 18:20
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private LeaveService leaveService;

    /**
     * 跳转登陆
     *
     * @param session
     * @return
     */
    @GetMapping("/login")
    public String toLogin(HttpSession session) {
        //清空session缓存
        session.setAttribute("user", null);
        return "login";
    }

    @GetMapping("/upload")
    public String toUpload() {
        return "upload";
    }

    /**
     * 空路径重定向
     *
     * @return
     */
    @GetMapping("/")
    public String redirectIdnex() {
        return "redirect:/index";
    }

    /**
     * 跳转首页
     *
     * @return
     */
    @GetMapping("/index")
    public String toIndex(@PageableDefault(size = 6, sort = {"createTime"}, direction = Sort.Direction.DESC) Pageable pageable, Model model) {
        HashMap<Integer, String[]> imgMap = new HashMap<>();
        Page<Leave> page = leaveService.listLeave(pageable);
        Integer i = 0;
        for (Leave leave : page.getContent()) {
            String[] imglist = leave.getImglist().split(",");
            imgMap.put(i, imglist);
            i++;
        }
        model.addAttribute("page", page);
        model.addAttribute("imgMap", imgMap);
        return "index";
    }

    /**
     * 跳转注册
     *
     * @return
     */
    @GetMapping("/register")
    public String toRegister() {
        return "register";
    }

    /**
     * 登陆
     *
     * @param username
     * @param password
     * @param session
     * @param attributes
     * @return
     */
    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        HttpSession session,
                        RedirectAttributes attributes) {
        User user = userService.checkUser(username, password);
        if (user != null) {
            user.setPassword(null);
            session.setAttribute("user", user);
            return "redirect:/index";
        } else {
            attributes.addFlashAttribute("message", "用户名和密码错误");
            return "redirect:/login";
        }
    }

    /**
     * 注册
     *
     * @param nickname
     * @param username
     * @param password
     * @param session
     * @param attributes
     * @return
     */
    @PostMapping("/register")
    public String register(@RequestParam String nickname,
                           @RequestParam String username,
                           @RequestParam String password,
                           HttpSession session,
                           RedirectAttributes attributes) {
        User user = new User();
        if (nickname.equals("") || username.equals("") || password.equals("")) {
            attributes.addFlashAttribute("message", "信息不完整");
            return "redirect:/register";
        }
        if (userService.getUserByUsername(username) == null) {
            user.setNickname(nickname);
            user.setPassword(MD5Utils.code(password));
            user.setUsername(username);
            user = userService.saveUser(user);
            session.setAttribute("user", user);
            return "redirect:/index";
        } else {
            attributes.addFlashAttribute("message", "账号已存在");
            return "redirect:/register";
        }
    }

    /**
     * 修改昵称
     *
     * @param nickname
     * @param session
     * @return
     */
    @PostMapping("/updatenickname")
    public String updateNickname(@RequestParam String nickname, HttpSession session) {
        if (!nickname.equals("")) {
            User user = (User) session.getAttribute("user");
            user = userService.getUserByUsername(user.getUsername());
            user.setNickname(nickname);
            //更新session
            user = userService.updateUser(user.getId(), user);
            session.setAttribute("user", user);
        }
        return "redirect:/index";
    }

    /**
     * 修改头像
     *
     * @param avatar
     * @param session
     * @return
     */
    @PostMapping("/updateAvatar")
    public String updateAvatar(@RequestParam String avatar, HttpSession session) {
        if (!avatar.equals("")) {
            User user = (User) session.getAttribute("user");
            user = userService.getUserByUsername(user.getUsername());
            user.setAvatar(avatar);
            //更新session
            user = userService.updateUser(user.getId(), user);
            session.setAttribute("user", user);
        }

        return "redirect:/index";
    }


    /**
     * 提交留言
     *
     * @param content
     * @param imglist
     * @param session
     * @return
     */
    @PostMapping("/leave")
    @ResponseBody
    public int leave(@RequestParam String content, @RequestParam String imglist, HttpSession session) {
        User user = (User) session.getAttribute("user");
        //未登录
        if (user == null) {
            return -1;
        }
        //空
        if ((content + imglist).equals("")) {
            return 0;
        }
        Leave leave = new Leave();
        leave.setContent(content);
        leave.setImglist(imglist);
        leave.setUser(user);
        leave = leaveService.saveLeave(leave);
        //失败
        if (leave == null) {
            return 0;
        }
        return 1;
    }

    @PostMapping("/delleave")
    @ResponseBody
    public int delleave(@RequestParam Long id) {
        leaveService.deleteLeave(id);
        return 1;
    }
}
