
export default class HpTable
{
    code:string;
    table:string;
    scope:string;
    payer:string;
    start_from:string;
    read_until:number=0;
    constructor(fields?:{ 
        code:string;
        table:string;
        scope?:string;
        payer?:string;
        start_from:string;
        read_until?:number;
    })
    { 
        if(fields)Object.assign(this,fields);
    }
}
 