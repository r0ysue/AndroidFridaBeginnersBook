function jhexdump(array) {
    var ptr = Memory.alloc(array.length);
    for(var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    //console.log(hexdump(ptr, { offset: off, length: len, header: false, ansi: false }));
    console.log(hexdump(ptr, { offset: 0, length: array.length, header: false, ansi: false }));
}
function hookAddress(){
    Java.perform(function(){
        // java.net.InetSocketAddress.InetSocketAddress(java.net.InetAddress, int)
        Java.use('java.net.InetSocketAddress').$init.overload('java.net.InetAddress', 'int').implementation = function(addr,port){
            var result = this.$init(addr,port)

            //console.log('addr,port =>',addr.toString(),port)
            if(addr.isSiteLocalAddress()){
                console.log('Local address =>',addr.toString(),', port is ',port)
            }else{
                console.log('Server address =>',addr.toString(),', port is ',port)
            }

            return result
        }
    })
}
function hookSocket() {
    Java.perform(function () {
        
        
        // java.net.SocketOutputStream.write
        // java.net.SocketOutputStream.socketWrite
        Java.use('java.net.SocketOutputStream').socketWrite.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.socketWrite(bytearray1, int1, int2)

            console.log('socketWrite result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
           // console.log('contents: => ', ByteString.of(bytearray1).hex())

            jhexdump(bytearray1)
            return result
        }
        
        // java.net.SocketInputStream.read
        // java.net.SocketInputStream.socketRead0
        Java.use('java.net.SocketInputStream').read.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.read(bytearray1, int1, int2)

            console.log('read result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log('contents: => ', ByteString.of(bytearray1).hex())
            jhexdump(bytearray1)


            return result
        }
    })

}
function hookSSLSocketAndroid8(){
   
    Java.perform(function () {
        
        
         // com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLOutputStream.write
        Java.use('com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLOutputStream').write.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.write(bytearray1, int1, int2)

            console.log('write result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            console.log('contents: => ', ByteString.of(bytearray1).hex())


            return result
        }
    
        // com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLInputStream.read
        Java.use('com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLInputStream').read.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.read(bytearray1, int1, int2)

            console.log('read result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log('contents: => ', ByteString.of(bytearray1).hex())
            jhexdump(bytearray1)


            return result
        }
    })
}
function main(){
    hookAddress()
    //hookSocket()
   // hookSSLSocketAndroid8()
}

setImmediate(main)