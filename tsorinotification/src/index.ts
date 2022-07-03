import {ModuleConfig, SessionInput, OriService, PackageIndex, ResponseDataModel, RouteResponse,DataInput, OriInjectable} from 'origamicore' 
import DriverBase from './drivers/driverBase';
import EmailDriver from './drivers/emailDriver';
import WebServiceDiriver from './drivers/webServiceDriver';
import EmailConfig from './models/emailConfig';
import ErrorMessages from './models/errorMessages';
import NotificationConfig from './models/notificationConfig';
import WebServiceConfig from './models/webServiceConfig';
import TemplateSchima from './models/db/templateSchema'
import TelegramConfig from './models/telegramConfig';
import TelegramDriver from './drivers/telegramDriver';
@OriInjectable({domain:'notification'})
export default class TsOriNotification implements PackageIndex
{
    name: string='notification';
    config:NotificationConfig;
    drivers:Map<string,DriverBase>=new Map<string,DriverBase>();
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> {
        this.config=moduleConfig as NotificationConfig;
        for(var driver of this.config.drivers)
        {
            if(driver instanceof WebServiceConfig)
            {
                this.drivers[driver.context]=new WebServiceDiriver(driver);
            }
            if(driver instanceof EmailConfig)
            {
                this.drivers[driver.context]=new EmailDriver(driver);
            }
            if(driver instanceof TelegramConfig)
            {
                this.drivers[driver.context]=new TelegramDriver(driver);
            }
        }
        return;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    @OriService({isInternal:true,})
    async sendMessage( context:string,template:string,message:any):Promise<RouteResponse>
    {  
        if(!this.drivers[context])return ErrorMessages.contextNotFound;
        var model= await TemplateSchima(this.config.dbContext).search().where({_id:template}).findOne();
        if(!model)return  ErrorMessages.templateNotFound;
        return await (this.drivers[context] as DriverBase).sendMessage(model,message);
    }
     
}