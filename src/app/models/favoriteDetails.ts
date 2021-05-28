import { ProductDetail } from "./productDetail";

export interface FavoriteDetails{
    userId:number
    userFullName:string
    productDetailDtos:ProductDetail[]
}