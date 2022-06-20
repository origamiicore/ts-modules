import BaseDriverConfig from "./baseDriverConfig";

export default class TelegramConfig extends BaseDriverConfig
{
    telegramApi:string;
    context:string;
    dbContext:string;
    public constructor(
        
        fields: {
            context:string;
            telegramApi:string;
            dbContext:string;
        }) { 
        super(fields.context);
        if (fields) Object.assign(this, fields);
    }
}