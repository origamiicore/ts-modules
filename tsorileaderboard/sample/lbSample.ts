import OrigamiCore, { ConfigModel } from "origamicore"; 
import { LeaderboardConfig, LeaderboardRouter } from "..";
class lbSample
{
    constructor()
    {
        this.init()
    }
    async init()
    {
        var config=new ConfigModel({
            packageConfig:[
                  new LeaderboardConfig({ 
                      
                  })
            ]
        }); 
        var origamicore = new OrigamiCore(config);
        await origamicore.start()   
        var gameid='samplegame'
        var userid='1234'
        console.log(await LeaderboardRouter.setScore(gameid,12.4,userid));
        console.log( await LeaderboardRouter.getScore(gameid,userid));
        console.log( await LeaderboardRouter.getScore(gameid,'userid'));
        console.log(await LeaderboardRouter.addScore(gameid,1,userid));
        console.log(await LeaderboardRouter.getCount(gameid));
        console.log(await LeaderboardRouter.updateUser(userid,'vahid'));
        console.log(await LeaderboardRouter.getTop(gameid,1));
        
    }
}
new lbSample()