import {ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse} from 'origamits' 
import IDriver from './drivers/driverInterface';
import SimpleCaptchaDriver from './drivers/simple/simple';
import CaptchaConfig from './models/cpatchaConfig';
@OriInjectable({domain:'captcha'})
class TsoriCptcha implements PackageIndex
{
    name: string='captcha';
    config:CaptchaConfig;
    driver:IDriver;
    async jsonConfig(config: CaptchaConfig): Promise<void> {
        this.config= config ; 
        if(config.simpleDriver)
        {
            this.driver=new SimpleCaptchaDriver(config.simpleDriver);
        }
    }
    async start(): Promise<void> {
         
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    @OriService({isPublic:true})
    async getCode():Promise<RouteResponse>
    {   
        return this.driver.getCaptcha();
    }
    @OriService({isPublic:true})
    async setCode(data:any):Promise<RouteResponse>
    {    
        return this.driver.setCaptcha(data);
    }
    @OriService({isInternal:true})
    async validate(data:any):Promise<RouteResponse>
    {   
        return this.driver.validate(data);
    }
}

export default TsoriCptcha;