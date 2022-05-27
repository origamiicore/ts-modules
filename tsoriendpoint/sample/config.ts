
import {ConfigModel} from "origamits";
import {ConnectionProtocol,EndpointConfig,EndpointConnection,EndpointConnectionType} from "..";  
import ProfileConfig from "./profileService/models/profileConfig";

var path = require('path');  
export default new ConfigModel({
    packageConfig:[
         new EndpointConfig({
             id:'1',
             type:'module',
             name:'endpoint',
             connections:[
                 new EndpointConnection({
                     type:EndpointConnectionType.Express,
                     publicFolder:[path.join(__dirname,'../../sample/public')],
                     protocol:new ConnectionProtocol({
                         type:'http',
                         port:9201
                     })
                 })
             ]
         }),
        new ProfileConfig({
            id:'2',
            type:'service',
            name:'profile',
            readOnley:false
        }) 
    ]
});