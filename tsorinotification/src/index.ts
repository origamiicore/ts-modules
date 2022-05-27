import {ModuleConfig, SessionInput, OriService, PackageIndex, ResponseDataModel, RouteResponse,DataInput} from 'origamits' 
import NotificationConfig from './models/notificationConfig';
export default class TsOriNotification implements PackageIndex
{
    name: string='notification';
    config:NotificationConfig;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> {
        this.config=moduleConfig as NotificationConfig;
        for(var driver of this.config.drivers)
        {
            
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

        return
    }
     
}