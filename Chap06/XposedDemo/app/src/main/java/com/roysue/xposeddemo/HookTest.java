package com.roysue.xposeddemo;

import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.XC_MethodHook;
import de.robv.android.xposed.XposedBridge;
import de.robv.android.xposed.XposedHelpers;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

public class HookTest implements IXposedHookLoadPackage {


    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam loadPackageParam) throws Throwable {

        if (loadPackageParam.packageName.equals("com.roysue.demo02")) {
            XposedBridge.log(loadPackageParam.packageName + " has Hooked!");
            Class clazz = loadPackageParam.classLoader.loadClass(
                    "com.roysue.demo02.MainActivity");
            XposedHelpers.findAndHookMethod(clazz, "fun",
                    String.class,
                    new XC_MethodHook() {
                protected void beforeHookedMethod(MethodHookParam param) throws Throwable {
                    super.beforeHookedMethod(param);
                    XposedBridge.log("input : " + param.args[0]);
                }

                protected void afterHookedMethod(MethodHookParam param) throws Throwable {

                    param.setResult("You has been hijacked");
                }

            });

        }

    }

}


