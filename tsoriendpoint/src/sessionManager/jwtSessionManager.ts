import JwtConfig from "../models/jwtConfig";
import SessionManager from "./sessionManager";
import jsonwebtoken from 'jsonwebtoken'
export default class JwtSessionManager implements SessionManager
{
    config:JwtConfig;
    init(config: any): Promise<void> {
		this.config=new JwtConfig(config);
        return;
    }
    async setSession(token: string, value: any): Promise<string> {
        var resp="";
		try{
			
			resp=jsonwebtoken.sign(value, this.config.privateKey, { algorithm: this.config.algorithm});
		}catch(exp)
		{
			console.log(exp)
		}
        
        return resp;
    }
    getSession(token: string): Promise<any> {
        var self=this;
        return new Promise((res,rej)=>{
            jsonwebtoken.verify(token,self.config.publicKey,function(err, decoded){
                if(!err)
                {
                    return res(decoded)
                } 
                else 
                    return res({})
            });
        })
        
    }

}