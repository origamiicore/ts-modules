export default class ClaimedModel
{
    id:string;
    to:string;
    tokens:string;
    constructor(data?:any)
    { 
        if(!data)return;
        Object.assign(this,data);
    }
} 