import SelectModel from "../selectModel";

export default class LocalSearchModel
{
    orders:Map<string,number>=new Map<string,number>(); 
    top:number;
    skip:number;
    where:any;
    selectGroup:SelectModel[];
    select:string[]=[]
    public constructor(
        fields?: {
            orders?:Map<string,number> 
            top?:number;
            skip?:number;
            where?:any;
            selectGroup?:SelectModel[];
            select?:string[]
        }) {
        if (fields) Object.assign(this, fields);
    }
}