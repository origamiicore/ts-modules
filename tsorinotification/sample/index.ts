import OrigamiTs, { ConfigModel } from "origamits";
import { DatabaseConnection, MongoConfig, TsOriMongo } from "tsorimongo";
import TsOriNotification, { NotificationConfig, NotificationRouter, WebServiceConfig } from "..";
import TelegramConfig from "../src/models/telegramConfig";

class NotificationSample
{
    constructor()
    {
        this.init();
    }
    
    async init()
    {
        var context='default';
        var config=new ConfigModel({
            packageConfig:[
                new MongoConfig({ 
                    connections:[
                      new DatabaseConnection({
                          database:'oridb-test',
                          name:context,
                      })
                    ]
                }),
                  new NotificationConfig({ 
                        dbContext:context,
                        drivers:[
                            new TelegramConfig({
                                context:'telegram',
                                dbContext:context,
                                telegramApi:''
                            }),
                            new WebServiceConfig({
                                context:'sms',
                                header:{
                                    'ACCEPT': 'application/json',
                                    'X-API-KEY': 'gMgZFFN0nvf7O0mjUiraZrglCgdE6qGcU6tETXkkViYmNPpsBLfM56Gu5qvRcv1i'
                                },
                                sendUrl:'https://api.sms.ir/v1/send/bulk',
                                protocolType:'post'
                            })
                        ]
                  })
            ]
        });
        
        var origamicore = new OrigamiTs(config);
        await origamicore.start( )    
        NotificationRouter.sendMessage('telegram','1',{code:'12345',to:'+989378092520'})
        
        
    }
}
new NotificationSample()