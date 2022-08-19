import EventModel from "../models/eventModel";

const Web3 = require('web3'); 

export default class EvmRouter
{
    url:string;
    socketUrl:string;
    abi:any;
    address:string;
    
    constructor(url:string,socketUrl:string,abi:any,address:string)
    {
        this.url=url;
        this.socketUrl=socketUrl;
        this.abi=abi;
        this.address=address;
    }
    readEvent<T>(useSocket:boolean,eventName:string,fromBlock:number,
        cls: { new(data:any,content?:any): T },
        response:(data:EventModel<T>)=>void,interval:number=10000)
    {
        var self=this;

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

                        await response(new EventModel(hmyContract,event,cls))

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
                try{
                    let options = { 
                        fromBlock: fromBlock,
                        toBlock: 'latest'
                    }; 
                    var results =await myContract.getPastEvents(eventName, options)
                    for(var res of results)
                    {
                        await response(new EventModel(myContract,res,cls))
                        fromBlock=res.blockNumber+1;
                    }
                }catch(exp){

                }
                worker=false;
            },interval)
        }
        
    }
}