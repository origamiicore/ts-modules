 
  
import {ModuleConfig} from 'origamits';
import EndpointConnection from './endpointConnection';
export default class EndpointConfig extends ModuleConfig
{ 
    connections:EndpointConnection[];
    public constructor(
        
        fields: {
            id?: string 
            connections: EndpointConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        if(!fields?.id)
        {
            this.id=Math.random().toString();
        }
        this.name='endpoint';
    }
}