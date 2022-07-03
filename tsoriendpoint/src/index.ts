import {ModuleConfig, PackageIndex} from 'origamicore' 
import EndpointConfig from './models/endpointConfig';
import { EndpointConnectionType } from './models/endpointConnection';
import ExpressIndex from './services/expressIndex';
import SocketIndex from './services/socketIndex';
export default class TsOriEndpoint implements PackageIndex
{
    name: string='endpoint';
    private config:EndpointConfig;
    private expressList:ExpressIndex[]=[];
    private socketList:SocketIndex[]=[];
    jsonConfig(config: EndpointConfig): Promise<void> {
         this.config=config ;
         
        for(var connection of this.config.connections )
        {
            if(connection.type==EndpointConnectionType.Soucket)
            {
                this.socketList.push(new SocketIndex(connection))
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
        for(var socket of this.socketList)
        {
            await socket.init()
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