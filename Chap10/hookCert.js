function hook_KeyStore_load() {
    Java.perform(function () {
        var myArray=new Array(1024);
        var i = 0
        for (i = 0; i < myArray.length; i++) {
            myArray[i]= 0x0;
         }
        var buffer = Java.array('byte',myArray);
        var StringClass = Java.use("java.lang.String");

        var KeyStore = Java.use("java.security.KeyStore");
        KeyStore.load.overload('java.security.KeyStore$LoadStoreParameter').implementation = function (arg0) {
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

            console.log("KeyStore.load1:", arg0);
            this.load(arg0);
        };
        KeyStore.load.overload('java.io.InputStream', '[C').implementation = function (arg0, arg1) {
            console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()));

            console.log("KeyStore.load2: filename = ", arg0,',password = ', arg1 ? StringClass.$new(arg1) : null);
            if (arg0){
                var filename  = "/sdcard/Download/"+ String(arg0)
                var file =  Java.use("java.io.File").$new(filename);
                var out = Java.use("java.io.FileOutputStream").$new(file);
                var r;
                while( (r = arg0.read(buffer)) > 0){
                    out.write(buffer,0,r)
                }
                console.log('save_path = ',filename,", cert save success!")
                out.close()
            }
            this.load(arg0, arg1);
        };
        
        console.log("hook_KeyStore_load...");
    });
}
function main(){
    hook_KeyStore_load()
}
setImmediate(main);