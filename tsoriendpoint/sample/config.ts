
import {ConfigModel} from "origamits";
import ConnectionProtocol from "../src/models/connectionProtocol";
import EndpointConfig from "../src/models/endpointConfig";
import EndpointConnection, { EndpointConnectionType } from "../src/models/endpointConnection";
import ProfileConfig from "./profileService/models/profileConfig";

 
export default new ConfigModel({
    packageConfig:[
         new EndpointConfig({
             id:'1',
             type:'module',
             name:'endpoint',
             connections:[
                 new EndpointConnection({
                     type:EndpointConnectionType.Express,
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