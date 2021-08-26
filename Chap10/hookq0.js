function hookVIP(){
    Java.perform(function(){
        Java.choose("com.ilulutv.fulao2.film.l",{
            onMatch:function(ins){
                console.log("found ins:=>",ins)
                ins.q0.value = true;

            },onComplete:function(){
                console.log("search completed!")
            }
        })
    })
}