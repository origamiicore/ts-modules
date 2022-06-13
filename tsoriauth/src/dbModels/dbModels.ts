import { MongoRouter } from "tsorimongo";
import UserModel from "../models/userModel";

export default class DbModels{
    static userModel:MongoRouter<UserModel>;
}