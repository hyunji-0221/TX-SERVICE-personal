package com.bangez.api.order.service;

import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.model.OrderModel;
import com.bangez.api.order.model.OrderProductDTO;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    String saveOrder(String userId, IamportResponse<Payment> payment);

    List<OrderProductDTO> getOrderByUserId(String token);

    default OrderDTO entityToDTO(OrderModel entity) {
        return OrderDTO.builder()
                .orderId(entity.getOrderId())
                .merchantUid(entity.getMerchantUid())
                .orderDate(entity.getOrderDate())
                .product(entity.getProduct().getProductId())
                .user(entity.getUser().getUserId())
                .build();
    }

}
