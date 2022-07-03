import {RouteResponse,ResponseErrorModel} from 'origamicore'
export default class ErrorMessages
{
    static unknownError(data:any):RouteResponse
    {
        return new RouteResponse({error:new ResponseErrorModel({
            message:'unknown',
            data
        })})
    }
    static contextNotFound=RouteResponse.failed(null,'Context Not Found','notification001')
    static templateNotFound=RouteResponse.failed(null,'Template Not Found','notification002')
}