import HpConfig from "../models/hpConfig";

const HyperionSocketClient = require('@eosrio/hyperion-stream-client').default;
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
        const client = new HyperionSocketClient(this.config.netUrl, {async: true,fetch:fetch}); 
        client.onConnect = async() => { 
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
        }
        
        client.onData = async (data, ack) => { 
            await listener(data,self);
            ack();
        }
        client.connect(() => {
          console.log(this.config.name,' connected!');
        });
    }
}