package com.bangez.api.product.repository;

import com.bangez.api.product.model.ProductDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDslRepository {

    public List<ProductDTO> getAllPossibleProducts();

//    void modifySoldById(Long productId);

}
