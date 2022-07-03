import { IOriModel, OriModel } from "origamicore";
@OriModel()
export default class TelUserModel extends IOriModel
{
    _id:number;
    phoneNumber:string;
    constructor(
        fields?: {
            _id:number;
            phoneNumber:string;
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}