export default class BoardModel
{
    name:string;
    score:string;
    profile:string;
    constructor(data:any)
    {
        Object.assign(this,data); 
    }
}