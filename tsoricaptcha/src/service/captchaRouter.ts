import { MessageModel, Router } from "origamits";

export default class CaptchaRouter
{ 
    static async Validate(id:string):Promise<boolean>
    {  
        var data= await Router.runInternal('captcha','validate',new MessageModel({data:{
            data:{id}
        }}))
        return data.response.data; 
    }
}