import { IOriModel, OriModel } from "origamicore";
@OriModel()
export default class CategoryModel extends IOriModel
{
    _id:number;
    title:string;
    active:boolean;
    constructor(fields?:{
        _id?:number;
        title?:string;
        active?:boolean;
    })
    {
        super()
        if(fields)Object.assign(this,fields);
    }
}