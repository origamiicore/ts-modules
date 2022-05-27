import BaseDriverConfig from "./baseDriverConfig";

export default class EmailConfig extends BaseDriverConfig
{
    host:string; 
    secure:boolean;
    port:number;
    username:string;
    password:string;
    fromEmail:string;
    public constructor(
        
        fields: {
            context:string;
            host?:string;
            port?:number;
            secure?:boolean;
            username?:string;
            password?:string;
            fromEmail?:string;
        }) { 
        super(fields.context);    
        if (fields) Object.assign(this, fields);
    }
}