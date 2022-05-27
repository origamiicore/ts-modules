import { MangoRouter } from "tsorimongo";
import TemplateModel from "../templateModel";

export default function getContext(dbcontext:string)
{
    return new MangoRouter(dbcontext,'notification_template',TemplateModel);
}