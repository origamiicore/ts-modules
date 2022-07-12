export default class RedisConnection
{
    port:number;
    host:string;
    db:number;
    public constructor(
        fields?: {  
            port?:number 
            host?:string
            db?:number
        }) { 
        if(!fields)fields={}
        if(!fields.port)fields.port=6379;
        if(!fields.db)fields.db=0;
        if(!fields.host)fields.host='localhost';
        if (fields) Object.assign(this, fields);
    }
}