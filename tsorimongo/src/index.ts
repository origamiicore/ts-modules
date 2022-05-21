import {ModuleConfig, PackageIndex} from 'origamits' 
import MongoConfig from './models/mongoConfig';
import MongoService from './services.ts/mongoService';
export default class TsoriDatabase implements PackageIndex
{
    name: string;
    private config:MongoConfig;
    private connections:Map<string,MongoService>;
    jsonConfig(config: ModuleConfig): Promise<void> {
        this.config= config as MongoConfig;
        for(var connection of this.config.connections)
        {
            this.connections[connection.name]=new MongoService(connection); 
        }
        return;
    }
    async start(): Promise<void> {
        for(var connection in this.connections)
        {
            await (this.connections[connection] as MongoService).connect();
        }
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}