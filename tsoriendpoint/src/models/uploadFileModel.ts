export default class UploadFileModel
{
    path:string;
    type:string;
    name:string;
    size:number;
    public constructor(
        fields: { 
            path:string;
            type:string;
            name:string;
            size:number;
        }) {
        if (fields) Object.assign(this, fields);
    }
}