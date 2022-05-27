export default class EmailConfig
{
    host:string; 
    secure:boolean;
    port:number;
    username:string;
    password:string;
    fromEmail:string;
    public constructor(
        
        fields?: {
            host?:string;
            port?:number;
            secure?:boolean;
            username?:string;
            password?:string;
            fromEmail?:string;
        }) { 
        if (fields) Object.assign(this, fields);
    }
}