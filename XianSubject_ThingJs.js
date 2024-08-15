

// 加载车站代码 
var app = new THING.App({
    url: "/scene/production_304109"
});

var dataObj = { progress: 0 };  // 场景加载进度条数据对象
var loadingPanel;               // 进度条界面组件
var curCampus;                  // 当前加载的园区对象
// 离线开发引入园区场景
/**
 * 场景
 */
let lighting = null;        // 灯光效果
let postEffect = null;      // 后期设置
let skyEffect = null;       // 天空盒
let background = null;      // 背景
let modelData = null;       // 模板数据
let modelDataUrl = '';      // 模板路径
let tempData = null;        // 临时模板数据，在关闭模板后，再次开启效果时调用
let tempUrl = '';           // 临时模板路径，在关闭模板后，再次开启效果时调用
let ctrl_name = null;       // 效果模板名称
var ctrl = null;            //效果
// 离线开发引入园区场景
// 配置切换的建筑的园区场景url
var campusUrl = [{
        name: "beijing",
        url: "/scene/production_301363"
    }, {
        name: "xian",
        url: "/scene/production_304109"
}];
// 配置动态加载的室内园区场景url
var buildingConfig = {
    'beijing': '/scene/production_301177',
    'xian': '/scene/production_304109',
};

// 引用效果模板组件脚本
THING.Utils.dynamicLoad([
    '/assets/js/station.js',
    '/assets/js/mock.js',
    '/assets/js/format.js',
    '/static/plugins/thing.effect.min/1.5.2/EffectThemeControl.min.js',
    './product/resource/ea667047730ad81f5839fcdfcbe59460/static/frame.js',
], function () {
// 主车站加载完后删掉楼层
    app.on('load', function (ev) {
         //关闭thing拾级
        app.pauseEvent(THING.EventType.Pick, '*', THING.EventTag.LevelPickOperation);
         //关闭鼠标右击返回上一层级
        app.pauseEvent(THING.EventType.Click, null, THING.EventTag.LevelBackOperation);
        curCampus = ev.campus;

        //效果
        app.level.change(ev.campus);
        lighting = app.lighting;
        postEffect = app.postEffect;
        skyEffect = app.skyBox;
        background = app.background;
        //关闭，进到室内自动切换天空盒
        app.level.options['autoChangeBackground'] = false;
         //初始化
        var control = new THING.EffectThemeControl();
        app.addControl(control, '效果模板控制器');
        //获取模板控制器
        ctrl = app.getControl('效果模板控制器');
        setDaySence(true)  //默认白天

        setTimeout(() => {
            getIframeData();  //车站加载完成进行数据处理
            window.parent.postMessage({Complete:true}, "*");
        }, 2000);
       })

    // app.on('Complete', function (ev) {
    //     getIframeData();  //车站加载完成进行数据处理
    //     window.parent.postMessage({Complete:true}, "*");
    //     console.log('模型加载完毕')
    // });

    // 卸载动态创建的园区
    app.on(THING.EventType.LeaveLevel, '.Building', function (ev) {
        var current = ev.current;
        if (current.type === "Campus") {
            var building = ev.previous;  // 获取之前的层级
            if (!building) return;
            building._isAlreadyBuildedFloors = false;
            if (building.floors) building.floors.destroy();
        }
    }, '退出建筑时卸载建筑下的楼层');

    // 进入建筑时 动态加载园区
    app.on(THING.EventType.EnterLevel, '.Building', function (ev) {
        var buildingMain = ev.object;  // 获取当前建筑对象
        var buildingName = buildingMain.name;  // 获取当前建筑名称

        var preObject = ev.previous;  // 上一层级的物体

        // 如果是从楼层退出 进入Building的 则不做操作
        if (preObject instanceof THING.Floor) return;

        initThingJsTip(buildingName + '正在加载！');

        loadingPanel.visible = true;

        // 暂停进入建筑时的默认飞行操作，等待楼层创建完成
        app.pauseEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
        // 暂停单击右键返回上一层级功能
        app.pauseEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

        // 动态创建园区
        var campusTmp = app.create({
            type: 'Campus',
            // 根据不同的建筑，传入园区相应的url
            url: buildingConfig[buildingName],
            // 在回调中，将动态创建的园区和园区下的建筑删除 只保留楼层 并添加到相应的建筑中
            complete: function () {
                var buildingTmp = campusTmp.buildings[0];
                buildingTmp.floors.forEach(function (floor) {
                    buildingMain.add({
                        object: floor,
                        // 设置相对坐标，楼层相对于建筑的位置保持一致
                        localPosition: floor.localPosition
                    });
                })

                // 楼层添加后，删除园区以及内部的园区建筑
                buildingTmp.destroy();
                campusTmp.destroy();

                loadingPanel.visible = false;

                // 恢复默认的进入建筑飞行操作
                app.resumeEvent(THING.EventType.EnterLevel, '.Building', THING.EventTag.LevelFly);
                // 恢复单击右键返回上一层级功能
                app.resumeEvent(THING.EventType.Click, '*', THING.EventTag.LevelBackOperation);

                // 这一帧内 暂停自定义的 “进入建筑创建楼层” 响应
                app.pauseEventInFrame(THING.EventType.EnterLevel, '.Building', '进入建筑创建楼层');
                // 触发进入建筑的层级切换事件 从而触发内置响应
                buildingMain.trigger(THING.EventType.EnterLevel, ev);
                initThingJsTip(buildingName + '加载完成！');
            }
        });
    }, '进入建筑创建楼层', 51);


    app.on(THING.EventType.LoadCampusProgress, function (ev) {
        var value = ev.progress;
        dataObj.progress = value;
    }, '加载车站进度');

},true,true,true)

/**
 * 场景白天效果
 */
function setDaySence(state){

        modelData = data // 模板数据
        tempData = data;// 模板数据
        modelDataUrl = './product/resource/ea667047730ad81f5839fcdfcbe59460/static'
        tempUrl = './product/resource/ea667047730ad81f5839fcdfcbe59460/static'; // 模板包地址
        removeModel(); // 移除模板
        initEffectThemeControl(modelData, modelDataUrl,'default_parkbusiness'); // 应用模板
        ctrl_name = '白天'
        if(state){
          console.log('白天模型加载完毕')
          setTimeout(()=>{
            window.parent.postMessage({Complete:true}, "*");
          },4000)
        }
}


// 模板数据注册和应用
function initEffectThemeControl(modelData, modelDataUrl,modelName) {

    //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
    ctrl.registerTheme(modelName, modelData, modelDataUrl);
    //获取园区
    campus = app.query('.Campus')[0];
    //应用效果模板
    campus.applyTheme(modelName);
    ctrl.applyEffectTheme(modelName, campus);
    ctrl.applyThemeEnvironment(modelName, campus);
}

// 效果模板销毁
function removeModel() {
    // 销毁效果模板
    if(ctrl_name){
        ctrl.destroyEffectTheme('default_parkbusiness', campus);
        campus.applyTheme(null);
        // 清除全局参数背景和天空盒
        app.skyBox = null;
        app.background = null;
        ctrl_name = null;
        globalEffectConfig(lighting, postEffect, skyEffect, background);
        THING.App.current.off(THING.EventType.EnterLevel, null, 'ThemeEnterLevelToUpdateEnv');
    }
}
// 全局效果配置参数
function globalEffectConfig(config, effectConfig, skyBox, background) {
    app.lighting = config; // 灯光效果
    app.postEffect = effectConfig; // 后期设置
    app.skyBox = skyBox; // 天空盒
    app.background = background; // 背景
}



