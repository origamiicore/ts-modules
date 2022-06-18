import { AddedResponse, DataInput, ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse } from "origamits";import { RedisRouter } from "tsoriredis";
import StorageConfig from "./models/storageConfig";
import StorageService from "./services/storageService";
import fs from 'fs'
import {MongoRouter} from 'tsorimongo'
import DatabaseModels from "./models/databaseModels";
import FileModel from "./models/fileMode";
import StorageErrors from "./models/storageErrors";
const uuid=require('uuid');
@OriInjectable({domain:'storage'})
export default class TsOriStorage implements PackageIndex
{
    name: string='storage';
    config:StorageConfig;
    context:Map<string,any>=new Map<string,any>();
    async jsonConfig(moduleConfig: StorageConfig): Promise<void> {
        this.config =moduleConfig;
        StorageService.redis=new RedisRouter(this.config.redisContext);
        DatabaseModels.file=new MongoRouter(this.config.dbContext,'storage_files',FileModel);
    }
    async start(): Promise<void> {  
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    @OriService({isInternal:true})
    async useFile(id:string,data:any):Promise<boolean>
    {
        var file= await DatabaseModels.file.findById(id);
        if(!file) return false;
        if(file.isUsed)return false;
        await DatabaseModels.file.findByIdAndUpdate(id,{set:{useData:data,isUsed:true}})
    }
    @OriService({isPublic:true,})
    async download(id:string):Promise<RouteResponse>
    {
        var file= await DatabaseModels.file.findById(id);
        if(!file) return StorageErrors.fileNotFound;
        return new RouteResponse({
            addedResponse:new AddedResponse({directFileDownload:file.path,type:file.type})
        });
    }
    @OriService({isPublic:false,maxUploadSize:1024*1024*5})
    async uploadStream(@DataInput({isRequired:true}) media:any):Promise<FileModel>
    {
        var file= await StorageService.getPath(this.config.path);
        fs.copyFileSync(media.path,file);
        var id=uuid.v4();
        var fileModel=new FileModel({
            _id:id,
            path:file,
            type:media.type,
            name:media.name,
            size:media.size,
            createdTime:new Date().getTime(),
            isUsed:false
        });
        await DatabaseModels.file.saveById(fileModel)
        return fileModel;
    }
}