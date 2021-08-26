function hook_native(){
    var addr = Module.getExportByName("libnative-lib.so", "Java_com_roysue_r0so_MainActivity_stringFromJNI");
    Interceptor.attach(addr,{   
        onEnter:function(args){
            console.log("jnienv pointer =>",args[0])
            console.log("jobj pointer =>",args[1])
        },onLeave:function(retval){
            console.log("retval is =>",Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
            console.log("=================")
        }
    })
}
function hook_native3(){
    var libnative_addr =  Module.findBaseAddress('libnative-lib.so');
    console.log("libnative_addr is => ",libnative_addr)
    var stringfromJNI3 = libnative_addr.add(0xf444);
    console.log("stringfromJNI3 address is =>",stringfromJNI3);

    Interceptor.attach(stringfromJNI3,{
        onEnter:function(args){

            console.log("jnienv pointer =>",args[0])
            console.log("jobj pointer =>",args[1])
           // console.log("jstring pointer=>",Java.vm.getEnv().getStringUtfChars(args[2], null).readCString() )

        },onLeave:function(retval){
            console.log("retval is =>",Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
            console.log("=================")

        }
    })
}
function main(){
    hook_native3()
}
setImmediate(main)
function main(){
    hook_native()
}
setImmediate(main)