package com.bangez.api.order.service;

import com.bangez.api.common.component.security.JwtProvider;
import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.model.OrderModel;
import com.bangez.api.order.model.OrderProductDTO;
import com.bangez.api.order.repository.OrderRepository;
import com.bangez.api.product.repository.ProductRepository;
import com.bangez.api.user.repository.UserRepository;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    private final JwtProvider jwtProvider;

    LocalDateTime now = LocalDateTime.now();
    String formatNow = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd/HH:mm:ss"));
    @Override
    public String saveOrder(String token, IamportResponse<Payment> payment) {
        Long productId = Long.valueOf(payment.getResponse().getCustomData());
        Long id = jwtProvider.getPayload(token.substring(7)).get("userId",Long.class);
        OrderModel orders = OrderModel.builder()
                .merchantUid(payment.getResponse().getMerchantUid())
                .orderDate(formatNow)
                .user(userRepo.findById(id).orElseThrow(null))
                .product(productRepo.findById(productId).orElseThrow(null))
                .build();
        orderRepo.save(orders);
        productRepo.modifySoldById(productId);

        return "success";
    }

    @Override
    public List<OrderProductDTO> getOrderByUserId(String token) {
        Long id = jwtProvider.getPayload(token.substring(7)).get("userId",Long.class);
        return orderRepo.getOrderByUserId(id);
    }


}
