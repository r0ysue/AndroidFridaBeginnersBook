function jhexdump(array) {
    var ptr = Memory.alloc(array.length);
    for(var i = 0; i < array.length; ++i)
        Memory.writeS8(ptr.add(i), array[i]);
    //console.log(hexdump(ptr, { offset: off, length: len, header: false, ansi: false }));
    console.log(hexdump(ptr, { offset: 0, length: array.length, header: false, ansi: false }));
}
function hookSocket() {
    Java.perform(function () {
        
        Java.use("java.net.SocketOutputStream").socketWrite0.overload('java.io.FileDescriptor', '[B', 'int', 'int').implementation = function (fd, bytearray1, offset, byteCount) {
            var result = this.socketWrite0(fd, bytearray1, offset, byteCount);
            console.log("socketWrite remote_address: ",this.socket.value.getRemoteSocketAddress().toString())
            console.log("socketWrite local address : ",this.socket.value.getLocalAddress())
            console.log("socketWrite local port: ",this.socket.value.getLocalPort())
            var ptr = Memory.alloc(byteCount);
            //  byte[]的子字符串及发送给python
            for (var i = 0; i < byteCount; ++i)
                Memory.writeS8(ptr.add(i), bytearray1[off + i]);
            console.log(hexdump(ptr,{length: byteCount}))
            return result
        }
        Java.use("java.net.SocketInputStream").socketRead0.overload('java.io.FileDescriptor', '[B', 'int', 'int', 'int').implementation = function (fd, bytearray1, offset, byteCount, timeout) {
            var result = this.socketRead0(fd, bytearry, offset, byteCount, timeout);
            console.log("read remote_address: ",this.socket.value.getRemoteSocketAddress().toString())
            console.log("read local address : ",this.socket.value.getLocalAddress())
            console.log("read local port: ",this.socket.value.getLocalPort())
        
            if (result > 0) {
                var ptr = Memory.alloc(result);
                for (var i = 0; i < result; ++i)
                  Memory.writeS8(ptr.add(i), bytearray1[offset + i]);
                console.log(hexdump(ptr, {length: result}))
            }
            //  var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log('contents: => ', ByteString.of(bytearray1).hex())
           // jhexdump(bytearray1)
        
        
            return result
        }
    });
}
function hookSSLSocketAndroid8(){
   
    Java.perform(function () {
        
        
         // com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLOutputStream.write
        Java.use('com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLOutputStream').write.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.write(bytearray1, int1, int2)

            console.log('SSL write result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

            // var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log('contents: => ', ByteString.of(bytearray1).hex())
            jhexdump(bytearray1)

            return result
        }
    
        // com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLInputStream.read
        Java.use('com.android.org.conscrypt.ConscryptFileDescriptorSocket$SSLInputStream').read.overload('[B', 'int', 'int').implementation = function (bytearray1, int1, int2) {
            var result = this.read(bytearray1, int1, int2)

            console.log('SSL read result,bytearray1,int1,int2=>', result, bytearray1, int1, int2)

           // var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log('contents: => ', ByteString.of(bytearray1).hex())
            jhexdump(bytearray1)


            return result
        }
    })
}
function main(){
  //  hookAddress()
    hookSocket()
    hookSSLSocketAndroid8()
}

setImmediate(main)