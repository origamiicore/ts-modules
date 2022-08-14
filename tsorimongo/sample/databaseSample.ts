import OrigamiCore, { ConfigModel, OdataModel } from "origamicore";
import { DatabaseConnection, MongoRouter, MongoConfig, OdataResponse, SelectModel, SortModel, TsOriMongo } from "..";

import ProfileModel from "./models/profileModel";

export default class DatabaseSample
{
    constructor(){
        this.init()
    }
    async update(coll:MongoRouter<ProfileModel>)
    {
        var updateOneData =await coll.UpdateOne({_id:'1'},{set:{firstName:'name1'},inc:{age:2}})
        console.log('updateOne>>',updateOneData);
        var updateManyData =await coll.UpdateMany({age:12},{inc:{age:1}})
        console.log('updateMany>>',updateManyData);
        var replaceData=await coll.Replace({_id:'1'},new ProfileModel({age:22,firstName:'r1',lastName:'r2'}))
        console.log('replaceData',replaceData);

    }
    async search(coll:MongoRouter<ProfileModel>)
    {
        var records:OdataResponse<ProfileModel>;
        records= await coll.search().select(['firstName','age']).find();
        console.log('1>>',records.toJson());
        records= await coll.search().count().find();
        console.log('2>>',records.toJson());
        records= await coll.search().select(['lastName'])
        .group([
            new SelectModel({func:'sum',name:'age',title:'ageTitle'}),
            new SelectModel({func:'count',name:'age',title:'ageCount'}),
        ]).find();
        console.log('3>>',records.toJson());
        
        records= await coll.search().where({age:{$gt:10}}).find();
        console.log('4>>',records.toJson());
        records= await coll.search().where({age:{$lt:10}}).find();
        console.log('5>>',records.toJson());
        records= await coll.search().where({age:{$eq:null}}).find();
        console.log('6>>',records.toJson());
        records= await coll.search().where({age:{$ne:null}}).find();
        console.log('7>>',records.toJson());
        records= await coll.search().where({age:{$lt:10}}).whereAnd({age:{$gt:5}}).find();
        console.log('8>>',records.toJson());
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).find();
        console.log('9>>',records.toJson());
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).sort(new SortModel({name:'age',type:'desc'})).find();
        console.log('10>>',records.toJson());
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).sort(new SortModel({name:'age',type:'asc'})).find();
        console.log('11>>',records.toJson());
        records= await coll.search().limit(2).find();
        console.log('12>>',records.toJson());
        records= await coll.search().limit(2).skip(1).find();
        console.log('13>>',records.toJson());
        records= await coll.search()
        .select(['age','firstName'])
        .where({_id:{$ne:'2'}})
        .odata(new OdataModel({
            $count:true,
            $top:4,
           // $skip:0,
            $filter:'age gt 3',
            $orderby:'age desc',
            $select:'age,lastName'     
        })).find();
        console.log('14>>',records.toJson());
        var record= await coll.search().where({age:{$ne:null}}).findOne();

        console.log('15>>',JSON.stringify (record));
        record= await coll.search().where({_id:'noid'}).findOne();
        console.log('16>>',JSON.stringify (record));

        records= await coll.search({where:{
            firstName:{
                $like:'%ame%'
            }
        }}).find();
        console.log('17>>',records.toJson());
    }
    async delete(coll:MongoRouter<ProfileModel>)
    {
        var deleteOneData=await coll.deleteOne({_id:'1'})
        console.log('deleteOne',deleteOneData);
        var deleteOneData=await coll.deleteOne({_id:'3'})
        console.log('deleteOne',deleteOneData);
        var deleteManyData=await coll.deleteMany({age:13})
        console.log('deleteMany',deleteManyData);
    }
    async insert(coll:MongoRouter<ProfileModel>)
    {
        var insertData= await coll.InsertOne(new ProfileModel({
            _id:'2',
            firstName:'vahid',
            lastName:'hossaini',
            age:12
        }))
        console.log('1>>',insertData);
        var insertManyData= await coll.InsertMany(
            [
                new ProfileModel({
                    _id:'1',
                    firstName:'name 1',
                    lastName:'lastname 1',
                    age:3*1
                }),
                new ProfileModel({
                    _id:'3',
                    firstName:'name 3',
                    lastName:'lastname 3',
                    age:3*3
                }),
                new ProfileModel({
                    _id:'4',
                    firstName:'name 4',
                    lastName:'lastname 4',
                    age:3*4
                }),
            ]
        )
        console.log('insertMany>>',insertManyData);
    }
    async init()
    {
        var context='default';
        var config=new ConfigModel({
            packageConfig:[
                  new MongoConfig({ 
                      connections:[
                        new DatabaseConnection({
                            database:'oridb-test',
                            name:context,
                        })
                      ]
                  })
            ]
        });
        
        var origamicore = new OrigamiCore(config);
        await origamicore.start( )   
        var coll = new MongoRouter('default','profile',ProfileModel);
        try{
            await this.insert(coll);
 
            

        }catch(exp){
            console.log('>>',exp);
            
        }
            await this.update(coll);
            await this.search(coll);
            await this.delete(coll);
        
    }
}
new DatabaseSample()