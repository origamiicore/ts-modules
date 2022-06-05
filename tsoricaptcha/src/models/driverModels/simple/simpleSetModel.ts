export default class SimpleSetModel
{
    id:string;
    code:string;
    constructor( 
        fields: { 
            id:string;
            code:string;
    }){
        if(fields)
            Object.assign(this,fields); 
    }
}