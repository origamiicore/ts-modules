import { ModuleConfig, PackageIndex } from "origamicore";
import TsoriHyperion from "..";

export default class HyperionConfig extends ModuleConfig
{
    nodeUrl:string;
    constructor(fields?:{
        nodeUrl?:string;
    })
    {
        super();
        if(fields)Object.assign(this,fields);
    }
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsoriHyperion();
        await instance.jsonConfig(this);
        return instance;
    }
    
}