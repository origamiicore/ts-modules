import { RouteResponse } from "origamicore";
import { WebService } from "tsoribase";
import TemplateModel from "../models/templateModel";
import WebServiceConfig from "../models/webServiceConfig";
import DriverBase from "./driverBase";

export default class WebServiceDiriver  implements DriverBase
{
    config:WebServiceConfig;
    constructor(config:WebServiceConfig)
    {
        this.config=config;
    }
    async sendMessage(template:TemplateModel,data:any): Promise<RouteResponse> {
        
		for(var x in data)
		{
			template.title= template.title.replaceAll('{{'+x+'}}',data[x])
			template.text= template.text.replaceAll('{{'+x+'}}',data[x])
			template.html= template.html.replaceAll('{{'+x+'}}',data[x])
		}
		var option=JSON.parse(JSON.stringify(this.config.option))
		option[this.config.toField]=data.to
		option[this.config.textField]=template.text
		if(this.config.titleField)
			option[this.config.titleField]=template.title
		if(this.config.htmlField)
			option[this.config.htmlField]=template.html 
		var reciveData;	
		if(this.config.protocolType=='get')
		{
			reciveData=await WebService.get(this.config.sendUrl,option,{},null);
		}	
		if(this.config.protocolType=='post')
		{
			reciveData=await WebService.post(this.config.sendUrl,option,{},null);
		}	
		
        return  RouteResponse.success(reciveData);
    }
}