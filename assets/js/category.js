 THING.Utils.dynamicLoad([
    '/assets/css/category.css',
    '/assets/js/categoryMap.js'

], function () {

})
/**
 * 专业面板处理
 */
    function handlePanelData(storeMeans,obj,index,objId) {
        var infoWindowHtml;
        var html;
        const objCode = obj.userData.code;
        const newObj = obj.userData?.point;

        html =  alowancePanel(newObj,objCode,infoWindowHtml,storeMeans,objId);

        $('#div3d').append($(html));
        uiAnchor = app.create({
            type: 'UIAnchor',
            name: 'UIAnchor',
            id:`silent${objId}`,
            parent: obj,//绑定父物体
            element: $(`#silent${objId}`)[0],
            localPosition: [0, 3, 0],
            pivotPixel:[26, 30]
        });
        return uiAnchor;
}

/**
 *
 */
function alowancePanel(newObj,objCode,infoWindowHtml,storeMeans,indexObj){
    let str ='';
    let workState;
    let alarmState;
    storeMeans.forEach(function (item, index) {
        newObj.forEach(function (ite, ind) {
            if(item.code === objCode){
                if(item.key == ite.name){
                    if(ite.name === categoryStatusMap[objCode].working){
                        workState = JSON.parse(item.value)[ite.value] ==='关';
                    }
                    if(ite.name === categoryStatusMap[objCode].malfunction){
                        alarmState = JSON.parse(item.value)[ite.value] ==='故障';
                    }
                }
            }
        })
    })
    infoWindowHtml = `<ul class="box" id="silent${indexObj}"
                        style="position:absolute ;top: 513px; left: 361px; ${alarmState ? CSSMAP[objCode].active : workState ? CSSMAP[objCode].offline : CSSMAP[objCode].normal }">
                    ${str}</ul>`
    return infoWindowHtml
}
