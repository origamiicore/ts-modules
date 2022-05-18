export default class RedisConfig
{
    port:number=6379;
    host:string='localhost';
    db:number=0;
    secExpireTime:number=0;
    public constructor(
        
        fields?: {
            host?: string,  
            db?: number, 
            port?: number, 
        }) { 
        if (fields) Object.assign(this, fields);
    }
}