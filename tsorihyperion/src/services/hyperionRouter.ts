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
    constructor(url:string){
        this.url=url;  
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
                await tempData.response(new TableModel(data.content,tempData.cls))
            } 
            else
            {
                var act=data.content.act;
                var key=`${act.account}_${act.name}`
                var tempData = this.actions.get(key);
                await tempData.response(new ActionModel(data.content,tempData.cls))
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