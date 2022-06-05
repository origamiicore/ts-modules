import ITemp from "./tempInterface";

export default class RamTemp implements ITemp
{
    temp:any={};
    expire:number;
    constructor(expire)
    {
        this.expire=expire;
        setInterval(()=>{
            var deleted=[];
            var now=new Date().getTime();
            for(var a in this.temp)
            {
                if(this.temp[a].expire<now)
                {
                    deleted.push(a)
                }
            }
            for(var index of deleted)
            {
                delete this.temp[index];
            }
        },60*1000);
    }
    async clear(key: string): Promise<void> { 
        delete this.temp[key]
    }
    async getData(key: string): Promise<string> {
        return this.temp[key]?.value;
    }
    async setData(key: string,value:string): Promise<void> {
        this.temp[key]={
            value,
            expire:this.expire*1000+new Date().getTime()
        };
    }

}