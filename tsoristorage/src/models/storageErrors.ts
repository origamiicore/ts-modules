import { RouteResponse } from "origamicore";

export default class StorageErrors
{
    static fileNotFound:RouteResponse = RouteResponse.failed({},'file not found','storage001')
}