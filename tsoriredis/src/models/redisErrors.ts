import { RouteResponse } from "origamits";

export default class RedisError
{
    static contextNotFound:RouteResponse=RouteResponse.failed(null,'Context Not Found','redis001');
}