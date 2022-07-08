export default class ApiResponse<T>
{
    more:boolean;
    next_key:string;
    rows:T[]=[]; 
    constructor(data:any,cls: { new(data:any): T })
    { 
        this.next_key=data.next_key;
        this.more=data.more;
        for(var row of data.rows)
        {
            this.rows.push(new cls(row));
        }
    }
}
 