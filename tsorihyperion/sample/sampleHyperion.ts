import OrigamiCore, { ConfigModel } from "origamicore";   
import { ActionModel, EventModel, EvmRouter, HpAction, HpTable, HyperionConfig, HyperionRouter, TableModel } from ".."; 
import abi from "./models/abi";
import ClaimedModel from "./models/clamedModel";
import CollectionItem from "./models/colllectionItem";
import ErcEvent from "./models/ercEvent";
import Follow from "./models/follow";
import tabi from "./models/tabi";
import TeleportModel from "./models/teleportModel";
//const abi=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"createNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]

var count:number=0;
var count1:number=0;
class SampleHyperion
{
    config:any={}
    constructor()
    {
        this.init();
    }
    getAction(data:ActionModel<CollectionItem>)
    {
        console.log('1>>',data.timestamp);

    }
    getName(data:TableModel<Follow>)
    {
        if(data.table=='items')count++;
        if(data.table=='followers')count1++;
        
        console.log(this, count, count1,data.timestamp);
      
    }
    getEvent(data:EventModel<ErcEvent>)
    {
       // console.log('>>',data);
        
    }
    async teleportChanged(data:EventModel<TeleportModel>)
    {
        console.log('1>>',this.config);

    }
    async init()
    {
        var config=new ConfigModel({
            packageConfig:[  
                new HyperionConfig({ 
                })
            ]
        });
        var origamicore = new OrigamiCore(config);
        await origamicore.start() ;
        // var abi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"int256","name":"race","type":"int256"},{"indexed":false,"internalType":"int256","name":"gender","type":"int256"}],"name":"mintnft","type":"event"},{"inputs":[{"internalType":"bool","name":"enable","type":"bool"}],"name":"changeState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"race","type":"int256"},{"internalType":"int256","name":"gender","type":"int256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_ercAddress","type":"address"}],"name":"setAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"race","type":"int256"},{"internalType":"int256","name":"gender","type":"int256"}],"name":"setRace","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        // var evmreader=new EvmRouter('https://mainnet.telos.net/evm','wss://testnet.telos.net/evm',abi,'0xc491E2b9bB7c39f1BA1277B3795997ED3EEa0d3d');
        // evmreader.readEvent(true,'mintnft',0,ErcEvent,this.getEvent)
        //  var router=new EvmRouter('https://testnet.telos.net/evm','wss://testnet.telos.net/evm',abi,'0xDbb168a87B6c6c88b8F0F3172c8Cb929CFd53265');
        //     router.readEvent(false,'Transfer',0,TeleportModel,this.teleportChanged,this)
         // var owner = await router.callMethod('ownerOf',['91']);
        // console.log('owner is',owner); 
        var hp = new HyperionRouter('https://telos.caleos.io');
        // hp.addTable(new HpTable({code:'marble.code',table:'items',start_from:'2021-01-01T20:46:07.000' } ),Follow,this.getName)
        // hp.addTable(new HpTable({code:'nftsoc.code',table:'followers',start_from:'2020-01-08T00:00:00.000Z' ,} ),Follow,this.getName,this )
        // hp.addAction(new HpAction({contract:'nftmrkt.code',action:'additemcollc',start_from:'2020-01-08T00:00:00.000Z',}),CollectionItem,this.getAction);
        //hp.addAction(new HpAction({contract:'va.code',action:'createvareq',start_from:'2020-01-08T00:00:00.000Z',}),CollectionItem,this.getAction);
        hp.addAction(new HpAction({contract:'marble.code',action:'rmvtag',start_from:'2021-11-10T19:15:36.500Z',}),CollectionItem,this.getAction,this);
        hp.statrtHttp('Test',3000)
        //hp.statrtHttp('Test',3000)
        // hp.start('Test',true)


        
        // var router=new EvmRouter('https://testnet.telos.caleos.io/evm','wss://telos.caleos.io/evm',tabi,'0xE56c325a68b489812081E8A7b60b4017fd2AD280',true);
        // router.readEvent(false,'Claimed',0,ClaimedModel,this.ClaimedChanged,this)
    }
    async ClaimedChanged(data:EventModel<ClaimedModel>)
    {
        console.log('1>>',data.data);

    }
}
new SampleHyperion()