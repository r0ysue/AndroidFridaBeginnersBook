function hook_okhttp3() {
    // 1. frida Hook java层的代码必须包裹在Java.perform中，Java.perform会将Hook Java相关API准备就绪。
    Java.perform(function () {

        Java.openClassFile("/data/local/tmp/okhttp3logging.dex").load();

        var MyInterceptor = Java.use("com.r0ysue.okhttp3demo.LoggingInterceptor");

        var MyInterceptorObj = MyInterceptor.$new();
        var Builder = Java.use("okhttp3.OkHttpClient$Builder");
        console.log(Builder);
        Builder.build.implementation = function () {
            this.networkInterceptors().add(MyInterceptorObj);
            return this.build();
        };
        console.log("hook_okhttp3...");
    });
}
function main() {
    hook_okhttp3();
}


setImmediate(main)

