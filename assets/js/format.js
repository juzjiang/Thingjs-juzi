    THING.Utils.dynamicLoad([
        '/assets/js/category.js',
        '/assets/js/paramsMap.js',

    ], function () {

    })

/**
 * 定义类名
*//*  */
var storeIpSet;
var fieldDataList=[];
var realData;
var codeMeans=[];

var storeMeans;
var newOBJ;
var storeCategory = '';
var uiAnchor;
var timer; // 定时器

/**
 * 接收2d传输数据
 */
    function getIframeData(){
    // //mock del
    // flytoLeft('闸机_09');
        //real

        window.onmessage = function(event){
            console.log(event.data,'2d向3d传递信息');
            if(event.data.ipSet ){
                resetEipColor();
                resetFire(); //x先注释
                // freshInit();
                if(event.data.ipSet.init){
                    console.log('init-ip')
                    // changeStation(event.data.ipSet.station);
                    // freshInit();
                    storeIpSet = event.data.ipSet;
                }
                //Object.entries(storeIpSet).toString() != Object.entries(event.data.ipSet).toString()

                //先注释 优化下逻辑
                if(storeIpSet && storeIpSet.station != event.data.ipSet.station){
                    stopGetDevice()
                    changeStation(event.data.ipSet.station);
                    if(event.data.ipSet.alarm){
                        setTimeout(function () {
                            flytoLeft(event.data.ipSet.alarm)
                        }, 4000);
                    }
                    if(event.data.ipSet.fire){
                        setFire()
                    }
                    storeIpSet = event.data.ipSet;
                }else{
                    if(event.data.ipSet.alarm){
                        setTimeout(function () {
                            flytoLeft(event.data.ipSet.alarm)
                        }, 3000);
                    }
                    if(event.data.ipSet.fire){
                        setFire()
                    }
                    storeIpSet = event.data.ipSet;
                }
            }
            if(event.data.view){
                if(event.data.view === 'fresh'){
                    freshInit();
                    stopRotateAround();
                }else if(event.data.view === 'rotate'){
                    rotateAroundObj();
                }else{
                    stopRotateAround()
                }
            }

            if(event.data.category){
                // freshInit();
                console.log(event.data.category,app.camera.position,app.camera.scale,'专业===测试')
                reset();
                resetEipColor();
            // 专业变化清除定时器
                if(storeCategory && storeCategory != event.data.category){
                    stopGetDevice();
                }
                //MINGTIAN
                if(event.data.category !=''){
                    storeCategory = event.data.category;
                    const params = getParams(event.data.category);
                    // 每隔5s 请求一次数据
                        stopGetDevice()
                        getDevice(params);
                        timer = setInterval(function () {
                            reset();
                            getDevice(params);
                        }, 10000);
                }else{
                    stopGetDevice()
                }
            }else{
                reset();
                stopGetDevice();
                resetEipColor();
            }
        }
    }

    /**
     * params 专业传参
     */
    function getParams(category){
    let params = [
            {
                "code": category,
                "displayName": "",
                "location": "",
                "name": paramsNameMap[category]
            },
        ];
        return params;
    }

    /**
     * http请求
     */

    async function getDevice(params){
        console.log(storeIpSet,'storeIpSet')
    //mock del
    //  realData = mockData;
    //  getData();
    //real
        $.ajax({
            type: "post",
            url: `${storeIpSet.baseUrl}/modeltool/point-information/pointloading`,
            data: JSON.stringify(params),
            contentType: 'application/json',
            headers: {
                'Content-Type':'application/json;charset=UTF-8',
                'station':storeIpSet.station,
                'platform_token': storeIpSet.token,
            },
            dataType: "json", // 返回的数据类型 json
            success: function (res) {
                if(res.code === '00000'){
                    realData = res.data;
                    getData();
                }else{
                    // window.parent.postMessage({errorNetwork: res}, "*");
                }
            },
            // error: function(error){
            //     window.parent.postMessage({errorNetwork: error}, "*");
            // },
        });
    }

    /**
     * 处理接口请求来的数据
     */
    function getData(){
        fieldDataList = [];
        newOBJ = {};
        var things = app.query('.Campus')[0].things; // 楼层内Thing类物体
        console.log(things,'things=====')
        //过滤能源对象
            if(realData){
            realData.datas = [... realData.datas, { ... newOBJ}]
            realData.datas.forEach((item,index)=>{
                let  thingObj = things.query(`#${item.displayName}`)
                    if(!thingObj.length){
                        console.log(item.displayName,'模型不存在此ID')
                    }
                if(thingObj.length){
                    thingObj[0].userData = item
                    fieldDataList.push(thingObj[0])
                }

            })
            codeMeans =  [...realData.means]
        }
            createAllPanels();
    }

/**
 * 遍历添加面板
 */
function createAllPanels() {
    console.log(fieldDataList,'fieldDataList==')
    fieldDataList.forEach(function (obj, index) {
        storeMeans = codeMeans.filter((v) => v.code === obj.userData.code );
        handlePanelData(storeMeans,obj,index,obj.userData.displayName);
    });
    // flytoLeft('闸机_09');

}


//旋转
function rotateAroundObj() {
  // 设置摄像机位置和目标点
  app.camera.position = [0.19841796562863578, 76.7878047995928, 67.8851517847151]
  app.camera.target = [0.19841796562863578,2.816318194482098, -4.232694830042987];
    app.camera.rotateAround({
        object: app.query('.Campus')[0],
        target: [0,0,0],
        yRotateAngle: 360,
        time: 30000,
        loopType:THING.LoopType.Repeat,
        complete:function(){
            THING.Utils.log('finish')
        }
    });
}

function stopRotateAround(){
    app.camera.stopRotateAround();
    app.camera.position = [0.19841796562863578, 76.7878047995928, 67.8851517847151]
    app.camera.target = [0.19841796562863578,2.816318194482098, -4.232694830042987];
}

function freshInit(){

        app.camera.position = [0.19841796562863578, 76.7878047995928, 67.8851517847151]
        app.camera.target = [0.19841796562863578,2.816318194482098, -4.232694830042987];
}
// 停止数据请求
function stopGetDevice() {
    if(timer){
        clearInterval(timer);
    }
}

// 聚焦物体 变色
function flytoLeft(eip) {
    console.log(eip,'flytoLeft')
    resetEipColor();
    resetFire();
    let eipId = app.query(`#${eip}`);
    console.log(eipId,'fly====2222-ff')
    app.camera.flyTo({
        object:eipId[0],
        xAngle: 45,  // 绕物体自身X轴旋转角度
        yAngle: 180,  // 绕物体自身Y轴旋转角度
        radiusFactor: 2,  // 物体包围盒半径的倍数
        time: 1 * 1000,
        complete: function () {
            console.log(eipId.style.color,'飞行complete===')
            eipId.style.color = '#ff0000';
            eipId.style.opacity = 0.5;
            eipId.on('update', function () {
                eipId.style.opacity = 1 + 0.5 * Math.sin(2 * app.elapsedTime / 1000);
            }, '每帧改变透明度');
        }
    });
}
/**
 * 重置
 */
function reset(){
    console.log($('.box').length,'reset');
    //  app.query(`#${storeIpSet.alarm}`).style.color = null;
    app.query('.Marker').destroyAll();
    if( $('.box').length){
        $('.box').remove();
    }
}
/**
 * mock 重置报警色系颜色
 */
function resetEipColor(){
    //real
    console.log(app.query('#XA_PSD01').style,'resetEipColor-change')

    app.query('.Campus')[0].things.forEach((item,index)=>{
        item.style.color = null;
        item.style.opacity = 1.0;
        item.off('update', null, '每帧改变透明度'); 
    })
    if(storeIpSet && storeIpSet.alarm){
        const eip =app.query(`#${storeIpSet.alarm}`);
        console.log(eip,'reset-color')
        eip.off('update', null, '每帧改变透明度');  // 卸载事件
        eip.style.opacity = 1.0;
        eip.style.outlineColor = null  // 设置勾边颜色
        // app.query(`#${storeIpSet.alarm}`).style.color = null;

    }
    //mock del
    // app.query(`#闸机_09`).style.color = null;
}
// 火灾预警
function setFire(){
    const fireThing =  app.query('#XA_Huo');
    fireThing.visible = true;
    // fireThing.style.opacity = 100;
   
}
function resetFire(){
    const fireThing =  app.query('#XA_Huo')
    // fireThing.style.opacity = 50;
    fireThing.visible = false;
}

/**
 * mock 专业切换
 */
function changeCat(){
    freshInit();
    getDevice('');
    resetEipColor();
}