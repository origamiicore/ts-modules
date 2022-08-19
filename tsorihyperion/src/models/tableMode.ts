const eosjsAccountName = require('eosjs-account-name');
export default class TableModel<T>
{
    timestamp:string;
    block_id:string;
    block_num:string;
    code:string;
    payer:string;
    primary_key:string;
    scope:string;
    table:string;
    present:boolean;
    scopNumber:string='';
    data:T; 
    constructor(data:any,cls: { new(data:any,content?:any): T })
    {
        Object.assign(this,data);
        this.timestamp=data['@timestamp']??data['timestamp']
        this.data =new cls(data.data,data)
        if(this.scope)
        {
            this.scopNumber = eosjsAccountName.nameToUint64(this.scope);
        }
    }
}