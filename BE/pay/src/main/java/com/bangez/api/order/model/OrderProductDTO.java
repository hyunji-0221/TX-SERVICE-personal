package com.bangez.api.order.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductDTO {
    private Long orderId;
    private String merchantUid;
    private String orderDate;
    private Long productId;
    private String title;
    private String amount;
    private String buildingType;
    private String contractType;
    private String address;
    private String userName;
    private String name;

    public void setMerchantUid(String merchantUid) {
        this.merchantUid = merchantUid.startsWith("mid_") ? merchantUid.substring(4) : merchantUid;
    }

}
