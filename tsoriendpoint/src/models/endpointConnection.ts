import AuthzEndpoint from "./authzEndpoint";
import ConnectionProtocol from "./connectionProtocol";
import LimitModel from "./limitModel";
import ConnectionEvent from "./socket/connectionEvent";

export class EndpointConnectionType
{
    static Soucket='socket';
    static Express='express';
}
export default class EndpointConnection
{ 
    name:string;
    bindAddress:string;
    type:EndpointConnectionType;
    sessionManager:string;
    allowHeader:string;
    publicFolder:string[]=[];
    crossDomain:string[]=[];
    limit:LimitModel;
    authz:AuthzEndpoint;
    protocol:ConnectionProtocol;
    debug:boolean
    events:ConnectionEvent[]=[];
    public constructor(
        fields: {
            type: EndpointConnectionType, 
            protocol:ConnectionProtocol
            name?: string, 
            bindAddress?: string, 
            sessionManager?: string, 
            publicFolder?: string[], 
            crossDomain?: string[], 
            allowHeader?: string, 
            authz?:AuthzEndpoint,
            limit?:LimitModel,
            debug?:boolean,
            events?:ConnectionEvent[]
        }) {
        if (fields) Object.assign(this, fields);
    }
}