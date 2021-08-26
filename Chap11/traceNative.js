function writeSomething(path, contents) {
    var fopen_addr = Module.findExportByName("libc.so", "fopen");
    var fputs_addr = Module.findExportByName("libc.so", "fputs");
    var fclose_addr = Module.findExportByName("libc.so", "fclose");

    //console.log("fopen=>",fopen_addr,"  fputs=>",fputs_addr,"  fclose=>",fclose_addr);

    var fopen = new NativeFunction(fopen_addr, "pointer", ["pointer", "pointer"])
    var fputs = new NativeFunction(fputs_addr, "int", ["pointer", "pointer"])
    var fclose = new NativeFunction(fclose_addr, "int", ["pointer"])

    //console.log(path,contents)

    var fileName = Memory.allocUtf8String(path);
    var mode = Memory.allocUtf8String("a+");

    var fp = fopen(fileName, mode);

    var contentHello = Memory.allocUtf8String(contents);
    var ret = fputs(contentHello,fp)

    fclose(fp);
}

function traceNativeExport(){

    var modules = Process.enumerateModules();
    for(var i = 0;i<modules.length;i++){
        var module = modules[i];

        if(module.name.indexOf("libssl.so")<0){
            continue;
        }

        var exports = module.enumerateExports();
        console.log('module.addr',module.base);
        for(var j = 0;j<exports.length;j++){
            //console.log("module name is =>",module.name," symbol name is =>",exports[j].name)
            //var path = "/sdcard/Download/so/"+module.name+".txt"
            if(exports[j].type == "function"){
                attach(exports[j].name,exports[j].address)
            }
         //   var path = "/data/data/com.roysue.httpurlconnectiondemo/"+module.name+".txt"
           // writeSomething(path,"type: "+exports[j].type+" function name :"+exports[j].name+" address : "+exports[j].address+" offset => 0x"+(exports[j].address - (modules[i].base)).toString(16)+"\n")
            // if(exports[j].name.indexOf("SSL_write")>=0){
            //     attach(exports[j].name,exports[j].address);
            // }
            // if(exports[j].name.indexOf("set")>=0){
            //     attach(exports[j].name,exports[j].address);
            // }
            // if(exports[j].name.indexOf("send")>=0){
            //     attach(exports[j].name,exports[j].address);
            // }
            // if(exports[j].name.indexOf("recv")>=0){
            //     attach(exports[j].name,exports[j].address);
            // }

        }
    }
}



function attach(name,address){
     console.log("attaching ",name);
    Interceptor.attach(address,{
        onEnter:function(args){
           console.log("Entering => " ,name)
           // console.log("args[0] => ",hexdump(args[0]) )
            // console.log("args[1] => ",args[1].readCString())
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
        
        if(module.name.indexOf('ssl')<0){
            continue
        }
        console.log(module.name);
       
        var exports = module.enumerateSymbols()
        
       console.log(JSON.stringify(exports))
        for(var j = 0;j<exports.length;j++){
            if(exports[j] == null){
                continue;
            }
            console.log("module name is =>",module.name," symbol name is =>",exports[j].name)
            var path = "/data/data/com.roysue.httpurlconnectiondemo/"+module.name+"_Symbol.txt"
            writeSomething(path,"type: "+exports[j].type+" function name :"+exports[j].name+" address : "+exports[j].address+" offset => 0x"+(exports[j].address - module.base).toString(16)+"\n")
        }
    }
}



function main(){
    console.log("Entering main")
    traceNativeExport();
  //  traceNativeSymbol();

}
setImmediate(main)