export default class SimpleDriverConfig
{
    width:number=80;
    height:number=30;
    length:number=5;
    expire:number=60*2;//sec
    storage:'ram'|'redis';
    constructor( 
        fields: { 
            width?:number;
            height?:number;
            length?:number;
            expire?:number;
            storage:'ram'|'redis';
    }){
        if(fields)
            Object.assign(this,fields); 
    }
}