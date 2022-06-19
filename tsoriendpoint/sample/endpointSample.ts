import OrigamiTs from 'origamits'
import TsOriEndpoint from '../src'; 
import config from './config';
import ProfileService from './profileService';
export default class EndpointSample
{
    constructor()
    {
        this.init();
    }
    async init()
    {
        
        var origamicore = new OrigamiTs(config);
        await origamicore.start( )   
    }
}

new EndpointSample()