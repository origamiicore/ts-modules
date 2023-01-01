import HpConfig from "../models/hpConfig";
import {HyperionStreamClient,StreamClientEvents} from  '@eosrio/hyperion-stream-client'  ;
const fetch=require('fetch') ; 


export default class HpController
{
    config:HpConfig;
    constructor(config:HpConfig)
    { 
        this.config=config;
    }
    async start(listener,self)
    {  
        const client = new HyperionStreamClient({
                endpoint:this.config.netUrl,
                debug: true,
                libStream: false
            }
          //, {async: true,fetch:fetch}
        );  
        client.on(StreamClientEvents.CONNECT,async() => { 
            console.log(this.config.name,' connected!');  
            if(this.config.actions)
                for(let a of this.config.actions)
                {
                    if(!a.read_until)a.read_until=0;
                    if(!a.filters)a.filters=[];
                    if(!a.account)a.account='';
                    console.log(JSON.stringify(a))  
                    client.streamActions(a);

                }
            if(this.config.tables)    
                for(let a of this.config.tables)
                {
                    if(!a.read_until)a.read_until=0;
                    if(!a.scope)a.scope='';
                    if(!a.payer)a.payer=''; 
                    client.streamDeltas(a);
                }
        });
        
        client.setAsyncDataHandler(async (data ) => { 
            await listener(data,self);

        }) 
        client.connect();
        if(this.config.autoConnect)
        {
            setInterval(()=>{
                console.log(client.online);
                
                if(!client.online)
                {
                    client.connect()
                }
            },60000)
        }
    }
}