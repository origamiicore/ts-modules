import { OriProps,IOriModel, OriModel } from "origamicore"; 
@OriModel()
export default class TemplateModel extends IOriModel
{
    _id:string
    @OriProps({isRequired:true})
    title:string;
    @OriProps({isRequired:true})
    text:string;
    @OriProps({isRequired:true})
    name:string; 
    @OriProps({})
    html:string; 
    constructor(
        fields?: {
            _id:string
            title?: string
            text?: string
            name?: string
            html?: string
        })
    {
        super();  
        if (fields) 
        {
            Object.assign(this, fields); 
        }
    }
}