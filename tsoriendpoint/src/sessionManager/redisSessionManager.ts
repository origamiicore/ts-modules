import RedisConfig from "../models/redisConfig";
import SessionManager from "./sessionManager";
var redis=require("redis");
export default class RedisSessionManager implements SessionManager
{
    config:RedisConfig;
    connection:any={};
    init(config: any): Promise<void> {
        this.config=new RedisConfig(config);
        
        return new Promise((res,rej)=>{ 
            var c = redis.createClient(this.config.port, this.config.host);
            this.connection=c;
            c.on('connect', function() {
                console.log('Redis -> redis connected '+this.config.host);
                c.select(this.config.db, function(err,res){
                    console.log('Redis -> redis on db : '+this.config.db);
                    res({});
                });
            });
        });
    }
    setSession(token: string, value: any): Promise<string> {
        return new Promise((res,rej)=>{
            this.connection.set(token,JSON.stringify(value) ,(err,data)=>{
                if(err) return rej(err);
                return res(data);
            }); 
        });
    }
    getSession(token: string): Promise<any> {
        return new Promise((res,rej)=>{
            this.connection.get(token,(err,data)=>{
                if(err) return rej(err);
                return res(JSON.parse(data) );
            }); 
        });
    }

}