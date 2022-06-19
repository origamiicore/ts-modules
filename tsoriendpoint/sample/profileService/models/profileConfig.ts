import { ModuleConfig, PackageIndex } from "origamits";
import ProfileService from "..";

export default class ProfileConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new ProfileService()
        await instance.jsonConfig(this);
        return instance;
    }
    readOnle:boolean;
    public constructor(
        
        fields?: {
            id?: string, 
            readOnley?:boolean  
        }) {

        super(fields);
        if (fields) Object.assign(this, fields);
    }
}