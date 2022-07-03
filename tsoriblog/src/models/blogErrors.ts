import { RouteResponse } from "origamicore";

export default class BlogErrors
{
    static postNotFound:RouteResponse=RouteResponse.failed({},'post not found','blog001')
}