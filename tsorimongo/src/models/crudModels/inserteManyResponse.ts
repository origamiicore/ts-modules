export default class InsertManyResponse
{
    acknowledged:boolean;
    insertedCount:number;
    insertedIds:any[]=[];
    constructor(data:any=null)
    {
        if(data==null)return
        Object.assign(this,data);
        this.insertedIds=[];
        for(var id in data.insertedIds)
        {
            this.insertedIds.push(data.insertedIds[id]);
        }
    }
}