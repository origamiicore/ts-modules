export default class UpdateResponse
{
    acknowledged:boolean;
    modifiedCount:number;
    matchedCount:number;
    constructor(data:any=null)
    {
        if(data==null)return
        Object.assign(this,data);
    }
} 