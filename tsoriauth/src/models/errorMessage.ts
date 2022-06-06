import { RouteResponse } from "origamits";

export default class ErrorMessage
{
    static captchaValidate:RouteResponse=RouteResponse.failed({},'invalid captcha code','auth001')
    static wrongCode:RouteResponse=RouteResponse.failed({},'invalid code','auth002')
    static existPhoneNumber:RouteResponse=RouteResponse.failed({},'phone number exist','auth003')
}