package com.bangez.api.order.model;


import com.bangez.api.product.model.ProductModel;
import com.bangez.api.user.model.UserModel;
import jakarta.persistence.*;
import lombok.*;


@Entity(name = "orders")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String merchantUid;
    private String orderDate;


    @OneToOne
    @JoinColumn(name = "product_id")
    private ProductModel product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;
}
