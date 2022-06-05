import { ModuleConfig } from "origamits";
import SimpleDriverConfig from "./simpleDriverConfig";

 
export default class CaptchaConfig extends ModuleConfig
{  
    simpleDriver:SimpleDriverConfig;
    public constructor(
        
        fields?: {
            id?: string
            name?: string 
            simpleDriver:SimpleDriverConfig;
        }) {
        super(fields);
        this.name='captcha'
        if (fields) Object.assign(this, fields);
    }
}