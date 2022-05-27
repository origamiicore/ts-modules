import { ModuleConfig } from 'origamits'; 
import EmailConfig from './emailConfig';
import WebServiceConfig from './webServiceConfig';
export default class NotificationConfig extends ModuleConfig
{ 
    drivers:(EmailConfig|WebServiceConfig)[]
    public constructor(
        fields?: {
            id: string
            name: string  
            drivers:(EmailConfig|WebServiceConfig)[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}