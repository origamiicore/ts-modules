 
import {OriInjectable,PackageIndex,DataInput, OriService, SessionInput,ModuleConfig, RouteResponse} from "origamits"; 
import ProfileModel from "./models/profileModel";
 

@OriInjectable({domain:'profile'})
class ProfileService implements PackageIndex
{ 
    name:string='profile';
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> { 
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
    
    @OriService({isPublic:true})
    async getProfile()
    { 
        return new ProfileModel({firstName:'vahid',lastName:'hossaini'})
    }   
    @OriService({isPublic:true})
    async login(name:string)
    { 
        //return name;
        return new RouteResponse({session:{userid:name}})
    }    
    @OriService( )
    async isLogin()
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
 
}
export default ProfileService