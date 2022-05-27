import { ModuleConfig } from 'origamits'; 
export default class AuthConfig extends ModuleConfig
{
    dbContext:string;
    useCaptcha:boolean;
    emailNotifyContext:string;
    smsNotifyContext:string;
    public constructor(
        
        fields?: {
            id?: string
            name?: string 
            dbContext?: string
            useCaptcha?:boolean
            emailNotifyContext?:string;
            smsNotifyContext?:string;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}