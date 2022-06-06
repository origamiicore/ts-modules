import { MangoRouter } from "tsorimongo";
import UserModel from "../models/userModel";

export default function getScheama(context:string):MangoRouter<UserModel>
{
    return new MangoRouter(context,'auth_user',UserModel);
}