package com.bangez.api.order.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrderModel is a Querydsl query type for OrderModel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrderModel extends EntityPathBase<OrderModel> {

    private static final long serialVersionUID = -168688152L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrderModel orderModel = new QOrderModel("orderModel");

    public final StringPath merchantUid = createString("merchantUid");

    public final StringPath orderDate = createString("orderDate");

    public final NumberPath<Long> orderId = createNumber("orderId", Long.class);

    public final com.bangez.api.product.model.QProductModel product;

    public final com.bangez.api.user.model.QUserModel user;

    public QOrderModel(String variable) {
        this(OrderModel.class, forVariable(variable), INITS);
    }

    public QOrderModel(Path<? extends OrderModel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrderModel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrderModel(PathMetadata metadata, PathInits inits) {
        this(OrderModel.class, metadata, inits);
    }

    public QOrderModel(Class<? extends OrderModel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new com.bangez.api.product.model.QProductModel(forProperty("product"), inits.get("product")) : null;
        this.user = inits.isInitialized("user") ? new com.bangez.api.user.model.QUserModel(forProperty("user")) : null;
    }

}

