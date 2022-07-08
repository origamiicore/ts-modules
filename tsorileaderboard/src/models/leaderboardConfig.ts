import { ModuleConfig, PackageIndex } from 'origamicore'; 
import TsOriLeaderboard from '..';
export default class LeaderboardConfig extends ModuleConfig
{
    port:number=6379;
    host:string='localhost';
    db:number=0;
    public constructor(
        
        fields?: {
            id?: string  
            port?:number;
            host?:string;
            db?:number;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsOriLeaderboard();
        await instance.jsonConfig(this);
        return instance;
    } 
}