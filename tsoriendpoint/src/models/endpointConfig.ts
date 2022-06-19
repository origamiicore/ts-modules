 
  
import {ModuleConfig, PackageIndex} from 'origamits';
import TsOriEndpoint from '..';
import EndpointConnection from './endpointConnection';
export default class EndpointConfig extends ModuleConfig
{
    async createInstance(): Promise<PackageIndex> {
        var instance = new TsOriEndpoint();
        await instance.jsonConfig(this);
        return instance;
    } 
    connections:EndpointConnection[];
    public constructor(
        
        fields: {
            id?: string 
            connections: EndpointConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}