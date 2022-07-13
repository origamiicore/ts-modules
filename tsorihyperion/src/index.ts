import { ModuleConfig, OriInjectable, OriService, PackageIndex } from "origamicore";
import HyperionConfig from "./models/hyperionConfig";
import TransactionModel from "./models/transactionModel";
import ActionController from "./services/actionController";

@OriInjectable({domain:'hyperion'})
class TsoriHyperion implements PackageIndex
{
    name: string;
    config:HyperionConfig;
    async jsonConfig(config: HyperionConfig): Promise<void> {
        this.config=config;
    }
    async start(): Promise<void> {
        
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    @OriService({isInternal:true,})
    async runaction( transaction:TransactionModel,privateKey:string):Promise<any>
    {
        return await ActionController.run(this.config.nodeUrl,privateKey,transaction);
    }
    
}
export default TsoriHyperion;