import { ProductModel } from './product';

export interface ProductColumn {
    id?: number,
    title?: string,
    amount?: string,
    buildingType?: string,
    contractType?: string,
    address?: string,
    sold?: boolean,

    order?: number,

    json?: ProductModel
}
