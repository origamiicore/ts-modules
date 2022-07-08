import { MessageModel, Router } from "origamicore"
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
    static async updateUser(userid:string,value:string):Promise<boolean>
    {
        var response= await Router.runInternal('leaderboard','updateUser',new MessageModel({data:{
            userid,value
         }}))
         return response.response.data=='OK';  
    }
}