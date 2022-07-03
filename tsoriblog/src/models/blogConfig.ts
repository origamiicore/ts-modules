import { ModuleConfig, PackageIndex } from "origamicore";
import TsOriBlog from "..";
 
export default class BlogConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance =new TsOriBlog();
        await instance.jsonConfig(this);
        return instance;
    }  
    dbContext:string;
    useOriStorage:boolean;
    public constructor(
        
        fields?: {
            id?: string 
            dbContext:string;
            useOriStorage:boolean;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields); 
    }
}