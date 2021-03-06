import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';  
import TransactionModel from '../models/transactionModel';
export default class ActionController
{
    static async run(url:string,privateKey:string,transaction:TransactionModel)
    { 
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const rpc = new JsonRpc(url, { fetch });
        const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
        return await api.transact( transaction, {
            blocksBehind: 3,
            expireSeconds: 30,
          });
    }
}