package com.bangez.api.product.repository;

import com.bangez.api.product.model.ProductDTO;
import com.bangez.api.product.model.ProductModel;
import com.bangez.api.product.model.QProductModel;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
public class ProductDslRepositoryImpl implements ProductDslRepository {
    private final JPAQueryFactory jpaqueryFactory;
    QProductModel products = QProductModel.productModel;

    @Override
    public List<ProductDTO> getAllPossibleProducts() {
        log.info("dsl 리포지토리 들어옴");
        List<ProductDTO> list = jpaqueryFactory.selectFrom(products)
                .where(products.sold.isFalse())
                .fetch()
                .stream().map(i->entityToDto(i)).toList();
        log.info("dsl 리포지토리 : {}", list);
        return list;
    }

//    @Transactional
//    @Override
//    public void modifySoldById(Long productId) {
//        jpaqueryFactory.update(products)
//                .set(products.sold, true)
//                .where(products.productId.eq(productId))
//                .execute();
//    }

    public ProductDTO entityToDto(ProductModel entity){
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
}
