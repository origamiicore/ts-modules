export default class JwtConfig
{
    privateKey:string='';
    publicKey:string='';
    algorithm:string='';
    secExpireTime:number=0;
    public constructor(
        
        fields?: {
            privateKey?: string, 
            publicKey?: string, 
            algorithm?: string, 
            secExpireTime?: number, 
        }) { 
        if (fields) Object.assign(this, fields);
    }
}