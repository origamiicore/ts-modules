import { MessageModel, RouteResponse, Router } from "origamicore";

export default class NotificationRouter
{
    static async sendMessage(context:string,template:string,message:any):Promise<RouteResponse>
    { 
       var data= await Router.runInternal('notification','sendMessage',new MessageModel({data:{
            context,template,message
        }}))
        return data; 
    }
}