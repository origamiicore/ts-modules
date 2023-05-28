import EventModel from "../models/eventModel";

const Web3 = require('web3'); 
const Provider = require('@truffle/hdwallet-provider');

export default class EvmRouter
{
    url:string;
    socketUrl:string;
    abi:any;
    address:string;
    showLog:boolean;
    constructor(url:string,socketUrl:string,abi:any,address:string,showLog:boolean=false)
    {
        this.url=url;
        this.socketUrl=socketUrl;
        this.abi=abi;
        this.address=address;
        this.showLog=showLog;
    }
    async send(name:string,params:any[],phrase:string,from:string)
    {
        let provider = new Provider({
            mnemonic: {
                phrase
            },
            providerOrUrl:this.url
        });
        const web3 = new Web3(provider);   
        const myContract = new web3.eth.Contract(this.abi, this.address,{from}); 
        await myContract.methods[name](...params).send({from });

    }
    async callMethod(name:string,params:any[])
    {
        const web3 = new Web3(this.url);   
        const myContract = new web3.eth.Contract(this.abi, this.address); 
        var dt = await myContract.methods[name](...params).call()
        return dt;
    }
    async callMethodByType<T>(name:string,params:any[],cls: { new(data:any,content?:any): T })
    {
        const web3 = new Web3(this.url);   
        const myContract = new web3.eth.Contract(this.abi, this.address); 
        var dt = await myContract.methods[name](...params).call()
        return new cls(dt);
    }
    readEvent<T>(useSocket:boolean,eventName:string,fromBlock:number,
        cls: { new(data:any,content?:any): T },
        response:(data:EventModel<T>)=>void,parent:any,blockStep:number=0,interval:number=10000)
    {
        var self=this;
        let name=response.name;
        if(useSocket)
        {
            var queue:any[]=[]
            var isWork:boolean=false;
            setInterval(async()=>{
                if(isWork)return;
                isWork=true;
                while(queue.length)
                {
                    var event=queue.splice(0,1)[0];
                    try{

                        await  parent[name](new EventModel(hmyContract,event,cls))
                        // await response(new EventModel(hmyContract,event,cls))

                    }catch(exp){
                        var a=0;
                    }
                }
                isWork=false;
            },1000)
            const hweb3 = new Web3(self.url);  
            const hmyContract = new hweb3.eth.Contract(self.abi, self.address); 

            const web3 = new Web3(self.socketUrl);   
            const myContract = new web3.eth.Contract(self.abi, self.address); 

            myContract.events[eventName]({
                fromBlock: fromBlock 
            })
            .on('data',async  (event) => {  
                queue.push(event)
            })
            .on('changed', changed => console.log('chaged',changed))
            .on('error', err => console.log('err',err))
            .on('connected', str => console.log('connect',str))
        }
        else
        {
            const web3 = new Web3(self.url);   
            const myContract = new web3.eth.Contract(self.abi, self.address); 
            var worker=false;
            setInterval(async()=>{
                if(worker)return;
                worker=true;

                if(blockStep)
                {
                    let eblock:number= await new Promise((res,rej)=>{
                        
                        web3.eth.getBlockNumber((error, blockNumber) => {
                            if(!error) {
                                res(blockNumber);
                            } else {
                                rej(error);
                            }
                        });
                    })
                    if(self.showLog)
                        console.log('getBlockNumber',eblock);
                    
                    while(true)
                    {
                        if(fromBlock>=eblock)
                        {
                            break;
                        }
                        try{
                            let next=Math.min(eblock,fromBlock+blockStep)
                            let options = { 
                                fromBlock: fromBlock,
                                toBlock: next
                            }; 
                            if(self.showLog)
                                console.log('<>>>',options);
                            
                            var results =await myContract.getPastEvents(eventName, options)
                            for(var res of results)
                            {
                                await  parent[name](new EventModel(myContract,res,cls)) 
                                fromBlock=res.blockNumber+1;
                            }
                            
                                fromBlock=next+1;
                        }catch(exp){
                            console.log(exp.message);
                            
                        }
                    }
                }
                else
                {

                    try{
                        let options = { 
                            fromBlock: fromBlock,
                            toBlock: 'latest'
                        }; 
                        var results =await myContract.getPastEvents(eventName, options)
                        for(var res of results)
                        {
                            await  parent[name](new EventModel(myContract,res,cls))
                            // await response(new EventModel(hmyContract,event,cls))
                            //await response(new EventModel(myContract,res,cls))
                            fromBlock=res.blockNumber+1;
                        }
                    }catch(exp){
                        console.log(exp.message);
                        
                    }
                }
                worker=false;
            },interval)
        }
        
    }
}