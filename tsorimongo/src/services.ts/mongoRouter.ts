import { IOriModel, MessageModel, Router } from "origamits"
import DeleteResponse from "../models/crudModels/deleteResponse";
import InsertManyResponse from "../models/crudModels/inserteManyResponse";
import InsertResponse from "../models/crudModels/insertResponse";
import UpdateResponse from "../models/crudModels/updateResponse";
import QueryModel from "../models/queryModel";
import SelectModel from "../models/selectModel";
import SortModel from "../models/sortModel";
interface NoParamConstructor<T> {
    new (): T;
}
export default class MongoRouter<T>
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
    async InsertOne(document:T):Promise<InsertResponse>
    { 
        var copy= this.copy(document);
        var data= await Router.runInternal('mongo','insertOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            document:copy, 
        }}))
        return new InsertResponse(data.response.data); 
    }
    async InsertMany(documents:T[]):Promise<InsertManyResponse>
    { 
        var copy= this.copy(documents);
        var data= await Router.runInternal('mongo','insertMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            documents:copy, 
        }}))
        return new InsertManyResponse(data.response.data); 
    }
    async UpdateOne(condition:any,
        fields?: {
            set?:any,            
            inc?:any,
            push?:any
        }
        ):Promise<UpdateResponse>
    { 
        
       var data= await Router.runInternal('mongo','updateOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
             condition,
             set:fields?.set?this.copy(fields.set):null,
             inc:fields?.inc,
             push:fields?.push
        }}))
        return new UpdateResponse(data.response.data); 
    }
    async Replace(condition:any, document:T):Promise<UpdateResponse>
    { 
        var copy=this.copy(document);
       var data= await Router.runInternal('mongo','replaceOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
             condition,
             document:copy
        }}))
        return new UpdateResponse(data.response.data); 
    }
    async UpdateMany(condition:any,
        fields?: {
            set?:any,            
            inc?:any,
            push?:any
        }
        ):Promise<UpdateResponse>    
    {
        var data= await Router.runInternal('mongo','updateMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition,
            set:fields?.set?this.copy(fields.set):null,
            inc:fields?.inc,
            push:fields?.push
         }}))
         return new UpdateResponse(data.response.data); 
    }
    async deleteOne(condition:any):Promise<DeleteResponse>
    {
        var data= await Router.runInternal('mongo','deleteOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
              condition, 
         }}))
         return new DeleteResponse(data.response.data); 
    }
    async deleteMany(condition:any):Promise<DeleteResponse>
    {
        var data= await Router.runInternal('mongo','deleteMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
              condition, 
         }}))
         return new DeleteResponse(data.response.data); 
    }
    async findById(id:any):Promise<T>
    {
        if(id==null)throw 'id is null'
        var data= await Router.runInternal('mongo','searchOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            query:{
                where:{_id:id}
            } 
         }}))  
         if(!data.response.data)
         {
            return null;
         }
         return new this.cls(data.response.data) ; 
    }
    async findByIdAndDelete(id:any):Promise<DeleteResponse>
    {
        var data= await Router.runInternal('mongo','deleteOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition:  {_id:id}, 
         }}))
         return new DeleteResponse(data.response.data); 
    }
    async saveById(document:T):Promise<UpdateResponse>
    { 
        var copy=this.copy(document);
        var data= await Router.runInternal('mongo','updateOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition:{_id:copy._id},
            set:copy, 
            upsert:true
         }}))
         return new UpdateResponse(data.response.data); 

    }
    async findByIdAndReplace(document:T):Promise<UpdateResponse>
    {
        var copy=this.copy(document);
       var data= await Router.runInternal('mongo','replaceOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
             condition:copy._id,
             document:copy
        }}))
        return new UpdateResponse(data.response.data); 
    }
    async findByIdAndUpdate(id:any,
        fields?: {
            set?:any,            
            inc?:any,
            push?:any
        }
        ):Promise<UpdateResponse>    
    {
        var data= await Router.runInternal('mongo','updateMany',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition:{_id:id},
            set:fields?.set?this.copy(fields.set):null,
            inc:fields?.inc,
            push:fields?.push
         }}))
         return new UpdateResponse(data.response.data); 
    }
    search( 
        fields?: {
            where?: any
            select?: (string|SelectModel)[],
            sort?:SortModel[]
            limit?:number
            skip?:number
            showCount?:boolean
        }
    ):QueryModel<T>
    {
        var query =new QueryModel<T>(
            this.cls,
            {
            context:this.context,
            collection:this.collection,
            whereData:fields?.where,
            selectData:fields?.select,
            sortData:fields?.sort,
            limitData:fields?.limit,
            skipData:fields?.skip,            
            showCount:fields?.showCount
        });
        return query;
    }
}