export default class NotifConfig
{
    context:string;
    template:string;
    expire:number;
    public constructor(
        
        fields?: {
            context:string;
            template:string;
            expire:number;
        }) { 
        if (fields) Object.assign(this, fields); 
    }
}