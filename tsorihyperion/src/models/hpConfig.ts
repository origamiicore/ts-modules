import HpAction from "./hpAction";
import HpTable from "./hpTable";

export default class HpConfig
{
    name:string;
    netUrl:string;
    tables:HpTable[]=[];
    actions:HpAction[]=[];
    autoConnect:boolean=false;
    constructor(fields:{ 
        name:string;
        netUrl:string;
        tables?:HpTable[];
        actions?:HpAction[];
        autoConnect?:boolean;
    }){
        Object.assign(this,fields)
    }
}