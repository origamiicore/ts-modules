import { RouteResponse } from "origamits";

export default class ErrorData
{
    static wrongData:RouteResponse=RouteResponse.failed({},'wrong data','captcha001') 
}