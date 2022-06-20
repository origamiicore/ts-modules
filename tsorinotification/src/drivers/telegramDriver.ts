import { RouteResponse } from "origamits";
import { WebService } from "tsoribase";
import { MongoRouter } from "tsorimongo";
import TelegramConfig from "../models/telegramConfig";
import TelUserModel from "../models/telUserModel";
import TemplateModel from "../models/templateModel"; 
import DriverBase from "./driverBase";
const TelegramBot = require('node-telegram-bot-api');
export default class TelegramDriver  implements DriverBase
{
    config:TelegramConfig;
    user:MongoRouter<TelUserModel>;
    bot:any;
    constructor(config:TelegramConfig)
    {
        this.config=config;
        this.user=new MongoRouter(config.dbContext,'notification_tel_user',TelUserModel);

        const bot = new TelegramBot(config.telegramApi, {polling: true});
        this.bot=bot;
        bot.onText(/\/echo (.+)/, (msg, match) => { 
            console.log('1>>>>>>>>>>',msg);
            
            const chatId = msg.chat.id;
            const resp = match[1]; 
            bot.sendMessage(chatId, resp);
          });
           
          bot.on('message', async(msg) => {
            console.log(msg);
            const chatId = msg.chat.id; 
            if(msg.contact)
            {
                var phone=msg.contact.phone_number;
                var userid=msg.contact.user_id;
                await this.user.saveById(new TelUserModel({_id:userid,phoneNumber:phone}));
                bot.sendMessage(chatId, 'Phone Number Saved'); 
            }
            else
            {
                var option = {
                    "parse_mode": "Markdown",
                    "reply_markup": {
                        "one_time_keyboard": true,
                        "keyboard": [[{
                            text: "Share phone number",
                            request_contact: true
                        }], ["Cancel"]]
                    }
                };
                bot.sendMessage(chatId, 'Please share your phone number',option); 

            }
          });
    }
    async sendMessage(template:TemplateModel,data:any): Promise<RouteResponse> {
         
        var message=template.title+'\n'+template.html??template.text;  
        for(var i in data)
        {
            message= message.replace(`{{${i}}}` ,data[i]);
        }
        var user =await this.user.search({where:{phoneNumber:data.to}}).findOne()
        if(user)
        {
            this.bot.sendMessage(user._id,message)
            return  RouteResponse.success({});
        }
    }
}