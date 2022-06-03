import SessionManager from "./sessionManager";
var session={}
export default class RamsSessionManager implements SessionManager
{
    init(config: any): Promise<void> {
        return;
    }
    getRandomToken()
    {
        var text='wertyuioplkjhgfdsazxcvbnm1234567890';
        var str='';
        for(var i=0;i<30;i++)
        {
            var rndNumber=Math.floor(Math.random()*text.length);
            str+=text[rndNumber];
        }
        return str;
    }
    async setSession(token: string, value: any): Promise<string> {
        if(!token)
        {
            token=this.getRandomToken();
        }
		try{
			session[token]={value}
		}catch(exp)
		{
			console.log(exp)
		} 
        return token;
    }
    async getSession(token: string): Promise<any> {
        return session[token]?.value;      
    }

}