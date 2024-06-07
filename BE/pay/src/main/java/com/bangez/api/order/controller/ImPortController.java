package com.bangez.api.order.controller;


import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.service.OrderService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/payment")
public class ImPortController {
    private final OrderService service;
    //    private final RefundService refundService;
    private IamportClient iamportClient;

    @Value("${imp.api.key}")
    private String apiKey;

    @Value("${imp.api.secretKey}")
    private String secretKey;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, secretKey);
    }

    @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> validateIamport(@RequestHeader("Authorization") String accessToken,
                                                    @PathVariable("imp_uid") String imp_uid) {
        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);

        service.saveOrder(accessToken, payment);

        return payment;
    }
}
