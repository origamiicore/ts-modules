import {ModuleConfig, OriInjectable, OriService, PackageIndex, ResponseDataModel, RouteResponse} from 'origamicore' 
import OriMongoError from './models/errors';
import MongoConfig from './models/mongoConfig';
import MongoService from './services.ts/mongoService';
@OriInjectable({domain:'mongo'})
export default class TsOriMongo implements PackageIndex
{
    name: string='mongo';
    private config:MongoConfig;
    private connections:Map<string,MongoService>=new Map<string,MongoService>();
    jsonConfig(config: MongoConfig): Promise<void> {
        this.config= config ;
        for(var connection of this.config.connections)
        {
            this.connections[connection.name]=new MongoService(connection); 
        }
        return;
    }
    async start(): Promise<void> {
        for(var connection in this.connections)
        {
            await (this.connections[connection] as MongoService).connect();
        }
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    @OriService({isInternal:true})
    async search(context:string,collection:string,query:any,odata:any):Promise<RouteResponse>
    { 
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        var data= await connection.find(collection,query,odata);
        return new RouteResponse({response:new ResponseDataModel({data})}); 
    }
    @OriService({isInternal:true})
    async searchOne(context:string,collection:string,query:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.find(collection,query,{$top:1});

            return new RouteResponse({response:new ResponseDataModel({data:data.value[0]})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async replaceOne(context:string,collection:string,condition:any,document:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.replaceOne(collection,condition,document); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async updateOne(context:string,collection:string,condition:any,set:any,inc:any,push:any,upsert:boolean):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.updateOne(collection,condition,set,inc,push,upsert); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async updateMany(context:string,collection:string,condition:any,set:any,inc:any,push:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.updateMany(collection,condition,set,inc,push); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async insertOne(context:string,collection:string,document:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.insertOne(collection,document); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async insertMany(context:string,collection:string,documents:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.insertMany(collection,documents); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async deleteOne(context:string,collection:string,condition:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.deleteOne(collection,condition); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
    @OriService({isInternal:true})
    async deleteMany(context:string,collection:string,condition:any,set:any,inc:any,push:any):Promise<RouteResponse>
    {
        var connection=this.connections[context] as MongoService;
        if(connection==null) return OriMongoError.connectionNotFound; 
        try{
            var data= await connection.deleteMany(collection,condition); 
            return new RouteResponse({response:new ResponseDataModel({data:data})});
        }catch(exp){
            return OriMongoError.unknownError(exp);
        }
    }
}