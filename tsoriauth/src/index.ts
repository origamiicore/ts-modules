import {ModuleConfig, SessionInput, OriService, PackageIndex, ResponseDataModel, RouteResponse,DataInput} from 'origamits' 
import AuthConfig from './models/authConfig';
export default class TsOriAuth implements PackageIndex
{
    name: string='auth';
    config:AuthConfig;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> {
        this.config=moduleConfig as AuthConfig;
        return;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    @OriService({isPublic:true,})
    async login(
        @DataInput({isRequired:true}) username:string,
        @DataInput({isRequired:true}) password:string):Promise<RouteResponse>
    {  

        return
    }
    @OriService({isPublic:false,})
    async isLogin(@SessionInput session):Promise<RouteResponse>
    {  

        return new RouteResponse({response:new ResponseDataModel({data:session})})
    }
    @OriService({isPublic:false,})
    async register(@SessionInput session):Promise<RouteResponse>
    {  

        return new RouteResponse({response:new ResponseDataModel({data:session})})
    }
}