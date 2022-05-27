import { ModuleConfig } from 'origamits'; 
import BaseDriverConfig from './baseDriverConfig'; 
export default class NotificationConfig extends ModuleConfig
{ 
    dbContext:string;
    drivers:(BaseDriverConfig)[]
    public constructor(
        fields?: {
            id: string
            name: string  
            drivers:(BaseDriverConfig)[]
            dbContext:string
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}