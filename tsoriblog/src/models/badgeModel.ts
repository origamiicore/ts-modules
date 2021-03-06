import { IOriModel, OriModel } from "origamicore";
@OriModel()
export default class BadgeModel extends IOriModel
{
    _id:number;
    title:string;
    className:string;
    constructor(fields?:{ 
        _id?:number;
        title?:string;
        className?:string;
    })
    {
        super()
        if(fields)Object.assign(this,fields);
    }
}