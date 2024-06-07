package com.bangez.api.common.component.interceptor;

import com.bangez.api.common.component.security.JwtProvider;
import com.bangez.api.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.stream.Stream;



//interceptor인터페이스는 서블릿 컨테이너에 있음 -> 스프링에 만들었지만, 서블릿으로 자동으로 들어감
//스프링 컨테이너에 추가하기 위해 만듦
@Log4j2
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository repository;

    @Override //request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return Stream.of(request)
                .map(jwtProvider::extractTokenFromHeader)
                .filter(i->!i.equals("undefined")) //false가 되면 람다식이 끊어지기 때문에 true로...
                .peek(i -> log.info("1- 인터셉터 토큰 로그 Bearer 포함 : {}", i))
                .map(i->jwtProvider.getPayload(i).get("userId", Long.class))
                .peek(i->log.info("2- 인터셉터 사용자 id : {}", i))
                .map(repository::existsById)
                .findAny()
                .isPresent();
    }

    @Override// response
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override //exception
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
