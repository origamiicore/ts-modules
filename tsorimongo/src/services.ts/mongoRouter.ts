import { IOriModel } from "origamits"
import QueryModel from "../models/queryModel";
import SelectModel from "../models/selectModel";
import SortModel from "../models/sortModel";

export default class MangoRouter<T>
{
    context:string;
    table:string;
    constructor(context:string,table:string){
        this.context=context;
        this.table=table;
    }
    async UpdateOne(condition:any,newObject:T):Promise<void>
    {
        return
    }
    async UpdateMany(condition:any,newObject:T):Promise<void>
    {
        return
    }
    async deleteOne(condition:any):Promise<void>
    {
        return
    }
    async deleteMany(condition:any):Promise<void>
    {
        return
    }
    async findById(id:any):Promise<T>
    {
        return;
    }
    async findByIdAndDelete(id:any,isRemove:boolean=false):Promise<void>
    {
        return;
    }
    async findByIdAndReplace(newObject:T):Promise<void>
    {
        return;
    }
    async findByIdAndUpdate(newObject:T):Promise<void>
    {
        return;
    }
    search( 
        fields?: {
            where?: any
            select?: (string|SelectModel)[],
            sort?:SortModel[]
            limit?:number
            skip?:number
        }
    ):QueryModel<T>
    {
        var query =new QueryModel<T>({
            context:this.context,
            table:this.table,
            whereData:fields?.where,
            selectData:fields?.select,
            sortData:fields?.sort,
            limitData:fields?.limit,
            skipData:fields?.skip
        });
        return query;
    }
}