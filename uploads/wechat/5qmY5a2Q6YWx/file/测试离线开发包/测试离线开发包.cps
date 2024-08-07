/*
* 说明：本文件是“项目离线部署包”场景打包配置文件。
* 提示：项目离线部署包打包时将参考本文件配置进行。为确保打包完整，请将项目引入的“园区”场景URL、
*       模型URL，填写到下方的配置中。
*/
{
    // 当前项目使用的ThingJS包（thing.min.js）版本号
    "thingjs_version" : "1.3.5",
    // 举例：项目中引用的第一个场景URL为 "/api/scene/d370cad09e74f42d932b083d"，
    //      第二个场景URL为 "/api/scene/b422fd26d4c7874df3992068"，
    //      为能正确打包上述两个场景，需配置如下：
     "scenes": [
         "/api/scene/pro_282753",
     ],
    // 举例：项目中动态引用了模型 "/api/models/8CF6171F7EE046968B16E10181E8D941/0/gltf/"，
    //      为能正确打包该引用模型，需配置如下：
     "models": [
         "/Resources/Model/admin/39e7a01c022747518a479548380c32f0"
      ]
}
