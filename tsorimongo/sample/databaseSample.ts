import OrigamiTs, { ConfigModel } from "origamits";
import { DatabaseConnection, MangoRouter, MongoConfig, TsOriMongo } from "..";
import ProfileModel from "./models/profileModel";

export default class DatabaseSample
{
    constructor(){
        this.init()
    }
    async init()
    {
        var context='default';
        var config=new ConfigModel({
            packageConfig:[
                  new MongoConfig({
                      id:'1',
                      name:'mongo',
                      type:'module',
                      connections:[
                        new DatabaseConnection({
                            database:'oridb-test',
                            name:context,
                        })
                      ]
                  })
            ]
        });
        
        var origamicore = new OrigamiTs(config);
        await origamicore.start([
            new TsOriMongo() 
        ])   
        var coll = new MangoRouter('default','profile',ProfileModel);
        try{
            // var insertData= await coll.InsertOne(new ProfileModel({
            //     _id:'2',
            //     firstName:'vahid',
            //     lastName:'hossaini',
            //     age:12
            // }))
            // console.log('1>>',insertData);
            // var insertManyData= await coll.InsertMany(
            //     [
            //         new ProfileModel({
            //             _id:'3',
            //             firstName:'name 3',
            //             lastName:'lastname 3',
            //             age:3*3
            //         }),
            //         new ProfileModel({
            //             _id:'4',
            //             firstName:'name 4',
            //             lastName:'lastname 4',
            //             age:3*4
            //         }),
            //     ]
            // )
            // console.log('insertMany>>',insertManyData);
            // var updateOneData =await coll.UpdateOne({_id:'1'},{set:{firstName:'name1'},inc:{age:2}})
            // console.log('updateOne>>',updateOneData);
            // var updateManyData =await coll.UpdateMany({age:12},{inc:{age:1}})
            // console.log('updateOne>>',updateManyData);
            var replaceData=await coll.Replace({_id:'1'},new ProfileModel({age:22,firstName:'r1',lastName:'r2'}))
            console.log('replaceData',replaceData);
            
            var records= await coll.search().select(['firstName','age']).find();
            console.log('2>>',records);

        }catch(exp){
            console.log('>>',exp);
            
        }
        
    }
}
new DatabaseSample()