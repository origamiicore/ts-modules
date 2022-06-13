import { MangoRouter } from "tsorimongo";
import UserModel from "../models/userModel";

export default class DbModels{
    static userModel:MangoRouter<UserModel>;
}