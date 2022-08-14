var parser = require('odata-v4-parser');
export default class QueryService
{
    static methods(token)
    {
        if(token.method=="startswith")
        {
            var p=token.parameters
            var obj={}
            obj[this.convert(p[0])]={'$regex':"\^"+this.convert(p[1])+"",$options:'i'}
            //obj[convert(p[1])]={'$regex':\^convert(p[0])\}
            return obj
        }
        if(token.method=="endswith")
        {
            var p=token.parameters
            var obj={}
            obj[this.convert(p[0])]={'$regex':""+this.convert(p[1])+"\^",$options:'i'}
            //obj[convert(p[1])]={'$regex':\^convert(p[0])\}
            return obj
        }
        if(token.method=="substringof")
        {//regex
            var p=token.parameters
            var obj={}
            obj[this.convert(p[1])]={'$regex':this.convert(p[0]),$options:'i'}
            return obj
        }
    }  
    static convert (token)
    {
        var obj={} 
        if(token.value)
        { 
            if(token.type=="Literal")
            {
                 if(token.value=="Edm.Boolean")
                 {
                     return !!(token.raw)
                 }
                 if(token.value=="null")
                 {
                     return null
                 }
    
                 if(token.value=="Edm.SByte" || token.value=="Edm.Byte")
                 {
                     return parseInt(token.raw)
                 }
                 if(token.value=="Edm.Int16" || token.value=="Edm.Int32"||token.value=="Edm.Int64")
                 {
                     return parseInt(token.raw)
                 } 
    
    
            //Edm.DateTime
                 if(token.value=="Edm.Decimal"|| token.value=="Edm.Double"||token.value=="Edm.Single")
                 {
                     return parseFloat(token.raw)
                 }
    
                 if(token.value=="Edm.Guid")
                 {
                    return token.raw
                 }
                 if(token.value=="Edm.String")
                 {
                     return token.raw.substr(1,token.raw.length-2)
                 }
            }
            if(token.type=="MethodCallExpression")
            {
                return this.methods(token.value)
            }
            if(token.type=="ODataIdentifier")
            {
                return token.value.name
            }
            if(token.type=="AndExpression")
            {
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                return {"$and":[lf,cv]}
            }
            
            if(token.type=="OrExpression")
            {
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                return {"$or":[lf,cv]}
            }
            if(token.type=="EqualsExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                    s['$eq']=cv
                    obj[lf] =s
                
            }
            if(token.type=="GreaterThanExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                s['$gt']=cv
                obj[lf] =s
            }
            if(token.type=="GreaterOrEqualsExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                    s['$gte']=cv
                    obj[lf] =s
                
            }
            if(token.type=="LesserThanExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                    s['$lt']=cv
                obj[lf] =s
                
            }
            if(token.type=="LesserOrEqualsExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                    s['$lte']=cv
                obj[lf] =s
                
            }
            if(token.type=="NotEqualsExpression")
            {
                var s={}
                var cv=this.convert(token.value.right)
                var lf=this.convert(token.value.left) 
                    s['$ne']=cv
                    obj[lf] =s
                
            }
             
            if(token.value.current)
            {
                let cv=this.convert(token.value.current)+'.'+this.convert(token.value.next)
               return   cv
            }
            if(token.type=="PropertyPathExpression"||
            token.type=="CommonExpression"||
            token.type=="MemberExpression"||
            token.type=="SingleNavigationExpression"||
            token.type=="FirstMemberExpression")
                return this.convert(token.value)
        }
        return obj
    }
    static createOdataFilter(data:any)
    {
        return this.convert(parser.filter(data)) ;
    }
    static objectToWhere(obj)
    {
        if( typeof(obj)!='object' || obj.$in){
            return
        }
        for(var a in obj)
        { 
            if(obj[a] && obj[a].$bitAnd)
            {
                obj[a].$bitsAllSet=obj[a].$bitAnd
                delete obj[a].$bitAnd
            }
            if(obj[a] && obj[a].$bitNotAnd)
            {
                obj[a].$bitsAllClear=obj[a].$bitNotAnd
                delete obj[a].$bitNotAnd
            }
            if(obj[a] && obj[a].$bitOr)
            {
                obj[a].$bitsAnySet=obj[a].$bitOr
                delete obj[a].$bitOr
            }
            if(obj[a] && obj[a].$bitNoOr)
            {
                obj[a].$bitsAnyClear=obj[a].$bitNoOr
                delete obj[a].$bitNoOr
            }
            if(obj[a] && obj[a].$like)
            {
                
                var stval= new RegExp( obj[a].$like  )            
                if(obj[a].$like[0]=='%' && obj[a].$like[obj[a].$like.length-1]=='%')
                {
                    let val=obj[a].$like.substr(1,obj[a].$like.length-2)
                    stval = new RegExp(".*" + val + ".*");

                }
                else if( obj[a].$like[0]=='%' )
                {

                    let val=obj[a].$like.substr(1)
                    stval = new RegExp( val + "$" );
                }
                else if(  obj[a].$like[obj[a].$like.length-1]=='%')
                {
                    
                    let val=obj[a].$like.substr(0,obj[a].$like.length-1)
                    stval = new RegExp("^" + val  );
                }
                obj[a]={$regex:stval}
                console.log('????????',obj[a]);
                
            }
        } 
        
        if(obj.$and)
        {
            for(var x of obj.$and)
            {
                this.objectToWhere(x)
            }
        }
        if(obj.$or)
        {
            for(var x of obj.$or)
            {
                this.objectToWhere(x)
            }
        }
    }
}