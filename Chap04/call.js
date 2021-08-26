/*
function callSub(){
    Java.perform(function(){
        var Arith = Java.use('com.example.junior.util.Arith')
        var JavaString = Java.use('java.lang.String')
        var result  = Arith.sub(JavaString.$new("123"),JavaString.$new("111"))
        console.log("123 - 111 =",result)
    })
}
*/
rpc.exports = {
    sub: function CallSub(a,b){
        Java.perform(function(){
            var Arith = Java.use('com.example.junior.util.Arith')
            var JavaString = Java.use('java.lang.String')
            var result  = Arith.sub(JavaString.$new(a),JavaString.$new(b))
            console.log(a,"-",b,"=",result) // 最终修改为 send(a,"-",b,"=",result)
        })
        
    }
}