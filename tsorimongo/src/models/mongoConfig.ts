import { ModuleConfig, PackageIndex } from 'origamicore';
import TsOriMongo from '..';
import DatabaseConnection from './databaseConnection';
export default class MongoConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance=new TsOriMongo();
        await instance.jsonConfig(this)
        return instance;
    }
    connections:DatabaseConnection[] = []; 
    
    public constructor(
        
        fields?: {
            id?: string 
            connections?: DatabaseConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}