import BackupModel from "./backupModel"; 

export default class DatabaseConnection
{
    name:string='';
    host:string='localhost';
    username:string='';
    password:string='';
    database:string='';
    port:number=27017; 
    backup:BackupModel;
    public constructor(
        fields?: {
            name?: string, 
            host?: string, 
            username?: string, 
            password?: string, 
            database?: string,  
            port?: number, 
            type?: number, 
            backup?:BackupModel
        }) {
        if (fields) Object.assign(this, fields);
    }
}