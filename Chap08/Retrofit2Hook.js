function hookbaseurl (){
    Java.perform(function(){
        Java.use("retrofit2.Retrofit$Builder").baseUrl.overload('java.lang.String').implementation = function(str){
            console.log("Entering 1")
            var result = this.baseUrl(str);
            console.log("result,str=>",result,str)
            return result;
        }
        Java.use("retrofit2.Retrofit$Builder").baseUrl.overload('okhttp3.HttpUrl').implementation = function(str){
            console.log("Entering 1")
            var result = this.baseUrl(str);
            console.log("result,str=>",result,str)
            return result;
        }

    })
}


function hook_DailyNews(){
    Java.perform(function(){
        console.log("Entering java perform ")
        Java.use("ganhuo.ly.com.ganhuo.mvp.entity.DailyNews").getDailyTitle.implementation = function(){
            console.log("Entering getDailyNews")
            var result = this.getDailyTitle()
            console.log("result,str=>",result)
            return result;
        }
    })
}
setImmediate(hookbaseurl)