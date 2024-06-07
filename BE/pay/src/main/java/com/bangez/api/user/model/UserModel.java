package com.bangez.api.user.model;

import com.bangez.api.order.model.OrderModel;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.List;

@Entity(name = "users")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserModel {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userName;
    private String email;
    private String password;
    private String name;

    private String token;

    @OneToMany(mappedBy = "user")
    private List<OrderModel> orders;
}
