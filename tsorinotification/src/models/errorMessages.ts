import {RouteResponse,ResponseErrorModel} from 'origamits'
export default class ErrorMessages
{
    static unknownError(data:any):RouteResponse
    {
        return new RouteResponse({error:new ResponseErrorModel({
            message:'unknown',
            data
        })})
    }
}