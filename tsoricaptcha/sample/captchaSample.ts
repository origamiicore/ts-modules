import OrigamiCore, { ConfigModel } from "origamicore";
import TsOriEndpoint, { ConnectionProtocol, EndpointConfig, EndpointConnection, EndpointConnectionType } from "tsoriendpoint";
import TsoriCptcha, { CaptchaConfig, SimpleDriverConfig } from "..";
import TestService, { TestConfig } from "./testService";
var path = require('path');  

export default class CaptchaSample
{
    
    constructor()
    {
        this.init();
    }
    async init()
    {
        var config=new ConfigModel({
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
                     ]
                 }),
                new TestConfig({
                }) ,
                new CaptchaConfig({
                    id:'3',  
                    simpleDriver:new SimpleDriverConfig({storage:'ram'})
                }) 
            ]
        });
        var origamicore = new OrigamiCore(config);
        await origamicore.start()   
    }
}
new CaptchaSample()