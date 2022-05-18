import AuthzEndpoint from "./authzEndpoint";
import ConnectionProtocol from "./connectionProtocol";
import LimitModel from "./limitModel";

export class EndpointConnectionType
{
    static Soucket='socket';
    static Express='express';
}
export default class EndpointConnection
{ 
    name:string;
    bindAddress:string;
    type:string;
    sessionManager:string;
    allowHeader:string;
    publicFolder:string[]=[];
    crossDomain:string[]=[];
    limit:LimitModel;
    authz:AuthzEndpoint;
    protocol:ConnectionProtocol;
    
    public constructor(
        fields?: {
          name?: string, 
          bindAddress?: string, 
          type?: string, 
          sessionManager?: string, 
          publicFolder?: string[], 
          crossDomain?: string[], 
          allowHeader?: string, 
          authz?:AuthzEndpoint,
          limit?:LimitModel,
          protocol?:ConnectionProtocol
        }) {
        if (fields) Object.assign(this, fields);
    }
}