import { ModuleConfig, PackageIndex } from 'origamits'; 
import TsOriAuth from '..';
import NotifConfig from './notifConfig';
export default class AuthConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance =new TsOriAuth();
        await instance.jsonConfig(this);
        return instance;
    }
    dbContext:string;
    redisContext:string;
    useCaptcha:boolean;
    verifyMobile:NotifConfig;
    verifyEmail:NotifConfig; 
    public constructor(
        
        fields?: {
            id?: string 
            dbContext?: string
            redisContext?: string
            verifyMobile?:NotifConfig;
            verifyEmail?:NotifConfig;
            useCaptcha?:boolean 
        }) {
        super(fields);
        if (fields) Object.assign(this, fields); 
    }
}