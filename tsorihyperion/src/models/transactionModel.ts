export class Authorization
{
    actor:string;
    permission:string;
    constructor(fields:{
        actor:string;
        permission:string;
    }){
        Object.assign(this,fields);
    }
}
export class EosAction
{
    account:string;
    name:string;
    authorization:Authorization[];
    data:any;
    constructor(fields:{
        account:string;
        name:string;
        authorization:Authorization[];
        data:any;
    }){
        Object.assign(this,fields);
    }
}
export default class TransactionModel
{
    actions:EosAction[];
    constructor(fields:{
        actions:EosAction[];
    }){
        Object.assign(this,fields);
    }
} 