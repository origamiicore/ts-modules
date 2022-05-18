import JwtConfig from "./jwtConfig";
import RedisConfig from "./redisConfig";

export default class ConnectionProtocol
{
    type:string;
    port:number;
    key:string;
    crt:string; 
    socketProtocol:string;
    jwtConfig:JwtConfig;
    redisConfig:RedisConfig;

    public constructor(
        fields?: {
            type?: string
            port?: number  
            key?: string  
            crt?: string
            socketProtocol?: string
            jwtConfig?:JwtConfig
            redisConfig?:RedisConfig
        }) {
        if (fields) Object.assign(this, fields);
    }
}