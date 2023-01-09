export default class TeleportModel
{
    from:string;
    to:string;
    tokens:string;
    chainId:string;
    constructor(data?:any)
    { 
        if(!data)return;
        Object.assign(this,data);
    }
} 