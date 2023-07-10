import { OriProps,IOriModel, OriModel } from "origamicore"; 
@OriModel()
export default class ProfileModel extends IOriModel
{
    @OriProps({})
    _id:string;
    @OriProps({})
    firstName:string;
    @OriProps({})
    lastName:string;
    age:number;
    isValidate:boolean
    constructor(
        fields?: {
            _id?:string
            firstName?: string
            lastName?: string
            age?:number
            isValidate:boolean
        })
    {
        super();  
        if (fields) 
        { 
            
            Object.assign(this, fields); 
        }
    }
}