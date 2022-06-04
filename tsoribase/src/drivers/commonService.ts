
function getRandomArbitrary(min, max) {

    var r = Math.floor(Math.random() * (max - min + 1) + min); 
	return r
} 
export default class CommonService
{
    random(min:number=0,max:number=1000)
    {
        var r = Math.floor(Math.random() * (max - min + 1) + min); 
        return r;        
    }
    randomText(n:number=5)
    {
        var str=''
        var sr='qwertyuiopasdfghjklzxcvbnm'
        for(var a=0;a<n;a++)
        {
            var i=global.ori.Random(0,sr.length-1)
            str+=sr[i]
        }
        if(str[0]=='0')
            str='1'+str
        return parseInt(str)
    }
    randomNumber(n:number=12)
    {
        var str=''
        var sr='123456890'
        for(var a=0;a<n;a++)
        {
            var i=getRandomArbitrary(0,sr.length-1)
            str+=sr[i]
        } 
        return parseInt(str)
    }
}