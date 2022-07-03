import OrigamiCore from 'origamicore' 
import config from './config'; 
export default class EndpointSample
{
    constructor()
    {
        this.init();
    }
    async init()
    {
        
        var origamicore = new OrigamiCore(config);
        await origamicore.start( )   
    }
}

new EndpointSample()