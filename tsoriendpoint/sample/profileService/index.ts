 
import {OriInjectable,PackageIndex,DataInput, OriService, SessionInput,ModuleConfig, RouteResponse, HttpMethod} from "origamicore"; 
import ProfileConfig from "./models/profileConfig";
import ProfileModel from "./models/profileModel";
import Roles from "./models/roles";
 

@OriInjectable({domain:'profile'})
class ProfileService implements PackageIndex
{ 
    name:string='profile';
    jsonConfig(moduleConfig: ProfileConfig): Promise<void> { 
        return ;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        return;
    }
    stop(): Promise<void> {
        return;
    }
    
    @OriService({isPublic:true,route:'test/:id',method:HttpMethod.Get})
    async testRoute(id:string)
    { 
        return {id}
    }  
    @OriService({isPublic:true})
    async getProfile()
    { 
        return new ProfileModel({firstName:'vahid',lastName:'hossaini'})
    }   
    @OriService({isPublic:true})
    async adminLogin(name:string)
    { 
        //return name;
        return new RouteResponse({session:{userid:name,role:Roles.Admin}})
    }    
    @OriService({isPublic:true})
    async login(name:string)
    { 
        //return name;
        return new RouteResponse({session:{userid:name,role:null }})
    }    
    @OriService( )
    async isLogin()
    { 
        //return name;
        return new RouteResponse({})
    }   
    @OriService( )
    async queueTest()
    { 
        return new Promise((res,rej)=>{
            setTimeout(()=>{
                res(true)
            },300)
        }) 
    }   
    @OriService({roles:[Roles.Admin]} )
    async isAdmin()
    { 
        //return name;
        return new RouteResponse({})
    } 
    @OriService({isPublic:false})
    async saveProfile(@DataInput({classType:ProfileModel}) info,@SessionInput session)
    {
        console.log('info>',info);
        console.log('session>',session);
        
    }
 
    @OriService({isInternal:true})
    async openSession(@SessionInput session)
    { 
        console.log('Connection Opend >',session);
        
    }
    @OriService({isInternal:true})
    async closeSession(@SessionInput session)
    { 
        console.log('Connection Closed >',session);
        
    }
}
export default ProfileService