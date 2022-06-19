import { ModuleConfig, PackageIndex } from "origamits";
import TsOriRedis from "..";
import RedisConnection from "./redisConnection";

export default class RedisConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance= new TsOriRedis();
        await instance.jsonConfig(this);
        return instance;
    }
    connections:Map<string,RedisConnection>=new Map<string,RedisConnection>();
    public constructor(
        fields: {
            id?: string 
            connections:Map<string,RedisConnection>   
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        
    }

}