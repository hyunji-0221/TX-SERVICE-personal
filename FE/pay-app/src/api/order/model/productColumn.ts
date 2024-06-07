import { OrderModel } from './order';

export interface OrderColumn {
    orderId?: number,

    merchantUid?: string,
    orderDate?: string,
    
    product?: number,
    user?: number

    // json?: OrderModel
}
