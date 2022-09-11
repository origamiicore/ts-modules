import { MessageModel, Router } from "origamicore"
import BoardModel from "./models/boardModel";
export default class LeaderboardRouter
{
    static async addScore(gameId:string,score:number,userid:string):Promise<number>
    {
        var response= await Router.runInternal('leaderboard','addScore',new MessageModel({data:{
            gameId,score,userid
         }}))
         return parseFloat( response.response.data);  
    }
    static async setScore(gameId:string,score:number,userid:string):Promise<boolean>
    {
        var response= await Router.runInternal('leaderboard','setScore',new MessageModel({data:{
            gameId,score,userid
         }}))
         return !!response.response.data;  
    }
    static async removeScore(gameId:string,userid:string):Promise<boolean>
    {
        var response= await Router.runInternal('leaderboard','removeScore',new MessageModel({data:{
            gameId,userid
         }}))
         return !!response.response.data;  
    }
    static async getScore(gameId:string,userid:string):Promise<number|false>
    {
        var response= await Router.runInternal('leaderboard','getScore',new MessageModel({data:{
            gameId,userid
         }})) 
         if(!response.response.data)return false;
         return parseFloat( response.response.data);  
    }
    static async getCount(gameId:string):Promise<number>
    {
        var response= await Router.runInternal('leaderboard','getCount',new MessageModel({data:{
            gameId
         }}))
         return response.response.data;  
    } 
    static async getRange(gameId:string,begin:number,end:number,isReverse:boolean=false):Promise<BoardModel[]>
    {
        var response= await Router.runInternal('leaderboard','getRange',new MessageModel({data:{
            gameId,begin,end,isReverse
         }}))
         return response.response.data;  

    }
    static async getTop(gameId:string,top:number):Promise<BoardModel[]>
    {
        var response= await Router.runInternal('leaderboard','getTop',new MessageModel({data:{
            gameId,
            top
         }}))       
         var arr:BoardModel[]=[]   
         for(var a of response.response.data)arr.push(new BoardModel(a))
         return arr;  
    }
    static async updateUser(userid:string,value:string):Promise<boolean>
    {
        var response= await Router.runInternal('leaderboard','updateUser',new MessageModel({data:{
            userid,value
         }}))
         return response.response.data=='OK';  
    }
}