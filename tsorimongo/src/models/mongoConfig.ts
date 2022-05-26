import { ModuleConfig } from 'origamits';
import DatabaseConnection from './databaseConnection';
export default class MongoConfig extends ModuleConfig
{
    connections:DatabaseConnection[] = []; 
    
    public constructor(
        
        fields?: {
            id?: string
            name?: string
            type?: 'module'|'service'
            connections?: DatabaseConnection[]
        }) {
        super(fields);
        if (fields) Object.assign(this, fields);
    }
}