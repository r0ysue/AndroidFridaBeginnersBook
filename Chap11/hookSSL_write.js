
function hook_ssl_write(){
    var addr = Module.getExportByName("libssl.so", "SSL_write");
    Interceptor.attach(addr,{   
        onEnter:function(args){
            console.log("\n",hexdump(args[1],{length: args[2].toInt32()}))
        },onLeave:function(retval){
           // console.log("retval is =>",Java.vm.getEnv().getStringUtfChars(retval, null).readCString())
            console.log("================== onLeave =================")
        }
    })
    
}

function main(){
    console.log("Entering main")
    hook_ssl_write()
   // traceNativeExport();
   // traceNativeSymbol();

}
setImmediate(main)