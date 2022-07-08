import {ModuleConfig, OriInjectable, OriService, PackageIndex, ResponseDataModel, RouteResponse} from 'origamicore' 
import LeaderboardConfig from './models/leaderboardConfig';
var redis=require("redis");
@OriInjectable({domain:'leaderboard'})
export default class TsOriLeaderboard implements PackageIndex
{
    name: string='leaderboard';
    config:LeaderboardConfig;
    connection:any;
    async jsonConfig(config: LeaderboardConfig): Promise<void> {
        this.config=config;
    }
    async start(): Promise<void> {
        
        this.connection= redis.createClient(this.config.port, this.config.host);
        await  this.connection.connect()
        console.log('Leaderboard -> redis connected '+this.config.host);
        await this.connection.select(this.config.db)
        console.log('Leaderboard -> redis on db : '+this.config.db);
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    @OriService({isInternal:true})
    async addScore(gameId:string,score:number,userid:string):Promise<RouteResponse>
    {  
        var data =await this.connection.sendCommand(['zincrby',gameId,score.toString(),userid])
        return RouteResponse.success(data);
    }
    @OriService({isInternal:true})
	async getScore(gameId:string,userid:string)
	{   
        var data =await this.connection.sendCommand(['zscore',gameId,userid])
        return RouteResponse.success(data);
        
	}
    @OriService({isInternal:true})
	async setScore(gameId:string,score:number,userid:string)
	{   
        var data =await this.connection.sendCommand(['zadd',gameId,score.toString(),userid])
        return RouteResponse.success(data);
        
	} 
    @OriService({})
	async getBoard(gameId:string,userid:string)
	{
        var val =await this.connection.sendCommand(['zrevrank',gameId,userid])
        var begin=val-3
        var end=val+3
        if(begin<0)begin=0;
        var data = await this.connection.sendCommand(['zrevrange',gameId,begin, end, 'withscores'])
        return this.convertUser(data)
         
	}
    @OriService({})
	async getTopTen(gameId:string)
	{
        var data = await this.connection.sendCommand(['zrevrange',gameId,0, 10, 'withscores'])
        return this.convertUser(data) 
	}
    @OriService({isInternal:true})
	async getCount(gameId:string)
	{
        var data =await this.connection.sendCommand(['zcount',gameId,'-inf', '+inf'])
        return RouteResponse.success(data); 
	}

    @OriService({isInternal:true})
	async updateUser(userid:string,value:string)
	{ 
        var data =await this.connection.sendCommand(['set',userid,value])
        return RouteResponse.success(data);  
	}




    async convertUser(data)
    {
		var p=[];
		for(var a=0;a<data.length;a+=2)
		{
			var px= await this.getProfile(data[a])
			p.push({
				name:data[a],
				score:data[a+1],
				profile:px
			});
		}
        return p
    }
	async getProfile(id)
	{ 
		var data = await await this.connection.sendCommand(['get',id])
		return data;
	}
}