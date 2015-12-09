/**
 * Created by WangMing on 15/12/9.
 */
define([], function () {
  // 定义所有相关的vmodel
  var vm = avalon.define({
      $id: "services"
    });

  return avalon.controller(function ($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function () {
      $("#testjq").click(function () {
        alert("我是jquery控制弹出的!");
      });
    };
    // 进入视图
    $ctrl.$onEnter = function (param, rs, rj) {
    };
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function () {

    };
    $ctrl.$vmodels = [vm];
  })
});