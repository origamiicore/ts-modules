import { RouteResponse } from "origamicore";

export default class ErrorData
{
    static wrongData:RouteResponse=RouteResponse.failed({},'wrong data','captcha001') 
}