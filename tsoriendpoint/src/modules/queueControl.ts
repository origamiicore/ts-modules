import QueueController from "../models/queueController";

let temp={}
let configs:any={};
export default class QueueControl
{
    config:QueueController;
    constructor(config:QueueController)
    {
        this.config=config;
        for(let a of config.limits)
        {
            for(let q of a.services)
            {
                let key=`${a.domain}_${q}`
                configs[key]=a.delayPerSec;
            }
        }
    }
    check(domain:string,service:string,session:any)
    {
        
        if(session && session.superadmin) return true;
        let key=`${domain}_${service}`
        let userid=session?.userid
        if(configs[key])
        {
            let now=new Date().getTime();
            if(!temp[userid])
            {
                temp[userid]=now + 1000 * configs[key]
                return true;
            }
            else
            {
                if(temp[userid]>now)
                {
                    return false
                }
                temp[userid]=now + 1000 * configs[key]
                return true;
            }
        }
        return true;
    }
}