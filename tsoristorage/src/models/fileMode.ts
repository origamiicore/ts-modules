import { IOriModel, OriModel } from "origamicore";

@OriModel()
export default class FileModel extends IOriModel
{
    _id:string;
    path:string;
    type:string;
    name:string;
    size:number;
    isUsed:boolean=false;
    createdTime:number;
    useData:any;
    constructor(
        fields?:{ 
            _id:string;
            path:string;
            type:string;
            name:string;
            size:number;
            isUsed:boolean;
            createdTime:number;
            useData?:any;
        }
    )
    {
        super();
        if(fields)
        {
            Object.assign(this,fields);
        }
    }
}