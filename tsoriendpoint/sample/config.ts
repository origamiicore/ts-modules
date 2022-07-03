
import {ConfigModel} from "origamicore";
import {ConnectionProtocol,EndpointConfig,EndpointConnection,EndpointConnectionType} from "..";  
import ProfileConfig from "./profileService/models/profileConfig";

var path = require('path');  
export default new ConfigModel({
    packageConfig:[
         new EndpointConfig({ 
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
                    })
                })
             ]
         }),
        new ProfileConfig({ 
            readOnley:false
        }) 
    ]
});