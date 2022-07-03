import { RouteResponse,ResponseDataModel } from "origamicore";
import EmailConfig from "../models/emailConfig";
import ErrorMessages from "../models/errorMessages";
import TemplateModel from "../models/templateModel";
import DriverBase from "./driverBase";
const nodemailer = require('nodemailer');
const uuid = require("uuid");
export default class EmailDriver implements DriverBase
{
    config:EmailConfig;
    transporter:any;
    constructor(config:EmailConfig)
    {
        this.config=config;
        this.transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port | 465,
                secure: config.secure, // true for 465, false for other ports
                auth: {
                    user: config.username, // generated ethereal user
                    pass: config.password  // generated ethereal password
                }
            });
    }
    sendMessage(template:TemplateModel,data:any): Promise<RouteResponse> {
        
		for(var x in data)
		{
			template.title= template.title.replaceAll('{{'+x+'}}',data[x])
			template.text= template.text.replaceAll('{{'+x+'}}',data[x])
			template.html= template.html.replaceAll('{{'+x+'}}',data[x])
		}
		let mailOptions = {
			from: this.config.fromEmail, // sender address
			to: data.to, // list of receivers
			subject: data.title, // Subject line
			text: data.text, // plain text body
			html: data.html // html body
		};
        return new Promise((res,rej)=>{
            this.transporter.sendMail(mailOptions, async(error, info) => {
                if (error) {  
                    return res(ErrorMessages.unknownError(error))
                }   
                return new RouteResponse({response:new ResponseDataModel({isDone:true})});
            }); 

        })
    }
}