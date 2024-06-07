package com.bangez.api.product.service;

import com.bangez.api.order.model.OrderDTO;
import com.bangez.api.product.model.ProductDTO;
import com.bangez.api.product.model.ProductModel;

import java.util.List;

public interface ProductService {
    List<ProductDTO> findAll();
    List<ProductDTO> getAllPossibleProducts();
    List<ProductDTO> findAllSold(Long id);

    default ProductDTO entityToDto(ProductModel entity){
        return ProductDTO.builder()
                .productId(entity.getProductId())
                .title(entity.getTitle())
                .amount(entity.getAmount())
                .buildingType(entity.getBuildingType())
                .contractType(entity.getContractType())
                .address(entity.getAddress())
                .sold(entity.isSold())
//                .order(entity.getOrder().getOrderId())
                .build();
    }

    default ProductModel dtoToEntity(ProductDTO dto) {
        return ProductModel.builder()
                .productId(dto.getProductId())
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .buildingType(dto.getBuildingType())
                .contractType(dto.getContractType())
                .address(dto.getAddress())
                .sold(dto.isSold())
                .build();
    }

}
