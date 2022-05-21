import { ModuleConfig } from 'origamits';
import DatabaseConnection from './databaseConnection';
export default class MongoConfig extends ModuleConfig
{
    connections:DatabaseConnection[] = []; 
}