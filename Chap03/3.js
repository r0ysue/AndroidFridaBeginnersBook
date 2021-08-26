function main(){
    console.log("Script loaded successfully ")
    Java.perform(function(){
        console.log("Inside java perform function")
        var MainAcitivity = Java.use('com.roysue.demo02.MainActivity')
    
        // 静态函数主动调用
        MainAcitivity.staticSecret();

        // Error: secret: cannot call instance method without an instance
        MainAcitivity.secret();


        // 动态函数主动调用
        Java.choose('com.roysue.demo02.MainActivity',{
            onMatch: function(instance){
                console.log('instance found',instance)
                instance.secret()
            },
            onComplete: function(){
                console.log('search Complete')
            }
        })
    })
}
setImmediate(main)