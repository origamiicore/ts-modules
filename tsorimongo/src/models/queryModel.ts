import SelectModel from "./selectModel";
import SortModel from "./sortModel";

export default class QueryModel<T>
{
    context:string;
    table:string;
    limitData?:number;
    skipData?:number;
    whereData:any;
    selectData?: (string|SelectModel)[];
    sortData?:SortModel[];
    constructor(
        fields?: {
            context:string
            table:string
            limitData?:number
            skipData?:number
            whereData?: any 
            selectData?: (string|SelectModel)[],
            sortData?:SortModel[]
    }){
        if(fields)
            Object.assign(this,fields);
    }
    sort(data:SortModel|SortModel[]):QueryModel<T>
    {
        if(Array.isArray(data))
        {
            this.sortData?.push(...data);
        }
        else
        {
            this.sortData?.push(data);
        }
        return this;
    }
    group(fields:SelectModel[]):QueryModel<T>
    {
        this.selectData?.push(...fields);
        return this;
    }
    select(fields:string[]):QueryModel<T>
    {
        this.selectData?.push(...fields);
        return this;
    }
    whereAnd(condition:any):QueryModel<T>
    {
        if(this.whereData)
        {
            if(this.whereData.$and)
            {
                this.whereData.$and.push(condition)
            }
            else
            {
                this.whereData={$and:[
                    condition,
                    this.whereData
                ]}
            }
        }
        else
        {
            this.whereData = condition;
        }
        return this;
    }
    where(condition:any):QueryModel<T>
    { 
        this.whereData = condition;
        return this;
    }
    whereOr(condition:any):QueryModel<T>
    {
        if(this.whereData)
        {
            if(this.whereData.$or)
            {
                this.whereData.$and.push(condition)
            }
            else
            {
                this.whereData={$or:[
                    condition,
                    this.whereData
                ]}
            }
        }
        else
        {
            this.whereData = condition;
        }
        return this;
    }
    async findOneAndUpdate(newObject:T):Promise<T>
    {
        return
    }
    async findOneAndReplace(newObject:T):Promise<T>
    {
        return
    }
    async findOneAndDelete(isRemove:boolean=false):Promise<T>
    {
        return
    }
    async findOne():Promise<T>
    {
        return
    }
    async find():Promise<T>
    {
        return;
    }
}