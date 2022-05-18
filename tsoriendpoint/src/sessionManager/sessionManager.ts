export default interface SessionManager
{

    init(config:any):Promise<void>;
    setSession(token:string,value:any):Promise<string>;
    getSession(token:string):Promise<any>;
}