

// 加载地图
var app = new THING.App();
// 设置app背景为黑色
app.background = [0, 0, 0];
// 引用地图组件脚本
THING.Utils.dynamicLoad(['./source/uearth.min.js'], function () {
    app.create({
        type: 'Map',
        // 地图场景名：吉林_长春_南关区1
        // 方式一：FeatureLayer方式
        //       （建筑面图层以FeatureLayer的方式加载，各建筑均可被查询或绑定事件，
        //         当建筑面数据量较大时，渲染性能降低）
        // url: "./cityBuilder/1/map.json",
        // 方式二：BigBuildingLayer方式（推荐）
        //       （建筑面图层以大数据楼图层BigBuildingLayer的方式加载，渲染性能更强，
        //         但各建筑无法被查询，绑定事件可通过拾取信息关联设置，或使用FeatureLayer的方式叠加辅助图层）
        url: "./cityBuilder/1/map.json",
        complete: function (event) {
            console.log(event.object.userLayers.length);
        }
    });
});
/**
 * 引入场景预览脚本
 * 说明：引用该脚本需要传递参数，参数为创建的app对象、类型type，type的值有两种，scene和city，
 *      用于区分园区和地图、如果type值为city，需要额外传递参数，参数值为创建的map对象。
 * 备注：
 *      1. 如果引入该脚本是预览园区，则不能在“load”事件中调用，初始化方法示例
 *         为：new AppPreview({app:app, type:'scene'})
 *      2. 如果引入该脚本是预览地图，则应在引用地图组件脚本complete回调中引用，初始化
 *         方法示例为：new AppPreview({app:app, type:'city', map:event.object})
 */
// THING.Utils.dynamicLoad(['./guide/ScenePreview/v0.1.7/AppPreview.min.js'],
//     function () {
//         new AppPreview({app: app, type: 'city', map:event.object});  // 执行初始化
//     }
// )
