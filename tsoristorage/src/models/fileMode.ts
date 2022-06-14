import { IOriModel, OriModel } from "origamits";

@OriModel()
export default class FileModel extends IOriModel
{
    _id:string;
    path:string;
    type:string;
    name:string;
    size:number;
    constructor(
        fields?:{ 
            _id:string;
            path:string;
            type:string;
            name:string;
            size:number;
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