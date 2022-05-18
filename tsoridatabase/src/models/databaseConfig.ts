import PackageConfig from 'origamits';
import DatabaseConnection from './databaseConnection';
export default class DatabaseConfig extends PackageConfig
{
    connections:DatabaseConnection[] = [];

}