import DatabaseConnection from "../models/databaseConnection";
const parser = require('odata-v4-parser');
const { MongoClient } = require("mongodb");
export default class MongoService
{
    connection:DatabaseConnection;
    client:any;
    database:any;
    constructor(connection:DatabaseConnection)
    {
        this.connection=connection;
        var uri='mongodb+srv://';
        if(connection.username)
        {
            uri+=connection.username+':'+connection.password+'@'
        }
        uri+=connection.host+':'+connection.port+'/'+connection.database;
        this.client= new MongoClient(uri);
    }
    async connect()
    {
        try{
            await this.client.connect();
            this.database=this.client.db(this.connection.database);
        }catch(exp){
            console.log(exp);            
        }
    }
}