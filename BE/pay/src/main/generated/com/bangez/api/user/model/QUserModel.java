package com.bangez.api.user.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserModel is a Querydsl query type for UserModel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserModel extends EntityPathBase<UserModel> {

    private static final long serialVersionUID = -988586466L;

    public static final QUserModel userModel = new QUserModel("userModel");

    public final StringPath email = createString("email");

    public final StringPath name = createString("name");

    public final ListPath<com.bangez.api.order.model.OrderModel, com.bangez.api.order.model.QOrderModel> orders = this.<com.bangez.api.order.model.OrderModel, com.bangez.api.order.model.QOrderModel>createList("orders", com.bangez.api.order.model.OrderModel.class, com.bangez.api.order.model.QOrderModel.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath token = createString("token");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userName = createString("userName");

    public QUserModel(String variable) {
        super(UserModel.class, forVariable(variable));
    }

    public QUserModel(Path<? extends UserModel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserModel(PathMetadata metadata) {
        super(UserModel.class, metadata);
    }

}

