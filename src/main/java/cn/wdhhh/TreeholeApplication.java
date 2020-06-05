package cn.wdhhh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@ServletComponentScan
@SpringBootApplication
//public class TreeholeApplication extends SpringBootServletInitializer {
public class TreeholeApplication{

//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//        return builder.sources(TreeholeApplication.class);
//    }

    public static void main(String[] args) {
        SpringApplication.run(TreeholeApplication.class, args);
    }

}
