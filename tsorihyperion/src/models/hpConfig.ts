import HpAction from "./hpAction";
import HpTable from "./hpTable";

export default class HpConfig
{
    name:string;
    netUrl:string;
    tables:HpTable[]=[];
    actions:HpAction[]=[];
    constructor(fields:{ 
        name:string;
        netUrl:string;
        tables?:HpTable[];
        actions?:HpAction[];
    }){
        Object.assign(this,fields)
    }
}