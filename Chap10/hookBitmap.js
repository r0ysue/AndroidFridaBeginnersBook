
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function saveBitmap_1(){
    Java.perform(function(){
        // public static Bitmap decodeByteArray(byte[] data, int offset, int length, Options opts)
        Java.use('android.graphics.BitmapFactory').decodeByteArray.overload('[B', 'int', 'int', 'android.graphics.BitmapFactory$Options').implementation =  function(data,offset,length,opts){
            var result = this.decodeByteArray(data,offset,length,opts)
            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            console.log("data is =>",ByteString.of(data).hex())
            console.log("data is coming!")
            var path = '/sdcard/Download/tmp/'+guid()+'.jpg'
            console.log("path is =>",path);
            /*
            File f1 = new File("d:\\ff\\test.txt"); 
            fos = new FileOutputStream(f1);  
            byte bytes[] = new byte[1024];   
            fos.write(s.getBytes());
            fos.close();  
            */
            var f = Java.use("java.io.File").$new(path)
            var fos = Java.use("java.io.FileOutputStream").$new(f)
            fos.write(data);
            fos.close();
            return result
        }
    })
    
}
function saveBitmap_2(){
    Java.perform(function(){
        // public static Bitmap decodeByteArray(byte[] data, int offset, int length, Options opts)
        Java.use('android.graphics.BitmapFactory').decodeByteArray.overload('[B', 'int', 'int', 'android.graphics.BitmapFactory$Options').implementation =  function(data,offset,length,opts){
            var result = this.decodeByteArray(data,offset,length,opts)
            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            // console.log("data is =>",ByteString.of(data).hex())
            console.log("data is coming!")
            var path = '/sdcard/Download/tmp/'+guid()+'.jpg'
            console.log("path is =>",path);
            /*
            File pictureFile = new File(filename);
            try {
                pictureFile.createNewFile();
                FileOutputStream oStream = new FileOutputStream(pictureFile);
                Final_bitmap.compress(Bitmap.CompressFormat.PNG, 100, oStream);
                oStream.flush();
                oStream.close();
            
            } catch (IOException e) {
                e.printStackTrace();
            }
            */
            var f = Java.use("java.io.File").$new(path)
            var fos = Java.use("java.io.FileOutputStream").$new(f)
            
            result.compress(Java.use("android.graphics.Bitmap$CompressFormat").JPEG.value,100,fos)
            
            fos.flush();
            fos.close();
            return result
        }
    })
    
}

function saveBitmap_3(){
    
    Java.perform(function(){
        var Runnable = Java.use("java.lang.Runnable");
        var saveImg = Java.registerClass({
            name: "com.roysue.runnable",
            implements: [Runnable],
            fields: {
                bm: "android.graphics.Bitmap",
            },
            methods: {
                $init: [{
                    returnType: "void",
                    argumentTypes: ["android.graphics.Bitmap"],
                    implementation: function (bitmap) {
                        this.bm.value = bitmap;
                    }
                }],
                run: function () {

                    var path = "/sdcard/Download/tmp/" + guid() + ".jpg"
                    console.log("path=> ", path)
                    var file = Java.use("java.io.File").$new(path)
                    var fos = Java.use("java.io.FileOutputStream").$new(file);

                    this.bm.value.compress(Java.use("android.graphics.Bitmap$CompressFormat").JPEG.value, 100, fos)
                    console.log("success!")
                    fos.flush();
                    fos.close();

                }
            }
        });
        // public static Bitmap decodeByteArray(byte[] data, int offset, int length, Options opts)
        Java.use('android.graphics.BitmapFactory').decodeByteArray.overload('[B', 'int', 'int', 'android.graphics.BitmapFactory$Options').implementation =  function(data,offset,length,opts){
            var result = this.decodeByteArray(data,offset,length,opts)
            var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            // console.log("data is =>",ByteString.of(data).hex())
            console.log("data is coming!")
            var runable = saveImg.$new(result)
            runable.run()
            
            return result
        }
    })
    
}
function saveBitmap_4(){
    Java.perform(function(){
        // public static Bitmap decodeByteArray(byte[] data, int offset, int length, Options opts)
        Java.use('android.graphics.BitmapFactory').decodeByteArray.overload('[B', 'int', 'int', 'android.graphics.BitmapFactory$Options').implementation =  function(data,offset,length,opts){
            var result = this.decodeByteArray(data,offset,length,opts)
            send(data)
            return result
        }
    })
    
}
function getKey(){
    Java.perform(function(){
        var CipherClient = Java.use('net.idik.lib.cipher.so.CipherClient')
        var key = CipherClient.decodeImgKey()
        var iv = CipherClient.decodeImgIv()
        console.log(key,iv)

    })
}
function hookEncodedBuffer() {
    //com.ilulutv.fulao2.other.i.b.a((ByteBuffer) obj)
    Java.perform(function () {
        var base64 = Java.use("android.util.Base64")
        // String decodeImgKey = CipherClient.decodeImgKey();
        // 
        Java.use("com.ilulutv.fulao2.other.i.b").a.overload('java.nio.ByteBuffer').implementation = function (obj) {
            var result = this.a(obj);
            //var ByteString = Java.use("com.android.okhttp.okio.ByteString");
            //console.log("data is =>",ByteString.of(result).hex())
            send(result)

            
            return result;
        }
    })
    /*
    key svOEKGb5WD0ezmHE4FXCVQ==
    iv 4B7eYzHTevzHvgVZfWVNIg==
    */
}
function main(){
  //  hookEncodedBuffer()
  saveBitmap_3()
   // getKey()
}

setImmediate(main)