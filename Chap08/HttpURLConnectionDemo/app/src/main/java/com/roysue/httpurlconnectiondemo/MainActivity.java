package com.roysue.httpurlconnectiondemo;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        new Thread(new Runnable() {

            @Override
            public void run() {
                while (true){
                    try {
                        URL url = new URL("https://www.baidu.com");
                        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                        connection.setRequestMethod("GET");
                        connection.setRequestProperty("token","r0ysue666");
                        connection.setConnectTimeout(8000);
                        connection.setReadTimeout(8000);
                        connection.connect(); // 开始连接
                        InputStream in = connection.getInputStream();
                        //if(in.available() > 0){

                        // 每次写入1024字节
                        int bufferSize = 1024;
                        byte[] buffer = new byte[bufferSize];
                        StringBuffer sb = new StringBuffer();
                        while ((in.read(buffer)) != -1) {
                            sb.append(new String(buffer));
                        }
                        Log.d("r0ysue666", sb.toString());
                        connection.disconnect();
                       // }

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    try {
                        Thread.sleep(10*1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }
}