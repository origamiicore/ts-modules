import {ModuleConfig, PackageIndex} from 'origamits' 
import EndpointConfig from './models/endpointConfig';
import { EndpointConnectionType } from './models/endpointConnection';
import ExpressIndex from './services/expressIndex';
export default class TsOriEndpoint implements PackageIndex
{
    name: string='endpoint';
    private config:EndpointConfig;
    private expressList:ExpressIndex[]=[];
    jsonConfig(config: ModuleConfig): Promise<void> {
         this.config=config as EndpointConfig;
         
        for(var connection of this.config.connections )
        {
            if(connection.type==EndpointConnectionType.Soucket)
            {
                
            }
            else
            {
                this.expressList.push( new ExpressIndex(connection)) ; 
            }
        }
        return;
    }
    async start(): Promise<void> { 

        for(var express of this.expressList)
        {
            await express.init();
        }
        return
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}