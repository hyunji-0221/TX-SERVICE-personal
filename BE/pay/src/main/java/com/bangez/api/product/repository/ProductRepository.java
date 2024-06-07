package com.bangez.api.product.repository;

import com.bangez.api.product.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,Long>, ProductDslRepository{
    @Transactional
    @Modifying
    @Query("update products p set p.sold = true where p.productId = :productId")
    void modifySoldById(@Param("productId") Long productId);
}
