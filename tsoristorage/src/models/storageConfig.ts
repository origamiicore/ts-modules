import { ModuleConfig } from "origamits"; 

export default class StorageConfig extends ModuleConfig
{ 
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
        this.name='storage';
    }

}