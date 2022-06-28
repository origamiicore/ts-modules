import { ModuleConfig, PackageIndex } from "origamits";
import TsoriHyperion from "..";

export default class HyperionConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsoriHyperion();
        await instance.jsonConfig(this);
        return instance;
    }
    
}