export default class ErcEvent
{
    id:string;
    race:number;
    gender:number;
    constructor(data:any)
    {
        this.id=data.id;
        this.race=data.race;
        this.gender=data.gender;
    }
}