import { OriProps,IOriModel, OriModel } from "origamits"; 
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
    constructor(
        fields?: {
            _id?:string
            firstName?: string
            lastName?: string
            age?:number
        })
    {
        super();  
        if (fields) 
        { 
            
            Object.assign(this, fields); 
        }
    }
}