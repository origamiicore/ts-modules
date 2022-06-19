import { ModuleConfig, PackageIndex } from "origamits";
import TsoriCptcha from "..";
import SimpleDriverConfig from "./simpleDriverConfig";

 
export default class CaptchaConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsoriCptcha();
        await instance.jsonConfig(this);
        return instance;
    }  
    simpleDriver:SimpleDriverConfig;
    public constructor(
        
        fields?: {
            id?: string
            name?: string 
            simpleDriver:SimpleDriverConfig;
        }) {
        super(fields); 
        if (fields) Object.assign(this, fields);
    }
}