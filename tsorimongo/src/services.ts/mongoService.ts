import { OdataModel } from "origamicore";
import DatabaseConnection from "../models/databaseConnection";
import LocalSearchModel from "../models/localModels/localSearchModel";
import OdataResponse from "../models/odataResponse"; 
import SelectModel from "../models/selectModel";
import QueryService from "./queryService";
const parser = require('odata-v4-parser');
const { MongoClient } = require("mongodb"); 
export default class MongoService
{
    connection:DatabaseConnection;
    client:any;
    database:any;
    constructor(connection:DatabaseConnection)
    {
        this.connection=connection;
        var uri='mongodb://';
        if(connection.username)
        {
            uri+=connection.username+':'+connection.password+'@'
        }
        uri+=connection.host+':'+connection.port+'/'+connection.database;         
        this.client= new MongoClient(uri);
    }
    async connect()
    {
        try{
            await this.client.connect();
            this.database=this.client.db(this.connection.database);
        }catch(exp){
            console.log(exp);            
        }
    }
    createSyntax(query:any,odata:OdataModel):LocalSearchModel
    { 
        var select=[]
        var selectGroup:SelectModel[]=[]
        if(query.select)
        { 
            for(var x of query.select)
            {
                
                if(typeof(x)=='string')
                {
                    select.push(x)
                }
                else
                {
                    selectGroup.push(x)
                }
            } 
        } 
        if(query.where)
        { 
            QueryService.objectToWhere(query.where) 
        }
        if(odata?.$select)
        {
            var tempssl=[]
            var sles=odata.$select.split(',')
            if(sles.length>0)
            {
                if(select.length)
                    for(let x of sles)
                    {
                        if(select.indexOf(x)>-1)
                            tempssl.push(x)
                    }
                else
                    tempssl=sles
                select=tempssl
            }
        }
        var order=[]
        if(odata?.$orderby)
        {
          var ors=odata.$orderby.split(',')
          for(var a of ors)
          {
            var ord=a.split(' ')
            if(ord.length>1)
            {
              order.push({name:ord[0],type:ord[1]})
            }
            else {
              order.push({name:a,type:'asc'}) 
            }

          } 
          
        }
        var filter = null;
        if(odata?.$filter)
        {
            filter=QueryService.createOdataFilter(odata.$filter)
        }
        var objorder:Map<string,number>=new Map<string,number>();
        var objwhere=null
        var objselect=null
        if(query.where || filter)
        {
            if(query.where && filter)
            {
                objwhere={$and:[query.where,filter]}
            }
            else if(query.where)
            {
                objwhere=query.where
            }
            else
            {
                objwhere=filter
            }
        } 
        
        if(query.order)
        {
            for(let a of query.order)
              order.push(a);
        }
        for(let a of order)
        {
            objorder[a.name]=1
            if(a.type=='desc')
            {
                objorder[a.name]=-1
            }
        }  
        
        if(select.length)
            objselect={}
        for(let a of select)
        {
            objselect[a]=1
        }
        var retobj:LocalSearchModel=new LocalSearchModel({
            orders:objorder,
            where:objwhere,
            selectGroup,
            select
        });
        
        // {orders:,where:,select:,selectGroup:selectGroup}
        if(odata?.$top)
            retobj.top=odata.$top;
        if(odata?.$skip)
            retobj.skip=odata.$skip;
        //console.log(query.limit,odata);
        
		if(query.limit)
        { 
            if(!odata?.$top || odata?.$top>query.limit)
            {
                retobj.top=query.limit;
            }

        } 
        if(query.skip)
            retobj.skip=query.skip;

        if(query.maxLimit)
        {
            if(!retobj.top || retobj.top>query.maxLimit)retobj.top= query.maxLimit;
        }    
        return retobj;
    }
    async find(collection:string,query:any,odata:any):Promise<any>
    { 
        var syn=this.createSyntax(query,odata);
        var coll = this.database.collection(collection);
        var selectQuery=null;
        var countQuery=null;

        if(syn.selectGroup.length)
        {
            
            var marr=[]
            marr.push({$match:syn.where??{}})
            var msel={}
            for(let a of syn.select)
            {
                msel[a]='$'+ a
            }
            var grp={_id:msel}
            for(let a of syn.selectGroup)
            {
                
                if(a.func=='count')
                    grp[a.title]={ $sum: 1 } 
                if(a.func=='sum')
                    grp[a.title]={ $sum: '$'+a.name } 
            }
			var grpdata={$group:grp}
            marr.push(grpdata)
			if(syn.orders)
			{
				var ord={}
				for(var xx in syn.orders)
				{
					ord["_id."+xx]=syn.orders[xx]
				}
                if(Object.keys(ord).length)
				    marr.push({$sort:ord})
                else
                {
                    var sortObj={lastName:1};
                    sortObj['_id.'+syn.select[0]]=1
                    marr.push({$sort:sortObj})
                }
			}
            selectQuery=coll.aggregate(marr)
            countQuery=coll.aggregate(marr)

        }
        else
        {
            let select={};
            for(var s of syn.select)
            {
                select[s]=1;
            }
            selectQuery=coll.find(syn.where,{projection:select})
            countQuery=coll.find(syn.where,{projection:select}) 
            if(syn.orders)
                selectQuery=selectQuery.sort(syn.orders)
        } 
        if(syn.skip)
        {
            selectQuery=selectQuery.skip(syn.skip)            
        }
        if(syn.top)
        { 
            selectQuery=selectQuery.limit(syn.top)
        }
        var count=null
        if(odata?.$count || query.count)
        {
            count= await new Promise((res,rej)=>{
                
                countQuery.count((ecount,dcount)=>{
                    res(dcount)
                     
                })
            });
            
        }

        var value:any= await new Promise((res,rej)=>{
            
            selectQuery.toArray(function(err, result) { 
                if(err)
                {
                    return rej({err:err})
                }
                if(syn.selectGroup.length)
                {
                    var lv=[]
                    for(var b of result)
                    {
                        var ob1=b._id
                        for(var a of syn.selectGroup)
                        {
                            ob1[a.title]=b[a.title]
                        }
                        lv.push(ob1)
                    }
                return res(lv)
                } 
                
                res(result)
                
            });
        });
        return {count,value}
    }
    async updateOne(collection:string,condition:any,set:any,inc:any,push:any,upsert:boolean):Promise<any>
    { 
        
        var saveObjec:any={};
        if(set)saveObjec.$set=set;
        if(inc && Object.keys(inc).length>0)saveObjec.$inc=inc;
        if(push)saveObjec.$push=push; 
        var option:any={};
        if(upsert)option.upsert=upsert;
        var coll = this.database.collection(collection);
        return await coll.updateOne(condition,saveObjec,option);
    }
    async updateMany(collection:string,condition:any,set:any,inc:any,push:any):Promise<any[]>
    {
        var saveObjec:any={};
        if(set)saveObjec.$set=set;
        if(inc)saveObjec.$inc=inc;
        if(push)saveObjec.$push=push;
        var coll = this.database.collection(collection);
        return await coll.updateMany(condition,saveObjec); 
    }
    async insertOne(collection:string,data:any):Promise<any[]>
    { 
        var coll = this.database.collection(collection);
        return await coll.insertOne(data); 
    }
    async insertMany(collection:string,data:any[]):Promise<any[]>
    { 
        var coll = this.database.collection(collection);        
        return await coll.insertMany(data); 
    }
    async deleteOne(collection:string,condition:any):Promise<any[]>
    { 
        var coll = this.database.collection(collection);
        return await coll.deleteOne(condition); 
    }
    async deleteMany(collection:string,condition:any):Promise<any[]>
    { 
        var coll = this.database.collection(collection);
        return await coll.deleteMany(condition); 
    }
    async replaceOne(collection:string,condition:any,document:any):Promise<any>
    { 
        var coll = this.database.collection(collection);
        return await coll.replaceOne(condition,document);
    }
}