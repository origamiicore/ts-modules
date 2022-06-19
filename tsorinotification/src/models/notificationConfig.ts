import { ModuleConfig, PackageIndex } from 'origamits'; 
import TsOriNotification from '..';
import BaseDriverConfig from './baseDriverConfig'; 
export default class NotificationConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsOriNotification();
        await instance.jsonConfig(this);
        return instance
    } 
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
    }
}