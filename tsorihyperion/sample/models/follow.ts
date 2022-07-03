import { IOriModel, OriModel } from "origamicore";

@OriModel()
export default class Follow extends IOriModel
{
    _id:string;
    scope:string;
    username:string;
    time:string;
    constructor(data:any)
    {
        super();
        Object.assign(this,data);
        this._id=this.scope+'_'+this.username
    }
}

 