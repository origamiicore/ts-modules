import { MessageModel, Router } from "origamits";
import DeleteResponse from "./crudModels/deleteResponse";
import UpdateResponse from "./crudModels/updateResponse";
import OdataModel from "./odataModel";
import OdataResponse from "./odataResponse";
import SelectModel from "./selectModel";
import SortModel from "./sortModel";

export default class QueryModel<T>
{
    context:string;
    collection:string;
    maxLimitData?:number;
    limitData?:number;
    skipData?:number;
    whereData:any;
    selectData?: (string|SelectModel)[]; 
    sortData?:SortModel[];
    showCount?:boolean;
    odataData?:OdataModel;
    copy(data:any)
    {
        return JSON.parse(JSON.stringify(data));
    }
    private cls: { new(data:any): T };
    constructor(
        cls: { new(data:any): T },
        fields?: {
            context:string
            collection:string
            limitData?:number
            skipData?:number
            whereData?: any 
            selectData?: (string|SelectModel)[],
            sortData?:SortModel[]
            showCount?:boolean
    }){
        if(fields)
            Object.assign(this,fields);
        this.cls=cls;    
    }
    sort(data:SortModel|SortModel[]):QueryModel<T>
    {
        this.sortData??=[];
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
    odata(odata:OdataModel)
    {
        this.odataData=odata;
        return this;
    }
    skip(skip:number)
    {
        this.skipData=skip;
        return this;
    }
    limit(limit:number)
    {
        this.limitData=limit;
        return this;
    }
    maxLimit(limit:number)
    {
        this.maxLimitData=limit;
        return this;
    }
    group(fields:SelectModel[]):QueryModel<T>
    {
        this.selectData??=[];
        this.selectData?.push(...fields);
        return this;
    }
    select(fields:string[]):QueryModel<T>
    {
        this.selectData??=[];
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
    count(showCount:boolean=true)
    {
        this.showCount=showCount;
        return this;
    }
    async findOneAndUpdate(
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
            condition:this.whereData,
            set:fields?.set,
            inc:fields?.inc,
            push:fields?.push
         }}))
         return new UpdateResponse(data.response.data); 
    }
    // async findOneAndReplace(newObject:T):Promise<UpdateResponse>
    // {
    //     var copy=this.copy(document);
    //     var data= await Router.runInternal('mongo','replaceOne',new MessageModel({data:{
    //         context:this.context,
    //         collection:this.collection,
    //          condition:copy._id,
    //          document:copy
    //     }}))
    //     return new UpdateResponse(data.response.data); 
    // }
    async findOneAndDelete():Promise<DeleteResponse>
    {
        var data= await Router.runInternal('mongo','deleteOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            condition:  this.where, 
         }}))
         return new DeleteResponse(data.response.data); 
    }
    async findOne():Promise<T>
    {
        var query:any={}
        if(this.selectData)query.select=this.selectData;
        if(this.whereData)query.where=this.whereData; 
        if(this.sortData)query.order=this.copy(this.sortData) ;   
        
        var data= await Router.runInternal('mongo','searchOne',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            query 
         }})) 
         
         return new this.cls(data.response.data); 
    }
    async find():Promise<OdataResponse<T>>
    {
        var query:any={}
        if(this.selectData)query.select=this.selectData;
        if(this.whereData)query.where=this.whereData;
        if(this.showCount)query.count=this.showCount; 
        if(this.sortData)query.order=this.copy(this.sortData) ; 
        if(this.limitData)query.limit=this.limitData ; 
        if(this.maxLimitData)query.maxLimit=this.maxLimitData ; 
        if(this.skipData)query.skip=this.skipData ;  
        
        var data= await Router.runInternal('mongo','search',new MessageModel({data:{
            context:this.context,
            collection:this.collection,
            query, 
            odata:this.odataData
         }})) 
         
         return new OdataResponse<T>(this.cls,data.response.data); 
    }
}