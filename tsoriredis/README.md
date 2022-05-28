# TypeScript TsOriRedis

## Installation
OriEndpoint requires [OrigamiTs](https://www.npmjs.com/package/origamits)  to run.
```sh
npm install origamits
npm install tsoriredis
```

## Samples
[Redis Functions](https://github.com/origamiicore/ts-modules/tree/main/tsoriredis/sample/redisSample.ts)

### String Type
```
        var stringkey='stringkey'
        console.log('>',await con.exist(stringkey))
        console.log('>',await con.setValue(stringkey,'string 1'))
        console.log('>',await con.getValue(stringkey))
        console.log('>',await con.exist(stringkey))
        console.log('>',await con.getLength(stringkey,'string'))
        console.log('>',await con.delete(stringkey))
```

### JSON
```
        var jsonKey='jsonkey'
        console.log('>',await con.exist(jsonKey))
        console.log('>',await con.setValue(jsonKey,{name:'vahid'}))
        console.log('>',await con.getJsonValue(jsonKey))
        console.log('>',await con.exist(jsonKey))
        console.log('>',await con.getLength(jsonKey,'string'))
        console.log('>',await con.delete(jsonKey))
```

### Array
```
        var arrayKey='array-key';
        console.log('>',await con.addToArray(arrayKey,'a1'))
        console.log('>',await con.exist(arrayKey))
        console.log('>',await con.addToArray(arrayKey,'0',{createList:true}))
        console.log('>',await con.addToArray(arrayKey,'1'))
        console.log('>',await con.addToArray(arrayKey,'2'))
        console.log('>',await con.addToArray(arrayKey,'4'))
        console.log('>',await con.addToArray(arrayKey,'4'))
        console.log('>',await con.addToArray(arrayKey,'5')) 
        console.log('>',await con.getArray(arrayKey))
        console.log('>',await con.addToArray(arrayKey,'3',{setIndex:3}))
        console.log('>',await con.getArray(arrayKey))
        console.log('>',await con.getArray(arrayKey,{startIndex:2,endIndex:4}))
        console.log('>',await con.getArray(arrayKey,{startIndex:3}))
        console.log('>',await con.getArray(arrayKey,{endIndex:3}))
        console.log('>',await con.getLength(arrayKey,'solidArray'))
        console.log('lpop>',await con.pop(arrayKey))
        console.log('rpop>',await con.pop(arrayKey,'rigth'))
        console.log('>',await con.getArray(arrayKey))
        console.log('>',await con.exist(arrayKey))
        console.log('>',await con.delete(arrayKey))
        console.log('>',await con.delete(arrayKey))
```

### Unique Array
```
        var uarrayKey='uarray-key'
        console.log('>',await con.addToArray(uarrayKey,'a1',{type:'toUnique'}))
        console.log('>',await con.addToArray(uarrayKey,'a1',{type:'toUnique'}))
        console.log('>',await con.addToArray(uarrayKey,'a2',{type:'toUnique'}))
        console.log('>',await con.addToArray(uarrayKey,'a3',{type:'toUnique'}))
        console.log('>',await con.addToArray(uarrayKey,'a4',{type:'toUnique'}))
        console.log('>',await con.pop(uarrayKey,'unique'))
        console.log('>',await con.getArray(uarrayKey,{isUniqueu:true}))
        console.log('>',await con.exist(uarrayKey))
        console.log('>',await con.delete(uarrayKey))
```