package com.bangez.txhistory.transaction.domain;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "transactions")
public class TxHistoryModel {
    @Id
    private String txId;
    private String txType; //거래 완료 수수료, 포인트 결제
    private String txDate;
    private String txAmount;
    private String txStatus;
    private String txPropertyType; //거래 매물 유형(현재 아파트만)

}
