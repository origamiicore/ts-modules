import { ModuleConfig } from 'origamits'; 
import NotifConfig from './notifConfig';
export default class AuthConfig extends ModuleConfig
{
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
        this.name='auth'
    }
}