package cn.wdhhh.utils;

import java.io.File;
import java.util.Calendar;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/23 14:01
 */
public class Filing {
    /**
     * 创建目录
     *
     * @param path
     */
    public static void mkdir(String path) {
        File fd = null;
        try {
            fd = new File(path);
            if (!fd.exists()) {
                fd.mkdirs();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            fd = null;
        }
    }

    /**
     * 根据后缀获取目录
     *
     * @param suffix
     * @return
     */
    public static String getDirectory(String suffix) {
        String Directory;
        suffix = suffix.toLowerCase();
        if (".jpg|.jpeg|.png|.gif".indexOf(suffix) != -1) {
            Directory = "img";//图片
        } else if (".md|.pdf|.txt|.doc|.docx|.xls|.xlsx|.ppt|.pptx|".indexOf(suffix) != -1) {
            Directory = "doc";//文档
        } else if (".mp3|.cd|.wave|.aiff|.mpeg".indexOf(suffix) != -1) {
            Directory = "audio";//音频
        } else if (".mp4".indexOf(suffix) != -1) {
            Directory = "video";//视频
        } else {
            Directory = "other";//其他
        }
        return Directory;
    }

    /**
     * 根据系统时间生成路径
     *
     * @return
     */
    public static String getPath() {
        Calendar calendar = Calendar.getInstance();
        // 获取当前年
        int year = calendar.get(Calendar.YEAR);
        // 获取当前月
        int month = calendar.get(Calendar.MONTH) + 1;
        // 获取当前日
        int day = calendar.get(Calendar.DATE);
        String path = year + "/" + month + "/" + day;
        return path;
    }
}
