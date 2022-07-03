import PackageConfig from 'origamicore';
import DatabaseConnection from './databaseConnection';
export default class DatabaseConfig extends PackageConfig
{
    connections:DatabaseConnection[] = [];

}