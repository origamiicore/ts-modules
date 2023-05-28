import { WebService } from "tsoribase";
import ActionModel from "../models/actionModel";
import HpAction from "../models/hpAction";
import HpConfig from "../models/hpConfig";
import HpTable from "../models/hpTable";
import TableModel from "../models/tableMode";
import HpController from "./hpController"; 
class TempData
{
    cls: { new(data:any) };
    response:(value:any)=>any
    name:string;
    parent:any;
}
export default class HyperionRouter
{
    private url='';
    private tables:Map<string,TempData>=new Map<string,TempData>();
    private actions:Map<string,TempData>=new Map<string,TempData>();
    private actionsData:HpAction[]=[];
    private tableData:HpTable[]=[];
    private actionTime:any={};
    private tableTime:any={};
    constructor(url:string){
        this.url=url;  
    }  
    async getBlockTable(block:number,table:HpTable)
    { 
        try{ 
            var url=this.url+'/v2/history/get_deltas'; 
            let data=[];
            while(true)
            {
                var dt:any= await WebService.get(url,{
                    block_num:block,
                    limit:100,
                    skip:data.length,
                    code:table.code,
                    table:table.table
                },{},null);  
                data.push(...dt.deltas); 
                if(dt.deltas.length<100)
                { 
                    break;
                }  

            }
            return data;
        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }
        
    }
    async getNextTable(table:HpTable)
    {
        var key=table.code+'_'+table.table;
        var time=this.tableTime[key];
        if(!time)
        {
            time=table.start_from??'2018-01-01T00:00:00.000Z';
        }
        try{ 
            var url=this.url+'/v2/history/get_deltas';
            var dt:any= await WebService.get(url,{
                code:table.code,
                limit:50,
                table:table.table,
                sort:'asc',
                after:time
            },{},null); 
            if(dt.deltas.length>=50)
            {
                var dts=dt.deltas 
                if(dts[0].timestamp==dts[dts.length-1].timestamp)
                { 
                    var blockTables=await  this.getBlockTable(dts[0].block_num,table) 
                    this.tableTime[key]=dt.deltas[0]['timestamp'].substr(0,22)+'1Z'
                   return blockTables
                    
                }
            }
            if(dt.deltas[0] && dt.deltas[0]['timestamp']==time)
            {
                dt.deltas.splice(0,1)
            }
            
            return dt.deltas;
        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }

    }
    async getBlockAction(block:number,action:HpAction)
    { 
        try{ 
            var url=this.url+'/v2/history/get_actions'; 
            let data=[]; 
            while(true)
            {
                var dt:any= await WebService.get(url,{
                    account:action.contract,
                    'act.name':action.action,
                    block_num:block,
                    limit:100,
                    skip:data.length

                },{},null);  
                data.push(...dt.actions); 
                if(dt.actions.length<100)
                { 
                    break;
                } 
                 
            }
            return data;
        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }
        
    }
    async getNextActions(action:HpAction)
    {
        var key=action.contract+'_'+action.action;
        var time=this.actionTime[key];
        if(!time)
        {
            time=action.start_from??'2018-01-01T00:00:00.000Z';
        }
        try{
            var url=this.url+'/v2/history/get_actions';
            let param={
                account:action.contract,
                limit:50,
                'act.name':action.action,
                sort:'asc',
                after:time
            }
            console.log(url,param);
            
            if(!action.action || action.action=='*')
            {
                delete param['act.name']
            }
            if(!action.contract || action.contract=='*')
            {
                delete param['account']
            }
            var dt:any= await WebService.get(url,param,{},null);
            var x=0;

            if(dt.actions.length>=50)
            {
                var dts=dt.actions 
                if(dts[0].timestamp==dts[dts.length-1].timestamp)
                { 
                    var blockActions=await  this.getBlockAction(dts[0].block_num,action) 
                    this.actionTime[key]=dt.actions[0]['timestamp'].substr(0,22)+'1Z'
                   return blockActions
                    
                }
            }

            if(dt.actions[0] && dt.actions[0]['@timestamp']==time)
            {
                dt.actions.splice(0,1)
            }
            return dt.actions;

        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }
    }
    async statrtHttp(name:string,interval:number=10000)
    { 
        var iswork:boolean=false;
        setInterval(async()=>{
            if(iswork)return;
            iswork=true;
            for(var act of this.actionsData)
            {
                while(true)
                {
                    try{
                        var actions= await this.getNextActions(act);
                        var key=act.contract+'_'+act.action;
                        var tempData = this.actions.get(key);
                        for(act of actions)
                        {
                             let model=new ActionModel(act,tempData.cls);
                             //await tempData.response(model)
                             await tempData.parent[tempData.name](model)
                             if(!this.actionTime[key] || model.timestamp>this.actionTime[key])
                                this.actionTime[key]=  model.timestamp
                        }
                        if(actions.length<49)break;
                    }catch(exp){
                        console.log('Error>>',act.account,act.action,exp.message);
                        
                        break  
                    }
                    
                }
            }
            for(var tb of this.tableData)
            {
                try{
                    while(true)
                    {
                        var tables= await this.getNextTable(tb);
                        var key=tb.code+'_'+tb.table; 
                        var tempData=this.tables.get(key);
                        for(var table of tables)
                        {
                            let model=new TableModel(table,tempData.cls) 
                            await tempData.parent[tempData.name](model)
                            
                            if(!this.tableTime[key] || model.timestamp>this.tableTime[key])
                                this.tableTime[key]=model.timestamp;
                            
                        } 
                        if(tables.length<49)
                        {
                            break
                        }
                    }

                }catch(exp){
                    console.log('Error>>',tb.code,tb.table,exp.message);
                }

            }
            iswork=false;
        },interval)
    }


    
    async getNextSyncTable(table:HpTable,time:string)
    { 
        if(!time)
        {
            time=table.start_from??'2018-01-01T00:00:00.000Z';
        }
        try{ 
            var url=this.url+'/v2/history/get_deltas';
            var dt:any= await WebService.get(url,{
                code:table.code,
                limit:50,
                table:table.table,
                sort:'asc',
                after:time
            },{},null); 
            if(dt.deltas.length>=50)
            {
                var dts=dt.deltas 
                if(dts[0].timestamp==dts[dts.length-1].timestamp)
                { 
                    var blockTables=await  this.getBlockTable(dts[0].block_num,table) 
                    this.startTable=dt.deltas[0]['timestamp'].substr(0,22)+'1Z'
                   return blockTables
                    
                }
            }
            if(dt.deltas[0] && dt.deltas[0]['timestamp']==time)
            {
                dt.deltas.splice(0,1)
            }
            
            return dt.deltas;
        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }

    }
    async getNextSyncActions(action:HpAction,time:string):Promise<any[]>
    { 
        if(!time)
        {
            time=action.start_from??'2018-01-01T00:00:00.000Z';
        }
        try{
            var url=this.url+'/v2/history/get_actions';
            var dt:any= await WebService.get(url,{
                account:action.contract,
                limit:50,
                'act.name':action.action,
                sort:'asc',
                after:time
            },{},null);
            var x=0;
            if(dt.actions.length>=50)
            {
                var dts=dt.actions 
                if(dts[0].timestamp==dts[dts.length-1].timestamp)
                { 
                    var blockActions=await  this.getBlockAction(dts[0].block_num,action) 
                    this.startAction=dt.actions[0]['timestamp'].substr(0,22)+'1Z'
                   return blockActions
                    
                }
            }

            if(dt.actions[0] && dt.actions[0]['@timestamp']==time)
            {
                dt.actions.splice(0,1)
            }
            return dt.actions;

        }catch(exp){
            console.log('>>',exp.message);
            
            return []
        }
    }
    startTable:string;
    startAction:string;
    async statrtSyncedHttp(name:string, interval:number=10000)
    {
        let tables:any={};
        let actions:any={};
        this. startTable=this.tableData[0]?.start_from;
        this. startAction=this.actionsData[0]?.start_from
        for(let tb of this.tableData)
            if(tb.start_from<this.startTable)
            {
                this.startTable=tb.start_from
            }
        for(let act of this.actionsData)
            if(act.start_from<this.startAction)
            {
                this.startAction=act.start_from;
            }
        var contractsTable={}
        var contractsAction={}
        let actionstr=''
        let tablestr=''
        for(let tb of this.tableData)
        {
            if(!tables[tb.code])tables[tb.code]=[]
            tables[tb.code].push(tb.table)

            contractsTable[tb.code]=true;
            tablestr+=tb.table+','
        }
        for(let act of this.actionsData)
        {
            if(!actions[act.contract])actions[act.contract]=[]
            actions[act.contract].push(act.action) 
            contractsAction[act.contract]=true
            actionstr+=act.action+','
        }
        var iswork:boolean=false;

        let contractStr=''
        for(var a in contractsAction)
        {
            contractStr+=a+','
        }
        
        var action=new HpAction({
            action:actionstr.substring(0,actionstr.length-1),
            contract:contractStr.substring(0,contractStr.length-1),
            start_from:this.startAction
        });
        let contractTbStr=''
        for(var a in contractsTable)
        {
            contractTbStr+=a+','
        }
        var table=new HpTable({
            code:contractTbStr.substring(0,contractTbStr.length-1),
            table:tablestr.substring(0,tablestr.length-1),
            start_from:this.startTable
        }) 
        
        setInterval(async()=>{
            if(iswork)return;
            iswork=true;
            if(actionstr)
            {
                while(true)
                {
                    let lastAction:any={}
                    try{
                        var actions= await this.getNextSyncActions(action,this.startAction); 
                        for(var act of actions)
                        {
                            lastAction=act;
                            let key=act.act.account+'_'+act.act.name;
                            if(this.actions.has(key))
                            {
                                let tempData = this.actions.get(key);
                                let model=new ActionModel(act,tempData.cls);
                                await tempData.response(model)
                                if(!this.actionTime[key] || model.timestamp>this.actionTime[key])
                                    this.actionTime[key]=  model.timestamp
                                this.startAction=model.timestamp
                            }
                        }
                        if(actions.length<49)break;
                    }catch(exp){
                        console.log('Error>>',lastAction.account,lastAction.action,exp.message);
                        
                        break  
                    }
                }
            }
            if(contractTbStr)
            {
                
                let lsatTable:any={}
                try{
                    while(true)
                    {
                        var tables= await this.getNextSyncTable(table,this.startTable); 
                        for(var tbx of tables)
                        { 
                            lsatTable=tbx
                            var key=tbx.code+'_'+tbx.table; 
                            if(this.tables.has(key))
                            {
                                var tempData=this.tables.get(key);
                                let model=new TableModel(tbx,tempData.cls)
                                await tempData.response(model) 
                                
                                if(!this.tableTime[key] || model.timestamp>this.tableTime[key])
                                    this.tableTime[key]=model.timestamp;
                                this.startTable= model.timestamp;   
                            }
                        } 
                        if(tables.length<49)
                        {
                            break
                        }
                    }

                }catch(exp){
                    console.log('Error>>',lsatTable.code,lsatTable.table,exp.message);
                }
            }


            iswork=false;
        },interval)
    }
    async start(name:string,autoConnect?:boolean)
    {
        var listener =new HpController(new HpConfig({
            netUrl:this.url,
            name,
            actions:this.actionsData,
            tables:this.tableData,
            autoConnect
        }));
        listener.start(async(data:any)=>{
            var table=data.content.table;
            if(table)
            {
                var key=`${data.content.code}_${table}`            
                var tempData=this.tables.get(key);
                let model=new TableModel(data.content,tempData.cls);
                await tempData.parent[tempData.name](model)
                // await tempData.response(model)
            } 
            else
            {
                var act=data.content.act;
                var key=`${act.account}_${act.name}`
                var tempData = this.actions.get(key);
                let model=new ActionModel(data.content,tempData.cls);
                await tempData.parent[tempData.name](model)
                // await tempData.response(model)
                //ActionModel
            }
            
        },this)
    }
    addTable<T>(table:HpTable,cls: { new(data:any,content?:any): T },response:(data:TableModel<T>)=>void,parent:any):void
    {  
        
        var key=`${table.code}_${table.table}`; 
        this.tableData.push(table)
        this.tables.set(key,{cls,response,name:response.name,parent})
    }
    addAction<T>(action:HpAction,cls: { new(data:any,content?:any): T },response:(data:ActionModel<T>)=>void,parent:any):void
    {
        var key=`${action.contract}_${action.action}`;  
        this.actionsData.push(action);
        this.actions.set(key,{cls,response,parent ,name:response.name }) 
    }

}