export default class ActionModel<T>
{
    timestamp:string;
    blockNumber:number;
    producer:string;
    trxId:string;
    account:string;
    name:string;
    data:T;
    constructor(data:any,cls: { new(data:any,content?:any): T })
    {
        Object.assign(this,data);
        this.timestamp=data['@timestamp']
        this.blockNumber=data['block_num']
        this.producer=data['producer']
        this.trxId=data['trx_id']

        this.account=data.act.account;
        this.name=data.act.name;
        this.data =new cls(data.act.data,data)
    }
}