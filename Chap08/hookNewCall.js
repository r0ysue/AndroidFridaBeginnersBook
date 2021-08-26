function main(){
   
    Java.perform(function() {
        var OkHttpClient = Java.use("okhttp3.OkHttpClient")
       
        OkHttpClient.newCall.implementation = function (request) {
            var result = this.newCall(request)
            console.log(request.toString())
            return result
        };
    
    });
}

setImmediate(main)