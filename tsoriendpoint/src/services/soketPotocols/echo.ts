import { MessageModel, Router } from "origamits";
import EndpointConnection from "../../models/endpointConnection";
import Authorization from "../../modules/authorization";
import SessionManager from "../../sessionManager/sessionManager";

export default class EchoPortocol{
    static async newMessage(message:any,connection:any,key:any,sessionManager:SessionManager,config:EndpointConnection)
    {
        if (message.type !== 'utf8')
            return this.response({message:'not support'},{},connection,sessionManager,key)
		var data:any={}
		try{
			data=JSON.parse(message.utf8Data)
		}catch(exp)
		{
			this.response({message:'Json Support'},{},connection,key,id)  
			return;
		}
        var id=data.id??1
		if(!data.domain || !data.service)
			return this.response({message:"wrong service"},{id:data.id},connection,sessionManager,id)
        var session= await sessionManager.getSession(data.token);
        var body:any={ 
            data:data.param,
            key
        }
        if(!body.data)
            body.data={}
        if(session)
        {
            body.session=session
        }
        if(config.authz)
        {
            var dt =Router.runExternal(config.authz.domain,config.authz.service,new MessageModel({data:{domain:data.domain,service:data.service},session:session.session}))
            if(!(await dt).error)
                return connection.sendUTF(JSON.stringify({error:'glb002',id}));
        }
        else
        {
            
            var isAuthz = Authorization.checkAuthorization(data.domain,data.service,session);
            if(!isAuthz) 
                return connection.sendUTF(JSON.stringify({error:'glb002',id}));
        }
        try{
            var resp= await Router.runExternal(data.domain,data.service,
                new MessageModel(body))
            this.response(null,resp,connection,sessionManager,id)
        }catch(exp){
            this.response(exp,null,connection,sessionManager,id)

        } 
    }
    static async response(err,data,connection,sessionManager:SessionManager,id)
    { 
		var resp:any={};		
        if(data &&  data.session)
        {  
            var t= await  sessionManager.setSession(data.authorization,data.session ) 
			if(t)resp.token=t;
        }
        if(data)
            delete data.session 
        var obj:any={
            error:err,
            data:data,
			session:resp
        }
        obj.id=id
        return connection.sendUTF(JSON.stringify(obj));
    }
}