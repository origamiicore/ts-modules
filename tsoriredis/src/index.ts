import { ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse } from "origamits";
import RedisConfig from "./models/redisConfig";
import RedisConnection from "./models/redisConnection";
import RedisError from "./models/redisErrors";
var redis=require("redis");
@OriInjectable({domain:'redis'})
export default class TsOriRedis implements PackageIndex
{
    name: string='redis';
    config:RedisConfig;
    context:Map<string,any>=new Map<string,any>();
    async jsonConfig(moduleConfig: RedisConfig): Promise<void> {
        this.config =moduleConfig as RedisConfig;
    }
    async start(): Promise<void> { 
        for(var connection of this.config.connections)
        {
            var key=connection[0]
            var con=connection[1] as RedisConnection;
            this.context[key]= redis.createClient(con.port, con.host);
            await  this.context[key].connect()
            console.log('Redis -> redis connected '+con.host);
            await this.context[key].select(con.db)
            console.log('Redis -> redis on db : '+con.db);
        }
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    @OriService({isInternal:true,})
    async runCommand( context:string,data:any[]):Promise<RouteResponse>
    {  
        
        if(!this.context[context])return RedisError.contextNotFound;
        try{
            var data =await this.context[context].sendCommand(data)
            return RouteResponse.success(data);

        }catch(exp){ 
            
            return RouteResponse.failed(exp,'unknown','');
        }
    }
}