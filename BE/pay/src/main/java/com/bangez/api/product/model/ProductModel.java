package com.bangez.api.product.model;

import com.bangez.api.order.model.OrderModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "products")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String title; //상품명
    private String amount;
    private String buildingType; //빌딩 타입
    private String contractType; //계약 타입
    private String address;
    private boolean sold ; //결제 유무 (default:false / 결제가된 매물은 다시 결제될 수 없기에 true로 설정한다.)


    @OneToOne(mappedBy = "product")
    private OrderModel order;

}
