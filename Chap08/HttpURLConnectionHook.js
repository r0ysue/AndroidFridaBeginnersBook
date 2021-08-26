function main(){
    Java.perform(function(){
        var URL = Java.use('java.net.URL')
        URL.$init.overload('java.lang.String').implementation = function(urlstr){
            console.log('url => ',urlstr)
            var result = this.$init(urlstr)
            return result
        }
        URL.openConnection.overload().implementation = function(){
            
            var result = this.openConnection()
            console.log('openConnection() returnType =>',result.$className)
            return result
        }
        var HttpURLConnectionImpl = Java.use('com.android.okhttp.internal.huc.HttpURLConnectionImpl')
        HttpURLConnectionImpl.setRequestProperty.implementation = function(key,value){
            
            var result = this.setRequestProperty(key,value)
            console.log('setRequestProperty => ',key,':',value)
            return result
        }
    })
}

setImmediate(main)