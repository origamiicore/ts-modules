export default class BackupModel
{ 
    path:string='';
    tables:string='';
    secPeriod:number=0;
    public constructor(
        fields?: {
            path?: string,
            tables?: string, 
            secPeriod?: number, 
        }) {
        if (fields) Object.assign(this, fields);
    }
}