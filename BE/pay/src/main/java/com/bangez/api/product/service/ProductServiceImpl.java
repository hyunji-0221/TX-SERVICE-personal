package com.bangez.api.product.service;

import com.bangez.api.product.model.ProductDTO;
import com.bangez.api.product.model.ProductModel;
import com.bangez.api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository repository;
    @Override
    public List<ProductDTO> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public List<ProductDTO> getAllPossibleProducts() {
        log.info("서비스 : {}",repository.getAllPossibleProducts());
        return repository.getAllPossibleProducts();
    }


    @Override
    public List<ProductDTO> findAllSold(Long id) {
        return repository.findAll().stream().filter(i->i.getProductId().equals(id))
                .map(i->entityToDto(i))
                .map(i->ProductDTO.builder()
                        .productId(i.getProductId())
                        .title(i.getTitle())
                        .amount(i.getAmount())
                        .buildingType(i.getBuildingType())
                        .contractType(i.getContractType())
                        .address(i.getAddress())
                        .sold(i.isSold())
                        .build()
                ).toList();
    }
}
