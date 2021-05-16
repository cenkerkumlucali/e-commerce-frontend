import { ResponseModel } from "./responseModel";

export interface NumberDataResponseModel<T> extends ResponseModel{
    data:number
}