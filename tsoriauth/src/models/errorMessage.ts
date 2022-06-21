import { RouteResponse } from "origamits";

export default class ErrorMessage
{
    static captchaValidate:RouteResponse=RouteResponse.failed({},'invalid captcha code','auth001')
    static wrongCode:RouteResponse=RouteResponse.failed({},'invalid code','auth002')
    static existPhoneNumber:RouteResponse=RouteResponse.failed({},'phone number exist','auth003')
    static wrongOldPassword:RouteResponse=RouteResponse.failed({},'wrong old password','auth004')
    static wrongUsername:RouteResponse=RouteResponse.failed({},'wrong username','auth005')
    static wrongPassword:RouteResponse=RouteResponse.failed({},'wrong password','auth006')
    static existUsername:RouteResponse=RouteResponse.failed({},'exist username','auth007')
    static wrongUserPass:RouteResponse=RouteResponse.failed({},'wrong username or password','auth007')
}