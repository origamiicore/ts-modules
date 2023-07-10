import EndpointConnection from "../models/endpointConnection";
import ConnectionEvent, { ConnectionEventType } from "../models/socket/connectionEvent";
import JwtSessionManager from "../sessionManager/jwtSessionManager";
import RamsSessionManager from "../sessionManager/ramSessionManager";
import RedisSessionManager from "../sessionManager/redisSessionManager";
import SessionManager from "../sessionManager/sessionManager";
import EchoPortocol from "./soketPotocols/echo";

var WebSocketServer = require('websocket').server;
var http = require('http');
var https = require('https');
export default class SocketIndex
{
    sessionManager:SessionManager;
    config:EndpointConnection;
    constructor(config:EndpointConnection)
    {
        this.config=config;
    }
    async init()
    {
        var server:any={};
        var protocol=this.config.protocol;
        let openEvent:ConnectionEvent;
        let closeEvent:ConnectionEvent;
        if(this.config.events)
        {
            openEvent=this.config.events.filter(p=>p.type==ConnectionEventType.Open)[0];
            closeEvent=this.config.events.filter(p=>p.type==ConnectionEventType.Close)[0];
        }
        await this.setSessionManager(this.config);
        if(protocol.type=='http')
        {
            server=http.createServer((request, response)=> {
                response.writeHead(404);
                response.end();    
            })            
        }
        else
        {
            server=https.createServer((request, response)=> {
                response.writeHead(404);
                response.end();    
            })      
        }
        server.listen(protocol.port, ()=> {
            console.log( "\x1b[32m%s\x1b[0m",protocol.type+ ' Socket run at port '+protocol.port);
        });    
        var wsServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });
        wsServer.on('request', (request)=> {
            var connection:any ={}   
                       
            try{
                connection = request.accept(protocol.socketProtocol, request.origin); 
                if(protocol.socketProtocol=='echo-protocol')
                { 
                    if(openEvent)
                    {
                        EchoPortocol.sendEvent(connection,request.key,this.sessionManager,this.config,openEvent)
                    }
                    connection.on('message', (message)=> {
                        EchoPortocol.newMessage(message,connection,request.key,this.sessionManager,this.config);
                    })
                }               
                if(closeEvent)
                {
                    connection.on("close",()=>{    
                        EchoPortocol.sendEvent(connection,request.key,this.sessionManager,this.config,closeEvent)
                        // this.echoClose(connection,request.key,dist)
                    })
                }
                
            }catch(exp){
                console.log('Error>>>',exp)
            }
        })

    }
    async setSessionManager(config:EndpointConnection)
    {
        if(config.protocol.redisConfig)
        { 
            this.sessionManager=new RedisSessionManager();
            await this.sessionManager.init(config.protocol.redisConfig);
        }
        else if(config.protocol.jwtConfig)
        {
            this.sessionManager=new JwtSessionManager();
            await this.sessionManager.init(config.protocol.jwtConfig);
        }
        else
        {
            this.sessionManager=new RamsSessionManager();
            await this.sessionManager.init({});
        } 
    }
}