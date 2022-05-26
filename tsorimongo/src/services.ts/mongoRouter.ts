import { IOriModel, MessageModel, Router } from "origamits"
import QueryModel from "../models/queryModel";
import SelectModel from "../models/selectModel";
import SortModel from "../models/sortModel";
interface NoParamConstructor<T> {
    new (): T;
}
export default class MangoRouter<T>
{
    context:string;
    collection:string; 
    private cls: { new(data:any): T };
    constructor(context:string,collection:string,cls: { new(data:any): T }){
        this.context=context;
        this.collection=collection;
        this.cls=cls;
    }  
    copy(data:any)
    {
        return JSON.parse(JSON.stringify(data));
    }
    async InsertOne(document:T):Promise<any>
    { 
        var copy= JSON.parse(JSON.stringify(document));
        var data= await Router.runInternal('mongo','insertOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            document:copy, 
        }}))
        return data.response; 
    }
    async InsertMany(documents:T[]):Promise<any>
    { 
        var copy= JSON.parse(JSON.stringify(documents));
        var data= await Router.runInternal('mongo','insertMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            documents:copy, 
        }}))
        return data.response; 
    }
    async UpdateOne(condition:any,
        fields?: {
            set?:any,            
            inc?:any,
            push?:any
        }
        ):Promise<any>
    { 
       var data= await Router.runInternal('mongo','updateOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
             condition,
             set:fields?.set,
             inc:fields?.inc,
             push:fields?.push
        }}))
        return data.response; 
    }
    async Replace(condition:any,
        document:T
        ):Promise<any>
    { 
        var copy=this.copy(document);
       var data= await Router.runInternal('mongo','replaceOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
             condition,
             document:copy
        }}))
        return data.response; 
    }
    async UpdateMany(condition:any,
        fields?: {
            set?:any,            
            inc?:any,
            push?:any
        }
        ):Promise<any>    
    {
        var data= await Router.runInternal('mongo','updateMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition,
            set:fields?.set,
            inc:fields?.inc,
            push:fields?.push
         }}))
         return data.response; 
    }
    async deleteOne(condition:any):Promise<any>
    {
        var data= await Router.runInternal('mongo','deleteOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
              condition, 
         }}))
         return data.response; 
    }
    async deleteMany(condition:any):Promise<any>
    {
        var data= await Router.runInternal('mongo','deleteMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
              condition, 
         }}))
         return data.response; 
    }
    async findById(id:any):Promise<T>
    {
        if(id==null)throw 'id is null'
        var data= await Router.runInternal('mongo','find',new MessageModel({data:{
            condition:{id:id}
         }}))  
         return new this.cls(data.response.data) ; 
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
            collection:this.collection,
            whereData:fields?.where,
            selectData:fields?.select,
            sortData:fields?.sort,
            limitData:fields?.limit,
            skipData:fields?.skip
        });
        return query;
    }
}