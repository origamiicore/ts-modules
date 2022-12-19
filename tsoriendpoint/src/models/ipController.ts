export class ServiceLimit
{
    domain:string;
    service:string;
    count:number;
    delayPerSec:number;
    public constructor(
        
        fields: {
            domain?:string;
            service?:string;
            count:number;
            delayPerSec:number;
        }) { 
        if (fields) Object.assign(this, fields);
    }
}
export default class IpController
{
    limits:ServiceLimit[]=[];
    public constructor(
        
        fields: {
            limits:ServiceLimit[]
        }) { 
        if (fields) Object.assign(this, fields);
    }
}