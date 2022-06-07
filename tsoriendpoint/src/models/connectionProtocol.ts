import JwtConfig from "./jwtConfig";
import RedisConfig from "./redisConfig";

export default class ConnectionProtocol
{
    type:'http'|'https';
    port:number;
    key:string;
    crt:string; 
    socketProtocol:string='echo-protocol';
    jwtConfig:JwtConfig;
    redisConfig:RedisConfig;

    public constructor(
        fields?: {
            type: 'http'|'https'
            port: number  
            key?: string  
            crt?: string
            socketProtocol?: string
            jwtConfig?:JwtConfig
            redisConfig?:RedisConfig
        }) {
        if (fields) Object.assign(this, fields);
    }
}