package com.bangez.api.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.datetime.DateFormatter;

@Configuration
public class ServerConfig {

    @Bean
    public String datePattern(){
        return "yyyy-MM-dd'T'HH:mm:ss.XXX";
    }

    @Bean
    public DateFormatter defaultDateFormatter(){
        //리턴에 (객체)인스턴스 들어감 => 팩토리 패턴
        return new DateFormatter(datePattern());
    }


}
