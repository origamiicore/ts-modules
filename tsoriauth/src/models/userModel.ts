import { OriProps,IOriModel, OriModel } from "origamits"; 
@OriModel()
export default class UserModel extends IOriModel
{
    _id:string
    @OriProps({isRequired:true,})
    username:string;
    @OriProps({isRequired:true})
    password:string;
    @OriProps({isRequired:true})
    email:string;
    @OriProps({isRequired:true})
    phoneNumber:string;

    @OriProps({tags:'adminOnly'})
    wrongCount:number;
    @OriProps({tags:'adminOnly'})
    wrongDate:number;
    @OriProps({tags:'adminOnly'})
    lockDate:number;
    constructor(
        fields?: {
            _id?:string
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