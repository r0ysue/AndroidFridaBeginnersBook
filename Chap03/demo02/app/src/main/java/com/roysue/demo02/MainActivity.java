package com.roysue.demo02;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;

public class MainActivity extends AppCompatActivity {

    private String total = "hello";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        while (true){

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            fun(50,30);
            Log.d("r0ysue.string" , fun("LoWeRcAsE Me!!!!!!!!!"));
        }
    }
    void fun(int x , int y ){
        Log.d("r0ysue.sum" , String.valueOf(x+y));
    }
    String fun(String x){
        return x.toLowerCase();
    }

    void secret(){
        total += " secretFunc";
        Log.d("r0ysue.secret" , "this is secret func");
    }
    static void staticSecret(){
        Log.d("r0ysue.secret" , "this is static secret func");
    }
}