import { MessageModel, Router } from "origamits"

export default class RedisRouter
{
    context:string;
    constructor(context:string)
    {
        this.context=context;
    }
    async expire(key:string,sec:number)
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['EXPIRE',key,sec]
         }}))
         return response.response.data;  
    }
    async delete(key:string):Promise<boolean>
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['DEL',key]
         }}))
         return !!response.response.data;  
    }
    async exist(key:string):Promise<boolean>
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['EXISTS',key]
         }})) 
         return !!response.response.data;  
    }
    async getJsonValue(key:string)
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['GET',key]
         }}))
         return JSON.parse(response.response.data) ; 

    }
    async getValue(key:string)
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['GET',key]
         }}))
         return response.response.data; 

    }
    async setValue(key:string,value:any):Promise<boolean>
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:['SET',key,typeof(value)=='string'?value:JSON.stringify(value)]
         }}))
         return response.response.data=='OK';  
    }
    async getArray(key:string,
        fields?: { 
            isUniqueu?:boolean
            startIndex?:number
            endIndex?:number
        }
    )
    {
        var data=[ 'LRANGE',key,(fields?.startIndex??0).toString(),(fields?.endIndex??-1).toString()]
        if(fields?.isUniqueu)data=['SMEMBERS',key]
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data
         }}))
         return response.response.data; 
        
    }
    async increment(key:string,value?:number)
    {
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data:value!=null?['INCRBY',key,value]:['INCR',key]
         }}))
         return response.response.data;  
    }
    async getLength(
        key:string ,
            type?:'solidArray'|'uniqueArray'|'string'
         
    ):Promise<number>
    {
        type??='solidArray';
        var command='';
        if(type=='solidArray')
        {
            command='LLEN'
        }
        if(type=='uniqueArray')
        {
            command='SCARD'
        }
        if(type=='string')
        {
            command='STRLEN'
        }
        var data=[command,key];
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data
         }}))
         return response.response.data; 
    }
    async pop(key:string,type?:'left'|'rigth'|'unique',count?:number)
    { 
        var command='LPOP'
        if(type=='rigth')command='RPOP'
        if(type=='unique')command='SPOP'
        var data=[command,key]
        if(count)data.push(count.toString())
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data
         }}))
         return response.response.data;  
    }
    async addToArray(
            key:string,
            value: any|string,
        fields?: { 
            type?:'toEnd'|'toStart'|'toUnique',
            setIndex?:number
            createList?:boolean
        }
    ):Promise<boolean>
    {

        var type= fields?.type??'toEnd';
        var command='';
        var data=[]
        if(fields?.setIndex!=null)
        { 
            data=['LSET',key,fields.setIndex.toString()];
        }
        else
        {
            if(type=='toStart')
            {
                command=fields?.createList?'LPUSH':'LPUSHX' 
            }
            if(type=='toUnique')
            {
                command='SADD'
            }
            if(type=='toEnd')
            {
                command=fields?.createList?'RPUSH':'RPUSHX' 
            }

            data=[command,key];
        }
        var val= (typeof(value)=='string')?val=value:JSON.stringify(value);
        data.push(val);
        var response= await Router.runInternal('redis','runCommand',new MessageModel({data:{
             context:this.context,
             data
         }})) 
         
         return !!response.response.data; 
    }
}