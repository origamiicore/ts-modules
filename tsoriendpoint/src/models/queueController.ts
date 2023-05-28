export class QueueLimit
{
    domain:string;
    services:string[]; 
    delayPerSec:number;
    public constructor(
        
        fields: {
            domain:string;
            services:string[]; 
            delayPerSec:number;
        }) { 
        if (fields) Object.assign(this, fields);
    }
}
export default class QueueController
{
    limits:QueueLimit[]=[];
    public constructor(
        
        fields: {
            limits:QueueLimit[]
        }) { 
        if (fields) Object.assign(this, fields);
    }
}