import OrigamiTs, { ConfigModel } from "origamits";   
import { ActionModel, HpAction, HpTable, HyperionConfig, HyperionRouter, TableModel } from ".."; 
import CollectionItem from "./models/colllectionItem";
import Follow from "./models/follow";

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
      console.log('>>',data.timestamp);
      
    }
    async init()
    {
        var config=new ConfigModel({
            packageConfig:[  
                new HyperionConfig({ 
                })
            ]
        });
        var origamicore = new OrigamiTs(config);
        await origamicore.start() 
        var hp = new HyperionRouter('https://telos.caleos.io');
       // hp.addTable(new HpTable({code:'nftsoc.code',table:'followers',start_from:'2020-01-08T00:00:00.000Z' } ),Follow,this.getName)
        hp.addAction(new HpAction({contract:'nftmrkt.code',action:'additemcollc',start_from:'2020-01-08T00:00:00.000Z',}),CollectionItem,this.getAction);
        hp.start('Test')
    }
}
new SampleHyperion()