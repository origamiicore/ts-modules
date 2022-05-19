import { Router } from "origamits";

export default class Authorization
{
    static checkAuthorization(domain:string,service:string,session:any):boolean
    { 
        if(session && session.superadmin) return true;
        var route = Router.getRouteData(domain,service);
        if(route.isPublic)return true;
        if(!session?.userid) return false;
        if(session.role && route.roles)
        {
            return  route.roles?.indexOf(session.role)>-1;
        }
        return true;
    }
}