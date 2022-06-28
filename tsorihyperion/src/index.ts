import { ModuleConfig, OriInjectable, PackageIndex } from "origamits";
import HyperionConfig from "./models/hyperionConfig";

@OriInjectable({domain:'hyperion'})
class TsoriHyperion implements PackageIndex
{
    name: string;
    async jsonConfig(moduleConfig: HyperionConfig): Promise<void> {
        
    }
    async start(): Promise<void> {
        
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
export default TsoriHyperion;