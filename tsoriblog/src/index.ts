import { ModuleConfig, OriInjectable, OriService, PackageIndex, RouteResponse, SessionInput } from "origamits";
import { MongoRouter, OdataResponse, SelectModel } from "tsorimongo";
import OdataModel from "tsorimongo/src/models/odataModel";
import BadgeModel from "./models/badgeModel";
import BlogConfig from "./models/blogConfig";
import BlogErrors from "./models/blogErrors";
import CategoryModel from "./models/categoryModel";
import DbModels from "./models/dbModels";
import PostModel from "./models/postModel";
import {StorageRouter} from 'tsoristorage';
const uuid =require('uuid');
@OriInjectable({domain:'blog'})
class TsOriBlog implements PackageIndex
{
    name: string='blog';
    config:BlogConfig;
    async jsonConfig(config: BlogConfig): Promise<void> {
        DbModels.post=new MongoRouter(config.dbContext,'blog_post',PostModel);
        DbModels.badge=new MongoRouter(config.dbContext,'blog_badge',BadgeModel);
        DbModels.category=new MongoRouter(config.dbContext,'blog_category',CategoryModel);
        this.config=config;
    }
    async start(): Promise<void> { 
    }
    restart(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    @OriService({isPublic:true})
    async getPosts():Promise<OdataResponse<PostModel>>
    { 
        var post=await DbModels.post.search({
            select:['_id','image','title','brief','badge','category','time','writer'],
            where:{active:true},
            showCount:true
        }).find();
        return post;
    }
    @OriService({isPublic:true})
    async getPost(id:string):Promise<PostModel|RouteResponse>
    {   
        var post=await DbModels.post.findById(id);
        if(!post)return BlogErrors.postNotFound;
        return post;
    }
    @OriService({})
    async savePost(post:PostModel,@SessionInput session):Promise<any>
    {    
        post.writer=session.userid;
        if(!post._id)post._id=uuid.v4();
        if(this.config.useOriStorage)
        {
            await StorageRouter.useFile(post.image,{domain:'blog',service:'post',id:post._id})
        }
        return await DbModels.post.saveById(post);
    }
    @OriService({isPublic:true})
    async getBadge():Promise<BadgeModel[]>
    {     
        return await (await DbModels.badge.search().find()).value;
    }
    @OriService({isPublic:true})
    async getCategory():Promise<CategoryModel[]>
    {     
        return await (await DbModels.category.search().find()).value;
    }
    @OriService({})
    async saveCategory(category:CategoryModel):Promise<any>
    {     
        return await DbModels.category.saveById(category);
    }
    @OriService({})
    async saveBadge(category:CategoryModel):Promise<any>
    {     
        return await DbModels.category.saveById(category);
    }

    @OriService({})
    async viewCategoryPost():Promise<any>
    {     
        return await DbModels.post.search({
            where:{active:true},
            select:['category']
        }).group([
            new SelectModel({name:'_id',title:'total',func:'count'})
        ])
    }

}
export default TsOriBlog