THING.Utils.dynamicLoad([
    '/assets/js/format.js'
], function () {

})
// 切换场景
function changeStation(stationId) {
    // const url = curCampus.url;  //　当前园区url
    console.log(stationId,'三维切换车站')
    // 动态创建园区
    // if (url === campusUrl[0].url) {
    //     createCampus(campusUrl[1]);
    // } else {
    //     createCampus(campusUrl[0]);
    // }
    if (stationId == '61') {
        createCampus(campusUrl[0]);
    } else {
        createCampus(campusUrl[1]);
    }
  
}



// 创建园区
function createCampus(obj) {
    console.log('createCampus-fun')
    app.create({
        type: "Campus",
        url: obj.url,
        position: [0, 0, 0],
        visible: false, // 创建园区过程中隐藏园区
        complete: function (ev) {
            curCampus.destroy();    // 新园区创建完成后删除之前的
            curCampus = ev.object;  // 将新园区赋给全局变量
            curCampus.fadeIn(); // 创建完成后显示（渐现）
            //先注释 不开启层级切换
          //  app.level.change(curCampus);    // 开启层级切换
            resetFire();
            getIframeData();  //车站加载完成进行数据处理
            // freshInit();
            setDaySence(false)
            reset()
            console.log(app,app.name,'setday')

            var building = app.query(".Building");  // 获取园区中的建筑
            // 园区加载完成后，将园区中建筑下的楼层删除（Floor）
            // for (var i = 0; i < building.length; i++) {
            //     building[i].floors.destroy();
            // }
        }
    });
}

// 创建进度条组件
function createWidgets() {
    // 进度条界面组件
    loadingPanel = new THING.widget.Panel({
        titleText: '场景加载进度',
        opacity: 0.9, // 透明度
        hasTitle: true
    });

    // 设置进度条界面位置
    loadingPanel.positionOrigin = 'TR'// 基于界面右上角定位
    loadingPanel.position = ['100%', 0];

    loadingPanel.visible = false;

    loadingPanel.addNumberSlider(dataObj, 'progress').step(0.01).min(0).max(1).isPercentage(true);
}