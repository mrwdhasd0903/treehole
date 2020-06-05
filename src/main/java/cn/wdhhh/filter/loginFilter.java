package cn.wdhhh.filter;

import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 王达浩
 * @version 1.0
 * @date 2020/5/23 20:41
 */
@WebFilter(filterName = "LoginFilter ")
@Configuration
public class loginFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse rep = (HttpServletResponse) servletResponse;
        if (req.getSession().getAttribute("user") == null
                && (req.getServletPath().equals("/uploadfile")
                || req.getServletPath().equals("/leave"))) {
            rep.setStatus(302);
        } else {
            filterChain.doFilter(req, rep);
        }
    }

    @Override
    public void destroy() {

    }
}
