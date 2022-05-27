export default class InsertResponse
{
    acknowledged:boolean;
    insertedId:any;
    constructor(data:any=null)
    {
        if(data==null)return
        Object.assign(this,data);
    }
}