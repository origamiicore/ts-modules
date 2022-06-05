import { RouteResponse } from "origamits";
import { CommonService } from "tsoribase";
import SimpleSetModel from "../../models/driverModels/simple/simpleSetModel";
import SimpleValidateModel from "../../models/driverModels/simple/simpleValidateModel";
import ErrorData from "../../models/errorData";
import SimpleDriverConfig from "../../models/simpleDriverConfig";
import IDriver from "../driverInterface";
import RamTemp from "./ramTemp";
import ITemp from "./tempInterface";
var captchapng = require('captchapng');
var uuid=require('uuid');
export default class SimpleCaptchaDriver implements IDriver
{
    temp:ITemp;
    validatedTemp:ITemp;
    config:SimpleDriverConfig;
    constructor(config:SimpleDriverConfig)
    {
        this.config=config;
        if(config.storage=='ram')
        {
            this.temp=new RamTemp(config.expire);
            this.validatedTemp=new RamTemp(config.expire);
        }
    }
    async getCaptcha(): Promise<RouteResponse> {
        var code=CommonService.randomNumber(this.config.length);
        var p = new captchapng(this.config.width,this.config.height,code); 
		p.color(0, 0, 0, 0);
		p.color(80, 80, 80, 255);
        var img = p.getBase64(); 
        var id=uuid.v4();
        await this.temp.setData(id,code.toString());
        return RouteResponse.success({id,img})
    }
    async setCaptcha(data: any): Promise<RouteResponse> {
        var model=new SimpleSetModel(data); 
        if(!model.id || !model.code ) return ErrorData.wrongData;
        var tempData=await this.temp.getData(model.id);
        if(!tempData) return ErrorData.wrongData;
        if(tempData==model.code)
        {
            this.temp.clear(model.id);
            this.validatedTemp.setData(model.id,'true');
            return RouteResponse.success({id:model.id});
        }
        return ErrorData.wrongData;
    }
    async validate(data: any): Promise<RouteResponse> {  
        var model =new SimpleValidateModel(data);
        if(!model.id ) return RouteResponse.success(false);
        if(!await this.validatedTemp.getData(model.id)) return RouteResponse.success(false);
        this.validatedTemp.clear(model.id)
        return RouteResponse.success(true);
    }

}