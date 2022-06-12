import BaseDriverConfig from "./baseDriverConfig";

export default class WebServiceConfig extends BaseDriverConfig
{
    toField:string;
    textField:string; 
    titleField:string;
    htmlField:string;
    protocolType:'get'|'post';
    option:any;
    header:any;
    sendUrl:string;
    public constructor(
        
        fields: {
            context:string;
            toField?:string;
            textField?:string; 
            titleField?:string;
            htmlField?:string;
            sendUrl?:string;
            protocolType?:'get'|'post';
            option?:any;
            header?:any;
        }) { 
        super(fields.context);
        if (fields) Object.assign(this, fields);
    }
}