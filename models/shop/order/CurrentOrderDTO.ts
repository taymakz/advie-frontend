import {Variant} from "~/models/shop/product/ProductDetailDTO";


export interface CurrentOrderDTO {
    id: number;
    items: CurrentOrderItemDTO[];
    total_price: number;

}

export interface CurrentOrderItemDTO {
    id: number;
    order_id: number;
    product_id: number;
    product_url: string;
    product_title_ir: string;
    product_title_en: string;
    product_image: string;
    variant: Variant;
    count: number;
    total_price: number;
}