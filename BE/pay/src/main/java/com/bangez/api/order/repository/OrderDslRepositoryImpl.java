package com.bangez.api.order.repository;

import com.bangez.api.order.model.OrderProductDTO;
import com.bangez.api.order.model.QOrderModel;
import com.bangez.api.product.model.QProductModel;
import com.bangez.api.user.model.QUserModel;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
public class OrderDslRepositoryImpl implements OrderDslRepository {

    private final JPAQueryFactory jpaqueryFactory;

    QOrderModel orders = QOrderModel.orderModel;
    QProductModel products = QProductModel.productModel;
    QUserModel users = QUserModel.userModel;

    @Override
    public List<OrderProductDTO> getOrderByUserId(Long id) {
         List<OrderProductDTO> orderList = jpaqueryFactory.select(
                        Projections.constructor(OrderProductDTO.class,
                                orders.orderId,
                                orders.merchantUid,
                                orders.orderDate,
                                products.productId,
                                products.title,
                                products.amount,
                                products.buildingType,
                                products.contractType,
                                products.address,
                                users.userName,
                                users.name))
                .from(orders)
                .innerJoin(orders.product, products)
                .innerJoin(orders.user, users)
                .where(users.userId.eq(id))
                .fetch();
         for(OrderProductDTO order : orderList){
             order.setMerchantUid(order.getMerchantUid());
         }
        return orderList;
    }



}
