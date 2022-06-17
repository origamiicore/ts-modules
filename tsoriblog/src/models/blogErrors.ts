import { RouteResponse } from "origamits";

export default class BlogErrors
{
    static postNotFound:RouteResponse=RouteResponse.failed({},'post not found','blog001')
}