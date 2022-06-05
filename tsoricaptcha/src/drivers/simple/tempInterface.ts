export default interface ITemp
{
    getData(key:string):Promise<string>;
    setData(key:string,value:string):Promise<void>;
    clear(key:string):Promise<void>;
} 