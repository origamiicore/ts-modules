export default class EventModel<T>
{
    contract:any;
    address:string;
    blockHash:string;
    transactionHash:string;
    event:string;
    blockNumber:number;
    logIndex:number;
    transactionIndex:number;
    removed:boolean;
    data:T;
    constructor(contract:any,data:any,cls: { new(data:any): T })
    { 
        this.contract=contract;
        if(!data)return;
        this.address=data.address;
        this.blockHash=data.blockHash;
        this.transactionHash=data.transactionHash;
        this.event=data.event;
        this.blockNumber=data.blockNumber;
        this.logIndex=data.logIndex;
        this.transactionIndex=data.transactionIndex;
        this.removed=data.removed;
        this.data=new cls(data.returnValues)
    }
}
 