package com.r0ysue.okhttp3demo;

import android.util.Log;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class example {

    // TAG即为日志打印时的标签
    private static final String TAG = "r0ysue666";

    // 新建一个Okhttp客户端
    OkHttpClient client = new OkHttpClient();

    void run(String url) throws IOException {
        // 构造request
        Request request = new Request.Builder()
                .url(url)
                .header("token","r0ysue")
                .build();

        // 发起异步请求
        client.newCall(request).enqueue(
                new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {

                        //打印输出
                        Log.d(TAG, response.body().string());

                    }
                }
        );
    }
}
