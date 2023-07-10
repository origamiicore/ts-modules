
import {ConfigModel,HttpMethod} from "origamicore";
import {ConnectionProtocol,EndpointConfig,EndpointConnection,EndpointConnectionType, IpController, QueueController, QueueLimit, ServiceLimit} from "..";  
import ProfileConfig from "./profileService/models/profileConfig";
import ConnectionEvent, { ConnectionEventType } from "../src/models/socket/connectionEvent";

var path = require('path');  
export default new ConfigModel({
    defaultMethod:HttpMethod.Get,
    packageConfig:[
         new EndpointConfig({  
             queue:new QueueController({
                limits:[
                    new QueueLimit({
                        delayPerSec:5,
                        domain:'profile',
                        services:['queueTest']
                    })
                ]
             })
             ,
            ipController:new IpController({
                limits:[
                    new ServiceLimit({ 
                        domain:'profile',
                        service:'login',
                        count:3,
                        delayPerSec:30,

                    }),
                    new ServiceLimit({ 
                        domain:'profile', 
                        count:10,
                        delayPerSec:50,

                    }),
                ]
            }),
             connections:[
                 new EndpointConnection({
                     type:EndpointConnectionType.Express,
                     publicFolder:[path.join(__dirname,'../../sample/public')],
                     protocol:new ConnectionProtocol({
                         type:'http',
                         port:9201
                     })
                 }),
                 
                 new EndpointConnection({
                    type:EndpointConnectionType.Soucket,
                    protocol:new ConnectionProtocol({
                        type:'http',
                        port:9202
                    }),
                    events:[
                        new ConnectionEvent({
                            domain:'profile',
                            service:'openSession',
                            type:ConnectionEventType.Open
                        }),
                        new ConnectionEvent({
                            domain:'profile',
                            service:'closeSession',
                            type:ConnectionEventType.Close
                        }),
                    ]
                })
             ]
         }),
        new ProfileConfig({ 
            readOnley:false
        }) 
    ]
});