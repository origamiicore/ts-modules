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
    async getNextTable(table:HpTable)
    {
        var key=table.code+'_'+table.table;
        var time=this.tableTime[key];
        if(!time)
        {
            time=table.start_from??'2018-01-01T00:00:00.000Z';
        }
        var url=this.url+'/v2/history/get_deltas';
        var dt:any= await WebService.get(url,{
            code:table.code,
            limit:50,
            table:table.table,
            sort:'asc',
            after:time
        },{},null);
        if(dt.deltas[0] && dt.deltas[0]['timestamp']==time)
        {
            dt.deltas.splice(0,1)
        }
        return dt.deltas;

    }
    async getNextActions(action:HpAction)
    {
        var key=action.contract+'_'+action.action;
        var time=this.actionTime[key];
        if(!time)
        {
            time=action.start_from??'2018-01-01T00:00:00.000Z';
        }
        var url=this.url+'/v2/history/get_actions';
        var dt:any= await WebService.get(url,{
            account:action.contract,
            limit:50,
            'act.name':action.action,
            sort:'asc',
            after:time
        },{},null);
        var x=0;
        if(dt.actions[0] && dt.actions[0]['@timestamp']==time)
        {
            dt.actions.splice(0,1)
        }
        return dt.actions;
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
                    var actions= await this.getNextActions(act);
                    var key=act.contract+'_'+act.action;
                    var tempData = this.actions.get(key);
                    for(act of actions)
                    {
                         let model=new ActionModel(act,tempData.cls);
                         await tempData.response(model)
                         this.actionTime[key]=  model.timestamp
                    }
                    if(actions.length<49)break;
                    
                }
            }
            for(var tb of this.tableData)
            {
                while(true)
                {
                    var tables= await this.getNextTable(tb);
                    var key=tb.code+'_'+tb.table; 
                    var tempData=this.tables.get(key);
                    for(var table of tables)
                    {
                        let model=new TableModel(table,tempData.cls)
                        await tempData.response(model)
                        this.tableTime[key]=model.timestamp;
                        
                    } 
                    if(tables.length<49)
                    {
                        break
                    }

                }

            }
            iswork=false;
        },interval)
    }
    async start(name:string)
    {
        var listener =new HpController(new HpConfig({
            netUrl:this.url,
            name,
            actions:this.actionsData,
            tables:this.tableData
        }));
        listener.start(async(data:any)=>{
            var table=data.content.table;
            if(table)
            {
                var key=`${data.content.code}_${table}`            
                var tempData=this.tables.get(key);
                let model=new TableModel(data.content,tempData.cls);
                await tempData.response(model)
            } 
            else
            {
                var act=data.content.act;
                var key=`${act.account}_${act.name}`
                var tempData = this.actions.get(key);
                let model=new ActionModel(data.content,tempData.cls);
                await tempData.response(model);
                //ActionModel
            }
            
        },this)
    }
    addTable<T>(table:HpTable,cls: { new(data:any,content?:any): T },response:(data:TableModel<T>)=>void):void
    {
        var key=`${table.code}_${table.table}`; 
        this.tableData.push(table)
        this.tables.set(key,{cls,response})
    }
    addAction<T>(action:HpAction,cls: { new(data:any,content?:any): T },response:(data:ActionModel<T>)=>void):void
    {
        var key=`${action.contract}_${action.action}`;  
        this.actionsData.push(action);
        this.actions.set(key,{cls,response}) 
    }

}