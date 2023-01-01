import { RequestFilter } from "@eosrio/hyperion-stream-client";

export default class HpAction
{
    contract:string;
    action:string;
    account:string='';
    filters:RequestFilter[]=[];
    start_from:string='';
    read_until:number=0;
    constructor(fields?:{
        contract:string;
        action:string;
        account?:string;
        filters?:RequestFilter[];
        read_until?:number;
        start_from:string;
    })
    { 
        if(fields)Object.assign(this,fields);
    }
}