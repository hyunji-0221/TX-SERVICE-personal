package com.bangez.api.user.controller;

import com.bangez.api.common.component.MessengerVO;
import com.bangez.api.user.model.UserDTO;
import com.bangez.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth") //공통된 부분
@Slf4j
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "dd")})
//token이 있는 로그인을 구현 / userController는 token이 없음
public class AuthController {

    private final UserService service;

    @PostMapping("/login")
    public ResponseEntity<MessengerVO> login(@RequestBody UserDTO param) {
        return ResponseEntity.ok(service.login(param));
    }

    @GetMapping("/exists-username")
    public ResponseEntity<MessengerVO> existsUsername(@RequestParam("username") String username){
        return ResponseEntity.ok(service.existsUsername(username));
    }

    @PostMapping(path = "/register")
    public ResponseEntity<MessengerVO> save(@RequestBody UserDTO dto) {
        log.info("save from UserController : "+dto);
        return ResponseEntity.ok(service.register(dto));
    }

}
