function main(){
    console.log("Script loaded successfully ")
    Java.perform(function(){
        console.log("Inside java perform function")
        var MainAcitivity = Java.use('com.roysue.demo02.MainActivity')
        console.log("Java.Use.Successfully!") //定位类成功！
        // hook 重载函数
        MainAcitivity.fun.overload('int', 'int').implementation = function(x,y){
            console.log("orignal args: x => ",x,", y => ",y)
            var ret_value = this.fun(2, 5);
            return ret_value
        }
    })
}
setImmediate(main)