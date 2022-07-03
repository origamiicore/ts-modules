import { RouteResponse } from "origamicore";
import { ResponseErrorModel } from "origamicore";

export default class OriMongoError
{
    static connectionNotFound=new RouteResponse({error:new ResponseErrorModel({code:'mongo001',message:'connection not found'})});
    static unknownError(exp:any):RouteResponse
    {
        console.log('----->',exp);
        
        return new RouteResponse({error:new ResponseErrorModel({code:'mongo001',message:'unknown',data:exp})});

    }
}