import OrigamiCore, { ConfigModel } from "origamicore";   
import { ActionModel, EventModel, EvmRouter, HpAction, HpTable, HyperionConfig, HyperionRouter, TableModel } from ".."; 
import CollectionItem from "./models/colllectionItem";
import ErcEvent from "./models/ercEvent";
import Follow from "./models/follow";

var count:number=0;
class SampleHyperion
{
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
        count++
      console.log(count,'>>',data.timestamp);
      
    }
    getEvent(data:EventModel<ErcEvent>)
    {
        console.log('>>',data);
        
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

        var hp = new HyperionRouter('https://telos.caleos.io');
       // hp.addTable(new HpTable({code:'nftsoc.code',table:'followers',start_from:'2020-01-08T00:00:00.000Z' } ),Follow,this.getName)
        // hp.addAction(new HpAction({contract:'nftmrkt.code',action:'additemcollc',start_from:'2020-01-08T00:00:00.000Z',}),CollectionItem,this.getAction);
        hp.addAction(new HpAction({contract:'va.code',action:'createvareq',start_from:'2020-01-08T00:00:00.000Z',}),CollectionItem,this.getAction);
       // hp.statrtHttp('Test',3000)
         hp.start('Test')
    }
}
new SampleHyperion()