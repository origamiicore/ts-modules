import {RouteResponse} from 'origamicore' 
import TemplateModel from '../models/templateModel';
export default interface DriverBase
{
    sendMessage(template:TemplateModel,data:any):Promise<RouteResponse>;
}