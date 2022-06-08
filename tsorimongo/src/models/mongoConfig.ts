import { ModuleConfig } from 'origamits';
import DatabaseConnection from './databaseConnection';
export default class MongoConfig extends ModuleConfig
{
    connections:DatabaseConnection[] = []; 
    
    public constructor(
        
        fields?: {
            id?: string 
            connections?: DatabaseConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
        if(!fields?.id)
        {
            this.id=Math.random().toString();
        }
        this.name='mongo';
    }
}