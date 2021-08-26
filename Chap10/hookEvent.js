var jclazz = null;
var jobj = null;

function getObjClassName(obj) {
    if (!jclazz) {
        var jclazz = Java.use("java.lang.Class");
    }
    if (!jobj) {
        var jobj = Java.use("java.lang.Object");
    }
    return jclazz.getName.call(jobj.getClass.call(obj));
}

function watch(obj, mtdName) {
    var listener_name = getObjClassName(obj);
    var target = Java.use(listener_name);
    if (!target || !mtdName in target) {
        return;
    }
    // send("[WatchEvent] hooking " + mtdName + ": " + listener_name);
    target[mtdName].overloads.forEach(function (overload) {
        overload.implementation = function () {
            //send("[WatchEvent] " + mtdName + ": " + getObjClassName(this));
            console.log("[WatchEvent] " + mtdName + ": " + getObjClassName(this))
            return this[mtdName].apply(this, arguments);
        };
    })
}

function OnClickListener() {
    Java.perform(function () {

        //以spawn启动进程的模式来attach的话
        Java.use("android.view.View").setOnClickListener.implementation = function (listener) {
            if (listener != null) {
                watch(listener, 'onClick');
            }
            return this.setOnClickListener(listener);
        };

        //如果frida以attach的模式进行attch的话
        Java.choose("android.view.View$ListenerInfo", {
            onMatch: function (instance) {
                instance = instance.mOnClickListener.value;
                if (instance) {
                    console.log("mOnClickListener name is :" + getObjClassName(instance));
                    watch(instance, 'onClick');
                }
            },
            onComplete: function () {
            }
        })
    })
}
function OnTouchListener() {
    Java.perform(function () {

        //以spawn启动进程的模式来attach的话
        Java.use("android.view.View").setOnTouchListener.implementation = function (listener) {
            
            if (listener != null) {
                watch(listener, 'onTouch');
            }
            return this.setOnTouchListener(listener);
        };

        //如果frida以attach的模式进行attch的话
        Java.choose("android.view.View$ListenerInfo", {
            onMatch: function (instance) {
                instance = instance.mOnTouchListener;
                if (instance) {
                    console.log("mOnTouchListener name is :" + getObjClassName(instance));
                    watch(instance, 'onTouch');
                }
            },
            onComplete: function () {
            }
        })
    })
}
setImmediate(OnClickListener);
/**
 * OnClickListener#onClick(View v)
 * OnTouchListener#onTouch(View v, MotionEvent event) 
 * Activity onTouchEvent(MotionEvent event) Activity 触摸事件
 * RecyclerView OnItemTouchListener#onTouchEvent(RecyclerView recyclerView, MotionEvent motionEvent)  RecyclerView条目触摸事件
 * OnFlingListener#onFling(int x, int y)
    或
    OnScrollChangeListener#onScrollChange(View v, int x,int y, int oldX, int oldY)
    或
    OnScrollListener#onScrollStateChanged(RecyclerView recyclerView, int newState)
    或
    OnScrollListener#onScrolled(RecyclerView recyclerView,int dx, int dy) onScroll RecyclerView 滑动事件
 * ListView OnItemClickListener#onItemClick(AdapterView parent,View view, int position, long id) - onViewItemClick - ListView - 条目点击事件
 * OnScrollListener#onScrollStateChanged(AbsListView view, int scrollState) 或
    OnScrollChangeListener#onScrollChange(View v, int scrollX, int scrollY, int oldScrollX, int oldScrollY)  onScroll ListView 滑动事件
 */