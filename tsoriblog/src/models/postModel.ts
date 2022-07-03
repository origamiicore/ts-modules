import { IOriModel, OriModel } from "origamicore";
@OriModel()
export default class PostModel extends IOriModel
{
    _id:string;
    image:string;
    title:string;
    brief:string;
    badge:number;
    category:number;
    time:number;
    writer:string;
    tag:string[];
    text:string;
    active:boolean;
    constructor(fields?:{
        _id?:string;
        image?:string;
        title?:string;
        brief?:string;
        badge?:number;
        category?:number;
        time?:number;
        writer?:string;
        tag?:string[];
        text?:string;
        active?:boolean;

    })
    {
        super()
        if(fields)Object.assign(this,fields);
    }
}