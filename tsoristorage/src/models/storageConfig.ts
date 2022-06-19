import { ModuleConfig, PackageIndex } from "origamits"; 
import TsOriStorage from "..";

export default class StorageConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsOriStorage();
        await instance.jsonConfig(this);
        return instance;
    } 
    dbContext:string;
    redisContext:string;
    path:string;
    public constructor(
        fields: {
            id?: string ;
            redisContext:string;
            dbContext:string;
            path:string;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        if(!fields?.id)
        {
            this.id=Math.random().toString();
        } 
    }

}