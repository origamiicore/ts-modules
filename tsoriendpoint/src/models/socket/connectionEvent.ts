export default class ConnectionEvent
{
    domain:string;
    service:string;
    type:number;
    public constructor(
        
        fields: {
            domain:string;
            service:string;
            type:ConnectionEventType;
        }) { 
        if (fields) Object.assign(this, fields);
    }
}
export enum ConnectionEventType
{
    Open=1,
    Close=2
}