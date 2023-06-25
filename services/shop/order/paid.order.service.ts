import {ApiResponse} from "~/models/api/ApiResponse";
import {OrderDetailDTO, OrderFilterResult} from "~/models/shop/order/PaidOrderDTO";

export const GetPaidOrderList=(page:number,take:number):Promise<ApiResponse<OrderFilterResult>> =>{
    return FetchApi('/order/list/',{
        method:"GET",
        query:{
            page,
            take
        }
    })
}
export const GetPaidOrderDetail=(transaction:number,):Promise<ApiResponse<OrderDetailDTO>> =>{
    return FetchApi('/order/'+transaction,{
        method:"GET",

    })
}