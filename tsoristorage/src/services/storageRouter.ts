import { MessageModel, Router } from "origamicore";

export default class StorageRouter
{
    static async useFile(id:string,data:any):Promise<boolean>
    {
        var response= await Router.runInternal('storage','useFile',new MessageModel({data:{
             id,
             data
         }}))
         return response.response.data; 

    }

}