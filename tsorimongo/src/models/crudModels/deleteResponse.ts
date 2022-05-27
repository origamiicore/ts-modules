export default class DeleteResponse
{
    acknowledged:boolean;
    deletedCount:number;
    constructor(data:any=null)
    {
        if(data==null)return
        Object.assign(this,data);
    }
}