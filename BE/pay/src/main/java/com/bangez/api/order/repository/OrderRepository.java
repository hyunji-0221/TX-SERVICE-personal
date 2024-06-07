package com.bangez.api.order.repository;

import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.order.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel,Long>, OrderDslRepository {


}
