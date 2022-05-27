export default class WebServiceConfig
{
    toField:string;
    textField:string; 
    titleField:string;
    htmlField:string;
    protocolType:'get'|'post';
    option:any;
    public constructor(
        
        fields?: {
            toField?:string;
            textField?:string; 
            titleField?:string;
            htmlField?:string;
            protocolType?:'get'|'post';
            option?:any;
        }) { 
        if (fields) Object.assign(this, fields);
    }
}