import { ModuleConfig } from 'origamits'; 
import BaseDriverConfig from './baseDriverConfig'; 
export default class NotificationConfig extends ModuleConfig
{ 
    dbContext:string;
    drivers:BaseDriverConfig[]
    public constructor(
        fields?: {
            id?: string  
            drivers:BaseDriverConfig[]
            dbContext:string
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        if(!fields?.id)
        {
            this.id=Math.random().toString();
        }
        this.name='mongo';
    }
}