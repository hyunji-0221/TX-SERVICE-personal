package com.bangez.api.product.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductModel is a Querydsl query type for ProductModel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductModel extends EntityPathBase<ProductModel> {

    private static final long serialVersionUID = 578080870L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProductModel productModel = new QProductModel("productModel");

    public final StringPath address = createString("address");

    public final StringPath amount = createString("amount");

    public final StringPath buildingType = createString("buildingType");

    public final StringPath contractType = createString("contractType");

    public final com.bangez.api.order.model.QOrderModel order;

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final BooleanPath sold = createBoolean("sold");

    public final StringPath title = createString("title");

    public QProductModel(String variable) {
        this(ProductModel.class, forVariable(variable), INITS);
    }

    public QProductModel(Path<? extends ProductModel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProductModel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProductModel(PathMetadata metadata, PathInits inits) {
        this(ProductModel.class, metadata, inits);
    }

    public QProductModel(Class<? extends ProductModel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.order = inits.isInitialized("order") ? new com.bangez.api.order.model.QOrderModel(forProperty("order"), inits.get("order")) : null;
    }

}

