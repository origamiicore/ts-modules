import {ModuleConfig, SessionInput, OriService, PackageIndex, ResponseDataModel, RouteResponse,DataInput, OriInjectable} from 'origamits' 
import { MongoRouter } from 'tsorimongo';
import AuthConfig from './models/authConfig';
import UserModel from './models/userModel';
import UserScheama from './dbModels/userScheama';
import {CaptchaRouter} from 'tsoricaptcha'
import ErrorMessage from './models/errorMessage';
import {RedisRouter} from 'tsoriredis'
import {CommonService,ValidationService} from 'tsoribase'
import {NotificationRouter} from 'tsorinotification'
import DbModels from './dbModels/dbModels';
import UserStatusModel from './models/userStatusModel';
const uuid=require('uuid');
var md5 = require('md5');
@OriInjectable({domain:'auth'})
export default class TsOriAuth implements PackageIndex
{
    name: string='auth';
    config:AuthConfig;
    
    redis:RedisRouter;
    jsonConfig(moduleConfig: AuthConfig): Promise<void> {
        this.config=moduleConfig;
        DbModels.userModel=new MongoRouter(this.config.dbContext,'auth_user',UserModel);
        this.redis=new RedisRouter(this.config.redisContext);
        return;
    }
    start(): Promise<void> {
        return;
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    @OriService({isPublic:true,})
    async login(
        @DataInput({isRequired:true}) username:string,
        @DataInput({isRequired:true}) password:string):Promise<RouteResponse>
    {  
        
        return
    }
    @OriService({isPublic:false,})
    async isLogin(@SessionInput session):Promise<RouteResponse>
    {  
        return   RouteResponse.success({});
    }
    @OriService({isPublic:true,})
    async register(@DataInput({classType:UserModel})user:UserModel,captchaId:string):Promise<RouteResponse>
    {  
        user.$oriExtraData.clearByTag('adminOnly');
        if(this.config.useCaptcha)
        {
           var isvalid =await CaptchaRouter.Validate(captchaId);
           if(!isvalid)return ErrorMessage.captchaValidate;
        }
        DbModels.userModel.findById(user.username);
        return RouteResponse.success({})
    }

    @OriService({isPublic:false,})
    async setPassword(@SessionInput session,
        @DataInput({}) username:string,
        @DataInput({isRequired:true}) password:string,
        @DataInput({isRequired:true}) newPassword:string ):Promise<true|RouteResponse>
    {
        var user =await  DbModels.userModel.findById(session.userid);
        if(!ValidationService.checkPassword(newPassword)) return ErrorMessage.wrongPassword;
        if(user.password && user.password!=md5(password))
        {
            return ErrorMessage.wrongOldPassword;
        }
        if(user.username && user.username!=user._id)
        {
            await  DbModels.userModel.findByIdAndUpdate(session.userid,{set:{password:md5(newPassword)}})
        }
        else
        {
            if(!ValidationService.checkUsername(username)) return ErrorMessage.wrongUsername;
            var exist= await  DbModels.userModel.search({where:{username}}).findOne();
            if(exist)return ErrorMessage.existUsername;
            await  DbModels.userModel.findByIdAndUpdate(session.userid,{set:{password:md5(newPassword),username}})
            
        }
        return true;
    }
    @OriService({isPublic:false,})
    async getStatus(@SessionInput session):Promise<UserStatusModel>
    {
        var status=new UserStatusModel();
        var user =await  DbModels.userModel.findById(session.userid);
        status.setPassword=!!user.password;
        status.verifyedEmail=!!user.email;
        status.verifyedPhoneNumber=!!user.phoneNumber;
        status.setUsername= !!(user.username && user.username!=user._id);
        return status;
    }

    //use sms
    @OriService({isPublic:true,})
    async requestSms(mobile:string,captchaId:string):Promise<RouteResponse>
    {
        var isvalid =await CaptchaRouter.Validate(captchaId);
        if(!isvalid)return ErrorMessage.captchaValidate;
        var code= CommonService.randomNumber(5);
        console.log('code >>> ',code);      
        var config=this.config.verifyMobile;
        NotificationRouter.sendMessage(config.context,config.template,{code:code,to:mobile});
        await this.redis.setValue(mobile,code.toString())
        await this.redis.expire(mobile,this.config.verifyMobile.expire);
        return RouteResponse.success(mobile);
    }
    @OriService({isPublic:true,})
    async verifySms(mobile:string,code:string):Promise<RouteResponse>
    {
        var existCode = await this.redis.getValue(mobile);
        if(!existCode) return ErrorMessage.wrongCode;
        await this.redis.delete(mobile);
        if(existCode==code)
        { 
            var existPhone=await DbModels.userModel.search().where({phoneNumber:mobile}).findOne();
            var userid='';
            if(!existPhone){
                userid=uuid.v4();
                var user=new UserModel({_id:userid,phoneNumber:mobile,username:userid});
                await DbModels.userModel.InsertOne(user);
            }
            else
            {
                userid=existPhone._id;
            }
            return new RouteResponse({session:{userid}, response:new ResponseDataModel({isDone:true})})
        }
        else
        {
            return ErrorMessage.wrongCode;
        }
    }
}