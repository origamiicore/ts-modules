import ApiRequest from "../models/api/apiRequest";
import ApiResponse from "../models/api/apiResponse";
import {WebService} from "tsoribase"
export default class ApiController
{
    static async getTable<T>(server:string,req:ApiRequest,cls: { new(data:any): T }):Promise<ApiResponse<T>>
    {
        var data =await WebService.post(server+'/v1/chain/get_table_rows',req,{},null);
        return new ApiResponse(data,cls);
    }
}