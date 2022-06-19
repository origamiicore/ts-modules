import {OriInjectable,PackageIndex,DataInput, OriService, SessionInput,ModuleConfig, RouteResponse} from "origamits"; 
import { CaptchaRouter } from "..";

@OriInjectable({domain:'test'})
export default class TestService implements PackageIndex
{
    name: string='test';
    async jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
    }
    async start(): Promise<void> { 
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    } 
    
    @OriService({isPublic:true})
    async testService(id:string):Promise<RouteResponse>
    {     
        return  RouteResponse.success(await CaptchaRouter.Validate(id))
    }
}


export  class TestConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance =new TestService();
        await instance.jsonConfig(this);
        return instance;
    } 
    public constructor(
        
        fields?: {
            id?: string,
            name?: string,   
        }) {

        super(fields); 
        if (fields) Object.assign(this, fields);
    }
}