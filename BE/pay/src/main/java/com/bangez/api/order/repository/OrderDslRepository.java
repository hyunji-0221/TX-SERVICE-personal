package com.bangez.api.order.repository;

import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.model.OrderProductDTO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDslRepository {

    List<OrderProductDTO> getOrderByUserId(Long id);

}
