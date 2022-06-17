import { MongoRouter } from "tsorimongo";
import BadgeModel from "./badgeModel";
import CategoryModel from "./categoryModel";
import PostModel from "./postModel";

export default class DbModels
{
    static post:MongoRouter<PostModel>;
    static badge:MongoRouter<BadgeModel>;
    static category:MongoRouter<CategoryModel>;
}