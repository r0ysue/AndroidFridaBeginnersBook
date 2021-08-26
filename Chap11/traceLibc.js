function traceNativeExport(){

    var modules = Process.enumerateModules();
    for(var i = 0;i<modules.length;i++){
        var module = modules[i];

        if(module.name.indexOf("libc.so")<0){
            continue;
        }

        var exports = module.enumerateExports();
        console.log('module.addr',module.base);
        for(var j = 0;j<exports.length;j++){
            //console.log("module name is =>",module.name," symbol name is =>",exports[j].name)
            //var path = "/sdcard/Download/so/"+module.name+".txt"
            if(exports[j].type == "function"){
                if(exports[j].name.indexOf("str") >= 0 && exports[j].name.indexOf("_l") < 0 &&  exports[j].name.indexOf("ld") < 0 &&  exports[j].name.indexOf("pthread_") < 0){
                    attach(exports[j].name,exports[j].address)
                }      
            }
        }
    }
}



function attach(name,address){
    console.log("attaching ",name);
    Interceptor.attach(address,{
        onEnter:function(args){
           console.log("Entering => " ,name)
            console.log("args[0] => ",args[0].readCString() )
             console.log("args[1] => ",args[1].readCString())
            // console.log("args[2] => ",args[2])

        },onLeave:function(retval){
            //console.log("retval is => ",retval)
        }
    })

}

function traceNativeSymbol(){
    var modules = Process.enumerateModules();
    for(var i = 0;i<modules.length;i++){
        var module = modules[i];
        
        if(module.name.indexOf('libc.so')<0){
            continue
        }
       // console.log(module.name);
       
        var exports = module.enumerateSymbols()
        
      // console.log(JSON.stringify(exports))
        for(var j = 0;j<exports.length;j++){
            if(exports[j].type == "function"){
                if(exports[j].name.indexOf("str") >= 0){
                    attach(exports[j].name,exports[j].address)
                }  
            }
        }
    }
}



function main(){
    console.log("Entering main")
    traceNativeExport();
  //  traceNativeSymbol();

}
setImmediate(main)