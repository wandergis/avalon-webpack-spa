/**
 * Created by WangMing on 15/12/9.
 */
define([], function() {
  // 定义所有相关的 vmodel
  var vm = avalon.define({
    $id: "contact"
  });
  return avalon.controller(function($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {

    };
    // 进入视图
    $ctrl.$onEnter = function(param, rs, rj) {

    };
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function() {

    };
    $ctrl.$vmodels = [vm];
  })
});