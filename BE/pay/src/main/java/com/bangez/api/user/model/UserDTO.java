package com.bangez.api.user.model;

import com.bangez.api.order.model.OrderModel;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;

    private String userName;
    private String email;
    private String password;
    private String name;

    private String token;

    private Long orders;
}
