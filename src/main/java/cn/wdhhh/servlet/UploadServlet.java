package cn.wdhhh.servlet;


import cn.wdhhh.utils.Filing;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/23 14:13
 */
@Component
@WebServlet(name = "uploadfile", urlPatterns = "/uploadfile")
@MultipartConfig
public class UploadServlet extends HttpServlet {

    Filing filing = new Filing();

    public void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        //获取表单中为name的文件
        Part part = req.getPart("file");
        //获取文件名 form-data; name="file"; filename="qweqwe.jpg"
        String disposition = part.getHeader("Content-Disposition");
        //截取后缀 如果抛出异常则为空文件
        String suffix = null;
        try {
            suffix = disposition.substring(disposition.lastIndexOf("."), disposition.length() - 1);
        } catch (Exception e) {
            return;
        }
        //生成文件相对服务器路径 如:io+img+2020+03+31+
        String filepath = "/io/" + filing.getDirectory(suffix) + "/" + filing.getPath() + "/";
        //生成文件名 如 42364512.png
        String filename = System.currentTimeMillis() + suffix;
        // 生成服务器访问路径 如 D:-IdeaProjects-upload-src-main-webapp
        //String serverpath = req.getServletContext().getRealPath("");
        String serverpath = ResourceUtils.getURL("classpath:").getPath() + "/static";
        System.out.println(serverpath);
        //创建绝对目录
        filing.mkdir(serverpath + filepath);
        FileOutputStream fos = new FileOutputStream(serverpath + filepath + filename);
        byte[] bty = new byte[1024];
        //获取上传的 io流
        InputStream is = part.getInputStream();
        int length = 0;
        //写入文件
        while ((length = is.read(bty)) != -1) {
            fos.write(bty, 0, length);
        }
        //关闭io流
        fos.close();
        is.close();
        //返回路径给前端
        resp.getWriter().write("."+filepath + filename);
    }

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write("测试成功");
    }

}
