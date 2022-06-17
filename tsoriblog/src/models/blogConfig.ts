import { ModuleConfig } from "origamits";
 
export default class BlogConfig extends ModuleConfig
{  
    dbContext:string;
    useOriStorage:boolean;
    public constructor(
        
        fields?: {
            id?: string 
            dbContext:string;
            useOriStorage:boolean;
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        this.name='blog'
        this.id??=Math.random().toString();
    }
}