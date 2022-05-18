import { ModuleConfig } from "origamits";

export default class ProfileConfig extends ModuleConfig
{
    readOnle:boolean;
    public constructor(
        
        fields?: {
            id?: string,
            name?: string, 
            type?: 'module'|'service', 
            readOnley?:boolean  
        }) {

        super(fields);
        if (fields) Object.assign(this, fields);
    }
}