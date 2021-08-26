function main(){
    console.log("Script loaded successfully ")
    Java.perform(function(){
        console.log("Inside java perform function")
        var MainAcitivity = Java.use('com.roysue.demo02.MainActivity')
        console.log("Java.Use.Successfully!") //定位类成功！
        MainAcitivity.fun.implementation = function(x,y){
            console.log("x => ",x,", y => ",y)
            var ret_value = this.fun(x, y);
            return ret_value
        }
    })
}
function testJavaPerform(){
    console.log("Script loaded successfully ")
   
        
        var MainAcitivity = Java.use('com.roysue.demo02.MainActivity')
        console.log("Java.Use.Successfully!") //定位类成功！
        MainAcitivity.fun.implementation = function(x,y){
            console.log("x => ",x,", y => ",y)
            var ret_value = this.fun(x, y);
            return ret_value
        }
    
}
function change_args(){
    console.log("Script loaded successfully ")
    Java.perform(function(){
        console.log("Inside java perform function")
        var MainAcitivity = Java.use('com.roysue.demo02.MainActivity')
        console.log("Java.Use.Successfully!") //定位类成功！
        MainAcitivity.fun.implementation = function(x,y){
            console.log("orignal args: x => ",x,", y => ",y)
            var ret_value = this.fun(2, 5);
            return ret_value
        }
    })
}
setImmediate(main)
