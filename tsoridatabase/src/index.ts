import {PackageIndex} from 'origamicore' 
export default class TsoriDatabase implements PackageIndex
{
    name: string;
    jsonConfig(config: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    start(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}