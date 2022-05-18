 
  
import {ModuleConfig} from 'origamits';
import EndpointConnection from './endpointConnection';
export default class EndpointConfig extends ModuleConfig
{ 
    connections:EndpointConnection[];
    public constructor(
        
        fields?: {
            id?: string
            name?: string
            type?: 'module'|'service'
            connections?: EndpointConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}