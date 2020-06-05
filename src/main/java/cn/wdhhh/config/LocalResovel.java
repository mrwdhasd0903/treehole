package cn.wdhhh.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

/**
 * 手动触发转换国际化语言
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/22 20:19
 */
@Configuration
public class LocalResovel implements LocaleResolver {
    //自定义区域解析方式
    public Locale resolveLocale(HttpServletRequest httpServletRequest) {
        //获取页面手动切换传递的语言参数1
        String l = httpServletRequest.getParameter("l");
        //获取请求头自动传递的语言参数
        String header = httpServletRequest.getHeader("Accept-Language");
        Locale locale = null;
        //如果手动切换参数不为空,就根据手动参数语言进行切换,否则默认根据请求头信息切换
        if (!StringUtils.isEmpty(l)) {
            String[] split = l.split("_");
            locale = new Locale(split[0], split[1]);
        } else {
            String[] splits = header.split(",");
            String[] split = splits[0].split("-");
            locale = new Locale(split[0], split[1]);
        }
        return locale;
    }

    public void setLocale(HttpServletRequest httpServletRequest, @Nullable HttpServletResponse httpServletResponse, @Nullable Locale locale) {

    }

    @Bean
    public LocaleResolver localeResolver() {
        return new LocalResovel();
    }
}
