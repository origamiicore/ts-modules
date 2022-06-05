import { RouteResponse } from "origamits";

export default interface IDriver
{
    getCaptcha():Promise<RouteResponse>;
    setCaptcha(data:any):Promise<RouteResponse>;
    validate(data:any):Promise<RouteResponse>;
}