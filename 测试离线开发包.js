

// // 加载场景代码 
// var app = new THING.App({ 
//     url: 'https://www.thingjs.com/static/models/factory',  // 场景地址可换
// });
// /**
//   * 名称：新园区效果1
//   * 说明：此效果模板适用于园区
//   */

// // 设置app背景为黑色
// app.background = [0, 0, 0];
// // 引用效果模板组件脚本
// THING.Utils.dynamicLoad([
//     './static/plugins/thing.effect.min/1.5.8/EffectThemeControl.min.js',
//     '/uploads/wechat/oLX7p064jwe0wbt6iU-_f2om-3Wg/Template/202404181120347918206288/frame.js'
// ], function () {
//     app.on('load', function (ev) {
//         app.level.change(ev.campus);
//         //关闭，进到室内自动切换天空盒  
//         app.level.options['autoChangeBackground'] = false;
//         //初始化
//         var control = new THING.EffectThemeControl();
//         app.addControl(control, '效果模板控制器');
//         //获取模板控制器
//         var ctrl = app.getControl('效果模板控制器');
//         //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
//        ctrl.registerTheme('default_parkbusiness', data, '/uploads/wechat/oLX7p064jwe0wbt6iU-_f2om-3Wg/Template/202404181120347918206288');
//         //获取园区
//         c = app.query('.Campus')[0];
//         //应用效果模板
//         c.applyTheme('default_parkbusiness');
//         ctrl.applyEffectTheme('default_parkbusiness', c);
//         ctrl.applyThemeEnvironment('default_parkbusiness', c);
//     })
// })
// 离线开发引入园区场景
// var app = new THING.App({
//     url: '/api/scene/7066231708311440937'  // 场景地址
// });
// 离线开发引入园区场景
var app = new THING.App({
    url: '/api/scene/production_277032'  // 场景地址
});