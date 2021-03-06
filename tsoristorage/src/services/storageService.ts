import fs from 'fs' 
import { RedisRouter } from 'tsoriredis';
export default class StorageService
{ 
    static redis:RedisRouter;
    static createDir(path)
    {
        path=path.replace(/\\/g,'/')
        if(!fs.existsSync(path))
            fs.mkdirSync(path,{recursive:true});
    }
    static async getPath(path:string):Promise<string>
    {
        var date= new Date().toISOString().substr(0,10).replace(/-/g,'/');
        var dir = path + date;
        var nextId = await this.redis.increment(date);
        var index= Math.floor(nextId/100);
        var id=nextId%100;
        var finalPath=dir+'/'+index+'/';
        this.createDir(finalPath);
        return finalPath+id;
    }
}