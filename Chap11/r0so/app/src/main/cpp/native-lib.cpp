#include <jni.h>
#include <string>
#include <android/log.h>

#define  TAG    "r0so2"

// 定义info信息
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG,__VA_ARGS__)
// 定义debug信息
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, TAG, __VA_ARGS__)
// 定义error信息
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG,__VA_ARGS__)



extern "C" JNIEXPORT jstring JNICALL
Java_com_roysue_r0so_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++ r0ysue";
    return env->NewStringUTF(hello.c_str());
}


extern "C" JNIEXPORT jstring JNICALL
Java_com_roysue_r0so_MainActivity_stringFromJNI2(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++ stringFromJNI2 r0ysue ";
    return env->NewStringUTF(hello.c_str());
}

//
//JNIEXPORT jstring JNICALL stringFromJNI3(JNIEnv *env,jobject /* this */) {
//    std::string hello = "Hello from C++ sI3";
//    return env->NewStringUTF(hello.c_str());
//}



JNIEXPORT jstring JNICALL stringFromJNI3(
        JNIEnv* env,
        jobject /*this*/) {
    std::string hello = "Hello from C++ stringFromJNI3 r0ysue ";
    return env->NewStringUTF(hello.c_str());
}

jint JNI_OnLoad(JavaVM* vm, void* reserved)
{
    JNIEnv * env;
    vm->GetEnv((void**)&env,JNI_VERSION_1_6);
    JNINativeMethod methods[] = {
            {"sI3","()Ljava/lang/String;",(void*)stringFromJNI3},
    };

    env->RegisterNatives(env->FindClass("com/roysue/r0so/MainActivity"),methods,1);
    
    return JNI_VERSION_1_6;
}

