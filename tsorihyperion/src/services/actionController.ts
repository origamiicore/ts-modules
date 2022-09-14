import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';  
import TransactionModel from '../models/transactionModel';
import fetch from 'node-fetch' 
export default class ActionController
{
    static async run(url:string,privateKey:string|string[],transaction:TransactionModel)
    { 
        if(!Array.isArray(privateKey))privateKey=[privateKey]
        const signatureProvider = new JsSignatureProvider([...privateKey]);
        const rpc = new JsonRpc(url, { fetch });
        const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
        return await api.transact( transaction, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
    }
}