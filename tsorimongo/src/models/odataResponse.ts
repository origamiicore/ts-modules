export default class OdataResponse<T>
{
    value:T[]=[];
    count:number;
    constructor(
        fields?: {
            value?:T[];
            count?:number;
    }){
        if(fields)
            Object.assign(this,fields);
    }
}