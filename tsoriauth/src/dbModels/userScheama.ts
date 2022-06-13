import { MongoRouter } from "tsorimongo";
import UserModel from "../models/userModel";

export default function getScheama(context:string):MongoRouter<UserModel>
{
    return new MongoRouter(context,'auth_user',UserModel);
}