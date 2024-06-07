package com.bangez.api.order.controller;


import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.model.OrderProductDTO;
import com.bangez.api.order.service.OrderService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    private final OrderService service;

    @GetMapping("/list")
    public ResponseEntity<List<OrderProductDTO>> getList(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(service.getOrderByUserId(token));
    }

}
