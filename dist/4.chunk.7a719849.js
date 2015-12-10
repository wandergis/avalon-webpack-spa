webpackJsonp([4,9],{

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by WangMing on 15/12/9.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	  var validationVM;
	
	  function showError(el, data) {
	    var next = el.parentNode.lastChild;
	    if (!(next && next.className === "error-tip")) {
	      next = document.createElement("div");
	      next.className = "error-tip";
	      el.parentNode.appendChild(next);
	    }
	    next.innerHTML = data.getMessage();
	  }
	
	  function removeError(el) {
	    var next = el.parentNode.lastChild;
	    if (next && next.className === "error-tip") {
	      el.parentNode.removeChild(next);
	    }
	  }
	
	  // 定义所有相关的vmodel
	  var vm = avalon.define({
	    $id: "about",
	    name: "",
	    idcard: "",
	    phone: "",
	    $skipArray: ["validation"],
	    reset: function () {
	      validationVM && validationVM.resetAll()
	    },
	    validation: {
	      onInit: function (v) {
	        validationVM = v;
	      },
	      onReset: function (e, data) {
	        //data.valueResetor && data.valueResetor();
	        avalon(this).removeClass("error success");
	        removeError(this);
	      },
	      onError: function (reasons) {
	        reasons.forEach(function (reason) {
	          avalon(this).removeClass("success").addClass("error");
	          showError(this, reason);
	        }, this)
	      },
	      onSuccess: function () {
	        avalon(this).removeClass("error").addClass("success");
	        removeError(this);
	      },
	      onValidateAll: function (reasons) {
	        reasons.forEach(function (reason) {
	          avalon(reason.element).removeClass("success").addClass("error");
	          showError(reason.element, reason);
	          //console.log("验证中");
	
	        });
	        if (reasons.length === 0) {
	          //avalon.log("全部验证成功！");
	        }
	      }
	    },
	    show: function (id) {
	      validationVM.resetAll();
	      var dialog = avalon.vmodels[id];
	      if (!dialog) {
	
	      }
	      else{
	        dialog.toggle=true;
	      }
	    },
	    $OptTestDialog: {
	      title: "测试对话框",
	      width: 600,
	      onConfirm: function () {
	        alert("你点击了确定");
	      }
	    }
	  });
	  return avalon.controller(function ($ctrl) {
	    // 视图渲染后，意思是avalon.scan完成
	    $ctrl.$onRendered = function () {
	
	    };
	    // 进入视图
	    $ctrl.$onEnter = function (param, rs, rj) {
	
	    };
	    // 对应的视图销毁前
	    $ctrl.$onBeforeUnload = function () {
	
	    };
	    $ctrl.$vmodels = [vm];
	  })
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});
//# sourceMappingURL=4.chunk.7a719849.js.map