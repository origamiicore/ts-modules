import EndpointConnection from "../models/endpointConnection";
import JwtSessionManager from "../sessionManager/jwtSessionManager";
import RamsSessionManager from "../sessionManager/ramSessionManager";
import RedisSessionManager from "../sessionManager/redisSessionManager";
import SessionManager from "../sessionManager/sessionManager";
import {Router,MessageModel,RouteResponse} from 'origamits' 
import AuthzEndpoint from "../models/authzEndpoint"; 
import ExtrnalService from "origamits/src/models/extrnalService";
import ErrorMessages from "../models/errorMessages";
import Authorization from "../modules/authorization";
import UploadFileModel from "../models/uploadFileModel";
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser'); 
var fs=require('fs')
var formidable= require('formidable') ;
var http = require('http');
var https = require('https');
export default class ExpressIndex
{
    sessionManager:SessionManager;
    config:EndpointConnection;
    constructor(config:EndpointConnection)
    {
        this.config=config;
    }
    async init()
    {
        var app = express();
        this.setPublic(app,this.config);
        this.setUrlParser(app,this.config);
        await this.setSessionManager(app,this.config);
        this.setCrossDomain(app,this.config);
        this.runServer(app,this.config);
        var self=this;
        app.use(async(req, res, next)=> { 
            
            var data = this.reqToDomain(req,self,res) 
            if(!data)
                return
			var session =req.session;
			
            let isAuthz = false;
            console.log(session);
            
            var route = Router.getRouteData(data.domain,data.service);
            if(!route)
            {
                return self.sendData(res,404,{message:ErrorMessages.notFound});
            }
            if(this.config.authz)
            { 
				try{
					isAuthz =await self.checkAuthz(session,data,self.config.authz);					
				}catch(exp)
				{
					console.log('exp>>',exp)
				}
            }
            else
            {
                isAuthz = Authorization.checkAuthorization(data.domain,data.service,session);
            }
            if(!isAuthz) 
                return self.sendData(res,403,{message:ErrorMessages.authz}) 
			var upload=await self.checkUpload(req,data,self)
			if(!upload)
				return self.sendData(res,413,{message:ErrorMessages.upload})
			try{
                
                var responseData=await Router.runExternal(data.domain,data.service,new MessageModel(data.body)) 
                
				var token= await this.setSession(req,responseData);
                var addedResponse=responseData?.addedResponse;
                if(addedResponse)
                {
                    if(responseData.addedResponse.redirect) 
                        return res.redirect(responseData.addedResponse.redirect) 
                    
                    if(responseData.addedResponse.directText)
                        return self.sendData(res,200,responseData.addedResponse.directText)

                    if(addedResponse.directFileDownload)
                    {
                        fs.readFile(addedResponse.directFileDownload,function(err, downloadData){ 
                            if(responseData.addedResponse.type)
                            {
                                res.set( 'Content-Type', responseData.addedResponse.type  );
                            }
                            return  self.sendData(res,200,downloadData)
                        })
                        return
                    } 
                }
                if(responseData.error)
                {
                    return self.sendData(res,500,responseData.error);
                } 

                var resp:any= responseData.response;       
                
				if(token)
					resp.token=token;
              return self.sendData(res,200,resp)
			}
			catch(exp)
			{
				console.log('exp>>',exp)
                return self.sendData(res,500,{message:exp})
			}
		});
    }
    
	async setSession(req,data:RouteResponse)
	{ 
		var token = req.header('authorization') 
		var sessionData=req.session
        console.log('-->>',data?.session);
        
		if(data?.session)
		{
            if(!sessionData)
                sessionData={}  
            for(var name in data.session)
            {
                if(data.session[name]==null)
                    delete sessionData[name]
                else {
                    sessionData[name]= data.session[name]
                }
            }
            delete data.session
			var key= await this.sessionManager.setSession(token,sessionData) 
			return key;
		}
		return "";
	}
	async getUploadFile(req,data:ExtrnalService):Promise<any>
	{
        return new Promise(async(res,rej)=>{    
			var form = new formidable.IncomingForm(); 
			if(data.maxUploadSize)
				form.maxFileSize =data.maxUploadSize
			form.parse(req, function (err,fields, files) {
				if(err )
					return  rej(err)
                var response=fields;
                for(var a in files)   
                { 
                    var fileData=files[a];
                    var file=new UploadFileModel({
                        path:fileData.filepath,
                        name:fileData.originalFilename,
                        size:fileData.size,
                        type:fileData.mimetype,
                    });
                    response[a]=file;
                } 
				res(response)
			});
		})
	}
	async checkAuthz(session,dt,authz:AuthzEndpoint):Promise<boolean>
    { 
        return new Promise( async(res,rej)=>{            
            if(session && session.superadmin)
                return res(true)
            try{ 
                var data= Router.runExternal(authz.domain,'checkRole',new MessageModel({data:{domain:dt.domain,service:dt.service},session:session})
                );
                res(!!data)
            }catch(exp){

                    return res(false)
            }
             
        })
    }
	async checkUpload(req,data,self:ExpressIndex)
	{
        var route:ExtrnalService= Router.getRouteData(data.domain,data.service)
		if(route && route.maxUploadSize!=null)
		{ 
			try{ 
				data.body= await self.getUploadFile(req,route) 
			}
			catch(exp){ 
				console.log('exp>>',exp)
				return false;
			}
		}
		return true;
	}

    sendData(res,status,data)
    { 
        return res.status(status).send(data)
    }
	reqToDomain(req,self:ExpressIndex,res)
    {
        var url_parts = url.parse(req.url, true); 
        var seperate = url_parts.pathname.split('/')
        if(!seperate || seperate.length!=3)
        {
            self.sendData(res,200,{m:'endpoint001'})
            return
        }  
        var returnData:any={
            domain:seperate[1],
            service:seperate[2]
        }
        var session = req.session;
		console.log('>>>',req.session);
		console.log('>>>',req.header('authorization') );
        var body:any={
            session:session,
        }
        if(req.method=='GET')
        {
            body.data = {};
			for(var a in url_parts.query)
				body.data[a]=url_parts.query[a]
			
            if(req.body)
                for(var a in req.body){
                    body.data[a]=req.body[a] 
            }
        }
        else
        { 
            body.data=req.body 
            var bx = url_parts.query; 
            for(var a in bx)
            {
                body.data[a]=bx[a]
            } 
        }
        returnData.body=body
        return returnData
    }
	runServer(app,config:EndpointConnection)
    {
		var pr=config.protocol;
        if(pr.type=="http")
        { 
            var server = http.createServer(app);
            server.listen(pr.port);
            console.log("\x1b[32m%s\x1b[0m",'http run at port '+ pr.port);
        }
        if(pr.type=="https")
        { 
            var privateKey  = fs.readFileSync(pr.key, 'utf8');
            var certificate = fs.readFileSync(pr.crt, 'utf8');
            var credentials = {key: privateKey, cert: certificate};
            var server = https.createServer(credentials,app);
            server.listen(pr.port);
            console.log("\x1b[32m%s\x1b[0m",'http run at port '+ pr.port);
        }
    }
	setUrlParser(app,config:EndpointConnection)
    {
        
        if(config.limit?.bodyLimit)
            app.use(bodyParser.json({limit: config.limit.bodyLimit*1026*1024}));
        else    
            app.use(bodyParser.json());
            
        if(config.limit?.urlLimit)
            app.use(bodyParser.urlencoded({limit: config.limit.urlLimit*1026*1024,extended: true}));
        else 
            app.use(bodyParser.urlencoded({extended: true}));
    
    }
    async setSessionManager(app,config:EndpointConnection)
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
		app.use( (req, res, next)=>{
            var token = req.header('authorization')
            this.sessionManager.getSession(token).then((data)=>{ 
				req.session=data;
				next();
			}).catch(()=>{
				next()
			});
		})
    }
	setPublic(app:any,config:EndpointConnection)
    { 
        for(var folder of config.publicFolder)
        {
            console.log('>>',folder);
            
            app.use(express.static(folder));
        }
    }
	setCrossDomain(app:any,config:EndpointConnection)
    {
        if(!config.crossDomain)return;
        for(var cross of config.crossDomain)
        {

            app.use(function (req, res, next) {  
                if ('OPTIONS' == req.method) {
                    if(cross=='*')
                        res.header('Access-Control-Allow-Origin', req.headers.origin);
                    else
                        res.header('Access-Control-Allow-Origin', cross);
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
                    res.setHeader('Access-Control-Allow-Credentials', true);
                    res.status(200).send('OK');
                }
                else
                {
                    if(cross=='*')
                        res.header('Access-Control-Allow-Origin', req.headers.origin);
                    else
                        res.header('Access-Control-Allow-Origin', cross);
                        res.setHeader('Access-Control-Allow-Credentials', true);
                    next()
                }
            });
        }
    }
}