package com.bangez.txhistory.transaction.repository;

import com.example.demo.transaction.domain.TxHistoryModel;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TxRepository extends ReactiveMongoRepository<TxHistoryModel, String> {
}
