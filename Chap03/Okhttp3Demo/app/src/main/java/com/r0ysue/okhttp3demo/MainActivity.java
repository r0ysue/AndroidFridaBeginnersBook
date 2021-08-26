package com.r0ysue.okhttp3demo;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {


    private static String TAG = "r0ysue666";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 定位发送请求按钮
        Button btn = findViewById(R.id.mybtn);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 访问百度首页
                String requestUrl = "https://www.baidu.com/";
                example myexample = new example();
                try {
                    myexample.run(requestUrl);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

}