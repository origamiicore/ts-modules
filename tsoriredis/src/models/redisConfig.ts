import { ModuleConfig } from "origamits";
import RedisConnection from "./redisConnection";

export default class RedisConfig extends ModuleConfig
{
    connections:Map<string,RedisConnection>=new Map<string,RedisConnection>();
    public constructor(
        fields: {
            id: string
            name: string
            connections:Map<string,RedisConnection>   
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }

}