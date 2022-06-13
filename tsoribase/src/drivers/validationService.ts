const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const usernameRegexp =/^[a-zA-Z0-9_]*$/;
var passwordValidator = require('password-validator');
export default class ValidationService
{
    static checkEmail(email:string):boolean
    {
        return emailRegexp.test(email)
    }
    static checkUsername(username:string,
        fields?:{
            min:number;
            max:number;
        }
        ):boolean
    { 
        if(!username)return false;
        if(username.length<(fields?.min??8))return false;
        if(username.length>(fields?.max??20))return false;
        return usernameRegexp.test(username)
    }
    static checkPassword(password:string,
        fields?:{
            min:number;
            max:number;
            uppercase:number;
            lowercase:number;
            digits:number;
        }
        ):boolean
    { 
        if(!password)return false;
        var schema = new passwordValidator(); 
        schema
        .is().min(fields?.min??8)
        .is().max(fields?.max??20) 
        .has().digits(fields?.digits??1) 
        .has().not().spaces()
        if(fields?.uppercase??1)
        {
            schema.has().uppercase(fields?.uppercase??1)  
        }
        if(fields?.lowercase??1)
        {
            schema.has().lowercase(fields?.lowercase??1)  
        }
        if(fields?.digits)
        {
            schema.has().digits(fields?.digits)  
        }

        return schema.validate(password)
    }
}