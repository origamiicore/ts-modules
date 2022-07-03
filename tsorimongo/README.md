# TypeScript TsOriMongo

## Installation
OriEndpoint requires [OrigamiCore](https://www.npmjs.com/package/origamicore)  to run.
```sh
npm install origamicore
npm install tsorimongo
```

## Samples
[MongoDb CRUD](https://github.com/origamiicore/ts-modules/tree/main/tsorimongo/sample)


### Insert 
```
        var insertData= await coll.InsertOne(new ProfileModel({
            _id:'2',
            firstName:'vahid',
            lastName:'hossaini',
            age:12
        })) 
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
```

### Update 
```
        var updateOneData =await coll.UpdateOne({_id:'1'},{set:{firstName:'name1'},inc:{age:2}})
        var updateManyData =await coll.UpdateMany({age:12},{inc:{age:1}})
        var replaceData=await coll.Replace({_id:'1'},new ProfileModel({age:22,firstName:'r1',lastName:'r2'}))
```

### Delete 
```
        var deleteOneData=await coll.deleteOne({_id:'1'})
        var deleteOneData=await coll.deleteOne({_id:'3'})
        var deleteManyData=await coll.deleteMany({age:13})
```

### Search 
```
        var records:OdataResponse<ProfileModel>;
        records= await coll.search().select(['firstName','age']).find();
        records= await coll.search().count().find();
        records= await coll.search().select(['lastName'])
        .group([
            new SelectModel({func:'sum',name:'age',title:'ageTitle'}),
            new SelectModel({func:'count',name:'age',title:'ageCount'}),
        ]).find();
        records= await coll.search().where({age:{$gt:10}}).find();
        records= await coll.search().where({age:{$lt:10}}).find();
        records= await coll.search().where({age:{$eq:null}}).find();
        records= await coll.search().where({age:{$ne:null}}).find();
        records= await coll.search().where({age:{$lt:10}}).whereAnd({age:{$gt:5}}).find();
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).find();
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).sort(new SortModel({name:'age',type:'desc'})).find();
        records= await coll.search().where({age:{$lt:10}}).whereOr({age:{$eq:null}}).sort(new SortModel({name:'age',type:'asc'})).find();
        records= await coll.search().limit(2).find();
        records= await coll.search().limit(2).skip(1).find();
        records= await coll.search()
        .select(['age','firstName'])
        .where({_id:{$ne:'2'}})
        .odata(new OdataModel({
            $count:true,
            $top:4,
            $skip:1,
            $filter:'age gt 3',
            $orderby:'age desc',
            $select:'age,lastName'     
        })).find();
        var record= await coll.search().where({age:{$ne:null}}).findOne();
```
