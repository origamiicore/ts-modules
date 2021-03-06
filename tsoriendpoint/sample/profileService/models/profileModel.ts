import { OriProps,IOriModel, OriModel } from "origamicore"; 

@OriModel()
export default class ProfileModel extends IOriModel
{
    @OriProps({})
    firstName:string;
    @OriProps({})
    lastName:string;
    constructor(
        fields?: {
            firstName?: string
            lastName?: string
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}