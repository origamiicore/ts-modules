export default class SimpleValidateModel
{
    id:string; 
    constructor( 
        fields: { 
            id:string; 
    }){
        if(fields)
            Object.assign(this,fields); 
    }
}