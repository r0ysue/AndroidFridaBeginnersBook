function killCertificatePinner(){
    Java.perform(function(){
        console.log("Beginning killCertificatePinner !...")
        Java.use("z1.g").a.implementation = function(str,list){
            console.log("called z1.g.a ~")
            return ;
        }
    })
}


function main(){
    killCertificatePinner();
}
setImmediate(main);