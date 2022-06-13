import { MongoRouter } from "tsorimongo";
import TemplateModel from "../templateModel";

export default function getContext(dbcontext:string)
{
    return new MongoRouter(dbcontext,'notification_template',TemplateModel);
}