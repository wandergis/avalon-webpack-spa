/**
 * Created by WangMing on 15/12/9.
 */
var avalon = require("./assets/vendor/avalon/avalon.shim");
require('../node_modules/purecss/build/pure-min.css');
require('./assets/css/layouts/side-menu.css');
require('./assets/css/style.css');
//项目入口
require("./assets/vendor/oniui/mmRequest/mmRequest");
require("./assets/vendor/oniui/mmRouter/mmState");
require("./assets/vendor/oniui/cookie/avalon.cookie");
require("./assets/vendor/oniui/datepicker/avalon.coupledatepicker");
require("./assets/vendor/oniui/pager/avalon.pager");
require("./assets/vendor/oniui/dialog/avalon.dialog");
require("./assets/vendor/oniui/validation/avalon.validation");

// 定义一个顶层的vmodel，用来放置全局共享数据
var root = avalon.define({
  $id: "app"
});

/**
 * 首页路由
 */
avalon.state("home", {
  url: "/home",
  views: {
    "": {
      //配置模块模板和控制器
      templateProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function (tt) {
            rs(require("text!./modules/home/home.html"))
          })
        })
      },
      controllerProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function () {
            rs(require("./modules/home/home.js"))
          })
        })
      }
    }
  }
});
avalon.state("about", {
  url: "/about",
  views: {
    "": {
      //配置模块模板和控制器
      templateProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function (tt) {
            rs(require("text!./modules/about/about.html"))
          })
        })
      },
      controllerProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function () {
            rs(require("./modules/about/about.js"))
          })
        })
      }
    }
  }
});
avalon.state("contact", {
  url: "/contact",
  views: {
    "": {
      //配置模块模板和控制器
      templateProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function (tt) {
            rs(require("text!./modules/contact/contact.html"))
          })
        })
      },
      controllerProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function () {
            rs(require("./modules/contact/contact.js"))
          })
        })
      }
    }
  }
});
avalon.state("services", {
  url: "/services",
  views: {
    "": {
      //配置模块模板和控制器
      templateProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function (tt) {
            rs(require("text!./modules/services/services.html"))
          })
        })
      },
      controllerProvider: function () {
        return new Promise(function (rs) {
          require.ensure([], function () {
            rs(require("./modules/services/services.js"))
          })
        })
      }
    }
  }
});
/**
 * 路由全局配置
 */
avalon.state.config({
  onError: function () {
    //console.log(arguments)
  },
  onBegin: function () {

  },
  onViewEnter: function (newNode, oldNode) {

  } // 不建议使用动画，因此实际使用的时候，最好去掉onViewEnter和ms-view元素上的oni-mmRouter-slide

});
avalon.history.start({
  basepath: "/",
  fireAnchor: false
});
//开始扫描编译
avalon.scan();