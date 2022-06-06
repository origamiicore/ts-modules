import {ModuleConfig, SessionInput, OriService, PackageIndex, ResponseDataModel, RouteResponse,DataInput, OriInjectable} from 'origamits' 
import { MangoRouter } from 'tsorimongo';
import AuthConfig from './models/authConfig';
import UserModel from './models/userModel';
import UserScheama from './dbModels/userScheama';
import {CaptchaRouter} from 'tsoricaptcha'
import ErrorMessage from './models/errorMessage';
import {RedisRouter} from 'tsoriredis'
import {CommonService} from 'tsoribase'
const uuid=require('uuid');
@OriInjectable({domain:'captcha'})
export default class TsOriAuth implements PackageIndex
{
    name: string='auth';
    config:AuthConfig;
    userModel:MangoRouter<UserModel>;
    redis:RedisRouter;
    jsonConfig(moduleConfig: ModuleConfig): Promise<void> {
        this.config=moduleConfig as AuthConfig;
        this.userModel=UserScheama(this.config.dbContext) 
        this.redis=new RedisRouter(this.config.dbContext);
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
        return new RouteResponse({response:new ResponseDataModel({data:session})})
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
        this.userModel.findById(user.username);
        return RouteResponse.success({})
    }


    //use sms
    @OriService({isPublic:true,})
    async requestSms(mobile:string,captchaId:string):Promise<RouteResponse>
    {
        var isvalid =await CaptchaRouter.Validate(captchaId);
        if(!isvalid)return ErrorMessage.captchaValidate;
        var code= CommonService.randomNumber(5)
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
            var existPhone=await this.userModel.search().where({phoneNumber:mobile}).findOne();
            var userid='';
            if(!existPhone){
                userid=uuid.v4();
                var user=new UserModel({_id:userid,phoneNumber:mobile});
                await this.userModel.InsertOne(user);
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