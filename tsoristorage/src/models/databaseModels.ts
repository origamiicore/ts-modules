import { MongoRouter } from "tsorimongo";
import FileModel from "./fileMode";

export default class DatabaseModels
{
    static file:MongoRouter<FileModel>;

}