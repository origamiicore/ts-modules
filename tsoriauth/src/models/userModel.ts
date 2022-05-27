import { OriProps,IOriModel } from "origamits"; 
export default class UserModel extends IOriModel
{
    @OriProps({isRequired:true})
    username:string;
    @OriProps({isRequired:true})
    password:string;
    @OriProps({isRequired:true})
    email:string;
    @OriProps({isRequired:true})
    phoneNumber:string;
    @OriProps({})
    wrongCount:number;
    @OriProps({})
    wrongDate:number;
    @OriProps({})
    lockDate:number;
    constructor(
        fields?: {
            username?: string
            password?: string
            email?: string
            phoneNumber?: string
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}