 
  
import {ModuleConfig, PackageIndex} from 'origamicore';
import TsOriEndpoint from '..';
import EndpointConnection from './endpointConnection';
import IpController from './ipController';
export default class EndpointConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance = new TsOriEndpoint();
        await instance.jsonConfig(this);
        return instance;
    } 
    connections:EndpointConnection[];
    ipController:IpController;
    public constructor(
        
        fields: {
            id?: string 
            connections: EndpointConnection[]
            ipController?:IpController;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}