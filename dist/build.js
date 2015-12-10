webpackJsonp([0,9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by WangMing on 15/12/9.
	 */
	var avalon = __webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	//项目入口
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(31);
	__webpack_require__(34);
	__webpack_require__(39);
	
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
	          __webpack_require__.e/* nsure */(1, function (tt) {
	            rs(__webpack_require__(40))
	          })
	        })
	      },
	      controllerProvider: function () {
	        return new Promise(function (rs) {
	          __webpack_require__.e/* nsure */(2, function () {
	            rs(__webpack_require__(41))
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
	          __webpack_require__.e/* nsure */(3, function (tt) {
	            rs(__webpack_require__(42))
	          })
	        })
	      },
	      controllerProvider: function () {
	        return new Promise(function (rs) {
	          __webpack_require__.e/* nsure */(4, function () {
	            rs(__webpack_require__(43))
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
	          __webpack_require__.e/* nsure */(5, function (tt) {
	            rs(__webpack_require__(44))
	          })
	        })
	      },
	      controllerProvider: function () {
	        return new Promise(function (rs) {
	          __webpack_require__.e/* nsure */(6, function () {
	            rs(__webpack_require__(45))
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
	          __webpack_require__.e/* nsure */(7, function (tt) {
	            rs(__webpack_require__(46))
	          })
	        })
	      },
	      controllerProvider: function () {
	        return new Promise(function (rs) {
	          __webpack_require__.e/* nsure */(8, function () {
	            rs(__webpack_require__(47))
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*==================================================
	 Copyright (c) 2013-2015 司徒正美 and other contributors
	 http://www.cnblogs.com/rubylouvre/
	 https://github.com/RubyLouvre
	 http://weibo.com/jslouvre/
	 
	 Released under the MIT license
	 avalon.js 1.4.7.1 built in 2015.11.19
	 support IE6+ and other browsers
	 ==================================================*/
	(function(global, factory) {
	
	    if (typeof module === "object" && typeof module.exports === "object") {
	        // For CommonJS and CommonJS-like environments where a proper `window`
	        // is present, execute the factory and get avalon.
	        // For environments that do not have a `window` with a `document`
	        // (such as Node.js), expose a factory as module.exports.
	        // This accentuates the need for the creation of a real `window`.
	        // e.g. var avalon = require("avalon")(window);
	        module.exports = global.document ? factory(global, true) : function(w) {
	            if (!w.document) {
	                throw new Error("Avalon requires a window with a document")
	            }
	            return factory(w)
	        }
	    } else {
	        factory(global)
	    }
	
	    // Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	
	    /*********************************************************************
	     *                    全局变量及方法                                  *
	     **********************************************************************/
	    var expose = new Date() - 0
	        //http://stackoverflow.com/questions/7290086/javascript-use-strict-and-nicks-find-global-function
	    var DOC = window.document
	    var head = DOC.getElementsByTagName("head")[0] //HEAD元素
	    var ifGroup = head.insertBefore(document.createElement("avalon"), head.firstChild) //避免IE6 base标签BUG
	    ifGroup.innerHTML = "X<style id='avalonStyle'>.avalonHide{ display: none!important }</style>"
	    ifGroup.setAttribute("ms-skip", "1")
	    ifGroup.className = "avalonHide"
	    var rnative = /\[native code\]/ //判定是否原生函数
	    function log() {
	        if (window.console && avalon.config.debug) {
	            // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
	            Function.apply.call(console.log, console, arguments)
	        }
	    }
	
	
	    var subscribers = "$" + expose
	    var stopRepeatAssign = false
	    var rword = /[^, ]+/g //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
	    var rcomplexType = /^(?:object|array)$/
	    var rsvg = /^\[object SVG\w*Element\]$/
	    var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
	    var oproto = Object.prototype
	    var ohasOwn = oproto.hasOwnProperty
	    var serialize = oproto.toString
	    var ap = Array.prototype
	    var aslice = ap.slice
	    var W3C = window.dispatchEvent
	    var root = DOC.documentElement
	    var avalonFragment = DOC.createDocumentFragment()
	    var cinerator = DOC.createElement("div")
	    var class2type = {}
	    "Boolean Number String Function Array Date RegExp Object Error".replace(rword, function(name) {
	        class2type["[object " + name + "]"] = name.toLowerCase()
	    })
	
	
	    function noop() {}
	
	
	    function oneObject(array, val) {
	        if (typeof array === "string") {
	            array = array.match(rword) || []
	        }
	        var result = {},
	            value = val !== void 0 ? val : 1
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value
	        }
	        return result
	    }
	
	    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	    var generateID = function(prefix) {
	        prefix = prefix || "avalon"
	        return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
	    }
	
	    function IE() {
	        if (window.VBArray) {
	            var mode = document.documentMode
	            return mode ? mode : window.XMLHttpRequest ? 7 : 6
	        } else {
	            return NaN
	        }
	    }
	    var IEVersion = IE()
	
	    avalon = function(el) { //创建jQuery式的无new 实例化结构
	        return new avalon.init(el)
	    }
	
	    avalon.profile = function() {
	        if (window.console && avalon.config.profile) {
	            Function.apply.call(console.log, console, arguments)
	        }
	    }
	
	    /*视浏览器情况采用最快的异步回调*/
	    avalon.nextTick = new function() { // jshint ignore:line
	            var tickImmediate = window.setImmediate
	            var tickObserver = window.MutationObserver
	            if (tickImmediate) { //IE10 \11 edage
	                return tickImmediate.bind(window)
	            }
	
	            var queue = []
	
	            function callback() {
	                var n = queue.length
	                for (var i = 0; i < n; i++) {
	                    queue[i]()
	                }
	                queue = queue.slice(n)
	            }
	
	            if (tickObserver) { // 支持MutationObserver
	                var node = document.createTextNode("avalon")
	                new tickObserver(callback).observe(node, {
	                        characterData: true
	                    }) // jshint ignore:line
	                return function(fn) {
	                    queue.push(fn)
	                    node.data = Math.random()
	                }
	            }
	
	            if (window.VBArray) {
	                return function(fn) {
	                    queue.push(fn)
	                    var node = DOC.createElement("script")
	                    node.onreadystatechange = function() {
	                        callback() //在interactive阶段就触发
	                        node.onreadystatechange = null
	                        head.removeChild(node)
	                        node = null
	                    }
	                    head.appendChild(node)
	                }
	            }
	
	
	            return function(fn) {
	                setTimeout(fn, 4)
	            }
	        } // jshint ignore:line
	        /*********************************************************************
	         *                 avalon的静态方法定义区                              *
	         **********************************************************************/
	    avalon.init = function(el) {
	        this[0] = this.element = el
	    }
	    avalon.fn = avalon.prototype = avalon.init.prototype
	
	    avalon.type = function(obj) { //取得目标的类型
	        if (obj == null) {
	            return String(obj)
	        }
	        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	        return typeof obj === "object" || typeof obj === "function" ?
	            class2type[serialize.call(obj)] || "object" :
	            typeof obj
	    }
	
	    var isFunction = typeof alert === "object" ? function(fn) {
	        try {
	            return /^\s*\bfunction\b/.test(fn + "")
	        } catch (e) {
	            return false
	        }
	    } : function(fn) {
	        return serialize.call(fn) === "[object Function]"
	    }
	    avalon.isFunction = isFunction
	
	    avalon.isWindow = function(obj) {
	        if (!obj)
	            return false
	                // 利用IE678 window == document为true,document == window竟然为false的神奇特性
	                // 标准浏览器及IE9，IE10等使用 正则检测
	        return obj == obj.document && obj.document != obj //jshint ignore:line
	    }
	
	    function isWindow(obj) {
	        return rwindow.test(serialize.call(obj))
	    }
	    if (isWindow(window)) {
	        avalon.isWindow = isWindow
	    }
	    var enu
	    for (enu in avalon({})) {
	        break
	    }
	    var enumerateBUG = enu !== "0" //IE6下为true, 其他为false
	        /*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	    avalon.isPlainObject = function(obj, key) {
	        if (!obj || avalon.type(obj) !== "object" || obj.nodeType || avalon.isWindow(obj)) {
	            return false;
	        }
	        try { //IE内置对象没有constructor
	            if (obj.constructor && !ohasOwn.call(obj, "constructor") && !ohasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	                return false;
	            }
	        } catch (e) { //IE8 9会在这里抛错
	            return false;
	        }
	        if (enumerateBUG) {
	            for (key in obj) {
	                return ohasOwn.call(obj, key)
	            }
	        }
	        for (key in obj) {}
	        return key === void 0 || ohasOwn.call(obj, key)
	    }
	    if (rnative.test(Object.getPrototypeOf)) {
	        avalon.isPlainObject = function(obj) {
	            // 简单的 typeof obj === "object"检测，会致使用isPlainObject(window)在opera下通不过
	            return serialize.call(obj) === "[object Object]" && Object.getPrototypeOf(obj) === oproto
	        }
	    }
	    //与jQuery.extend方法，可用于浅拷贝，深拷贝
	    avalon.mix = avalon.fn.mix = function() {
	        var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false
	
	        // 如果第一个参数为布尔,判定是否深拷贝
	        if (typeof target === "boolean") {
	            deep = target
	            target = arguments[1] || {}
	            i++
	        }
	
	        //确保接受方为一个复杂的数据类型
	        if (typeof target !== "object" && !isFunction(target)) {
	            target = {}
	        }
	
	        //如果只有一个参数，那么新成员添加于mix所在的对象上
	        if (i === length) {
	            target = this
	            i--
	        }
	
	        for (; i < length; i++) {
	            //只处理非空参数
	            if ((options = arguments[i]) != null) {
	                for (name in options) {
	                    src = target[name]
	                    try {
	                        copy = options[name] //当options为VBS对象时报错
	                    } catch (e) {
	                        continue
	                    }
	
	                    // 防止环引用
	                    if (target === copy) {
	                        continue
	                    }
	                    if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
	
	                        if (copyIsArray) {
	                            copyIsArray = false
	                            clone = src && Array.isArray(src) ? src : []
	
	                        } else {
	                            clone = src && avalon.isPlainObject(src) ? src : {}
	                        }
	
	                        target[name] = avalon.mix(deep, clone, copy)
	                    } else if (copy !== void 0) {
	                        target[name] = copy
	                    }
	                }
	            }
	        }
	        return target
	    }
	
	    function _number(a, len) { //用于模拟slice, splice的效果
	        a = Math.floor(a) || 0
	        return a < 0 ? Math.max(len + a, 0) : Math.min(a, len);
	    }
	
	    avalon.mix({
	        rword: rword,
	        subscribers: subscribers,
	        version: 1.471,
	        ui: {},
	        log: log,
	        slice: W3C ? function(nodes, start, end) {
	            return aslice.call(nodes, start, end)
	        } : function(nodes, start, end) {
	            var ret = []
	            var len = nodes.length
	            if (end === void 0)
	                end = len
	            if (typeof end === "number" && isFinite(end)) {
	                start = _number(start, len)
	                end = _number(end, len)
	                for (var i = start; i < end; ++i) {
	                    ret[i - start] = nodes[i]
	                }
	            }
	            return ret
	        },
	        noop: noop,
	        /*如果不用Error对象封装一下，str在控制台下可能会乱码*/
	        error: function(str, e) {
	            throw (e || Error)(str)
	        },
	        /*将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象*/
	        oneObject: oneObject,
	        /* avalon.range(10)
	         => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	         avalon.range(1, 11)
	         => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	         avalon.range(0, 30, 5)
	         => [0, 5, 10, 15, 20, 25]
	         avalon.range(0, -10, -1)
	         => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	         avalon.range(0)
	         => []*/
	        range: function(start, end, step) { // 用于生成整数数组
	            step || (step = 1)
	            if (end == null) {
	                end = start || 0
	                start = 0
	            }
	            var index = -1,
	                length = Math.max(0, Math.ceil((end - start) / step)),
	                result = new Array(length)
	            while (++index < length) {
	                result[index] = start
	                start += step
	            }
	            return result
	        },
	        eventHooks: [],
	        /*绑定事件*/
	        bind: function(el, type, fn, phase) {
	            var hooks = avalon.eventHooks
	            var hook = hooks[type]
	            if (typeof hook === "object") {
	                type = hook.type || type
	                phase = hook.phase || !!phase
	                fn = hook.fn ? hook.fn(el, fn) : fn
	            }
	            var callback = W3C ? fn : function(e) {
	                fn.call(el, fixEvent(e));
	            }
	            if (W3C) {
	                el.addEventListener(type, callback, phase)
	            } else {
	                el.attachEvent("on" + type, callback)
	            }
	            return callback
	        },
	        /*卸载事件*/
	        unbind: function(el, type, fn, phase) {
	            var hooks = avalon.eventHooks
	            var hook = hooks[type]
	            var callback = fn || noop
	            if (typeof hook === "object") {
	                type = hook.type || type
	                phase = hook.phase || !!phase
	            }
	            if (W3C) {
	                el.removeEventListener(type, callback, phase)
	            } else {
	                el.detachEvent("on" + type, callback)
	            }
	        },
	        /*读写删除元素节点的样式*/
	        css: function(node, name, value) {
	            if (node instanceof avalon) {
	                node = node[0]
	            }
	            var prop = /[_-]/.test(name) ? camelize(name) : name,
	                fn
	            name = avalon.cssName(prop) || prop
	            if (value === void 0 || typeof value === "boolean") { //获取样式
	                fn = cssHooks[prop + ":get"] || cssHooks["@:get"]
	                if (name === "background") {
	                    name = "backgroundColor"
	                }
	                var val = fn(node, name)
	                return value === true ? parseFloat(val) || 0 : val
	            } else if (value === "") { //请除样式
	                node.style[name] = ""
	            } else { //设置样式
	                if (value == null || value !== value) {
	                    return
	                }
	                if (isFinite(value) && !avalon.cssNumber[prop]) {
	                    value += "px"
	                }
	                fn = cssHooks[prop + ":set"] || cssHooks["@:set"]
	                fn(node, name, value)
	            }
	        },
	        /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
	        each: function(obj, fn) {
	            if (obj) { //排除null, undefined
	                var i = 0
	                if (isArrayLike(obj)) {
	                    for (var n = obj.length; i < n; i++) {
	                        if (fn(i, obj[i]) === false)
	                            break
	                    }
	                } else {
	                    for (i in obj) {
	                        if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                            break
	                        }
	                    }
	                }
	            }
	        },
	        //收集元素的data-{{prefix}}-*属性，并转换为对象
	        getWidgetData: function(elem, prefix) {
	            var raw = avalon(elem).data()
	            var result = {}
	            for (var i in raw) {
	                if (i.indexOf(prefix) === 0) {
	                    result[i.replace(prefix, "").replace(/\w/, function(a) {
	                        return a.toLowerCase()
	                    })] = raw[i]
	                }
	            }
	            return result
	        },
	        Array: {
	            /*只有当前数组不存在此元素时只添加它*/
	            ensure: function(target, item) {
	                if (target.indexOf(item) === -1) {
	                    return target.push(item)
	                }
	            },
	            /*移除数组中指定位置的元素，返回布尔表示成功与否*/
	            removeAt: function(target, index) {
	                return !!target.splice(index, 1).length
	            },
	            /*移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否*/
	            remove: function(target, item) {
	                var index = target.indexOf(item)
	                if (~index)
	                    return avalon.Array.removeAt(target, index)
	                return false
	            }
	        }
	    })
	
	    var bindingHandlers = avalon.bindingHandlers = {}
	    var bindingExecutors = avalon.bindingExecutors = {}
	
	    /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	    function isArrayLike(obj) {
	        if (!obj)
	            return false
	        var n = obj.length
	        if (n === (n >>> 0)) { //检测length属性是否为非负整数
	            var type = serialize.call(obj).slice(8, -1)
	            if (/(?:regexp|string|function|window|global)$/i.test(type))
	                return false
	            if (type === "Array")
	                return true
	            try {
	                if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
	                    return /^\s?function/.test(obj.item || obj.callee)
	                }
	                return true
	            } catch (e) { //IE的NodeList直接抛错
	                return !obj.window //IE6-8 window
	            }
	        }
	        return false
	    }
	
	
	    // https://github.com/rsms/js-lru
	    var Cache = new function() { // jshint ignore:line
	            function LRU(maxLength) {
	                this.size = 0
	                this.limit = maxLength
	                this.head = this.tail = void 0
	                this._keymap = {}
	            }
	
	            var p = LRU.prototype
	
	            p.put = function(key, value) {
	                var entry = {
	                    key: key,
	                    value: value
	                }
	                this._keymap[key] = entry
	                if (this.tail) {
	                    this.tail.newer = entry
	                    entry.older = this.tail
	                } else {
	                    this.head = entry
	                }
	                this.tail = entry
	                if (this.size === this.limit) {
	                    this.shift()
	                } else {
	                    this.size++
	                }
	                return value
	            }
	
	            p.shift = function() {
	                var entry = this.head
	                if (entry) {
	                    this.head = this.head.newer
	                    this.head.older =
	                        entry.newer =
	                        entry.older =
	                        this._keymap[entry.key] = void 0
	                    delete this._keymap[entry.key] //#1029
	                }
	            }
	            p.get = function(key) {
	                var entry = this._keymap[key]
	                if (entry === void 0)
	                    return
	                if (entry === this.tail) {
	                    return entry.value
	                }
	                // HEAD--------------TAIL
	                //   <.older   .newer>
	                //  <--- add direction --
	                //   A  B  C  <D>  E
	                if (entry.newer) {
	                    if (entry === this.head) {
	                        this.head = entry.newer
	                    }
	                    entry.newer.older = entry.older // C <-- E.
	                }
	                if (entry.older) {
	                    entry.older.newer = entry.newer // C. --> E
	                }
	                entry.newer = void 0 // D --x
	                entry.older = this.tail // D. --> E
	                if (this.tail) {
	                    this.tail.newer = entry // E. <-- D
	                }
	                this.tail = entry
	                return entry.value
	            }
	            return LRU
	        } // jshint ignore:line
	
	    /*********************************************************************
	     *                         javascript 底层补丁                       *
	     **********************************************************************/
	    if (!"司徒正美".trim) {
	        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	        String.prototype.trim = function() {
	            return this.replace(rtrim, "")
	        }
	    }
	    var hasDontEnumBug = !({
	            'toString': null
	        }).propertyIsEnumerable('toString'),
	        hasProtoEnumBug = (function() {}).propertyIsEnumerable('prototype'),
	        dontEnums = [
	            "toString",
	            "toLocaleString",
	            "valueOf",
	            "hasOwnProperty",
	            "isPrototypeOf",
	            "propertyIsEnumerable",
	            "constructor"
	        ],
	        dontEnumsLength = dontEnums.length;
	    if (!Object.keys) {
	        Object.keys = function(object) { //ecma262v5 15.2.3.14
	            var theKeys = []
	            var skipProto = hasProtoEnumBug && typeof object === "function"
	            if (typeof object === "string" || (object && object.callee)) {
	                for (var i = 0; i < object.length; ++i) {
	                    theKeys.push(String(i))
	                }
	            } else {
	                for (var name in object) {
	                    if (!(skipProto && name === "prototype") && ohasOwn.call(object, name)) {
	                        theKeys.push(String(name))
	                    }
	                }
	            }
	
	            if (hasDontEnumBug) {
	                var ctor = object.constructor,
	                    skipConstructor = ctor && ctor.prototype === object
	                for (var j = 0; j < dontEnumsLength; j++) {
	                    var dontEnum = dontEnums[j]
	                    if (!(skipConstructor && dontEnum === "constructor") && ohasOwn.call(object, dontEnum)) {
	                        theKeys.push(dontEnum)
	                    }
	                }
	            }
	            return theKeys
	        }
	    }
	    if (!Array.isArray) {
	        Array.isArray = function(a) {
	            return serialize.call(a) === "[object Array]"
	        }
	    }
	
	    if (!noop.bind) {
	        Function.prototype.bind = function(scope) {
	            if (arguments.length < 2 && scope === void 0)
	                return this
	            var fn = this,
	                argv = arguments
	            return function() {
	                var args = [],
	                    i
	                for (i = 1; i < argv.length; i++)
	                    args.push(argv[i])
	                for (i = 0; i < arguments.length; i++)
	                    args.push(arguments[i])
	                return fn.apply(scope, args)
	            }
	        }
	    }
	
	    function iterator(vars, body, ret) {
	        var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' + body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') + '}' + ret
	            /* jshint ignore:start */
	        return Function("fn,scope", fun)
	            /* jshint ignore:end */
	    }
	    if (!rnative.test([].map)) {
	        avalon.mix(ap, {
	            //定位操作，返回数组中第一个等于给定参数的元素的索引值。
	            indexOf: function(item, index) {
	                var n = this.length,
	                    i = ~~index
	                if (i < 0)
	                    i += n
	                for (; i < n; i++)
	                    if (this[i] === item)
	                        return i
	                return -1
	            },
	            //定位操作，同上，不过是从后遍历。
	            lastIndexOf: function(item, index) {
	                var n = this.length,
	                    i = index == null ? n - 1 : index
	                if (i < 0)
	                    i = Math.max(0, n + i)
	                for (; i >= 0; i--)
	                    if (this[i] === item)
	                        return i
	                return -1
	            },
	            //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
	            forEach: iterator("", '_', ""),
	            //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
	            filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
	            //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
	            map: iterator('r=[],', 'r[i]=_', 'return r'),
	            //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
	            some: iterator("", 'if(_)return true', 'return false'),
	            //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
	            every: iterator("", 'if(!_)return false', 'return true')
	        })
	    }
	    /*********************************************************************
	     *                           DOM 底层补丁                             *
	     **********************************************************************/
	
	    function fixContains(root, el) {
	        try { //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
	            while ((el = el.parentNode))
	                if (el === root)
	                    return true
	            return false
	        } catch (e) {
	            return false
	        }
	    }
	    avalon.contains = fixContains
	        //IE6-11的文档对象没有contains
	    if (!DOC.contains) {
	        DOC.contains = function(b) {
	            return fixContains(DOC, b)
	        }
	    }
	
	    function outerHTML() {
	        return new XMLSerializer().serializeToString(this)
	    }
	
	    if (window.SVGElement) {
	        //safari5+是把contains方法放在Element.prototype上而不是Node.prototype
	        if (!DOC.createTextNode("x").contains) {
	            Node.prototype.contains = function(arg) { //IE6-8没有Node对象
	                return !!(this.compareDocumentPosition(arg) & 16)
	            }
	        }
	        var svgns = "http://www.w3.org/2000/svg"
	        var svg = DOC.createElementNS(svgns, "svg")
	        svg.innerHTML = '<circle cx="50" cy="50" r="40" fill="red" />'
	        if (!rsvg.test(svg.firstChild)) { // #409
	            function enumerateNode(node, targetNode) { // jshint ignore:line
	                if (node && node.childNodes) {
	                    var nodes = node.childNodes
	                    for (var i = 0, el; el = nodes[i++];) {
	                        if (el.tagName) {
	                            var svg = DOC.createElementNS(svgns,
	                                el.tagName.toLowerCase())
	                            ap.forEach.call(el.attributes, function(attr) {
	                                    svg.setAttribute(attr.name, attr.value) //复制属性
	                                }) // jshint ignore:line
	                                // 递归处理子节点
	                            enumerateNode(el, svg)
	                            targetNode.appendChild(svg)
	                        }
	                    }
	                }
	            }
	            Object.defineProperties(SVGElement.prototype, {
	                "outerHTML": { //IE9-11,firefox不支持SVG元素的innerHTML,outerHTML属性
	                    enumerable: true,
	                    configurable: true,
	                    get: outerHTML,
	                    set: function(html) {
	                        var tagName = this.tagName.toLowerCase(),
	                            par = this.parentNode,
	                            frag = avalon.parseHTML(html)
	                            // 操作的svg，直接插入
	                        if (tagName === "svg") {
	                            par.insertBefore(frag, this)
	                                // svg节点的子节点类似
	                        } else {
	                            var newFrag = DOC.createDocumentFragment()
	                            enumerateNode(frag, newFrag)
	                            par.insertBefore(newFrag, this)
	                        }
	                        par.removeChild(this)
	                    }
	                },
	                "innerHTML": {
	                    enumerable: true,
	                    configurable: true,
	                    get: function() {
	                        var s = this.outerHTML
	                        var ropen = new RegExp("<" + this.nodeName + '\\b(?:(["\'])[^"]*?(\\1)|[^>])*>', "i")
	                        var rclose = new RegExp("<\/" + this.nodeName + ">$", "i")
	                        return s.replace(ropen, "").replace(rclose, "")
	                    },
	                    set: function(html) {
	                        if (avalon.clearHTML) {
	                            avalon.clearHTML(this)
	                            var frag = avalon.parseHTML(html)
	                            enumerateNode(frag, this)
	                        }
	                    }
	                }
	            })
	        }
	    }
	    if (!root.outerHTML && window.HTMLElement) { //firefox 到11时才有outerHTML
	        HTMLElement.prototype.__defineGetter__("outerHTML", outerHTML);
	    }
	
	
	    //============================= event binding =======================
	    var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/
	
	    function fixEvent(event) {
	        var ret = {}
	        for (var i in event) {
	            ret[i] = event[i]
	        }
	        var target = ret.target = event.srcElement
	        if (event.type.indexOf("key") === 0) {
	            ret.which = event.charCode != null ? event.charCode : event.keyCode
	        } else if (rmouseEvent.test(event.type)) {
	            var doc = target.ownerDocument || DOC
	            var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement
	            ret.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
	            ret.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
	            ret.wheelDeltaY = ret.wheelDelta
	            ret.wheelDeltaX = 0
	        }
	        ret.timeStamp = new Date() - 0
	        ret.originalEvent = event
	        ret.preventDefault = function() { //阻止默认行为
	            event.returnValue = false
	        }
	        ret.stopPropagation = function() { //阻止事件在DOM树中的传播
	            event.cancelBubble = true
	        }
	        return ret
	    }
	
	    var eventHooks = avalon.eventHooks
	        //针对firefox, chrome修正mouseenter, mouseleave
	    if (!("onmouseenter" in root)) {
	        avalon.each({
	            mouseenter: "mouseover",
	            mouseleave: "mouseout"
	        }, function(origType, fixType) {
	            eventHooks[origType] = {
	                type: fixType,
	                fn: function(elem, fn) {
	                    return function(e) {
	                        var t = e.relatedTarget
	                        if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
	                            delete e.type
	                            e.type = origType
	                            return fn.call(elem, e)
	                        }
	                    }
	                }
	            }
	        })
	    }
	    //针对IE9+, w3c修正animationend
	    avalon.each({
	            AnimationEvent: "animationend",
	            WebKitAnimationEvent: "webkitAnimationEnd"
	        }, function(construct, fixType) {
	            if (window[construct] && !eventHooks.animationend) {
	                eventHooks.animationend = {
	                    type: fixType
	                }
	            }
	        })
	        //针对IE6-8修正input
	    if (!("oninput" in DOC.createElement("input"))) {
	        eventHooks.input = {
	            type: "propertychange",
	            fn: function(elem, fn) {
	                return function(e) {
	                    if (e.propertyName === "value") {
	                        e.type = "input"
	                        return fn.call(elem, e)
	                    }
	                }
	            }
	        }
	    }
	    if (DOC.onmousewheel === void 0) {
	        /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	         firefox DOMMouseScroll detail 下3 上-3
	         firefox wheel detlaY 下3 上-3
	         IE9-11 wheel deltaY 下40 上-40
	         chrome wheel deltaY 下100 上-100 */
	        var fixWheelType = DOC.onwheel !== void 0 ? "wheel" : "DOMMouseScroll"
	        var fixWheelDelta = fixWheelType === "wheel" ? "deltaY" : "detail"
	        eventHooks.mousewheel = {
	            type: fixWheelType,
	            fn: function(elem, fn) {
	                return function(e) {
	                    e.wheelDeltaY = e.wheelDelta = e[fixWheelDelta] > 0 ? -120 : 120
	                    e.wheelDeltaX = 0
	                    if (Object.defineProperty) {
	                        Object.defineProperty(e, "type", {
	                            value: "mousewheel"
	                        })
	                    }
	                    fn.call(elem, e)
	                }
	            }
	        }
	    }
	
	
	
	    /*********************************************************************
	     *                           配置系统                                 *
	     **********************************************************************/
	
	    function kernel(settings) {
	        for (var p in settings) {
	            if (!ohasOwn.call(settings, p))
	                continue
	            var val = settings[p]
	            if (typeof kernel.plugins[p] === "function") {
	                kernel.plugins[p](val)
	            } else if (typeof kernel[p] === "object") {
	                avalon.mix(kernel[p], val)
	            } else {
	                kernel[p] = val
	            }
	        }
	        return this
	    }
	    var openTag, closeTag, rexpr, rexprg, rbind, rregexp = /[-.*+?^${}()|[\]\/\\]/g
	
	    function escapeRegExp(target) {
	        //http://stevenlevithan.com/regex/xregexp/
	        //将字符串安全格式化为正则表达式的源码
	        return (target + "").replace(rregexp, "\\$&")
	    }
	
	    var plugins = {
	
	        interpolate: function(array) {
	            openTag = array[0]
	            closeTag = array[1]
	            if (openTag === closeTag) {
	                throw new SyntaxError("openTag===closeTag")
	            } else {
	                var test = openTag + "test" + closeTag
	                cinerator.innerHTML = test
	                if (cinerator.innerHTML !== test && cinerator.innerHTML.indexOf("&lt;") > -1) {
	                    throw new SyntaxError("此定界符不合法")
	                }
	                kernel.openTag = openTag
	                kernel.closeTag = closeTag
	                cinerator.innerHTML = ""
	            }
	            var o = escapeRegExp(openTag),
	                c = escapeRegExp(closeTag)
	            rexpr = new RegExp(o + "(.*?)" + c)
	            rexprg = new RegExp(o + "(.*?)" + c, "g")
	            rbind = new RegExp(o + ".*?" + c + "|\\sms-")
	        }
	    }
	
	    kernel.debug = false
	    kernel.plugins = plugins
	    kernel.plugins['interpolate'](["{{", "}}"])
	    kernel.paths = {}
	    kernel.shim = {}
	    kernel.maxRepeatSize = 100
	    avalon.config = kernel
	    var ravalon = /(\w+)\[(avalonctrl)="(\S+)"\]/
	    var findNodes = DOC.querySelectorAll ? function(str) {
	            return DOC.querySelectorAll(str)
	        } : function(str) {
	            var match = str.match(ravalon)
	            var all = DOC.getElementsByTagName(match[1])
	            var nodes = []
	            for (var i = 0, el; el = all[i++];) {
	                if (el.getAttribute(match[2]) === match[3]) {
	                    nodes.push(el)
	                }
	            }
	            return nodes
	        }
	        /*********************************************************************
	         *                            事件总线                               *
	         **********************************************************************/
	    var EventBus = {
	            $watch: function(type, callback) {
	                if (typeof callback === "function") {
	                    var callbacks = this.$events[type]
	                    if (callbacks) {
	                        callbacks.push(callback)
	                    } else {
	                        this.$events[type] = [callback]
	                    }
	                } else { //重新开始监听此VM的第一重简单属性的变动
	                    this.$events = this.$watch.backup
	                }
	                return this
	            },
	            $unwatch: function(type, callback) {
	                var n = arguments.length
	                if (n === 0) { //让此VM的所有$watch回调无效化
	                    this.$watch.backup = this.$events
	                    this.$events = {}
	                } else if (n === 1) {
	                    this.$events[type] = []
	                } else {
	                    var callbacks = this.$events[type] || []
	                    var i = callbacks.length
	                    while (~--i < 0) {
	                        if (callbacks[i] === callback) {
	                            return callbacks.splice(i, 1)
	                        }
	                    }
	                }
	                return this
	            },
	            $fire: function(type) {
	                var special, i, v, callback
	                if (/^(\w+)!(\S+)$/.test(type)) {
	                    special = RegExp.$1
	                    type = RegExp.$2
	                }
	                var events = this.$events
	                if (!events)
	                    return
	                var args = aslice.call(arguments, 1)
	                var detail = [type].concat(args)
	                if (special === "all") {
	                    for (i in avalon.vmodels) {
	                        v = avalon.vmodels[i]
	                        if (v !== this) {
	                            v.$fire.apply(v, detail)
	                        }
	                    }
	                } else if (special === "up" || special === "down") {
	                    var elements = events.expr ? findNodes(events.expr) : []
	                    if (elements.length === 0)
	                        return
	                    for (i in avalon.vmodels) {
	                        v = avalon.vmodels[i]
	                        if (v !== this) {
	                            if (v.$events.expr) {
	                                var eventNodes = findNodes(v.$events.expr)
	                                if (eventNodes.length === 0) {
	                                    continue
	                                }
	                                //循环两个vmodel中的节点，查找匹配（向上匹配或者向下匹配）的节点并设置标识
	                                /* jshint ignore:start */
	                                ap.forEach.call(eventNodes, function(node) {
	                                        ap.forEach.call(elements, function(element) {
	                                            var ok = special === "down" ? element.contains(node) : //向下捕获
	                                                node.contains(element) //向上冒泡
	                                            if (ok) {
	                                                node._avalon = v //符合条件的加一个标识
	                                            }
	                                        });
	                                    })
	                                    /* jshint ignore:end */
	                            }
	                        }
	                    }
	                    var nodes = DOC.getElementsByTagName("*") //实现节点排序
	                    var alls = []
	                    ap.forEach.call(nodes, function(el) {
	                        if (el._avalon) {
	                            alls.push(el._avalon)
	                            el._avalon = ""
	                            el.removeAttribute("_avalon")
	                        }
	                    })
	                    if (special === "up") {
	                        alls.reverse()
	                    }
	                    for (i = 0; callback = alls[i++];) {
	                        if (callback.$fire.apply(callback, detail) === false) {
	                            break
	                        }
	                    }
	                } else {
	                    var callbacks = events[type] || []
	                    var all = events.$all || []
	                    for (i = 0; callback = callbacks[i++];) {
	                        if (isFunction(callback))
	                            callback.apply(this, args)
	                    }
	                    for (i = 0; callback = all[i++];) {
	                        if (isFunction(callback))
	                            callback.apply(this, arguments)
	                    }
	                }
	            }
	        }
	        /*********************************************************************
	         *                           modelFactory                             *
	         **********************************************************************/
	        //avalon最核心的方法的两个方法之一（另一个是avalon.scan），返回一个ViewModel(VM)
	    var VMODELS = avalon.vmodels = {} //所有vmodel都储存在这里
	    avalon.define = function(id, factory) {
	        var $id = id.$id || id
	        if (!$id) {
	            log("warning: vm必须指定$id")
	        }
	        if (VMODELS[$id]) {
	            log("warning: " + $id + " 已经存在于avalon.vmodels中")
	        }
	        if (typeof id === "object") {
	            var model = modelFactory(id)
	        } else {
	            var scope = {
	                $watch: noop
	            }
	            factory(scope) //得到所有定义
	
	            model = modelFactory(scope) //偷天换日，将scope换为model
	            stopRepeatAssign = true
	            factory(model)
	            stopRepeatAssign = false
	        }
	        model.$id = $id
	        return VMODELS[$id] = model
	    }
	
	    //一些不需要被监听的属性
	    var $$skipArray = String("$id,$watch,$unwatch,$fire,$events,$model,$skipArray,$reinitialize").match(rword)
	    var defineProperty = Object.defineProperty
	    var canHideOwn = true
	        //如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
	        //标准浏览器使用__defineGetter__, __defineSetter__实现
	    try {
	        defineProperty({}, "_", {
	            value: "x"
	        })
	        var defineProperties = Object.defineProperties
	    } catch (e) {
	        canHideOwn = false
	    }
	
	    function modelFactory(source, $special, $model) {
	        if (Array.isArray(source)) {
	            var arr = source.concat()
	            source.length = 0
	            var collection = arrayFactory(source)
	            collection.pushArray(arr)
	            return collection
	        }
	        //0 null undefined || Node || VModel(fix IE6-8 createWithProxy $val: val引发的BUG)
	        if (!source || (source.$id && source.$events) || (source.nodeType > 0 && source.nodeName)) {
	            return source
	        }
	        var $skipArray = Array.isArray(source.$skipArray) ? source.$skipArray : []
	        $skipArray.$special = $special || {} //强制要监听的属性
	        var $vmodel = {} //要返回的对象, 它在IE6-8下可能被偷龙转凤
	        $model = $model || {} //vmodels.$model属性
	        var $events = {} //vmodel.$events属性
	        var accessors = {} //监控属性
	        var computed = []
	        $$skipArray.forEach(function(name) {
	            delete source[name]
	        })
	        var names = Object.keys(source)
	            /* jshint ignore:start */
	        names.forEach(function(name, accessor) {
	                var val = source[name]
	                $model[name] = val
	                if (isObservable(name, val, $skipArray)) {
	                    //总共产生三种accessor
	                    $events[name] = []
	                    var valueType = avalon.type(val)
	                        //总共产生三种accessor
	                    if (valueType === "object" && isFunction(val.get) && Object.keys(val).length <= 2) {
	                        accessor = makeComputedAccessor(name, val)
	                        computed.push(accessor)
	                    } else if (rcomplexType.test(valueType)) {
	                        // issue #940 解决$model层次依赖丢失 https://github.com/RubyLouvre/avalon/issues/940
	                        //  $model[name] = {}
	                        accessor = makeComplexAccessor(name, val, valueType, $events[name], $model)
	                    } else {
	                        accessor = makeSimpleAccessor(name, val)
	                    }
	                    accessors[name] = accessor
	                }
	            })
	            /* jshint ignore:end */
	        $vmodel = defineProperties($vmodel, descriptorFactory(accessors), source) //生成一个空的ViewModel
	        for (var i = 0; i < names.length; i++) {
	            var name = names[i]
	            if (!accessors[name]) {
	                $vmodel[name] = source[name]
	            }
	        }
	        //添加$id, $model, $events, $watch, $unwatch, $fire
	        hideProperty($vmodel, "$id", generateID())
	        hideProperty($vmodel, "$model", $model)
	        hideProperty($vmodel, "$events", $events)
	            /* jshint ignore:start */
	        if (canHideOwn) {
	            hideProperty($vmodel, "hasOwnProperty", function(name) {
	                return name in $vmodel.$model
	            })
	        } else {
	            $vmodel.hasOwnProperty = function(name) {
	                return (name in $vmodel.$model) && (name !== "hasOwnProperty")
	            }
	        }
	        /* jshint ignore:end */
	        for (i in EventBus) {
	            hideProperty($vmodel, i, EventBus[i].bind($vmodel))
	        }
	
	        $vmodel.$reinitialize = function() {
	            computed.forEach(function(accessor) {
	                delete accessor._value
	                delete accessor.oldArgs
	                accessor.digest = function() {
	                    accessor.call($vmodel)
	                }
	                dependencyDetection.begin({
	                    callback: function(vm, dependency) { //dependency为一个accessor
	                        var name = dependency._name
	                        if (dependency !== accessor) {
	                            var list = vm.$events[name]
	                            injectDependency(list, accessor.digest)
	                        }
	                    }
	                })
	                try {
	                    accessor.get.call($vmodel)
	                } finally {
	                    dependencyDetection.end()
	                }
	            })
	        }
	        $vmodel.$reinitialize()
	        return $vmodel
	    }
	
	
	    function hideProperty(host, name, value) {
	        if (canHideOwn) {
	            Object.defineProperty(host, name, {
	                value: value,
	                writable: true,
	                enumerable: false,
	                configurable: true
	            })
	        } else {
	            host[name] = value
	        }
	    }
	    //创建一个简单访问器
	    function makeSimpleAccessor(name, value) {
	        function accessor(value) {
	            var oldValue = accessor._value
	            if (arguments.length > 0) {
	                if (!stopRepeatAssign && !isEqual(value, oldValue)) {
	                    accessor.updateValue(this, value)
	                    accessor.notify(this, value, oldValue)
	                }
	                return this
	            } else {
	                dependencyDetection.collectDependency(this, accessor)
	                return oldValue
	            }
	        }
	        accessorFactory(accessor, name)
	        accessor._value = value
	        return accessor;
	    }
	
	    //创建一个计算访问器
	    function makeComputedAccessor(name, options) {
	        function accessor(value) { //计算属性
	            var oldValue = accessor._value
	            var init = ("_value" in accessor)
	            if (arguments.length > 0) {
	                if (stopRepeatAssign) {
	                    return this
	                }
	                if (typeof accessor.set === "function") {
	                    if (accessor.oldArgs !== value) {
	                        accessor.oldArgs = value
	                        var $events = this.$events
	                        var lock = $events[name]
	                        $events[name] = [] //清空回调，防止内部冒泡而触发多次$fire
	                        accessor.set.call(this, value)
	                        $events[name] = lock
	                        value = accessor.get.call(this)
	                        if (value !== oldValue) {
	                            accessor.updateValue(this, value)
	                            accessor.notify(this, value, oldValue) //触发$watch回调
	                        }
	                    }
	                }
	                return this
	            } else {
	                //将依赖于自己的高层访问器或视图刷新函数（以绑定对象形式）放到自己的订阅数组中
	                //将自己注入到低层访问器的订阅数组中
	                value = accessor.get.call(this)
	                accessor.updateValue(this, value)
	                if (init && oldValue !== value) {
	                    accessor.notify(this, value, oldValue) //触发$watch回调
	                }
	                return value
	            }
	        }
	        accessor.set = options.set
	        accessor.get = options.get
	        accessorFactory(accessor, name)
	        return accessor
	    }
	
	    //创建一个复杂访问器
	    function makeComplexAccessor(name, initValue, valueType, list, parentModel) {
	
	        function accessor(value) {
	            var oldValue = accessor._value
	
	            var son = accessor._vmodel
	            if (arguments.length > 0) {
	                if (stopRepeatAssign) {
	                    return this
	                }
	                if (valueType === "array") {
	                    var a = son,
	                        b = value,
	                        an = a.length,
	                        bn = b.length
	                    a.$lock = true
	                    if (an > bn) {
	                        a.splice(bn, an - bn)
	                    } else if (bn > an) {
	                        a.push.apply(a, b.slice(an))
	                    }
	                    var n = Math.min(an, bn)
	                    for (var i = 0; i < n; i++) {
	                        a.set(i, b[i])
	                    }
	                    delete a.$lock
	                    a._fire("set")
	                } else if (valueType === "object") {
	                    value = value.$model ? value.$model : value
	                    var observes = this.$events[name] || []
	                    var newObject = avalon.mix(true, {}, value)
	                    for (i in son) {
	                        if (son.hasOwnProperty(i) && ohasOwn.call(newObject, i)) {
	                            son[i] = newObject[i]
	                        }
	                    }
	                    son = accessor._vmodel = modelFactory(value)
	                    son.$events[subscribers] = observes
	                    if (observes.length) {
	                        observes.forEach(function(data) {
	                            if (!data.type) {
	                                return //数据未准备好时忽略更新
	                            }
	                            if (data.rollback) {
	                                data.rollback() //还原 ms-with ms-on
	                            }
	                            bindingHandlers[data.type](data, data.vmodels)
	                        })
	                    }
	                }
	                accessor.updateValue(this, son.$model)
	                accessor.notify(this, this._value, oldValue)
	                return this
	            } else {
	                dependencyDetection.collectDependency(this, accessor)
	                return son
	            }
	        }
	        accessorFactory(accessor, name)
	        if (Array.isArray(initValue)) {
	            parentModel[name] = initValue
	        } else {
	            parentModel[name] = parentModel[name] || {}
	        }
	        var son = accessor._vmodel = modelFactory(initValue, 0, parentModel[name])
	        son.$events[subscribers] = list
	        return accessor
	    }
	
	    function globalUpdateValue(vmodel, value) {
	        vmodel.$model[this._name] = this._value = value
	    }
	
	    function globalNotify(vmodel, value, oldValue) {
	        var name = this._name
	        var array = vmodel.$events[name] //刷新值
	        if (array) {
	            fireDependencies(array) //同步视图
	            EventBus.$fire.call(vmodel, name, value, oldValue) //触发$watch回调
	        }
	    }
	
	    function accessorFactory(accessor, name) {
	        accessor._name = name
	            //同时更新_value与model
	        accessor.updateValue = globalUpdateValue
	        accessor.notify = globalNotify
	    }
	
	    //比较两个值是否相等
	    var isEqual = Object.is || function(v1, v2) {
	        if (v1 === 0 && v2 === 0) {
	            return 1 / v1 === 1 / v2
	        } else if (v1 !== v1) {
	            return v2 !== v2
	        } else {
	            return v1 === v2
	        }
	    }
	
	    function isObservable(name, value, $skipArray) {
	        if (isFunction(value) || value && value.nodeName && (value.nodeType > 0)) {
	            return false
	        }
	        if ($skipArray.indexOf(name) !== -1) {
	            return false
	        }
	        var $special = $skipArray.$special
	        if (name && name.charAt(0) === "$" && !$special[name]) {
	            return false
	        }
	        return true
	    }
	
	    function keysVM(obj) {
	        var arr = Object.keys(obj.$model ? obj.$model : obj)
	        for (var i = 0; i < $$skipArray.length; i++) {
	            var index = arr.indexOf($$skipArray[i])
	            if (index !== -1) {
	                arr.splice(index, 1)
	            }
	        }
	        return arr
	    }
	    var descriptorFactory = W3C ? function(obj) {
	        var descriptors = {}
	        for (var i in obj) {
	            descriptors[i] = {
	                get: obj[i],
	                set: obj[i],
	                enumerable: true,
	                configurable: true
	            }
	        }
	        return descriptors
	    } : function(a) {
	        return a
	    }
	
	    //===================修复浏览器对Object.defineProperties的支持=================
	    if (!canHideOwn) {
	        if ("__defineGetter__" in avalon) {
	            defineProperty = function(obj, prop, desc) {
	                if ('value' in desc) {
	                    obj[prop] = desc.value
	                }
	                if ("get" in desc) {
	                    obj.__defineGetter__(prop, desc.get)
	                }
	                if ('set' in desc) {
	                    obj.__defineSetter__(prop, desc.set)
	                }
	                return obj
	            }
	            defineProperties = function(obj, descs) {
	                for (var prop in descs) {
	                    if (descs.hasOwnProperty(prop)) {
	                        defineProperty(obj, prop, descs[prop])
	                    }
	                }
	                return obj
	            }
	        }
	        if (IEVersion) {
	            var VBClassPool = {}
	            window.execScript([ // jshint ignore:line
	                "Function parseVB(code)",
	                "\tExecuteGlobal(code)",
	                "End Function" //转换一段文本为VB代码
	            ].join("\n"), "VBScript")
	
	            function VBMediator(instance, accessors, name, value) { // jshint ignore:line
	                var accessor = accessors[name]
	                if (arguments.length === 4) {
	                    accessor.call(instance, value)
	                } else {
	                    return accessor.call(instance)
	                }
	            }
	            defineProperties = function(name, accessors, properties) {
	                // jshint ignore:line
	                var buffer = []
	                buffer.push(
	                        "\r\n\tPrivate [__data__], [__proxy__]",
	                        "\tPublic Default Function [__const__](d" + expose + ", p" + expose + ")",
	                        "\t\tSet [__data__] = d" + expose + ": set [__proxy__] = p" + expose,
	                        "\t\tSet [__const__] = Me", //链式调用
	                        "\tEnd Function")
	                    //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
	                for (name in properties) {
	                    if (!accessors.hasOwnProperty(name)) {
	                        buffer.push("\tPublic [" + name + "]")
	                    }
	                }
	                $$skipArray.forEach(function(name) {
	                    if (!accessors.hasOwnProperty(name)) {
	                        buffer.push("\tPublic [" + name + "]")
	                    }
	                })
	                buffer.push("\tPublic [" + 'hasOwnProperty' + "]")
	                    //添加访问器属性 
	                for (name in accessors) {
	                    buffer.push(
	                        //由于不知对方会传入什么,因此set, let都用上
	                        "\tPublic Property Let [" + name + "](val" + expose + ")", //setter
	                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
	                        "\tEnd Property",
	                        "\tPublic Property Set [" + name + "](val" + expose + ")", //setter
	                        "\t\tCall [__proxy__](Me,[__data__], \"" + name + "\", val" + expose + ")",
	                        "\tEnd Property",
	                        "\tPublic Property Get [" + name + "]", //getter
	                        "\tOn Error Resume Next", //必须优先使用set语句,否则它会误将数组当字符串返回
	                        "\t\tSet[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
	                        "\tIf Err.Number <> 0 Then",
	                        "\t\t[" + name + "] = [__proxy__](Me,[__data__],\"" + name + "\")",
	                        "\tEnd If",
	                        "\tOn Error Goto 0",
	                        "\tEnd Property")
	
	                }
	
	                buffer.push("End Class")
	                var body = buffer.join("\r\n")
	                var className = VBClassPool[body]
	                if (!className) {
	                    className = generateID("VBClass")
	                    window.parseVB("Class " + className + body)
	                    window.parseVB([
	                        "Function " + className + "Factory(a, b)", //创建实例并传入两个关键的参数
	                        "\tDim o",
	                        "\tSet o = (New " + className + ")(a, b)",
	                        "\tSet " + className + "Factory = o",
	                        "End Function"
	                    ].join("\r\n"))
	                    VBClassPool[body] = className
	                }
	                var ret = window[className + "Factory"](accessors, VBMediator) //得到其产品
	                return ret //得到其产品
	            }
	        }
	    }
	
	    /*********************************************************************
	     *          监控数组（与ms-each, ms-repeat配合使用）                     *
	     **********************************************************************/
	
	    function arrayFactory(model) {
	        var array = []
	        array.$id = generateID()
	        array.$model = model //数据模型
	        array.$events = {}
	        array.$events[subscribers] = []
	        array._ = modelFactory({
	            length: model.length
	        })
	        array._.$watch("length", function(a, b) {
	            array.$fire("length", a, b)
	        })
	        for (var i in EventBus) {
	            array[i] = EventBus[i]
	        }
	        avalon.mix(array, arrayPrototype)
	        return array
	    }
	
	    function mutateArray(method, pos, n, index, method2, pos2, n2) {
	        var oldLen = this.length,
	            loop = 2
	        while (--loop) {
	            switch (method) {
	                case "add":
	                    /* jshint ignore:start */
	                    var array = this.$model.slice(pos, pos + n).map(function(el) {
	                            if (rcomplexType.test(avalon.type(el))) {
	                                return el.$id ? el : modelFactory(el, 0, el)
	                            } else {
	                                return el
	                            }
	                        })
	                        /* jshint ignore:end */
	                    _splice.apply(this, [pos, 0].concat(array))
	                    this._fire("add", pos, n)
	                    break
	                case "del":
	                    var ret = this._splice(pos, n)
	                    this._fire("del", pos, n)
	                    break
	            }
	            if (method2) {
	                method = method2
	                pos = pos2
	                n = n2
	                loop = 2
	                method2 = 0
	            }
	        }
	        this._fire("index", index)
	        if (this.length !== oldLen) {
	            this._.length = this.length
	        }
	        return ret
	    }
	
	    var _splice = ap.splice
	    var arrayPrototype = {
	            _splice: _splice,
	            _fire: function(method, a, b) {
	                fireDependencies(this.$events[subscribers], method, a, b)
	            },
	            size: function() { //取得数组长度，这个函数可以同步视图，length不能
	                return this._.length
	            },
	            pushArray: function(array) {
	                var m = array.length,
	                    n = this.length
	                if (m) {
	                    ap.push.apply(this.$model, array)
	                    mutateArray.call(this, "add", n, m, Math.max(0, n - 1))
	                }
	                return m + n
	            },
	            push: function() {
	                //http://jsperf.com/closure-with-arguments
	                var array = []
	                var i, n = arguments.length
	                for (i = 0; i < n; i++) {
	                    array[i] = arguments[i]
	                }
	                return this.pushArray(array)
	            },
	            unshift: function() {
	                var m = arguments.length,
	                    n = this.length
	                if (m) {
	                    ap.unshift.apply(this.$model, arguments)
	                    mutateArray.call(this, "add", 0, m, 0)
	                }
	                return m + n //IE67的unshift不会返回长度
	            },
	            shift: function() {
	                if (this.length) {
	                    var el = this.$model.shift()
	                    mutateArray.call(this, "del", 0, 1, 0)
	                    return el //返回被移除的元素
	                }
	            },
	            pop: function() {
	                var n = this.length
	                if (n) {
	                    var el = this.$model.pop()
	                    mutateArray.call(this, "del", n - 1, 1, Math.max(0, n - 2))
	                    return el //返回被移除的元素
	                }
	            },
	            splice: function(start) {
	                var m = arguments.length,
	                    args = [],
	                    change
	                var removed = _splice.apply(this.$model, arguments)
	                if (removed.length) { //如果用户删掉了元素
	                    args.push("del", start, removed.length, 0)
	                    change = true
	                }
	                if (m > 2) { //如果用户添加了元素
	                    if (change) {
	                        args.splice(3, 1, 0, "add", start, m - 2)
	                    } else {
	                        args.push("add", start, m - 2, 0)
	                    }
	                    change = true
	                }
	                if (change) { //返回被移除的元素
	                    return mutateArray.apply(this, args)
	                } else {
	                    return []
	                }
	            },
	            contains: function(el) { //判定是否包含
	                return this.indexOf(el) !== -1
	            },
	            remove: function(el) { //移除第一个等于给定值的元素
	                return this.removeAt(this.indexOf(el))
	            },
	            removeAt: function(index) { //移除指定索引上的元素
	                if (index >= 0) {
	                    this.$model.splice(index, 1)
	                    return mutateArray.call(this, "del", index, 1, 0)
	                }
	                return []
	            },
	            clear: function() {
	                this.$model.length = this.length = this._.length = 0 //清空数组
	                this._fire("clear", 0)
	                return this
	            },
	            removeAll: function(all) { //移除N个元素
	                if (Array.isArray(all)) {
	                    for (var i = this.length - 1; i >= 0; i--) {
	                        if (all.indexOf(this[i]) !== -1) {
	                            this.removeAt(i)
	                        }
	                    }
	                } else if (typeof all === "function") {
	                    for (i = this.length - 1; i >= 0; i--) {
	                        var el = this[i]
	                        if (all(el, i)) {
	                            this.removeAt(i)
	                        }
	                    }
	                } else {
	                    this.clear()
	                }
	            },
	            ensure: function(el) {
	                if (!this.contains(el)) { //只有不存在才push
	                    this.push(el)
	                }
	                return this
	            },
	            set: function(index, val) {
	                if (index < this.length && index > -1) {
	                    var valueType = avalon.type(val)
	                    if (val && val.$model) {
	                        val = val.$model
	                    }
	                    var target = this[index]
	                    if (valueType === "object") {
	                        for (var i in val) {
	                            if (target.hasOwnProperty(i)) {
	                                target[i] = val[i]
	                            }
	                        }
	                    } else if (valueType === "array") {
	                        target.clear().push.apply(target, val)
	                    } else if (target !== val) {
	                        this[index] = val
	                        this.$model[index] = val
	                        this._fire("set", index, val)
	                    }
	                }
	                return this
	            }
	        }
	        //相当于原来bindingExecutors.repeat 的index分支
	    function resetIndex(array, pos) {
	        var last = array.length - 1
	        for (var el; el = array[pos]; pos++) {
	            el.$index = pos
	            el.$first = pos === 0
	            el.$last = pos === last
	        }
	    }
	
	    function sortByIndex(array, indexes) {
	        var map = {};
	        for (var i = 0, n = indexes.length; i < n; i++) {
	            map[i] = array[i] // preserve
	            var j = indexes[i]
	            if (j in map) {
	                array[i] = map[j]
	                delete map[j]
	            } else {
	                array[i] = array[j]
	            }
	        }
	    }
	
	    "sort,reverse".replace(rword, function(method) {
	        arrayPrototype[method] = function() {
	            var newArray = this.$model //这是要排序的新数组
	            var oldArray = newArray.concat() //保持原来状态的旧数组
	            var mask = Math.random()
	            var indexes = []
	            var hasSort
	            ap[method].apply(newArray, arguments) //排序
	            for (var i = 0, n = oldArray.length; i < n; i++) {
	                var neo = newArray[i]
	                var old = oldArray[i]
	                if (isEqual(neo, old)) {
	                    indexes.push(i)
	                } else {
	                    var index = oldArray.indexOf(neo)
	                    indexes.push(index) //得到新数组的每个元素在旧数组对应的位置
	                    oldArray[index] = mask //屏蔽已经找过的元素
	                    hasSort = true
	                }
	            }
	            if (hasSort) {
	                sortByIndex(this, indexes)
	                    // sortByIndex(this.$proxy, indexes)
	                this._fire("move", indexes)
	                this._fire("index", 0)
	            }
	            return this
	        }
	    })
	
	
	    /*********************************************************************
	     *                           依赖调度系统                             *
	     **********************************************************************/
	    //检测两个对象间的依赖关系
	    var dependencyDetection = (function() {
	            var outerFrames = []
	            var currentFrame
	            return {
	                begin: function(accessorObject) {
	                    //accessorObject为一个拥有callback的对象
	                    outerFrames.push(currentFrame)
	                    currentFrame = accessorObject
	                },
	                end: function() {
	                    currentFrame = outerFrames.pop()
	                },
	                collectDependency: function(vmodel, accessor) {
	                    if (currentFrame) {
	                        //被dependencyDetection.begin调用
	                        currentFrame.callback(vmodel, accessor);
	                    }
	                }
	            };
	        })()
	        //将绑定对象注入到其依赖项的订阅数组中
	    var ronduplex = /^(duplex|on)$/
	    avalon.injectBinding = function(data) {
	        var valueFn = data.evaluator
	        if (valueFn) { //如果是求值函数
	            dependencyDetection.begin({
	                callback: function(vmodel, dependency) {
	                    injectDependency(vmodel.$events[dependency._name], data)
	                }
	            })
	            try {
	                var value = ronduplex.test(data.type) ? data : valueFn.apply(0, data.args)
	                if (value === void 0) {
	                    delete data.evaluator
	                }
	                if (data.handler) {
	                    data.handler(value, data.element, data)
	                }
	            } catch (e) {
	                log("warning:exception throwed in [avalon.injectBinding] ", e)
	                delete data.evaluator
	                var node = data.element
	                if (node && node.nodeType === 3) {
	                    var parent = node.parentNode
	                    if (kernel.commentInterpolate) {
	                        parent.replaceChild(DOC.createComment(data.value), node)
	                    } else {
	                        node.data = openTag + (data.oneTime ? "::" : "") + data.value + closeTag
	                    }
	                }
	            } finally {
	                dependencyDetection.end()
	            }
	        }
	    }
	
	    //将依赖项(比它高层的访问器或构建视图刷新函数的绑定对象)注入到订阅者数组 
	    function injectDependency(list, data) {
	        if (data.oneTime)
	            return
	        if (list && avalon.Array.ensure(list, data) && data.element) {
	            injectDisposeQueue(data, list)
	            if (new Date() - beginTime > 444) {
	                rejectDisposeQueue()
	            }
	        }
	    }
	
	    //通知依赖于这个访问器的订阅者更新自身
	    function fireDependencies(list) {
	        if (list && list.length) {
	            if (new Date() - beginTime > 444 && typeof list[0] === "object") {
	                rejectDisposeQueue()
	            }
	            var args = aslice.call(arguments, 1)
	            for (var i = list.length, fn; fn = list[--i];) {
	                var el = fn.element
	                if (el && el.parentNode) {
	                    try {
	                        var valueFn = fn.evaluator
	                        if (fn.$repeat) {
	                            fn.handler.apply(fn, args) //处理监控数组的方法
	                        } else if ("$repeat" in fn || !valueFn) { //如果没有eval,先eval
	                            bindingHandlers[fn.type](fn, fn.vmodels)
	                        } else if (fn.type !== "on") { //事件绑定只能由用户触发,不能由程序触发
	                            var value = valueFn.apply(0, fn.args || [])
	                            fn.handler(value, el, fn)
	                        }
	                    } catch (e) {
	                        console.log(e)
	                    }
	                }
	            }
	        }
	    }
	    /*********************************************************************
	     *                          定时GC回收机制                             *
	     **********************************************************************/
	    var disposeCount = 0
	    var disposeQueue = avalon.$$subscribers = []
	    var beginTime = new Date()
	    var oldInfo = {}
	        //var uuid2Node = {}
	    function getUid(elem, makeID) { //IE9+,标准浏览器
	        if (!elem.uuid && !makeID) {
	            elem.uuid = ++disposeCount
	        }
	        return elem.uuid
	    }
	
	    //添加到回收列队中
	    function injectDisposeQueue(data, list) {
	        var elem = data.element
	        if (!data.uuid) {
	            if (elem.nodeType !== 1) {
	                data.uuid = data.type + getUid(elem.parentNode) + "-" + (++disposeCount)
	            } else {
	                data.uuid = data.name + "-" + getUid(elem)
	            }
	        }
	        var lists = data.lists || (data.lists = [])
	        avalon.Array.ensure(lists, list)
	        list.$uuid = list.$uuid || generateID()
	        if (!disposeQueue[data.uuid]) {
	            disposeQueue[data.uuid] = 1
	            disposeQueue.push(data)
	        }
	    }
	
	    function rejectDisposeQueue(data) {
	        if (avalon.optimize)
	            return
	        var i = disposeQueue.length
	        var n = i
	        var allTypes = []
	        var iffishTypes = {}
	        var newInfo = {}
	            //对页面上所有绑定对象进行分门别类, 只检测个数发生变化的类型
	        while (data = disposeQueue[--i]) {
	            var type = data.type
	            if (newInfo[type]) {
	                newInfo[type]++
	            } else {
	                newInfo[type] = 1
	                allTypes.push(type)
	            }
	        }
	        var diff = false
	        allTypes.forEach(function(type) {
	            if (oldInfo[type] !== newInfo[type]) {
	                iffishTypes[type] = 1
	                diff = true
	            }
	        })
	        i = n
	        if (diff) {
	            while (data = disposeQueue[--i]) {
	                if (data.element === null) {
	                    disposeQueue.splice(i, 1)
	                    continue
	                }
	                if (iffishTypes[data.type] && shouldDispose(data.element)) { //如果它没有在DOM树
	                    disposeQueue.splice(i, 1)
	                    delete disposeQueue[data.uuid]
	                        //delete uuid2Node[data.element.uuid]
	                    var lists = data.lists
	                    for (var k = 0, list; list = lists[k++];) {
	                        avalon.Array.remove(lists, list)
	                        avalon.Array.remove(list, data)
	                    }
	                    disposeData(data)
	                }
	            }
	        }
	        oldInfo = newInfo
	        beginTime = new Date()
	    }
	
	    function disposeData(data) {
	        delete disposeQueue[data.uuid] // 先清除，不然无法回收了
	        data.element = null
	        data.rollback && data.rollback()
	        for (var key in data) {
	            data[key] = null
	        }
	    }
	
	    function shouldDispose(el) {
	        try { //IE下，如果文本节点脱离DOM树，访问parentNode会报错
	            var fireError = el.parentNode.nodeType
	        } catch (e) {
	            return true
	        }
	        if (el.ifRemove) {
	            // 如果节点被放到ifGroup，才移除
	            if (!root.contains(el.ifRemove) && (ifGroup === el.parentNode)) {
	                el.parentNode && el.parentNode.removeChild(el)
	                return true
	            }
	        }
	        return el.msRetain ? 0 : (el.nodeType === 1 ? !root.contains(el) : !avalon.contains(root, el))
	    }
	
	    /************************************************************************
	     *            HTML处理(parseHTML, innerHTML, clearHTML)                  *
	     ************************************************************************/
	    // We have to close these tags to support XHTML 
	    var tagHooks = {
	        area: [1, "<map>", "</map>"],
	        param: [1, "<object>", "</object>"],
	        col: [2, "<table><colgroup>", "</colgroup></table>"],
	        legend: [1, "<fieldset>", "</fieldset>"],
	        option: [1, "<select multiple='multiple'>", "</select>"],
	        thead: [1, "<table>", "</table>"],
	        tr: [2, "<table>", "</table>"],
	        td: [3, "<table><tr>", "</tr></table>"],
	        g: [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">', '</svg>'],
	        //IE6-8在用innerHTML生成节点时，不能直接创建no-scope元素与HTML5的新标签
	        _default: W3C ? [0, "", ""] : [1, "X<div>", "</div>"] //div可以不用闭合
	    }
	    tagHooks.th = tagHooks.td
	    tagHooks.optgroup = tagHooks.option
	    tagHooks.tbody = tagHooks.tfoot = tagHooks.colgroup = tagHooks.caption = tagHooks.thead
	    String("circle,defs,ellipse,image,line,path,polygon,polyline,rect,symbol,text,use").replace(rword, function(tag) {
	        tagHooks[tag] = tagHooks.g //处理SVG
	    })
	    var rtagName = /<([\w:]+)/ //取得其tagName
	    var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
	    var rcreate = W3C ? /[^\d\D]/ : /(<(?:script|link|style|meta|noscript))/ig
	    var scriptTypes = oneObject(["", "text/javascript", "text/ecmascript", "application/ecmascript", "application/javascript"])
	    var rnest = /<(?:tb|td|tf|th|tr|col|opt|leg|cap|area)/ //需要处理套嵌关系的标签
	    var script = DOC.createElement("script")
	    var rhtml = /<|&#?\w+;/
	    avalon.parseHTML = function(html) {
	        var fragment = avalonFragment.cloneNode(false)
	        if (typeof html !== "string") {
	            return fragment
	        }
	        if (!rhtml.test(html)) {
	            fragment.appendChild(DOC.createTextNode(html))
	            return fragment
	        }
	        html = html.replace(rxhtml, "<$1></$2>").trim()
	        var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase(),
	            //取得其标签名
	            wrap = tagHooks[tag] || tagHooks._default,
	            wrapper = cinerator,
	            firstChild, neo
	        if (!W3C) { //fix IE
	            html = html.replace(rcreate, "<br class=msNoScope>$1") //在link style script等标签之前添加一个补丁
	        }
	        wrapper.innerHTML = wrap[1] + html + wrap[2]
	        var els = wrapper.getElementsByTagName("script")
	        if (els.length) { //使用innerHTML生成的script节点不会发出请求与执行text属性
	            for (var i = 0, el; el = els[i++];) {
	                if (scriptTypes[el.type]) {
	                    //以偷龙转凤方式恢复执行脚本功能
	                    neo = script.cloneNode(false) //FF不能省略参数
	                    ap.forEach.call(el.attributes, function(attr) {
	                            if (attr && attr.specified) {
	                                neo[attr.name] = attr.value //复制其属性
	                                neo.setAttribute(attr.name, attr.value)
	                            }
	                        }) // jshint ignore:line
	                    neo.text = el.text
	                    el.parentNode.replaceChild(neo, el) //替换节点
	                }
	            }
	        }
	        if (!W3C) { //fix IE
	            var target = wrap[1] === "X<div>" ? wrapper.lastChild.firstChild : wrapper.lastChild
	            if (target && target.tagName === "TABLE" && tag !== "tbody") {
	                //IE6-7处理 <thead> --> <thead>,<tbody>
	                //<tfoot> --> <tfoot>,<tbody>
	                //<table> --> <table><tbody></table>
	                for (els = target.childNodes, i = 0; el = els[i++];) {
	                    if (el.tagName === "TBODY" && !el.innerHTML) {
	                        target.removeChild(el)
	                        break
	                    }
	                }
	            }
	            els = wrapper.getElementsByTagName("br")
	            var n = els.length
	            while (el = els[--n]) {
	                if (el.className === "msNoScope") {
	                    el.parentNode.removeChild(el)
	                }
	            }
	            for (els = wrapper.all, i = 0; el = els[i++];) { //fix VML
	                if (isVML(el)) {
	                    fixVML(el)
	                }
	            }
	        }
	        //移除我们为了符合套嵌关系而添加的标签
	        for (i = wrap[0]; i--; wrapper = wrapper.lastChild) {}
	        while (firstChild = wrapper.firstChild) { // 将wrapper上的节点转移到文档碎片上！
	            fragment.appendChild(firstChild)
	        }
	        return fragment
	    }
	
	    function isVML(src) {
	        var nodeName = src.nodeName
	        return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ""
	    }
	
	    function fixVML(node) {
	        if (node.currentStyle.behavior !== "url(#default#VML)") {
	            node.style.behavior = "url(#default#VML)"
	            node.style.display = "inline-block"
	            node.style.zoom = 1 //hasLayout
	        }
	    }
	    avalon.innerHTML = function(node, html) {
	        if (!W3C && (!rcreate.test(html) && !rnest.test(html))) {
	            try {
	                node.innerHTML = html
	                return
	            } catch (e) {}
	        }
	        var a = this.parseHTML(html)
	        this.clearHTML(node).appendChild(a)
	    }
	    avalon.clearHTML = function(node) {
	        node.textContent = ""
	        while (node.firstChild) {
	            node.removeChild(node.firstChild)
	        }
	        return node
	    }
	
	    /*********************************************************************
	     *                  avalon的原型方法定义区                            *
	     **********************************************************************/
	
	    function hyphen(target) {
	        //转换为连字符线风格
	        return target.replace(/([a-z\d])([A-Z]+)/g, "$1-$2").toLowerCase()
	    }
	
	    function camelize(target) {
	        //提前判断，提高getStyle等的效率
	        if (!target || target.indexOf("-") < 0 && target.indexOf("_") < 0) {
	            return target
	        }
	        //转换为驼峰风格
	        return target.replace(/[-_][^-_]/g, function(match) {
	            return match.charAt(1).toUpperCase()
	        })
	    }
	
	    var fakeClassListMethods = {
	        _toString: function() {
	            var node = this.node
	            var cls = node.className
	            var str = typeof cls === "string" ? cls : cls.baseVal
	            return str.split(/\s+/).join(" ")
	        },
	        _contains: function(cls) {
	            return (" " + this + " ").indexOf(" " + cls + " ") > -1
	        },
	        _add: function(cls) {
	            if (!this.contains(cls)) {
	                this._set(this + " " + cls)
	            }
	        },
	        _remove: function(cls) {
	            this._set((" " + this + " ").replace(" " + cls + " ", " "))
	        },
	        __set: function(cls) {
	                cls = cls.trim()
	                var node = this.node
	                if (rsvg.test(node)) {
	                    //SVG元素的className是一个对象 SVGAnimatedString { baseVal="", animVal=""}，只能通过set/getAttribute操作
	                    node.setAttribute("class", cls)
	                } else {
	                    node.className = cls
	                }
	            } //toggle存在版本差异，因此不使用它
	    }
	
	    function fakeClassList(node) {
	        if (!("classList" in node)) {
	            node.classList = {
	                node: node
	            }
	            for (var k in fakeClassListMethods) {
	                node.classList[k.slice(1)] = fakeClassListMethods[k]
	            }
	        }
	        return node.classList
	    }
	
	
	    "add,remove".replace(rword, function(method) {
	        avalon.fn[method + "Class"] = function(cls) {
	            var el = this[0]
	                //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	            if (cls && typeof cls === "string" && el && el.nodeType === 1) {
	                cls.replace(/\S+/g, function(c) {
	                    fakeClassList(el)[method](c)
	                })
	            }
	            return this
	        }
	    })
	    avalon.fn.mix({
	        hasClass: function(cls) {
	            var el = this[0] || {}
	            return el.nodeType === 1 && fakeClassList(el).contains(cls)
	        },
	        toggleClass: function(value, stateVal) {
	            var className, i = 0
	            var classNames = String(value).split(/\s+/)
	            var isBool = typeof stateVal === "boolean"
	            while ((className = classNames[i++])) {
	                var state = isBool ? stateVal : !this.hasClass(className)
	                this[state ? "addClass" : "removeClass"](className)
	            }
	            return this
	        },
	        attr: function(name, value) {
	            if (arguments.length === 2) {
	                this[0].setAttribute(name, value)
	                return this
	            } else {
	                return this[0].getAttribute(name)
	            }
	        },
	        data: function(name, value) {
	            name = "data-" + hyphen(name || "")
	            switch (arguments.length) {
	                case 2:
	                    this.attr(name, value)
	                    return this
	                case 1:
	                    var val = this.attr(name)
	                    return parseData(val)
	                case 0:
	                    var ret = {}
	                    ap.forEach.call(this[0].attributes, function(attr) {
	                        if (attr) {
	                            name = attr.name
	                            if (!name.indexOf("data-")) {
	                                name = camelize(name.slice(5))
	                                ret[name] = parseData(attr.value)
	                            }
	                        }
	                    })
	                    return ret
	            }
	        },
	        removeData: function(name) {
	            name = "data-" + hyphen(name)
	            this[0].removeAttribute(name)
	            return this
	        },
	        css: function(name, value) {
	            if (avalon.isPlainObject(name)) {
	                for (var i in name) {
	                    avalon.css(this, i, name[i])
	                }
	            } else {
	                var ret = avalon.css(this, name, value)
	            }
	            return ret !== void 0 ? ret : this
	        },
	        position: function() {
	            var offsetParent, offset,
	                elem = this[0],
	                parentOffset = {
	                    top: 0,
	                    left: 0
	                }
	            if (!elem) {
	                return
	            }
	            if (this.css("position") === "fixed") {
	                offset = elem.getBoundingClientRect()
	            } else {
	                offsetParent = this.offsetParent() //得到真正的offsetParent
	                offset = this.offset() // 得到正确的offsetParent
	                if (offsetParent[0].tagName !== "HTML") {
	                    parentOffset = offsetParent.offset()
	                }
	                parentOffset.top += avalon.css(offsetParent[0], "borderTopWidth", true)
	                parentOffset.left += avalon.css(offsetParent[0], "borderLeftWidth", true)
	
	                // Subtract offsetParent scroll positions
	                parentOffset.top -= offsetParent.scrollTop()
	                parentOffset.left -= offsetParent.scrollLeft()
	            }
	            return {
	                top: offset.top - parentOffset.top - avalon.css(elem, "marginTop", true),
	                left: offset.left - parentOffset.left - avalon.css(elem, "marginLeft", true)
	            }
	        },
	        offsetParent: function() {
	            var offsetParent = this[0].offsetParent
	            while (offsetParent && avalon.css(offsetParent, "position") === "static") {
	                offsetParent = offsetParent.offsetParent;
	            }
	            return avalon(offsetParent || root)
	        },
	        bind: function(type, fn, phase) {
	            if (this[0]) { //此方法不会链
	                return avalon.bind(this[0], type, fn, phase)
	            }
	        },
	        unbind: function(type, fn, phase) {
	            if (this[0]) {
	                avalon.unbind(this[0], type, fn, phase)
	            }
	            return this
	        },
	        val: function(value) {
	            var node = this[0]
	            if (node && node.nodeType === 1) {
	                var get = arguments.length === 0
	                var access = get ? ":get" : ":set"
	                var fn = valHooks[getValType(node) + access]
	                if (fn) {
	                    var val = fn(node, value)
	                } else if (get) {
	                    return (node.value || "").replace(/\r/g, "")
	                } else {
	                    node.value = value
	                }
	            }
	            return get ? val : this
	        }
	    })
	
	    function parseData(data) {
	        try {
	            if (typeof data === "object")
	                return data
	            data = data === "true" ? true :
	                data === "false" ? false :
	                data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? avalon.parseJSON(data) : data
	        } catch (e) {}
	        return data
	    }
	    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	        rvalidchars = /^[\],:{}\s]*$/,
	        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g
	    avalon.parseJSON = window.JSON ? JSON.parse : function(data) {
	        if (typeof data === "string") {
	            data = data.trim();
	            if (data) {
	                if (rvalidchars.test(data.replace(rvalidescape, "@")
	                        .replace(rvalidtokens, "]")
	                        .replace(rvalidbraces, ""))) {
	                    return (new Function("return " + data))() // jshint ignore:line
	                }
	            }
	            avalon.error("Invalid JSON: " + data)
	        }
	        return data
	    }
	    avalon.fireDom = function(elem, type, opts) {
	        if (DOC.createEvent) {
	            var hackEvent = DOC.createEvent("Events");
	            hackEvent.initEvent(type, true, true)
	            avalon.mix(hackEvent, opts)
	            elem.dispatchEvent(hackEvent)
	        } else {
	            try {
	                hackEvent = DOC.createEventObject()
	                avalon.mix(hackEvent, opts)
	                elem.fireEvent("on" + type, hackEvent)
	            } catch (e) { //IE6-8触发事件必须保证在DOM树中,否则报"SCRIPT16389: 未指明的错误"
	            }
	        }
	    }
	
	    //生成avalon.fn.scrollLeft, avalon.fn.scrollTop方法
	    avalon.each({
	        scrollLeft: "pageXOffset",
	        scrollTop: "pageYOffset"
	    }, function(method, prop) {
	        avalon.fn[method] = function(val) {
	            var node = this[0] || {},
	                win = getWindow(node),
	                top = method === "scrollTop"
	            if (!arguments.length) {
	                return win ? (prop in win) ? win[prop] : root[method] : node[method]
	            } else {
	                if (win) {
	                    win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop())
	                } else {
	                    node[method] = val
	                }
	            }
	        }
	    })
	
	    function getWindow(node) {
	        return node.window && node.document ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	    }
	    //=============================css相关=======================
	    var cssHooks = avalon.cssHooks = {}
	    var prefixes = ["", "-webkit-", "-o-", "-moz-", "-ms-"]
	    var cssMap = {
	        "float": W3C ? "cssFloat" : "styleFloat"
	    }
	    avalon.cssNumber = oneObject("animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom")
	
	    avalon.cssName = function(name, host, camelCase) {
	        if (cssMap[name]) {
	            return cssMap[name]
	        }
	        host = host || root.style
	        for (var i = 0, n = prefixes.length; i < n; i++) {
	            camelCase = camelize(prefixes[i] + name)
	            if (camelCase in host) {
	                return (cssMap[name] = camelCase)
	            }
	        }
	        return null
	    }
	    cssHooks["@:set"] = function(node, name, value) {
	        try { //node.style.width = NaN;node.style.width = "xxxxxxx";node.style.width = undefine 在旧式IE下会抛异常
	            node.style[name] = value
	        } catch (e) {}
	    }
	    if (window.getComputedStyle) {
	        cssHooks["@:get"] = function(node, name) {
	            if (!node || !node.style) {
	                throw new Error("getComputedStyle要求传入一个节点 " + node)
	            }
	            var ret, styles = getComputedStyle(node, null)
	            if (styles) {
	                ret = name === "filter" ? styles.getPropertyValue(name) : styles[name]
	                if (ret === "") {
	                    ret = node.style[name] //其他浏览器需要我们手动取内联样式
	                }
	            }
	            return ret
	        }
	        cssHooks["opacity:get"] = function(node) {
	            var ret = cssHooks["@:get"](node, "opacity")
	            return ret === "" ? "1" : ret
	        }
	    } else {
	        var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i
	        var rposition = /^(top|right|bottom|left)$/
	        var ralpha = /alpha\([^)]*\)/i
	        var ie8 = !!window.XDomainRequest
	        var salpha = "DXImageTransform.Microsoft.Alpha"
	        var border = {
	            thin: ie8 ? '1px' : '2px',
	            medium: ie8 ? '3px' : '4px',
	            thick: ie8 ? '5px' : '6px'
	        }
	        cssHooks["@:get"] = function(node, name) {
	            //取得精确值，不过它有可能是带em,pc,mm,pt,%等单位
	            var currentStyle = node.currentStyle
	            var ret = currentStyle[name]
	            if ((rnumnonpx.test(ret) && !rposition.test(ret))) {
	                //①，保存原有的style.left, runtimeStyle.left,
	                var style = node.style,
	                    left = style.left,
	                    rsLeft = node.runtimeStyle.left
	                    //②由于③处的style.left = xxx会影响到currentStyle.left，
	                    //因此把它currentStyle.left放到runtimeStyle.left，
	                    //runtimeStyle.left拥有最高优先级，不会style.left影响
	                node.runtimeStyle.left = currentStyle.left
	                    //③将精确值赋给到style.left，然后通过IE的另一个私有属性 style.pixelLeft
	                    //得到单位为px的结果；fontSize的分支见http://bugs.jquery.com/ticket/760
	                style.left = name === 'fontSize' ? '1em' : (ret || 0)
	                ret = style.pixelLeft + "px"
	                    //④还原 style.left，runtimeStyle.left
	                style.left = left
	                node.runtimeStyle.left = rsLeft
	            }
	            if (ret === "medium") {
	                name = name.replace("Width", "Style")
	                    //border width 默认值为medium，即使其为0"
	                if (currentStyle[name] === "none") {
	                    ret = "0px"
	                }
	            }
	            return ret === "" ? "auto" : border[ret] || ret
	        }
	        cssHooks["opacity:set"] = function(node, name, value) {
	            var style = node.style
	            var opacity = isFinite(value) && value <= 1 ? "alpha(opacity=" + value * 100 + ")" : ""
	            var filter = style.filter || "";
	            style.zoom = 1
	                //不能使用以下方式设置透明度
	                //node.filters.alpha.opacity = value * 100
	            style.filter = (ralpha.test(filter) ?
	                filter.replace(ralpha, opacity) :
	                filter + " " + opacity).trim()
	            if (!style.filter) {
	                style.removeAttribute("filter")
	            }
	        }
	        cssHooks["opacity:get"] = function(node) {
	            //这是最快的获取IE透明值的方式，不需要动用正则了！
	            var alpha = node.filters.alpha || node.filters[salpha],
	                op = alpha && alpha.enabled ? alpha.opacity : 100
	            return (op / 100) + "" //确保返回的是字符串
	        }
	    }
	
	    "top,left".replace(rword, function(name) {
	        cssHooks[name + ":get"] = function(node) {
	            var computed = cssHooks["@:get"](node, name)
	            return /px$/.test(computed) ? computed :
	                avalon(node).position()[name] + "px"
	        }
	    })
	
	    var cssShow = {
	        position: "absolute",
	        visibility: "hidden",
	        display: "block"
	    }
	
	    var rdisplayswap = /^(none|table(?!-c[ea]).+)/
	
	    function showHidden(node, array) {
	        //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	        if (node.offsetWidth <= 0) { //opera.offsetWidth可能小于0
	            if (rdisplayswap.test(cssHooks["@:get"](node, "display"))) {
	                var obj = {
	                    node: node
	                }
	                for (var name in cssShow) {
	                    obj[name] = node.style[name]
	                    node.style[name] = cssShow[name]
	                }
	                array.push(obj)
	            }
	            var parent = node.parentNode
	            if (parent && parent.nodeType === 1) {
	                showHidden(parent, array)
	            }
	        }
	    }
	    "Width,Height".replace(rword, function(name) { //fix 481
	        var method = name.toLowerCase(),
	            clientProp = "client" + name,
	            scrollProp = "scroll" + name,
	            offsetProp = "offset" + name
	        cssHooks[method + ":get"] = function(node, which, override) {
	            var boxSizing = -4
	            if (typeof override === "number") {
	                boxSizing = override
	            }
	            which = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
	            var ret = node[offsetProp] // border-box 0
	            if (boxSizing === 2) { // margin-box 2
	                return ret + avalon.css(node, "margin" + which[0], true) + avalon.css(node, "margin" + which[1], true)
	            }
	            if (boxSizing < 0) { // padding-box  -2
	                ret = ret - avalon.css(node, "border" + which[0] + "Width", true) - avalon.css(node, "border" + which[1] + "Width", true)
	            }
	            if (boxSizing === -4) { // content-box -4
	                ret = ret - avalon.css(node, "padding" + which[0], true) - avalon.css(node, "padding" + which[1], true)
	            }
	            return ret
	        }
	        cssHooks[method + "&get"] = function(node) {
	            var hidden = [];
	            showHidden(node, hidden);
	            var val = cssHooks[method + ":get"](node)
	            for (var i = 0, obj; obj = hidden[i++];) {
	                node = obj.node
	                for (var n in obj) {
	                    if (typeof obj[n] === "string") {
	                        node.style[n] = obj[n]
	                    }
	                }
	            }
	            return val;
	        }
	        avalon.fn[method] = function(value) { //会忽视其display
	            var node = this[0]
	            if (arguments.length === 0) {
	                if (node.setTimeout) { //取得窗口尺寸,IE9后可以用node.innerWidth /innerHeight代替
	                    return node["inner" + name] || node.document.documentElement[clientProp] ||
	                        node.document.body[clientProp] //IE6下前两个分别为undefine,0
	                }
	                if (node.nodeType === 9) { //取得页面尺寸
	                    var doc = node.documentElement
	                        //FF chrome    html.scrollHeight< body.scrollHeight
	                        //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                        //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                    return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
	                }
	                return cssHooks[method + "&get"](node)
	            } else {
	                return this.css(method, value)
	            }
	        }
	        avalon.fn["inner" + name] = function() {
	            return cssHooks[method + ":get"](this[0], void 0, -2)
	        }
	        avalon.fn["outer" + name] = function(includeMargin) {
	            return cssHooks[method + ":get"](this[0], void 0, includeMargin === true ? 2 : 0)
	        }
	    })
	    avalon.fn.offset = function() { //取得距离页面左右角的坐标
	        var node = this[0],
	            box = {
	                left: 0,
	                top: 0
	            }
	        if (!node || !node.tagName || !node.ownerDocument) {
	            return box
	        }
	        var doc = node.ownerDocument,
	            body = doc.body,
	            root = doc.documentElement,
	            win = doc.defaultView || doc.parentWindow
	        if (!avalon.contains(root, node)) {
	            return box
	        }
	        //http://hkom.blog1.fc2.com/?mode=m&no=750 body的偏移量是不包含margin的
	        //我们可以通过getBoundingClientRect来获得元素相对于client的rect.
	        //http://msdn.microsoft.com/en-us/library/ms536433.aspx
	        if (node.getBoundingClientRect) {
	            box = node.getBoundingClientRect() // BlackBerry 5, iOS 3 (original iPhone)
	        }
	        //chrome/IE6: body.scrollTop, firefox/other: root.scrollTop
	        var clientTop = root.clientTop || body.clientTop,
	            clientLeft = root.clientLeft || body.clientLeft,
	            scrollTop = Math.max(win.pageYOffset || 0, root.scrollTop, body.scrollTop),
	            scrollLeft = Math.max(win.pageXOffset || 0, root.scrollLeft, body.scrollLeft)
	            // 把滚动距离加到left,top中去。
	            // IE一些版本中会自动为HTML元素加上2px的border，我们需要去掉它
	            // http://msdn.microsoft.com/en-us/library/ms533564(VS.85).aspx
	        return {
	            top: box.top + scrollTop - clientTop,
	            left: box.left + scrollLeft - clientLeft
	        }
	    }
	
	    //==================================val相关============================
	
	    function getValType(elem) {
	        var ret = elem.tagName.toLowerCase()
	        return ret === "input" && /checkbox|radio/.test(elem.type) ? "checked" : ret
	    }
	    var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i
	    var valHooks = {
	        "option:get": IEVersion ? function(node) {
	            //在IE11及W3C，如果没有指定value，那么node.value默认为node.text（存在trim作），但IE9-10则是取innerHTML(没trim操作)
	            //specified并不可靠，因此通过分析outerHTML判定用户有没有显示定义value
	            return roption.test(node.outerHTML) ? node.value : node.text.trim()
	        } : function(node) {
	            return node.value
	        },
	        "select:get": function(node, value) {
	            var option, options = node.options,
	                index = node.selectedIndex,
	                getter = valHooks["option:get"],
	                one = node.type === "select-one" || index < 0,
	                values = one ? null : [],
	                max = one ? index + 1 : options.length,
	                i = index < 0 ? max : one ? index : 0
	            for (; i < max; i++) {
	                option = options[i]
	                    //旧式IE在reset后不会改变selected，需要改用i === index判定
	                    //我们过滤所有disabled的option元素，但在safari5下，如果设置select为disable，那么其所有孩子都disable
	                    //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
	                if ((option.selected || i === index) && !option.disabled) {
	                    value = getter(option)
	                    if (one) {
	                        return value
	                    }
	                    //收集所有selected值组成数组返回
	                    values.push(value)
	                }
	            }
	            return values
	        },
	        "select:set": function(node, values, optionSet) {
	            values = [].concat(values) //强制转换为数组
	            var getter = valHooks["option:get"]
	            for (var i = 0, el; el = node.options[i++];) {
	                if ((el.selected = values.indexOf(getter(el)) > -1)) {
	                    optionSet = true
	                }
	            }
	            if (!optionSet) {
	                node.selectedIndex = -1
	            }
	        }
	    }
	
	    /*********************************************************************
	     *                          编译系统                                  *
	     **********************************************************************/
	    var meta = {
	        '\b': '\\b',
	        '\t': '\\t',
	        '\n': '\\n',
	        '\f': '\\f',
	        '\r': '\\r',
	        '"': '\\"',
	        '\\': '\\\\'
	    }
	    var quote = window.JSON && JSON.stringify || function(str) {
	        return '"' + str.replace(/[\\\"\x00-\x1f]/g, function(a) {
	            var c = meta[a];
	            return typeof c === 'string' ? c :
	                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"'
	    }
	
	    var keywords = [
	        "break,case,catch,continue,debugger,default,delete,do,else,false",
	        "finally,for,function,if,in,instanceof,new,null,return,switch,this",
	        "throw,true,try,typeof,var,void,while,with", /* 关键字*/
	        "abstract,boolean,byte,char,class,const,double,enum,export,extends",
	        "final,float,goto,implements,import,int,interface,long,native",
	        "package,private,protected,public,short,static,super,synchronized",
	        "throws,transient,volatile", /*保留字*/
	        "arguments,let,yield,undefined" /* ECMA 5 - use strict*/
	    ].join(",")
	    var rrexpstr = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g
	    var rsplit = /[^\w$]+/g
	    var rkeywords = new RegExp(["\\b" + keywords.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g')
	    var rnumber = /\b\d[^,]*/g
	    var rcomma = /^,+|,+$/g
	    var variablePool = new Cache(512)
	    var getVariables = function(code) {
	            var key = "," + code.trim()
	            var ret = variablePool.get(key)
	            if (ret) {
	                return ret
	            }
	            var match = code
	                .replace(rrexpstr, "")
	                .replace(rsplit, ",")
	                .replace(rkeywords, "")
	                .replace(rnumber, "")
	                .replace(rcomma, "")
	                .split(/^$|,+/)
	            return variablePool.put(key, uniqSet(match))
	        }
	        /*添加赋值语句*/
	
	    function addAssign(vars, scope, name, data) {
	        var ret = [],
	            prefix = " = " + name + "."
	        for (var i = vars.length, prop; prop = vars[--i];) {
	            if (scope.hasOwnProperty(prop)) {
	                ret.push(prop + prefix + prop)
	                data.vars.push(prop)
	                if (data.type === "duplex") {
	                    vars.get = name + "." + prop
	                }
	                vars.splice(i, 1)
	            }
	        }
	        return ret
	    }
	
	    function uniqSet(array) {
	        var ret = [],
	            unique = {}
	        for (var i = 0; i < array.length; i++) {
	            var el = array[i]
	            var id = el && typeof el.$id === "string" ? el.$id : el
	            if (!unique[id]) {
	                unique[id] = ret.push(el)
	            }
	        }
	        return ret
	    }
	    //缓存求值函数，以便多次利用
	    var evaluatorPool = new Cache(128)
	        //取得求值函数及其传参
	    var rduplex = /\w\[.*\]|\w\.\w/
	    var rproxy = /(\$proxy\$[a-z]+)\d+$/
	    var rthimRightParentheses = /\)\s*$/
	    var rthimOtherParentheses = /\)\s*\|/g
	    var rquoteFilterName = /\|\s*([$\w]+)/g
	    var rpatchBracket = /"\s*\["/g
	    var rthimLeftParentheses = /"\s*\(/g
	
	    function parseFilter(val, filters) {
	        filters = filters
	            .replace(rthimRightParentheses, "") //处理最后的小括号
	            .replace(rthimOtherParentheses, function() { //处理其他小括号
	                return "],|"
	            })
	            .replace(rquoteFilterName, function(a, b) { //处理|及它后面的过滤器的名字
	                return "[" + quote(b)
	            })
	            .replace(rpatchBracket, function() {
	                return '"],["'
	            })
	            .replace(rthimLeftParentheses, function() {
	                return '",'
	            }) + "]"
	        return "return this.filters.$filter(" + val + ", " + filters + ")"
	    }
	
	    function parseExpr(code, scopes, data) {
	        var dataType = data.type
	        var filters = data.filters || ""
	        var exprId = scopes.map(function(el) {
	            return String(el.$id).replace(rproxy, "$1")
	        }) + code + dataType + filters
	        var vars = getVariables(code).concat(),
	            assigns = [],
	            names = [],
	            args = [],
	            prefix = ""
	            //args 是一个对象数组， names 是将要生成的求值函数的参数
	        scopes = uniqSet(scopes)
	        data.vars = []
	        for (var i = 0, sn = scopes.length; i < sn; i++) {
	            if (vars.length) {
	                var name = "vm" + expose + "_" + i
	                names.push(name)
	                args.push(scopes[i])
	                assigns.push.apply(assigns, addAssign(vars, scopes[i], name, data))
	            }
	        }
	        if (!assigns.length && dataType === "duplex") {
	            return
	        }
	        if (dataType !== "duplex" && (code.indexOf("||") > -1 || code.indexOf("&&") > -1)) {
	            //https://github.com/RubyLouvre/avalon/issues/583
	            data.vars.forEach(function(v) {
	                var reg = new RegExp("\\b" + v + "(?:\\.\\w+|\\[\\w+\\])+", "ig")
	                code = code.replace(reg, function(_, cap) {
	                    var c = _.charAt(v.length)
	                        //var r = IEVersion ? code.slice(arguments[1] + _.length) : RegExp.rightContext
	                        //https://github.com/RubyLouvre/avalon/issues/966
	                    var r = code.slice(cap + _.length)
	                    var method = /^\s*\(/.test(r)
	                    if (c === "." || c === "[" || method) { //比如v为aa,我们只匹配aa.bb,aa[cc],不匹配aaa.xxx
	                        var name = "var" + String(Math.random()).replace(/^0\./, "")
	                        if (method) { //array.size()
	                            var array = _.split(".")
	                            if (array.length > 2) {
	                                var last = array.pop()
	                                assigns.push(name + " = " + array.join("."))
	                                return name + "." + last
	                            } else {
	                                return _
	                            }
	                        }
	                        assigns.push(name + " = " + _)
	                        return name
	                    } else {
	                        return _
	                    }
	                })
	            })
	        }
	        //---------------args----------------
	        data.args = args
	            //---------------cache----------------
	        delete data.vars
	        var fn = evaluatorPool.get(exprId) //直接从缓存，免得重复生成
	        if (fn) {
	            data.evaluator = fn
	            return
	        }
	        prefix = assigns.join(", ")
	        if (prefix) {
	            prefix = "var " + prefix
	        }
	        if (/\S/.test(filters)) { //文本绑定，双工绑定才有过滤器
	            if (!/text|html/.test(data.type)) {
	                throw Error("ms-" + data.type + "不支持过滤器")
	            }
	            code = "\nvar ret" + expose + " = " + code + ";\r\n"
	            code += parseFilter("ret" + expose, filters)
	            try {
	                fn = Function.apply(noop, names.concat("'use strict';\n" + prefix + code))
	                data.evaluator = evaluatorPool.put(exprId, function() {
	                    return fn.apply(avalon, arguments) //确保可以在编译代码中使用this获取avalon对象
	                })
	            } catch (e) {
	                log("debug: parse error," + e.message)
	            }
	            vars = assigns = names = null //释放内存
	            return
	        } else if (dataType === "duplex") { //双工绑定
	            var _body = "'use strict';\nreturn function(vvv){\n\t" +
	                prefix +
	                ";\n\tif(!arguments.length){\n\t\treturn " +
	                code +
	                "\n\t}\n\t" + (!rduplex.test(code) ? vars.get : code) +
	                "= vvv;\n} "
	            try {
	                fn = Function.apply(noop, names.concat(_body))
	                data.evaluator = evaluatorPool.put(exprId, fn)
	            } catch (e) {
	                log("debug: parse error," + e.message)
	            }
	            vars = assigns = names = null //释放内存
	            return
	        } else if (dataType === "on") { //事件绑定
	            if (code.indexOf("(") === -1) {
	                code += ".call(this, $event)"
	            } else {
	                code = code.replace("(", ".call(this,")
	            }
	            names.push("$event")
	            code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
	            var lastIndex = code.lastIndexOf("\nreturn")
	            var header = code.slice(0, lastIndex)
	            var footer = code.slice(lastIndex)
	            code = header + "\n" + footer
	        } else { //其他绑定
	            code = "\nreturn " + code + ";" //IE全家 Function("return ")出错，需要Function("return ;")
	        }
	        try {
	            fn = Function.apply(noop, names.concat("'use strict';\n" + prefix + code))
	            data.evaluator = evaluatorPool.put(exprId, fn)
	        } catch (e) {
	            log("debug: parse error," + e.message)
	        }
	        vars = assigns = names = null //释放内存
	    }
	
	    function stringifyExpr(code) {
	        var hasExpr = rexpr.test(code) //比如ms-class="width{{w}}"的情况
	        if (hasExpr) {
	            var array = scanExpr(code)
	            if (array.length === 1) {
	                return array[0].value
	            }
	            return array.map(function(el) {
	                return el.expr ? "(" + el.value + ")" : quote(el.value)
	            }).join(" + ")
	        } else {
	            return code
	        }
	    }
	    //parseExpr的智能引用代理
	
	    function parseExprProxy(code, scopes, data, noRegister) {
	        code = code || "" //code 可能未定义
	        parseExpr(code, scopes, data)
	        if (data.evaluator && !noRegister) {
	            data.handler = bindingExecutors[data.handlerName || data.type]
	                //方便调试
	                //这里非常重要,我们通过判定视图刷新函数的element是否在DOM树决定
	                //将它移出订阅者列表
	            avalon.injectBinding(data)
	        }
	    }
	    avalon.parseExprProxy = parseExprProxy
	        /*********************************************************************
	         *                           扫描系统                                 *
	         **********************************************************************/
	
	    avalon.scan = function(elem, vmodel) {
	        elem = elem || root
	        var vmodels = vmodel ? [].concat(vmodel) : []
	        scanTag(elem, vmodels)
	    }
	
	    //http://www.w3.org/TR/html5/syntax.html#void-elements
	    var stopScan = oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr,noscript,script,style,textarea".toUpperCase())
	
	    function checkScan(elem, callback, innerHTML) {
	        var id = setTimeout(function() {
	            var currHTML = elem.innerHTML
	            clearTimeout(id)
	            if (currHTML === innerHTML) {
	                callback()
	            } else {
	                checkScan(elem, callback, currHTML)
	            }
	        })
	    }
	
	
	    function createSignalTower(elem, vmodel) {
	        var id = elem.getAttribute("avalonctrl") || vmodel.$id
	        elem.setAttribute("avalonctrl", id)
	        vmodel.$events.expr = elem.tagName + '[avalonctrl="' + id + '"]'
	    }
	
	    var getBindingCallback = function(elem, name, vmodels) {
	        var callback = elem.getAttribute(name)
	        if (callback) {
	            for (var i = 0, vm; vm = vmodels[i++];) {
	                if (vm.hasOwnProperty(callback) && typeof vm[callback] === "function") {
	                    return vm[callback]
	                }
	            }
	        }
	    }
	
	    function executeBindings(bindings, vmodels) {
	        for (var i = 0, data; data = bindings[i++];) {
	            data.vmodels = vmodels
	            bindingHandlers[data.type](data, vmodels)
	            if (data.evaluator && data.element && data.element.nodeType === 1) { //移除数据绑定，防止被二次解析
	                //chrome使用removeAttributeNode移除不存在的特性节点时会报错 https://github.com/RubyLouvre/avalon/issues/99
	                data.element.removeAttribute(data.name)
	            }
	        }
	        bindings.length = 0
	    }
	
	    //https://github.com/RubyLouvre/avalon/issues/636
	    var mergeTextNodes = IEVersion && window.MutationObserver ? function(elem) {
	        var node = elem.firstChild,
	            text
	        while (node) {
	            var aaa = node.nextSibling
	            if (node.nodeType === 3) {
	                if (text) {
	                    text.nodeValue += node.nodeValue
	                    elem.removeChild(node)
	                } else {
	                    text = node
	                }
	            } else {
	                text = null
	            }
	            node = aaa
	        }
	    } : 0
	    var roneTime = /^\s*::/
	    var rmsAttr = /ms-(\w+)-?(.*)/
	    var priorityMap = {
	        "if": 10,
	        "repeat": 90,
	        "data": 100,
	        "widget": 110,
	        "each": 1400,
	        "with": 1500,
	        "duplex": 2000,
	        "on": 3000
	    }
	
	    var events = oneObject("animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit")
	    var obsoleteAttrs = oneObject("value,title,alt,checked,selected,disabled,readonly,enabled")
	
	    function bindingSorter(a, b) {
	        return a.priority - b.priority
	    }
	
	    function scanAttr(elem, vmodels, match) {
	        var scanNode = true
	        if (vmodels.length) {
	            var attributes = getAttributes ? getAttributes(elem) : elem.attributes
	            var bindings = []
	            var fixAttrs = []
	            var msData = {}
	            var uniq = {}
	            for (var i = 0, attr; attr = attributes[i++];) {
	                if (attr.specified) {
	                    if (match = attr.name.match(rmsAttr)) {
	                        //如果是以指定前缀命名的
	                        var type = match[1]
	                        var param = match[2] || ""
	                        var value = attr.value
	                        var name = attr.name
	                        if (uniq[name]) { //IE8下ms-repeat,ms-with BUG
	                            continue
	                        }
	                        uniq[name] = 1
	                        if (events[type]) {
	                            param = type
	                            type = "on"
	                        } else if (obsoleteAttrs[type]) {
	                            if (type === "enabled") { //吃掉ms-enabled绑定,用ms-disabled代替
	                                log("warning!ms-enabled或ms-attr-enabled已经被废弃")
	                                type = "disabled"
	                                value = "!(" + value + ")"
	                            }
	                            param = type
	                            type = "attr"
	                            name = "ms-" + type + "-" + param
	                            fixAttrs.push([attr.name, name, value])
	                        }
	                        msData[name] = value
	                        if (typeof bindingHandlers[type] === "function") {
	                            var newValue = value.replace(roneTime, "")
	                            var oneTime = value !== newValue
	                            var binding = {
	                                type: type,
	                                param: param,
	                                element: elem,
	                                name: name,
	                                value: newValue,
	                                oneTime: oneTime,
	                                uuid: name + "-" + getUid(elem),
	                                //chrome与firefox下Number(param)得到的值不一样 #855
	                                priority: (priorityMap[type] || type.charCodeAt(0) * 10) + (Number(param.replace(/\D/g, "")) || 0)
	                            }
	                            if (type === "html" || type === "text") {
	                                var token = getToken(value)
	                                avalon.mix(binding, token)
	                                binding.filters = binding.filters.replace(rhasHtml, function() {
	                                        binding.type = "html"
	                                        binding.group = 1
	                                        return ""
	                                    }) // jshint ignore:line
	                            } else if (type === "duplex") {
	                                var hasDuplex = name
	                            } else if (name === "ms-if-loop") {
	                                binding.priority += 100
	                            }
	                            bindings.push(binding)
	                            if (type === "widget") {
	                                elem.msData = elem.msData || msData
	                            }
	                        }
	                    }
	                }
	            }
	            if (bindings.length) {
	                bindings.sort(bindingSorter)
	                fixAttrs.forEach(function(arr) {
	                        log("warning!请改用" + arr[1] + "代替" + arr[0] + "!")
	                        elem.removeAttribute(arr[0])
	                        elem.setAttribute(arr[1], arr[2])
	                    })
	                    //http://bugs.jquery.com/ticket/7071
	                    //在IE下对VML读取type属性,会让此元素所有属性都变成<Failed>
	                if (hasDuplex && msData["ms-attr-value"] && !elem.scopeName && elem.type === "text") {
	                    log("warning!一个控件不能同时定义ms-attr-value与" + hasDuplex)
	                }
	                for (i = 0; binding = bindings[i]; i++) {
	                    type = binding.type
	                    if (rnoscanAttrBinding.test(type)) {
	                        return executeBindings(bindings.slice(0, i + 1), vmodels)
	                    } else if (scanNode) {
	                        scanNode = !rnoscanNodeBinding.test(type)
	                    }
	                }
	                executeBindings(bindings, vmodels)
	            }
	        }
	        if (scanNode && !stopScan[elem.tagName] && rbind.test(elem.innerHTML.replace(rlt, "<").replace(rgt, ">"))) {
	            mergeTextNodes && mergeTextNodes(elem)
	            scanNodeList(elem, vmodels) //扫描子孙元素
	        }
	    }
	    var rnoscanAttrBinding = /^if|widget|repeat$/
	    var rnoscanNodeBinding = /^each|with|html|include$/
	        //IE67下，在循环绑定中，一个节点如果是通过cloneNode得到，自定义属性的specified为false，无法进入里面的分支，
	        //但如果我们去掉scanAttr中的attr.specified检测，一个元素会有80+个特性节点（因为它不区分固有属性与自定义属性），很容易卡死页面
	    if (!W3C) {
	        var attrPool = new Cache(512)
	        var rattrs = /\s+(ms-[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
	            rquote = /^['"]/,
	            rtag = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/i,
	            ramp = /&amp;/g
	            //IE6-8解析HTML5新标签，会将它分解两个元素节点与一个文本节点
	            //<body><section>ddd</section></body>
	            //        window.onload = function() {
	            //            var body = document.body
	            //            for (var i = 0, el; el = body.children[i++]; ) {
	            //                avalon.log(el.outerHTML)
	            //            }
	            //        }
	            //依次输出<SECTION>, </SECTION>
	        var getAttributes = function(elem) {
	            var html = elem.outerHTML
	                //处理IE6-8解析HTML5新标签的情况，及<br>等半闭合标签outerHTML为空的情况
	            if (html.slice(0, 2) === "</" || !html.trim()) {
	                return []
	            }
	            var str = html.match(rtag)[0]
	            var attributes = [],
	                match,
	                k, v
	            var ret = attrPool.get(str)
	            if (ret) {
	                return ret
	            }
	            while (k = rattrs.exec(str)) {
	                v = k[2]
	                if (v) {
	                    v = (rquote.test(v) ? v.slice(1, -1) : v).replace(ramp, "&")
	                }
	                var name = k[1].toLowerCase()
	                match = name.match(rmsAttr)
	                var binding = {
	                    name: name,
	                    specified: true,
	                    value: v || ""
	                }
	                attributes.push(binding)
	            }
	            return attrPool.put(str, attributes)
	        }
	    }
	
	    function scanNodeList(parent, vmodels) {
	        var nodes = avalon.slice(parent.childNodes)
	        scanNodeArray(nodes, vmodels)
	    }
	
	    function scanNodeArray(nodes, vmodels) {
	        for (var i = 0, node; node = nodes[i++];) {
	            switch (node.nodeType) {
	                case 1:
	                    scanTag(node, vmodels) //扫描元素节点
	                    if (node.msCallback) {
	                        node.msCallback()
	                        node.msCallback = void 0
	                    }
	                    break
	                case 3:
	                    if (rexpr.test(node.nodeValue)) {
	                        scanText(node, vmodels, i) //扫描文本节点
	                    }
	                    break
	            }
	        }
	    }
	
	
	    function scanTag(elem, vmodels, node) {
	        //扫描顺序  ms-skip(0) --> ms-important(1) --> ms-controller(2) --> ms-if(10) --> ms-repeat(100) 
	        //--> ms-if-loop(110) --> ms-attr(970) ...--> ms-each(1400)-->ms-with(1500)--〉ms-duplex(2000)垫后
	        var a = elem.getAttribute("ms-skip")
	            //#360 在旧式IE中 Object标签在引入Flash等资源时,可能出现没有getAttributeNode,innerHTML的情形
	        if (!elem.getAttributeNode) {
	            return log("warning " + elem.tagName + " no getAttributeNode method")
	        }
	        var b = elem.getAttributeNode("ms-important")
	        var c = elem.getAttributeNode("ms-controller")
	        if (typeof a === "string") {
	            return
	        } else if (node = b || c) {
	            var newVmodel = avalon.vmodels[node.value]
	            if (!newVmodel) {
	                return
	            }
	            //ms-important不包含父VM，ms-controller相反
	            vmodels = node === b ? [newVmodel] : [newVmodel].concat(vmodels)
	            var name = node.name
	            elem.removeAttribute(name) //removeAttributeNode不会刷新[ms-controller]样式规则
	            avalon(elem).removeClass(name)
	            createSignalTower(elem, newVmodel)
	        }
	        scanAttr(elem, vmodels) //扫描特性节点
	    }
	    var rhasHtml = /\|\s*html(?:\b|$)/,
	        r11a = /\|\|/g,
	        rlt = /&lt;/g,
	        rgt = /&gt;/g,
	        rstringLiteral = /(['"])(\\\1|.)+?\1/g
	
	    function getToken(value) {
	        if (value.indexOf("|") > 0) {
	            var scapegoat = value.replace(rstringLiteral, function(_) {
	                return Array(_.length + 1).join("1") // jshint ignore:line
	            })
	            var index = scapegoat.replace(r11a, "\u1122\u3344").indexOf("|") //干掉所有短路或
	            if (index > -1) {
	                return {
	                    filters: value.slice(index),
	                    value: value.slice(0, index),
	                    expr: true
	                }
	            }
	        }
	        return {
	            value: value,
	            filters: "",
	            expr: true
	        }
	    }
	
	    function scanExpr(str) {
	        var tokens = [],
	            value, start = 0,
	            stop
	        do {
	            stop = str.indexOf(openTag, start)
	            if (stop === -1) {
	                break
	            }
	            value = str.slice(start, stop)
	            if (value) { // {{ 左边的文本
	                tokens.push({
	                    value: value,
	                    filters: "",
	                    expr: false
	                })
	            }
	            start = stop + openTag.length
	            stop = str.indexOf(closeTag, start)
	            if (stop === -1) {
	                break
	            }
	            value = str.slice(start, stop)
	            if (value) { //处理{{ }}插值表达式
	                tokens.push(getToken(value))
	            }
	            start = stop + closeTag.length
	        } while (1)
	        value = str.slice(start)
	        if (value) { //}} 右边的文本
	            tokens.push({
	                value: value,
	                expr: false,
	                filters: ""
	            })
	        }
	        return tokens
	    }
	
	    function scanText(textNode, vmodels) {
	        var bindings = [],
	            tokens = scanExpr(textNode.data)
	        if (tokens.length) {
	            for (var i = 0, token; token = tokens[i++];) {
	                var node = DOC.createTextNode(token.value) //将文本转换为文本节点，并替换原来的文本节点
	                if (token.expr) {
	                    token.value = token.value.replace(roneTime, function() {
	                            token.oneTime = true
	                            return ""
	                        }) // jshint ignore:line
	                    token.type = "text"
	                    token.element = node
	                    token.filters = token.filters.replace(rhasHtml, function(a, b, c) {
	                            token.type = "html"
	                            return ""
	                        }) // jshint ignore:line
	                    bindings.push(token) //收集带有插值表达式的文本
	                }
	                avalonFragment.appendChild(node)
	            }
	            textNode.parentNode.replaceChild(avalonFragment, textNode)
	            if (bindings.length)
	                executeBindings(bindings, vmodels)
	        }
	    }
	
	    var bools = ["autofocus,autoplay,async,allowTransparency,checked,controls",
	        "declare,disabled,defer,defaultChecked,defaultSelected",
	        "contentEditable,isMap,loop,multiple,noHref,noResize,noShade",
	        "open,readOnly,selected"
	    ].join(",")
	    var boolMap = {}
	    bools.replace(rword, function(name) {
	        boolMap[name.toLowerCase()] = name
	    })
	
	    var propMap = { //属性名映射
	        "accept-charset": "acceptCharset",
	        "char": "ch",
	        "charoff": "chOff",
	        "class": "className",
	        "for": "htmlFor",
	        "http-equiv": "httpEquiv"
	    }
	
	    var anomaly = ["accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan",
	        "dateTime,defaultValue,frameBorder,longDesc,maxLength,marginWidth,marginHeight",
	        "rowSpan,tabIndex,useMap,vSpace,valueType,vAlign"
	    ].join(",")
	    anomaly.replace(rword, function(name) {
	        propMap[name.toLowerCase()] = name
	    })
	
	    var rnoscripts = /<noscript.*?>(?:[\s\S]+?)<\/noscript>/img
	    var rnoscriptText = /<noscript.*?>([\s\S]+?)<\/noscript>/im
	
	    var getXHR = function() {
	        return new(window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP") // jshint ignore:line
	    }
	
	    var templatePool = avalon.templateCache = {}
	
	    bindingHandlers.attr = function(data, vmodels) {
	        var value = stringifyExpr(data.value.trim())
	        if (data.type === "include") {
	            var elem = data.element
	            data.includeRendered = getBindingCallback(elem, "data-include-rendered", vmodels)
	            data.includeLoaded = getBindingCallback(elem, "data-include-loaded", vmodels)
	            var outer = data.includeReplace = !!avalon(elem).data("includeReplace")
	            if (avalon(elem).data("includeCache")) {
	                data.templateCache = {}
	            }
	            data.startInclude = DOC.createComment("ms-include")
	            data.endInclude = DOC.createComment("ms-include-end")
	            if (outer) {
	                data.element = data.startInclude
	                elem.parentNode.insertBefore(data.startInclude, elem)
	                elem.parentNode.insertBefore(data.endInclude, elem.nextSibling)
	            } else {
	                elem.insertBefore(data.startInclude, elem.firstChild)
	                elem.appendChild(data.endInclude)
	            }
	        }
	        data.handlerName = "attr" //handleName用于处理多种绑定共用同一种bindingExecutor的情况
	        parseExprProxy(value, vmodels, data)
	    }
	
	    bindingExecutors.attr = function(val, elem, data) {
	        var method = data.type,
	            attrName = data.param
	        if (method === "css") {
	            avalon(elem).css(attrName, val)
	        } else if (method === "attr") {
	
	            // ms-attr-class="xxx" vm.xxx="aaa bbb ccc"将元素的className设置为aaa bbb ccc
	            // ms-attr-class="xxx" vm.xxx=false  清空元素的所有类名
	            // ms-attr-name="yyy"  vm.yyy="ooo" 为元素设置name属性
	            var toRemove = (val === false) || (val === null) || (val === void 0)
	
	            if (!W3C && propMap[attrName]) { //旧式IE下需要进行名字映射
	                attrName = propMap[attrName]
	            }
	            var bool = boolMap[attrName]
	            if (typeof elem[bool] === "boolean") {
	                elem[bool] = !!val //布尔属性必须使用el.xxx = true|false方式设值
	                if (!val) { //如果为false, IE全系列下相当于setAttribute(xxx,''),会影响到样式,需要进一步处理
	                    toRemove = true
	                }
	            }
	            if (toRemove) {
	                return elem.removeAttribute(attrName)
	            }
	            //SVG只能使用setAttribute(xxx, yyy), VML只能使用elem.xxx = yyy ,HTML的固有属性必须elem.xxx = yyy
	            var isInnate = rsvg.test(elem) ? false : (DOC.namespaces && isVML(elem)) ? true : attrName in elem.cloneNode(false)
	            if (isInnate) {
	                elem[attrName] = val + ""
	            } else {
	                elem.setAttribute(attrName, val)
	            }
	        } else if (method === "include" && val) {
	            var vmodels = data.vmodels
	            var rendered = data.includeRendered
	            var loaded = data.includeLoaded
	            var replace = data.includeReplace
	            var target = replace ? elem.parentNode : elem
	            var scanTemplate = function(text) {
	                if (data.vmodels === null) {
	                    return
	                }
	
	                if (loaded) {
	                    var newText = loaded.apply(target, [text].concat(vmodels))
	                    if (typeof newText === "string")
	                        text = newText
	                }
	                if (rendered) {
	                    checkScan(target, function() {
	                        rendered.call(target)
	                    }, NaN)
	                }
	                var lastID = data.includeLastID
	                if (data.templateCache && lastID && lastID !== val) {
	                    var lastTemplate = data.templateCache[lastID]
	                    if (!lastTemplate) {
	                        lastTemplate = data.templateCache[lastID] = DOC.createElement("div")
	                        ifGroup.appendChild(lastTemplate)
	                    }
	                }
	                data.includeLastID = val
	                while (data.startInclude) {
	                    var node = data.startInclude.nextSibling
	                    if (node && node !== data.endInclude) {
	                        target.removeChild(node)
	                        if (lastTemplate)
	                            lastTemplate.appendChild(node)
	                    } else {
	                        break
	                    }
	                }
	                var dom = getTemplateNodes(data, val, text)
	                var nodes = avalon.slice(dom.childNodes)
	                target.insertBefore(dom, data.endInclude)
	                scanNodeArray(nodes, vmodels)
	            }
	
	            if (data.param === "src") {
	                if (typeof templatePool[val] === "string") {
	                    avalon.nextTick(function() {
	                        scanTemplate(templatePool[val])
	                    })
	                } else if (Array.isArray(templatePool[val])) { //#805 防止在循环绑定中发出许多相同的请求
	                    templatePool[val].push(scanTemplate)
	                } else {
	                    var xhr = getXHR()
	                    xhr.onreadystatechange = function() {
	                        if (xhr.readyState === 4) {
	                            var s = xhr.status
	                            if (s >= 200 && s < 300 || s === 304 || s === 1223) {
	                                var text = xhr.responseText
	                                for (var f = 0, fn; fn = templatePool[val][f++];) {
	                                    fn(text)
	                                }
	                                templatePool[val] = text
	                            }
	                        }
	                    }
	                    templatePool[val] = [scanTemplate]
	                    xhr.open("GET", val, true)
	                    if ("withCredentials" in xhr) {
	                        xhr.withCredentials = true
	                    }
	                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
	                    xhr.send(null)
	                }
	            } else {
	                //IE系列与够新的标准浏览器支持通过ID取得元素（firefox14+）
	                //http://tjvantoll.com/2012/07/19/dom-element-references-as-global-variables/
	                var el = val && val.nodeType === 1 ? val : DOC.getElementById(val)
	                if (el) {
	                    if (el.tagName === "NOSCRIPT" && !(el.innerHTML || el.fixIE78)) { //IE7-8 innerText,innerHTML都无法取得其内容，IE6能取得其innerHTML
	                        xhr = getXHR() //IE9-11与chrome的innerHTML会得到转义的内容，它们的innerText可以
	                        xhr.open("GET", location, false) //谢谢Nodejs 乱炖群 深圳-纯属虚构
	                        xhr.send(null)
	                            //http://bbs.csdn.net/topics/390349046?page=1#post-393492653
	                        var noscripts = DOC.getElementsByTagName("noscript")
	                        var array = (xhr.responseText || "").match(rnoscripts) || []
	                        var n = array.length
	                        for (var i = 0; i < n; i++) {
	                            var tag = noscripts[i]
	                            if (tag) { //IE6-8中noscript标签的innerHTML,innerText是只读的
	                                tag.style.display = "none" //http://haslayout.net/css/noscript-Ghost-Bug
	                                tag.fixIE78 = (array[i].match(rnoscriptText) || ["", "&nbsp;"])[1]
	                            }
	                        }
	                    }
	                    avalon.nextTick(function() {
	                        scanTemplate(el.fixIE78 || el.value || el.innerText || el.innerHTML)
	                    })
	                }
	            }
	        } else {
	            if (!root.hasAttribute && typeof val === "string" && (method === "src" || method === "href")) {
	                val = val.replace(/&amp;/g, "&") //处理IE67自动转义的问题
	            }
	            elem[method] = val
	            if (window.chrome && elem.tagName === "EMBED") {
	                var parent = elem.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
	                var comment = document.createComment("ms-src")
	                parent.replaceChild(comment, elem)
	                parent.replaceChild(elem, comment)
	            }
	        }
	    }
	
	    function getTemplateNodes(data, id, text) {
	        var div = data.templateCache && data.templateCache[id]
	        if (div) {
	            var dom = DOC.createDocumentFragment(),
	                firstChild
	            while (firstChild = div.firstChild) {
	                dom.appendChild(firstChild)
	            }
	            return dom
	        }
	        return avalon.parseHTML(text)
	    }
	
	    //这几个指令都可以使用插值表达式，如ms-src="aaa/{{b}}/{{c}}.html"
	    "title,alt,src,value,css,include,href".replace(rword, function(name) {
	            bindingHandlers[name] = bindingHandlers.attr
	        })
	        //根据VM的属性值或表达式的值切换类名，ms-class="xxx yyy zzz:flag" 
	        //http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	    bindingHandlers["class"] = function(binding, vmodels) {
	        var oldStyle = binding.param,
	            text = binding.value,
	            rightExpr
	        binding.handlerName = "class"
	        if (!oldStyle || isFinite(oldStyle)) {
	            binding.param = "" //去掉数字
	            var colonIndex = text.replace(rexprg, function(a) {
	                    return a.replace(/./g, "0")
	                }).indexOf(":") //取得第一个冒号的位置
	            if (colonIndex === -1) { // 比如 ms-class="aaa bbb ccc" 的情况
	                var className = text
	                rightExpr = true
	            } else { // 比如 ms-class-1="ui-state-active:checked" 的情况
	                className = text.slice(0, colonIndex)
	                rightExpr = text.slice(colonIndex + 1)
	            }
	            if (!rexpr.test(text)) {
	                className = quote(className)
	            } else {
	                className = stringifyExpr(className)
	            }
	            binding.expr = "[" + className + "," + rightExpr + "]"
	        } else {
	            binding.expr = '[' + quote(oldStyle) + "," + text + "]"
	            binding.oldStyle = oldStyle
	        }
	        var method = binding.type
	        if (method === "hover" || method === "active") { //确保只绑定一次
	            if (!binding.hasBindEvent) {
	                var elem = binding.element
	                var $elem = avalon(elem)
	                var activate = "mouseenter" //在移出移入时切换类名
	                var abandon = "mouseleave"
	                if (method === "active") { //在聚焦失焦中切换类名
	                    elem.tabIndex = elem.tabIndex || -1
	                    activate = "mousedown"
	                    abandon = "mouseup"
	                    var fn0 = $elem.bind("mouseleave", function() {
	                        binding.toggleClass && $elem.removeClass(binding.newClass)
	                    })
	                }
	            }
	
	            var fn1 = $elem.bind(activate, function() {
	                binding.toggleClass && $elem.addClass(binding.newClass)
	            })
	            var fn2 = $elem.bind(abandon, function() {
	                binding.toggleClass && $elem.removeClass(binding.newClass)
	            })
	            binding.rollback = function() {
	                $elem.unbind("mouseleave", fn0)
	                $elem.unbind(activate, fn1)
	                $elem.unbind(abandon, fn2)
	            }
	            binding.hasBindEvent = true
	        }
	        parseExprProxy(binding.expr, vmodels, binding)
	    }
	
	    bindingExecutors["class"] = function(arr, elem, binding) {
	        var $elem = avalon(elem)
	        binding.newClass = arr[0]
	        binding.toggleClass = !!arr[1]
	        if (binding.oldClass && binding.newClass !== binding.oldClass) {
	            $elem.removeClass(binding.oldClass)
	        }
	        binding.oldClass = binding.newClass
	        if (binding.type === "class") {
	            if (binding.oldStyle) {
	                $elem.toggleClass(binding.oldStyle, !!arr[1])
	            } else {
	                $elem.toggleClass(binding.newClass, binding.toggleClass)
	            }
	        }
	
	    }
	
	    "hover,active".replace(rword, function(method) {
	            bindingHandlers[method] = bindingHandlers["class"]
	        })
	        //ms-controller绑定已经在scanTag 方法中实现
	        //ms-css绑定已由ms-attr绑定实现
	
	
	    // bindingHandlers.data 定义在if.js
	    bindingExecutors.data = function(val, elem, data) {
	            var key = "data-" + data.param
	            if (val && typeof val === "object") {
	                elem[key] = val
	            } else {
	                elem.setAttribute(key, String(val))
	            }
	        }
	        //双工绑定
	    var duplexBinding = bindingHandlers.duplex = function(data, vmodels) {
	            var elem = data.element,
	                hasCast
	            parseExprProxy(data.value, vmodels, data, 1)
	
	            data.changed = getBindingCallback(elem, "data-duplex-changed", vmodels) || noop
	            if (data.evaluator && data.args) {
	                var params = []
	                var casting = oneObject("string,number,boolean,checked")
	                if (elem.type === "radio" && data.param === "") {
	                    data.param = "checked"
	                }
	                if (elem.msData) {
	                    elem.msData["ms-duplex"] = data.value
	                }
	                data.param.replace(/\w+/g, function(name) {
	                    if (/^(checkbox|radio)$/.test(elem.type) && /^(radio|checked)$/.test(name)) {
	                        if (name === "radio")
	                            log("ms-duplex-radio已经更名为ms-duplex-checked")
	                        name = "checked"
	                        data.isChecked = true
	                    }
	                    if (name === "bool") {
	                        name = "boolean"
	                        log("ms-duplex-bool已经更名为ms-duplex-boolean")
	                    } else if (name === "text") {
	                        name = "string"
	                        log("ms-duplex-text已经更名为ms-duplex-string")
	                    }
	                    if (casting[name]) {
	                        hasCast = true
	                    }
	                    avalon.Array.ensure(params, name)
	                })
	                if (!hasCast) {
	                    params.push("string")
	                }
	                data.param = params.join("-")
	                data.bound = function(type, callback) {
	                    if (elem.addEventListener) {
	                        elem.addEventListener(type, callback, false)
	                    } else {
	                        elem.attachEvent("on" + type, callback)
	                    }
	                    var old = data.rollback
	                    data.rollback = function() {
	                        elem.avalonSetter = null
	                        avalon.unbind(elem, type, callback)
	                        old && old()
	                    }
	                }
	                for (var i in avalon.vmodels) {
	                    var v = avalon.vmodels[i]
	                    v.$fire("avalon-ms-duplex-init", data)
	                }
	                var cpipe = data.pipe || (data.pipe = pipe)
	                cpipe(null, data, "init")
	                var tagName = elem.tagName
	                duplexBinding[tagName] && duplexBinding[tagName](elem, data.evaluator.apply(null, data.args), data)
	            }
	        }
	        //不存在 bindingExecutors.duplex
	
	    function fixNull(val) {
	        return val == null ? "" : val
	    }
	    avalon.duplexHooks = {
	        checked: {
	            get: function(val, data) {
	                return !data.element.oldValue
	            }
	        },
	        string: {
	            get: function(val) { //同步到VM
	                return val
	            },
	            set: fixNull
	        },
	        "boolean": {
	            get: function(val) {
	                return val === "true"
	            },
	            set: fixNull
	        },
	        number: {
	            get: function(val, data) {
	                var number = parseFloat(val)
	                if (-val === -number) {
	                    return number
	                }
	                var arr = /strong|medium|weak/.exec(data.element.getAttribute("data-duplex-number")) || ["medium"]
	                switch (arr[0]) {
	                    case "strong":
	                        return 0
	                    case "medium":
	                        return val === "" ? "" : 0
	                    case "weak":
	                        return val
	                }
	            },
	            set: fixNull
	        }
	    }
	
	    function pipe(val, data, action, e) {
	        data.param.replace(/\w+/g, function(name) {
	            var hook = avalon.duplexHooks[name]
	            if (hook && typeof hook[action] === "function") {
	                val = hook[action](val, data)
	            }
	        })
	        return val
	    }
	
	    var TimerID, ribbon = []
	
	    avalon.tick = function(fn) {
	        if (ribbon.push(fn) === 1) {
	            TimerID = setInterval(ticker, 60)
	        }
	    }
	
	    function ticker() {
	        for (var n = ribbon.length - 1; n >= 0; n--) {
	            var el = ribbon[n]
	            if (el() === false) {
	                ribbon.splice(n, 1)
	            }
	        }
	        if (!ribbon.length) {
	            clearInterval(TimerID)
	        }
	    }
	
	    var watchValueInTimer = noop
	    new function() { // jshint ignore:line
	        try { //#272 IE9-IE11, firefox
	            var setters = {}
	            var aproto = HTMLInputElement.prototype
	            var bproto = HTMLTextAreaElement.prototype
	
	            function newSetter(value) { // jshint ignore:line
	                setters[this.tagName].call(this, value)
	                if (!this.msFocus && this.avalonSetter) {
	                    this.avalonSetter()
	                }
	            }
	            var inputProto = HTMLInputElement.prototype
	            Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
	            setters["INPUT"] = Object.getOwnPropertyDescriptor(aproto, "value").set
	
	            Object.defineProperty(aproto, "value", {
	                set: newSetter
	            })
	            setters["TEXTAREA"] = Object.getOwnPropertyDescriptor(bproto, "value").set
	            Object.defineProperty(bproto, "value", {
	                set: newSetter
	            })
	        } catch (e) {
	            //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	            // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	            // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	            watchValueInTimer = avalon.tick
	        }
	    } // jshint ignore:line
	    if (IEVersion) {
	        avalon.bind(DOC, "selectionchange", function(e) {
	            var el = DOC.activeElement || {}
	            if (!el.msFocus && el.avalonSetter) {
	                el.avalonSetter()
	            }
	        })
	    }
	    var rnoduplex = /^(file|button|reset|submit|checkbox|radio|range)$/
	        //处理radio, checkbox, text, textarea, password
	    duplexBinding.INPUT = function(elem, evaluator, data) {
	        var $type = elem.type,
	            bound = data.bound,
	            $elem = avalon(elem),
	            composing = false
	
	        function callback(value) {
	            data.changed.call(this, value, data)
	        }
	
	        function compositionStart() {
	            composing = true
	        }
	
	        function compositionEnd() {
	            composing = false
	        }
	        var IE9Value
	            //当value变化时改变model的值
	        var updateVModel = function() {
	                var val = elem.value //防止递归调用形成死循环
	                if (composing || val === IE9Value) //处理中文输入法在minlengh下引发的BUG
	                    return
	                var lastValue = data.pipe(val, data, "get")
	                if ($elem.data("duplexObserve") !== false) {
	                    IE9Value = val
	                    evaluator(lastValue)
	                    callback.call(elem, lastValue)
	                }
	            }
	            //当model变化时,它就会改变value的值
	        data.handler = function() {
	            var val = data.pipe(evaluator(), data, "set") //fix #673 #1106
	            if (val !== IE9Value) {
	                var fixCaret = false
	                if (elem.msFocus) {
	                    try {
	                        var pos = getCaret(elem)
	                        if (pos.start === pos.end) {
	                            pos = pos.start
	                            fixCaret = true
	                        }
	                    } catch (e) {}
	                }
	                elem.value = IE9Value = val
	                if (fixCaret && !elem.readyOnly) {
	                    setCaret(elem, pos, pos)
	                }
	            }
	        }
	        if (data.isChecked || $type === "radio") {
	            var IE6 = IEVersion === 6
	            updateVModel = function() {
	                if ($elem.data("duplexObserve") !== false) {
	                    var lastValue = data.pipe(elem.value, data, "get")
	                    evaluator(lastValue)
	                    callback.call(elem, lastValue)
	                }
	            }
	            data.handler = function() {
	                var val = evaluator()
	                var checked = data.isChecked ? !!val : val + "" === elem.value
	                elem.oldValue = checked
	                if (IE6) {
	                    setTimeout(function() {
	                        //IE8 checkbox, radio是使用defaultChecked控制选中状态，
	                        //并且要先设置defaultChecked后设置checked
	                        //并且必须设置延迟
	                        elem.defaultChecked = checked
	                        elem.checked = checked
	                    }, 31)
	                } else {
	                    elem.checked = checked
	                }
	            }
	            bound("click", updateVModel)
	        } else if ($type === "checkbox") {
	            updateVModel = function() {
	                if ($elem.data("duplexObserve") !== false) {
	                    var method = elem.checked ? "ensure" : "remove"
	                    var array = evaluator()
	                    if (!Array.isArray(array)) {
	                        log("ms-duplex应用于checkbox上要对应一个数组")
	                        array = [array]
	                    }
	                    var val = data.pipe(elem.value, data, "get")
	                    avalon.Array[method](array, val)
	                    callback.call(elem, array)
	                }
	            }
	
	            data.handler = function() {
	                var array = [].concat(evaluator()) //强制转换为数组
	                var val = data.pipe(elem.value, data, "get")
	                elem.checked = array.indexOf(val) > -1
	            }
	            bound(W3C ? "change" : "click", updateVModel)
	        } else {
	            var events = elem.getAttribute("data-duplex-event") || "input"
	            if (elem.attributes["data-event"]) {
	                log("data-event指令已经废弃，请改用data-duplex-event")
	            }
	
	            function delay(e) { // jshint ignore:line
	                setTimeout(function() {
	                    updateVModel(e)
	                })
	            }
	            events.replace(rword, function(name) {
	                switch (name) {
	                    case "input":
	                        if (!IEVersion) { // W3C
	                            bound("input", updateVModel)
	                                //非IE浏览器才用这个
	                            bound("compositionstart", compositionStart)
	                            bound("compositionend", compositionEnd)
	                            bound("DOMAutoComplete", updateVModel)
	                        } else {
	                            // IE下通过selectionchange事件监听IE9+点击input右边的X的清空行为，及粘贴，剪切，删除行为
	                            if (IEVersion > 8) {
	                                if (IEVersion === 9) {
	                                    //IE9删除字符后再失去焦点不会同步 #1167
	                                    bound("keyup", updateVModel)
	                                }
	                                //IE9使用propertychange无法监听中文输入改动
	                                bound("input", updateVModel)
	                            } else {
	                                //onpropertychange事件无法区分是程序触发还是用户触发
	                                //IE6-8下第一次修改时不会触发,需要使用keydown或selectionchange修正
	                                bound("propertychange", function(e) {
	                                    if (e.propertyName === "value") {
	                                        updateVModel()
	                                    }
	                                })
	                            }
	                            bound("dragend", delay)
	                                //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
	                                //http://www.matts411.com/post/internet-explorer-9-oninput/
	                        }
	                        break
	                    default:
	                        bound(name, updateVModel)
	                        break
	                }
	            })
	
	
	            if (!rnoduplex.test(elem.type)) {
	                if (elem.type !== "hidden") {
	                    bound("focus", function() {
	                        elem.msFocus = true
	                    })
	                    bound("blur", function() {
	                        elem.msFocus = false
	                    })
	                }
	
	                elem.avalonSetter = updateVModel //#765
	                watchValueInTimer(function() {
	                    if (root.contains(elem)) {
	                        if (!elem.msFocus) {
	                            updateVModel()
	                        }
	                    } else if (!elem.msRetain) {
	                        return false
	                    }
	                })
	            }
	
	        }
	
	        avalon.injectBinding(data)
	        callback.call(elem, elem.value)
	    }
	    duplexBinding.TEXTAREA = duplexBinding.INPUT
	
	    function getCaret(ctrl) {
	        var start = NaN,
	            end = NaN
	            //https://github.com/RobinHerbots/jquery.inputmask/blob/3.x/js/inputmask.js#L1736
	        if (ctrl.setSelectionRange) {
	            start = ctrl.selectionStart
	            end = ctrl.selectionEnd
	        } else {
	            var range = document.selection.createRange()
	            start = 0 - range.duplicate().moveStart('character', -100000)
	            end = start + range.text.length
	        }
	        return {
	            start: start,
	            end: end
	        }
	    }
	
	    function setCaret(ctrl, begin, end) {
	        if (!ctrl.value || ctrl.readOnly)
	            return
	        if (ctrl.createTextRange) { //IE6-8
	            var range = ctrl.createTextRange()
	            range.collapse(true)
	            range.moveStart("character", begin)
	            range.select()
	        } else {
	            ctrl.selectionStart = begin
	            ctrl.selectionEnd = end
	        }
	    }
	    duplexBinding.SELECT = function(element, evaluator, data) {
	            var $elem = avalon(element)
	
	            function updateVModel() {
	                if ($elem.data("duplexObserve") !== false) {
	                    var val = $elem.val() //字符串或字符串数组
	                    if (Array.isArray(val)) {
	                        val = val.map(function(v) {
	                            return data.pipe(v, data, "get")
	                        })
	                    } else {
	                        val = data.pipe(val, data, "get")
	                    }
	                    if (val + "" !== element.oldValue) {
	                        evaluator(val)
	                    }
	                    data.changed.call(element, val, data)
	                }
	            }
	            data.handler = function() {
	                var val = evaluator()
	                val = val && val.$model || val
	                if (Array.isArray(val)) {
	                    if (!element.multiple) {
	                        log("ms-duplex在<select multiple=true>上要求对应一个数组")
	                    }
	                } else {
	                    if (element.multiple) {
	                        log("ms-duplex在<select multiple=false>不能对应一个数组")
	                    }
	                }
	                //必须变成字符串后才能比较
	                val = Array.isArray(val) ? val.map(String) : val + ""
	                if (val + "" !== element.oldValue) {
	                    $elem.val(val)
	                    element.oldValue = val + ""
	                }
	            }
	            data.bound("change", updateVModel)
	            element.msCallback = function() {
	                avalon.injectBinding(data)
	                data.changed.call(element, evaluator(), data)
	            }
	        }
	        // bindingHandlers.html 定义在if.js
	    bindingExecutors.html = function(val, elem, data) {
	        var isHtmlFilter = elem.nodeType !== 1
	        var parent = isHtmlFilter ? elem.parentNode : elem
	        if (!parent)
	            return
	        val = val == null ? "" : val
	        if (data.oldText !== val) {
	            data.oldText = val
	        } else {
	            return
	        }
	        if (elem.nodeType === 3) {
	            var signature = generateID("html")
	            parent.insertBefore(DOC.createComment(signature), elem)
	            data.element = DOC.createComment(signature + ":end")
	            parent.replaceChild(data.element, elem)
	            elem = data.element
	        }
	        if (typeof val !== "object") { //string, number, boolean
	            var fragment = avalon.parseHTML(String(val))
	        } else if (val.nodeType === 11) { //将val转换为文档碎片
	            fragment = val
	        } else if (val.nodeType === 1 || val.item) {
	            var nodes = val.nodeType === 1 ? val.childNodes : val.item
	            fragment = avalonFragment.cloneNode(true)
	            while (nodes[0]) {
	                fragment.appendChild(nodes[0])
	            }
	        }
	
	        nodes = avalon.slice(fragment.childNodes)
	            //插入占位符, 如果是过滤器,需要有节制地移除指定的数量,如果是html指令,直接清空
	        if (isHtmlFilter) {
	            var endValue = elem.nodeValue.slice(0, -4)
	            while (true) {
	                var node = elem.previousSibling
	                if (!node || node.nodeType === 8 && node.nodeValue === endValue) {
	                    break
	                } else {
	                    parent.removeChild(node)
	                }
	            }
	            parent.insertBefore(fragment, elem)
	        } else {
	            avalon.clearHTML(elem).appendChild(fragment)
	        }
	        scanNodeArray(nodes, data.vmodels)
	    }
	    bindingHandlers["if"] =
	        bindingHandlers.data =
	        bindingHandlers.text =
	        bindingHandlers.html =
	        function(data, vmodels) {
	            parseExprProxy(data.value, vmodels, data)
	        }
	
	    bindingExecutors["if"] = function(val, elem, data) {
	            try {
	                if (!elem.parentNode) return
	            } catch (e) {
	                return
	            }
	            if (val) { //插回DOM树
	                if (elem.nodeType === 8) {
	                    elem.parentNode.replaceChild(data.template, elem)
	                    elem.ifRemove = null
	                        //   animate.enter(data.template, elem.parentNode)
	                    elem = data.element = data.template //这时可能为null
	                }
	                if (elem.getAttribute(data.name)) {
	                    elem.removeAttribute(data.name)
	                    scanAttr(elem, data.vmodels)
	                }
	                data.rollback = null
	            } else { //移出DOM树，并用注释节点占据原位置
	                if (elem.nodeType === 1) {
	                    var node = data.element = DOC.createComment("ms-if")
	                    elem.parentNode.replaceChild(node, elem)
	                    elem.ifRemove = node
	                        //     animate.leave(elem, node.parentNode, node)
	                    data.template = elem //元素节点
	                    ifGroup.appendChild(elem)
	                    data.rollback = function() {
	                        if (elem.parentNode === ifGroup) {
	                            ifGroup.removeChild(elem)
	                        }
	                    }
	                }
	            }
	        }
	        //ms-important绑定已经在scanTag 方法中实现
	        //ms-include绑定已由ms-attr绑定实现
	
	    var rdash = /\(([^)]*)\)/
	    bindingHandlers.on = function(data, vmodels) {
	        var value = data.value
	        data.type = "on"
	        var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
	        if (typeof bindingHandlers.on[eventType + "Hook"] === "function") {
	            bindingHandlers.on[eventType + "Hook"](data)
	        }
	        if (value.indexOf("(") > 0 && value.indexOf(")") > -1) {
	            var matched = (value.match(rdash) || ["", ""])[1].trim()
	            if (matched === "" || matched === "$event") { // aaa() aaa($event)当成aaa处理
	                value = value.replace(rdash, "")
	            }
	        }
	        parseExprProxy(value, vmodels, data)
	    }
	
	    bindingExecutors.on = function(callback, elem, data) {
	        callback = function(e) {
	            var fn = data.evaluator || noop
	            return fn.apply(this, data.args.concat(e))
	        }
	        var eventType = data.param.replace(/-\d+$/, "") // ms-on-mousemove-10
	        if (eventType === "scan") {
	            callback.call(elem, {
	                type: eventType
	            })
	        } else if (typeof data.specialBind === "function") {
	            data.specialBind(elem, callback)
	        } else {
	            var removeFn = avalon.bind(elem, eventType, callback)
	        }
	        data.rollback = function() {
	            if (typeof data.specialUnbind === "function") {
	                data.specialUnbind()
	            } else {
	                avalon.unbind(elem, eventType, removeFn)
	            }
	        }
	    }
	    bindingHandlers.repeat = function(data, vmodels) {
	        var type = data.type
	        parseExprProxy(data.value, vmodels, data, 1)
	        data.proxies = []
	        var freturn = false
	        try {
	            var $repeat = data.$repeat = data.evaluator.apply(0, data.args || [])
	            var xtype = avalon.type($repeat)
	            if (xtype !== "object" && xtype !== "array") {
	                freturn = true
	                avalon.log("warning:" + data.value + "只能是对象或数组")
	            } else {
	                data.xtype = xtype
	            }
	        } catch (e) {
	            freturn = true
	        }
	        var arr = data.value.split(".") || []
	        if (arr.length > 1) {
	            arr.pop()
	            var n = arr[0]
	            for (var i = 0, v; v = vmodels[i++];) {
	                if (v && v.hasOwnProperty(n)) {
	                    var events = v[n].$events || {}
	                    events[subscribers] = events[subscribers] || []
	                    events[subscribers].push(data)
	                    break
	                }
	            }
	        }
	
	        var oldHandler = data.handler
	        data.handler = noop
	        avalon.injectBinding(data)
	        data.handler = oldHandler
	
	        var elem = data.element
	        if (elem.nodeType === 1) {
	            elem.removeAttribute(data.name)
	            data.sortedCallback = getBindingCallback(elem, "data-with-sorted", vmodels)
	            data.renderedCallback = getBindingCallback(elem, "data-" + type + "-rendered", vmodels)
	            var signature = generateID(type)
	            var start = DOC.createComment(signature)
	            var end = DOC.createComment(signature + ":end")
	            data.signature = signature
	            data.template = avalonFragment.cloneNode(false)
	            if (type === "repeat") {
	                var parent = elem.parentNode
	                parent.replaceChild(end, elem)
	                parent.insertBefore(start, end)
	                data.template.appendChild(elem)
	            } else {
	                while (elem.firstChild) {
	                    data.template.appendChild(elem.firstChild)
	                }
	                elem.appendChild(start)
	                elem.appendChild(end)
	            }
	            data.element = end
	            data.handler = bindingExecutors.repeat
	            data.rollback = function() {
	                var elem = data.element
	                if (!elem)
	                    return
	                data.handler("clear")
	            }
	        }
	
	        if (freturn) {
	            return
	        }
	
	        data.$outer = {}
	        var check0 = "$key"
	        var check1 = "$val"
	        if (Array.isArray($repeat)) {
	            check0 = "$first"
	            check1 = "$last"
	        }
	
	        for (i = 0; v = vmodels[i++];) {
	            if (v.hasOwnProperty(check0) && v.hasOwnProperty(check1)) {
	                data.$outer = v
	                break
	            }
	        }
	        var $events = $repeat.$events
	        var $list = ($events || {})[subscribers]
	        injectDependency($list, data)
	        if (xtype === "object") {
	            data.handler("append")
	        } else if ($repeat.length) {
	            data.handler("add", 0, $repeat.length)
	        }
	    }
	
	    bindingExecutors.repeat = function(method, pos, el) {
	        var data = this
	        if (!method && data.xtype) {
	            var old = data.$repeat
	            var neo = data.evaluator.apply(0, data.args || [])
	
	            if (data.xtype === "array") {
	                if (old.length === neo.length) {
	                    if (old !== neo && old.length > 0) {
	                        bindingExecutors.repeat.call(this, 'clear', pos, el)
	                    } else {
	                        return
	                    }
	                }
	                method = "add"
	                pos = 0
	                data.$repeat = neo
	                el = neo.length
	            } else {
	                if (keysVM(old).join(";;") === keysVM(neo).join(";;")) {
	                    return
	                }
	                method = "append"
	                data.$repeat = neo
	            }
	        }
	        if (method) {
	            var start, fragment
	            var end = data.element
	            var comments = getComments(data)
	            var parent = end.parentNode
	            var proxies = data.proxies
	            var transation = avalonFragment.cloneNode(false)
	            switch (method) {
	                case "add": //在pos位置后添加el数组（pos为插入位置,el为要插入的个数）
	                    var n = pos + el
	                    var fragments = []
	                    for (var i = pos; i < n; i++) {
	                        var proxy = eachProxyAgent(i, data)
	                        proxies.splice(i, 0, proxy)
	                        shimController(data, transation, proxy, fragments)
	                    }
	                    parent.insertBefore(transation, comments[pos] || end)
	                    for (i = 0; fragment = fragments[i++];) {
	                        scanNodeArray(fragment.nodes, fragment.vmodels)
	                        fragment.nodes = fragment.vmodels = null
	                    }
	
	                    break
	                case "del": //将pos后的el个元素删掉(pos, el都是数字)
	                    sweepNodes(comments[pos], comments[pos + el] || end)
	                    var removed = proxies.splice(pos, el)
	                    recycleProxies(removed, "each")
	                    break
	                case "clear":
	                    start = comments[0]
	                    if (start) {
	                        sweepNodes(start, end)
	                        if (data.xtype === "object") {
	                            parent.insertBefore(start, end)
	                        } else {
	                            recycleProxies(proxies, "each")
	                        }
	                    }
	                    break
	                case "move":
	                    start = comments[0]
	                    if (start) {
	                        var signature = start.nodeValue
	                        var rooms = []
	                        var room = [],
	                            node
	                        sweepNodes(start, end, function() {
	                            room.unshift(this)
	                            if (this.nodeValue === signature) {
	                                rooms.unshift(room)
	                                room = []
	                            }
	                        })
	                        sortByIndex(rooms, pos)
	                        sortByIndex(proxies, pos)
	                        while (room = rooms.shift()) {
	                            while (node = room.shift()) {
	                                transation.appendChild(node)
	                            }
	                        }
	                        parent.insertBefore(transation, end)
	                    }
	                    break
	                case "index": //将proxies中的第pos个起的所有元素重新索引
	                    var last = proxies.length - 1
	                    for (; el = proxies[pos]; pos++) {
	                        el.$index = pos
	                        el.$first = pos === 0
	                        el.$last = pos === last
	                    }
	                    return
	                case "set": //将proxies中的第pos个元素的VM设置为el（pos为数字，el任意）
	                    proxy = proxies[pos]
	                    if (proxy) {
	                        fireDependencies(proxy.$events[data.param || "el"])
	                    }
	                    break
	                case "append":
	                    var object = data.$repeat //原来第2参数， 被循环对象
	                    var pool = Array.isArray(proxies) || !proxies ? {} : proxies //代理对象组成的hash
	                    data.proxies = pool
	                    var keys = []
	                    fragments = []
	                    for (var key in pool) {
	                        if (!object.hasOwnProperty(key)) {
	                            proxyRecycler(pool[key], withProxyPool) //去掉之前的代理VM
	                            delete(pool[key])
	                        }
	                    }
	                    for (key in object) { //得到所有键名
	                        if (object.hasOwnProperty(key) && key !== "hasOwnProperty") {
	                            keys.push(key)
	                        }
	                    }
	                    if (data.sortedCallback) { //如果有回调，则让它们排序
	                        var keys2 = data.sortedCallback.call(parent, keys)
	                        if (keys2 && Array.isArray(keys2) && keys2.length) {
	                            keys = keys2
	                        }
	                    }
	                    for (i = 0; key = keys[i++];) {
	                        if (key !== "hasOwnProperty") {
	                            pool[key] = withProxyAgent(pool[key], key, data)
	                            shimController(data, transation, pool[key], fragments)
	                        }
	                    }
	
	                    parent.insertBefore(transation, end)
	                    for (i = 0; fragment = fragments[i++];) {
	                        scanNodeArray(fragment.nodes, fragment.vmodels)
	                        fragment.nodes = fragment.vmodels = null
	                    }
	                    break
	            }
	            if (!data.$repeat || data.$repeat.hasOwnProperty("$lock")) //IE6-8 VBScript对象会报错, 有时候data.$repeat不存在
	                return
	            if (method === "clear")
	                method = "del"
	            var callback = data.renderedCallback || noop,
	                args = arguments
	            if (parent.oldValue && parent.tagName === "SELECT") { //fix #503
	                avalon(parent).val(parent.oldValue.split(","))
	            }
	            callback.apply(parent, args)
	        }
	    }
	    "with,each".replace(rword, function(name) {
	        bindingHandlers[name] = bindingHandlers.repeat
	    })
	
	    function shimController(data, transation, proxy, fragments) {
	        var content = data.template.cloneNode(true)
	        var nodes = avalon.slice(content.childNodes)
	        content.insertBefore(DOC.createComment(data.signature), content.firstChild)
	        transation.appendChild(content)
	        var nv = [proxy].concat(data.vmodels)
	        var fragment = {
	            nodes: nodes,
	            vmodels: nv
	        }
	        fragments.push(fragment)
	    }
	
	    function getComments(data) {
	        var ret = []
	        var nodes = data.element.parentNode.childNodes
	        for (var i = 0, node; node = nodes[i++];) {
	            if (node.nodeValue === data.signature) {
	                ret.push(node)
	            } else if (node.nodeValue === data.signature + ":end") {
	                break
	            }
	        }
	        return ret
	    }
	
	
	    //移除掉start与end之间的节点(保留end)
	    function sweepNodes(start, end, callback) {
	        while (true) {
	            var node = end.previousSibling
	            if (!node)
	                break
	            node.parentNode.removeChild(node)
	            callback && callback.call(node)
	            if (node === start) {
	                break
	            }
	        }
	    }
	
	    // 为ms-each,ms-with, ms-repeat会创建一个代理VM，
	    // 通过它们保持一个下上文，让用户能调用$index,$first,$last,$remove,$key,$val,$outer等属性与方法
	    // 所有代理VM的产生,消费,收集,存放通过xxxProxyFactory,xxxProxyAgent, recycleProxies,xxxProxyPool实现
	    var withProxyPool = []
	
	    function withProxyFactory() {
	        var proxy = modelFactory({
	            $key: "",
	            $outer: {},
	            $host: {},
	            $val: {
	                get: function() {
	                    return this.$host[this.$key]
	                },
	                set: function(val) {
	                    this.$host[this.$key] = val
	                }
	            }
	        }, {
	            $val: 1
	        })
	        proxy.$id = generateID("$proxy$with")
	        return proxy
	    }
	
	    function withProxyAgent(proxy, key, data) {
	        proxy = proxy || withProxyPool.pop()
	        if (!proxy) {
	            proxy = withProxyFactory()
	        } else {
	            proxy.$reinitialize()
	        }
	        var host = data.$repeat
	        proxy.$key = key
	
	        proxy.$host = host
	        proxy.$outer = data.$outer
	        if (host.$events) {
	            proxy.$events.$val = host.$events[key]
	        } else {
	            proxy.$events = {}
	        }
	        return proxy
	    }
	
	
	    function recycleProxies(proxies) {
	        eachProxyRecycler(proxies)
	    }
	
	    function eachProxyRecycler(proxies) {
	        proxies.forEach(function(proxy) {
	            proxyRecycler(proxy, eachProxyPool)
	        })
	        proxies.length = 0
	    }
	
	
	    var eachProxyPool = []
	
	    function eachProxyFactory(name) {
	        var source = {
	            $host: [],
	            $outer: {},
	            $index: 0,
	            $first: false,
	            $last: false,
	            $remove: avalon.noop
	        }
	        source[name] = {
	            get: function() {
	                var e = this.$events
	                var array = e.$index
	                e.$index = e[name] //#817 通过$index为el收集依赖
	                try {
	                    return this.$host[this.$index]
	                } finally {
	                    e.$index = array
	                }
	            },
	            set: function(val) {
	                try {
	                    var e = this.$events
	                    var array = e.$index
	                    e.$index = []
	                    this.$host.set(this.$index, val)
	                } finally {
	                    e.$index = array
	                }
	            }
	        }
	        var second = {
	            $last: 1,
	            $first: 1,
	            $index: 1
	        }
	        var proxy = modelFactory(source, second)
	        proxy.$id = generateID("$proxy$each")
	        return proxy
	    }
	
	    function eachProxyAgent(index, data) {
	        var param = data.param || "el",
	            proxy
	        for (var i = 0, n = eachProxyPool.length; i < n; i++) {
	            var candidate = eachProxyPool[i]
	            if (candidate && candidate.hasOwnProperty(param)) {
	                proxy = candidate
	                eachProxyPool.splice(i, 1)
	            }
	        }
	        if (!proxy) {
	            proxy = eachProxyFactory(param)
	        }
	        var host = data.$repeat
	        var last = host.length - 1
	        proxy.$index = index
	        proxy.$first = index === 0
	        proxy.$last = index === last
	        proxy.$host = host
	        proxy.$outer = data.$outer
	        proxy.$remove = function() {
	            return host.removeAt(proxy.$index)
	        }
	        return proxy
	    }
	
	
	    function proxyRecycler(proxy, proxyPool) {
	        for (var i in proxy.$events) {
	            var arr = proxy.$events[i]
	            if (Array.isArray(arr)) {
	                arr.forEach(function(data) {
	                        if (typeof data === "object")
	                            disposeData(data)
	                    }) // jshint ignore:line
	                arr.length = 0
	            }
	        }
	        proxy.$host = proxy.$outer = {}
	        if (proxyPool.unshift(proxy) > kernel.maxRepeatSize) {
	            proxyPool.pop()
	        }
	    }
	
	    /*********************************************************************
	     *                         各种指令                                  *
	     **********************************************************************/
	    //ms-skip绑定已经在scanTag 方法中实现
	    // bindingHandlers.text 定义在if.js
	    bindingExecutors.text = function(val, elem) {
	        val = val == null ? "" : val //不在页面上显示undefined null
	        if (elem.nodeType === 3) { //绑定在文本节点上
	            try { //IE对游离于DOM树外的节点赋值会报错
	                elem.data = val
	            } catch (e) {}
	        } else { //绑定在特性节点上
	            if ("textContent" in elem) {
	                elem.textContent = val
	            } else {
	                elem.innerText = val
	            }
	        }
	    }
	
	    function parseDisplay(nodeName, val) {
	        //用于取得此类标签的默认display值
	        var key = "_" + nodeName
	        if (!parseDisplay[key]) {
	            var node = DOC.createElement(nodeName)
	            root.appendChild(node)
	            if (W3C) {
	                val = getComputedStyle(node, null).display
	            } else {
	                val = node.currentStyle.display
	            }
	            root.removeChild(node)
	            parseDisplay[key] = val
	        }
	        return parseDisplay[key]
	    }
	
	    avalon.parseDisplay = parseDisplay
	
	    bindingHandlers.visible = function(data, vmodels) {
	        parseExprProxy(data.value, vmodels, data)
	    }
	
	    bindingExecutors.visible = function(val, elem, binding) {
	        if (val) {
	            elem.style.display = binding.display || ""
	            if (avalon(elem).css("display") === "none") {
	                elem.style.display = binding.display = parseDisplay(elem.nodeName)
	            }
	        } else {
	            elem.style.display = "none"
	        }
	    }
	    bindingHandlers.widget = function(data, vmodels) {
	        var args = data.value.match(rword)
	        var elem = data.element
	        var widget = args[0]
	        var id = args[1]
	        if (!id || id === "$") { //没有定义或为$时，取组件名+随机数
	            id = generateID(widget)
	        }
	        var optName = args[2] || widget //没有定义，取组件名
	        var constructor = avalon.ui[widget]
	        if (typeof constructor === "function") { //ms-widget="tabs,tabsAAA,optname"
	            vmodels = elem.vmodels || vmodels
	            for (var i = 0, v; v = vmodels[i++];) {
	                if (v.hasOwnProperty(optName) && typeof v[optName] === "object") {
	                    var vmOptions = v[optName]
	                    vmOptions = vmOptions.$model || vmOptions
	                    break
	                }
	            }
	            if (vmOptions) {
	                var wid = vmOptions[widget + "Id"]
	                if (typeof wid === "string") {
	                    log("warning!不再支持" + widget + "Id")
	                    id = wid
	                }
	            }
	            //抽取data-tooltip-text、data-tooltip-attr属性，组成一个配置对象
	            var widgetData = avalon.getWidgetData(elem, widget)
	            data.value = [widget, id, optName].join(",")
	            data[widget + "Id"] = id
	            data.evaluator = noop
	            elem.msData["ms-widget-id"] = id
	            var options = data[widget + "Options"] = avalon.mix({}, constructor.defaults, vmOptions || {}, widgetData)
	            elem.removeAttribute("ms-widget")
	            var vmodel = constructor(elem, data, vmodels) || {} //防止组件不返回VM
	            if (vmodel.$id) {
	                avalon.vmodels[id] = vmodel
	                createSignalTower(elem, vmodel)
	                try {
	                    vmodel.$init(function() {
	                        avalon.scan(elem, [vmodel].concat(vmodels))
	                        if (typeof options.onInit === "function") {
	                            options.onInit.call(elem, vmodel, options, vmodels)
	                        }
	                    })
	                } catch (e) {
	                    log(e)
	                }
	                data.rollback = function() {
	                    try {
	                        vmodel.$remove()
	                        vmodel.widgetElement = null // 放到$remove后边
	                    } catch (e) {}
	                    elem.msData = {}
	                    delete avalon.vmodels[vmodel.$id]
	                }
	                injectDisposeQueue(data, widgetList)
	                if (window.chrome) {
	                    elem.addEventListener("DOMNodeRemovedFromDocument", function() {
	                        setTimeout(rejectDisposeQueue)
	                    })
	                }
	            } else {
	                avalon.scan(elem, vmodels)
	            }
	        } else if (vmodels.length) { //如果该组件还没有加载，那么保存当前的vmodels
	            elem.vmodels = vmodels
	        }
	    }
	    var widgetList = []
	        //不存在 bindingExecutors.widget
	        /*********************************************************************
	         *                             自带过滤器                            *
	         **********************************************************************/
	    var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
	    var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
	    var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
	    var rsanitize = {
	        a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	        img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	        form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	    }
	    var rsurrogate = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
	    var rnoalphanumeric = /([^\#-~| |!])/g;
	
	    function numberFormat(number, decimals, point, thousands) {
	        //form http://phpjs.org/functions/number_format/
	        //number	必需，要格式化的数字
	        //decimals	可选，规定多少个小数位。
	        //point	可选，规定用作小数点的字符串（默认为 . ）。
	        //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	        number = (number + '')
	            .replace(/[^0-9+\-Ee.]/g, '')
	        var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = thousands || ",",
	            dec = point || ".",
	            s = '',
	            toFixedFix = function(n, prec) {
	                var k = Math.pow(10, prec)
	                return '' + (Math.round(n * k) / k)
	                    .toFixed(prec)
	            }
	            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	            .split('.')
	        if (s[0].length > 3) {
	            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	        }
	        if ((s[1] || '')
	            .length < prec) {
	            s[1] = s[1] || ''
	            s[1] += new Array(prec - s[1].length + 1)
	                .join('0')
	        }
	        return s.join(dec)
	    }
	
	
	    var filters = avalon.filters = {
	            uppercase: function(str) {
	                return str.toUpperCase()
	            },
	            lowercase: function(str) {
	                return str.toLowerCase()
	            },
	            truncate: function(str, length, truncation) {
	                //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	                length = length || 30
	                truncation = typeof truncation === "string" ? truncation : "..."
	                return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
	            },
	            $filter: function(val) {
	                for (var i = 1, n = arguments.length; i < n; i++) {
	                    var array = arguments[i]
	                    var fn = avalon.filters[array[0]]
	                    if (typeof fn === "function") {
	                        var arr = [val].concat(array.slice(1))
	                        val = fn.apply(null, arr)
	                    }
	                }
	                return val
	            },
	            camelize: camelize,
	            //https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	            //    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	            //    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	            //    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	            //    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	            //    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	            sanitize: function(str) {
	                return str.replace(rscripts, "").replace(ropen, function(a, b) {
	                    var match = a.toLowerCase().match(/<(\w+)\s/)
	                    if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
	                        var reg = rsanitize[match[1]]
	                        if (reg) {
	                            a = a.replace(reg, function(s, name, value) {
	                                var quote = value.charAt(0)
	                                return name + "=" + quote + "javascript:void(0)" + quote // jshint ignore:line
	                            })
	                        }
	                    }
	                    return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
	                })
	            },
	            escape: function(str) {
	                //将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
	                return String(str).
	                replace(/&/g, '&amp;').
	                replace(rsurrogate, function(value) {
	                    var hi = value.charCodeAt(0)
	                    var low = value.charCodeAt(1)
	                    return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
	                }).
	                replace(rnoalphanumeric, function(value) {
	                    return '&#' + value.charCodeAt(0) + ';'
	                }).
	                replace(/</g, '&lt;').
	                replace(/>/g, '&gt;')
	            },
	            currency: function(amount, symbol, fractionSize) {
	                return (symbol || "\uFFE5") + numberFormat(amount, isFinite(fractionSize) ? fractionSize : 2)
	            },
	            number: numberFormat
	        }
	        /*
	         'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	         'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	         'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	         'MMMM': Month in year (January-December)
	         'MMM': Month in year (Jan-Dec)
	         'MM': Month in year, padded (01-12)
	         'M': Month in year (1-12)
	         'dd': Day in month, padded (01-31)
	         'd': Day in month (1-31)
	         'EEEE': Day in Week,(Sunday-Saturday)
	         'EEE': Day in Week, (Sun-Sat)
	         'HH': Hour in day, padded (00-23)
	         'H': Hour in day (0-23)
	         'hh': Hour in am/pm, padded (01-12)
	         'h': Hour in am/pm, (1-12)
	         'mm': Minute in hour, padded (00-59)
	         'm': Minute in hour (0-59)
	         'ss': Second in minute, padded (00-59)
	         's': Second in minute (0-59)
	         'a': am/pm marker
	         'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	         format string can also be one of the following predefined localizable formats:
	         
	         'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	         'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	         'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	         'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	         'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	         'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	         'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	         'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	         */
	    new function() { // jshint ignore:line
	        function toInt(str) {
	            return parseInt(str, 10) || 0
	        }
	
	        function padNumber(num, digits, trim) {
	            var neg = ""
	            if (num < 0) {
	                neg = '-'
	                num = -num
	            }
	            num = "" + num
	            while (num.length < digits)
	                num = "0" + num
	            if (trim)
	                num = num.substr(num.length - digits)
	            return neg + num
	        }
	
	        function dateGetter(name, size, offset, trim) {
	            return function(date) {
	                var value = date["get" + name]()
	                if (offset > 0 || value > -offset)
	                    value += offset
	                if (value === 0 && offset === -12) {
	                    value = 12
	                }
	                return padNumber(value, size, trim)
	            }
	        }
	
	        function dateStrGetter(name, shortForm) {
	            return function(date, formats) {
	                var value = date["get" + name]()
	                var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
	                return formats[get][value]
	            }
	        }
	
	        function timeZoneGetter(date) {
	            var zone = -1 * date.getTimezoneOffset()
	            var paddedZone = (zone >= 0) ? "+" : ""
	            paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
	            return paddedZone
	        }
	        //取得上午下午
	
	        function ampmGetter(date, formats) {
	            return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
	        }
	        var DATE_FORMATS = {
	            yyyy: dateGetter("FullYear", 4),
	            yy: dateGetter("FullYear", 2, 0, true),
	            y: dateGetter("FullYear", 1),
	            MMMM: dateStrGetter("Month"),
	            MMM: dateStrGetter("Month", true),
	            MM: dateGetter("Month", 2, 1),
	            M: dateGetter("Month", 1, 1),
	            dd: dateGetter("Date", 2),
	            d: dateGetter("Date", 1),
	            HH: dateGetter("Hours", 2),
	            H: dateGetter("Hours", 1),
	            hh: dateGetter("Hours", 2, -12),
	            h: dateGetter("Hours", 1, -12),
	            mm: dateGetter("Minutes", 2),
	            m: dateGetter("Minutes", 1),
	            ss: dateGetter("Seconds", 2),
	            s: dateGetter("Seconds", 1),
	            sss: dateGetter("Milliseconds", 3),
	            EEEE: dateStrGetter("Day"),
	            EEE: dateStrGetter("Day", true),
	            a: ampmGetter,
	            Z: timeZoneGetter
	        }
	        var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
	        var raspnetjson = /^\/Date\((\d+)\)\/$/
	        filters.date = function(date, format) {
	            var locate = filters.date.locate,
	                text = "",
	                parts = [],
	                fn, match
	            format = format || "mediumDate"
	            format = locate[format] || format
	            if (typeof date === "string") {
	                if (/^\d+$/.test(date)) {
	                    date = toInt(date)
	                } else if (raspnetjson.test(date)) {
	                    date = +RegExp.$1
	                } else {
	                    var trimDate = date.trim()
	                    var dateArray = [0, 0, 0, 0, 0, 0, 0]
	                    var oDate = new Date(0)
	                        //取得年月日
	                    trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function(_, a, b, c) {
	                        var array = c.length === 4 ? [c, a, b] : [a, b, c]
	                        dateArray[0] = toInt(array[0]) //年
	                        dateArray[1] = toInt(array[1]) - 1 //月
	                        dateArray[2] = toInt(array[2]) //日
	                        return ""
	                    })
	                    var dateSetter = oDate.setFullYear
	                    var timeSetter = oDate.setHours
	                    trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function(_, a, b, c, d) {
	                        dateArray[3] = toInt(a) //小时
	                        dateArray[4] = toInt(b) //分钟
	                        dateArray[5] = toInt(c) //秒
	                        if (d) { //毫秒
	                            dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
	                        }
	                        return ""
	                    })
	                    var tzHour = 0
	                    var tzMin = 0
	                    trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function(z, symbol, c, d) {
	                        dateSetter = oDate.setUTCFullYear
	                        timeSetter = oDate.setUTCHours
	                        if (symbol) {
	                            tzHour = toInt(symbol + c)
	                            tzMin = toInt(symbol + d)
	                        }
	                        return ""
	                    })
	
	                    dateArray[3] -= tzHour
	                    dateArray[4] -= tzMin
	                    dateSetter.apply(oDate, dateArray.slice(0, 3))
	                    timeSetter.apply(oDate, dateArray.slice(3))
	                    date = oDate
	                }
	            }
	            if (typeof date === "number") {
	                date = new Date(date)
	            }
	            if (avalon.type(date) !== "date") {
	                return
	            }
	            while (format) {
	                match = rdateFormat.exec(format)
	                if (match) {
	                    parts = parts.concat(match.slice(1))
	                    format = parts.pop()
	                } else {
	                    parts.push(format)
	                    format = null
	                }
	            }
	            parts.forEach(function(value) {
	                fn = DATE_FORMATS[value]
	                text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
	            })
	            return text
	        }
	        var locate = {
	            AMPMS: {
	                0: "上午",
	                1: "下午"
	            },
	            DAY: {
	                0: "星期日",
	                1: "星期一",
	                2: "星期二",
	                3: "星期三",
	                4: "星期四",
	                5: "星期五",
	                6: "星期六"
	            },
	            MONTH: {
	                0: "1月",
	                1: "2月",
	                2: "3月",
	                3: "4月",
	                4: "5月",
	                5: "6月",
	                6: "7月",
	                7: "8月",
	                8: "9月",
	                9: "10月",
	                10: "11月",
	                11: "12月"
	            },
	            SHORTDAY: {
	                "0": "周日",
	                "1": "周一",
	                "2": "周二",
	                "3": "周三",
	                "4": "周四",
	                "5": "周五",
	                "6": "周六"
	            },
	            fullDate: "y年M月d日EEEE",
	            longDate: "y年M月d日",
	            medium: "yyyy-M-d H:mm:ss",
	            mediumDate: "yyyy-M-d",
	            mediumTime: "H:mm:ss",
	            "short": "yy-M-d ah:mm",
	            shortDate: "yy-M-d",
	            shortTime: "ah:mm"
	        }
	        locate.SHORTMONTH = locate.MONTH
	        filters.date.locate = locate
	    } // jshint ignore:line
	    /*********************************************************************
	     *                     END                                  *
	     **********************************************************************/
	    new function() {
	        avalon.config({
	            loader: false
	        })
	        var fns = [],
	            loaded = DOC.readyState === "complete",
	            fn
	
	        function flush(f) {
	            loaded = 1
	            while (f = fns.shift())
	                f()
	        }
	
	        avalon.bind(DOC, "DOMContentLoaded", fn = function() {
	            avalon.unbind(DOC, "DOMContentLoaded", fn)
	            flush()
	        })
	
	        var id = setInterval(function() {
	            if (document.readyState === "complete" && document.body) {
	                clearInterval(id)
	                flush()
	            }
	        }, 50)
	
	        avalon.ready = function(fn) {
	            loaded ? fn(avalon) : fns.push(fn)
	        }
	        avalon.ready(function() {
	            avalon.scan(DOC.body)
	        })
	    }
	    // Register as a named AMD module, since avalon can be concatenated with other
	    // files that may use define, but not via a proper concatenation script that
	    // understands anonymous AMD modules. A named AMD is safest and most robust
	    // way to register. Lowercase avalon is used because AMD module names are
	    // derived from file names, and Avalon is normally delivered in a lowercase
	    // file name. Do this after creating the global so that if an AMD module wants
	    // to call noConflict to hide this version of avalon, it will work.
	
	    // Note that for maximum portability, libraries that are not avalon should
	    // declare themselves as anonymous modules, and avoid setting a global if an
	    // AMD loader is present. avalon is a special case. For more information, see
	    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return avalon
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	    }
	    // Map over avalon in case of overwrite
	    var _avalon = window.avalon
	    avalon.noConflict = function(deep) {
	            if (deep && window.avalon === avalon) {
	                window.avalon = _avalon
	            }
	            return avalon
	        }
	        // Expose avalon identifiers, even in AMD
	        // and CommonJS for browser emulators
	    if (noGlobal === void 0) {
	        window.avalon = avalon
	    }
	
	    return avalon
	
	}));

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//=========================================
	//  数据交互模块 by 司徒正美
	//==========================================
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var global = window || (0, eval)("this")
	    var DOC = global.document
	    var encode = encodeURIComponent
	    var decode = decodeURIComponent
	
	    var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
	    var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg
	    var rnoContent = /^(?:GET|HEAD)$/
	    var rprotocol = /^\/\//
	    var rhash = /#.*$/
	    var rquery = /\?/
	    var rjsonp = /(=)\?(?=&|$)|\?\?/
	    var r20 = /%20/g
	
	    var originAnchor = document.createElement("a")
	    originAnchor.href = location.href
	    //告诉WEB服务器自己接受什么介质类型，*/* 表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
	    var accepts = {
	        xml: "application/xml, text/xml",
	        html: "text/html",
	        text: "text/plain",
	        json: "application/json, text/javascript",
	        script: "text/javascript, application/javascript",
	        "*": ["*/"] + ["*"] //避免被压缩掉
	    }
	
	    function IE() {
	        if (window.VBArray) {
	            var mode = document.documentMode
	            return mode ? mode : window.XMLHttpRequest ? 7 : 6
	        } else {
	            return 0
	        }
	    }
	    var useOnload = IE() === 0 || IE() > 8
	
	    function parseJS(code) {
	        var indirect = eval
	        code = code.trim()
	        if (code) {
	            if (code.indexOf("use strict") === 1) {
	                var script = document.createElement("script")
	                script.text = code
	                head.appendChild(script).parentNode.removeChild(script)
	            } else {
	                indirect(code)
	            }
	        }
	    }
	
	    if (!String.prototype.startsWith) {
	        String.prototype.startsWith = function(searchString, position) {
	            position = position || 0
	            return this.lastIndexOf(searchString, position) === position
	        }
	    }
	
	    var head = DOC.getElementsByTagName("head")[0] //HEAD元素
	    var isLocal = false
	    try {
	        //在IE下如果重置了document.domain，直接访问window.location会抛错，但用document.URL就ok了
	        //http://www.cnblogs.com/WuQiang/archive/2012/09/21/2697474.html
	        isLocal = rlocalProtocol.test(location.protocol)
	    } catch (e) {}
	
	    new function() {
	        //http://www.cnblogs.com/rubylouvre/archive/2010/04/20/1716486.html
	        var s = ["XMLHttpRequest",
	            "ActiveXObject('MSXML2.XMLHTTP.6.0')",
	            "ActiveXObject('MSXML2.XMLHTTP.3.0')",
	            "ActiveXObject('MSXML2.XMLHTTP')",
	            "ActiveXObject('Microsoft.XMLHTTP')"
	        ]
	        s[0] = IE() < 8 && IE() !== 0 && isLocal ? "!" : s[0] //IE下只能使用ActiveXObject
	        for (var i = 0, axo; axo = s[i++];) {
	            try {
	                if (eval("new " + axo)) {
	                    avalon.xhr = new Function("return new " + axo)
	                    break
	                }
	            } catch (e) {}
	        }}
	    var supportCors = "withCredentials" in avalon.xhr()
	
	
	
	
	    function parseXML(data, xml, tmp) {
	        try {
	            var mode = document.documentMode
	            if (window.DOMParser && (!mode || mode > 8)) { // Standard
	                tmp = new DOMParser()
	                xml = tmp.parseFromString(data, "text/xml")
	            } else { // IE
	                xml = new ActiveXObject("Microsoft.XMLDOM") //"Microsoft.XMLDOM"
	                xml.async = "false"
	                xml.loadXML(data)
	            }
	        } catch (e) {
	            xml = void 0
	        }
	        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
	            avalon.error("Invalid XML: " + data)
	        }
	        return xml
	    }
	
	    //ajaxExtend是一个非常重要的内部方法，负责将用法参数进行规整化
	    //1. data转换为字符串
	    //2. type转换为大写
	    //3. url正常化，加querystring, 加时间戮
	    //4. 判定有没有跨域
	    //5. 添加hasContent参数
	    var defaults = {
	        type: "GET",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        async: true,
	        jsonp: "callback"
	    }
	    function ajaxExtend(opts) {
	        opts = avalon.mix({}, defaults, opts)
	        opts.type = opts.type.toUpperCase()
	        var querystring = typeof opts.data === "string" ? opts.data : avalon.param(opts.data)
	        opts.querystring = querystring || ""
	        opts.url = opts.url.replace(rhash, "").replace(rprotocol, location.protocol + "//")
	
	        if (typeof opts.crossDomain !== "boolean") { //判定是否跨域
	            var urlAnchor = document.createElement("a")
	            // Support: IE6-11+
	            // IE throws exception if url is malformed, e.g. http://example.com:80x/
	            try {
	                urlAnchor.href = opts.url
	                // in IE7-, get the absolute path
	                var absUrl = !"1"[0] ? urlAnchor.getAttribute("href", 4) : urlAnchor.href
	                urlAnchor.href = absUrl
	                opts.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
	            } catch (e) {
	                opts.crossDomain = true
	            }
	        }
	        opts.hasContent = !rnoContent.test(opts.type) //是否为post请求
	        if (!opts.hasContent) {
	            if (querystring) { //如果为GET请求,则参数依附于url上
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + querystring
	            }
	            if (opts.cache === false) { //添加时间截
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + "_time=" + (new Date() - 0)
	            }
	        }
	        return opts
	    }
	    /**
	     * 伪XMLHttpRequest类,用于屏蔽浏览器差异性
	     * var ajax = new(self.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP")
	     * ajax.onreadystatechange = function(){
	     *   if (ajax.readyState==4 && ajax.status==200){
	     *        alert(ajax.responseText)
	     *   }
	     * }
	     * ajax.open("POST", url, true) 
	     * ajax.send("key=val&key1=val2") 
	     */
	    var XHRMethods = {
	        setRequestHeader: function(name, value) {
	            this.requestHeaders[name] = value
	            return this
	        },
	        getAllResponseHeaders: function() {
	            return this.readyState === 4 ? this.responseHeadersString : null
	        },
	        getResponseHeader: function(name, match) {
	            if (this.readyState === 4) {
	                while ((match = rheaders.exec(this.responseHeadersString))) {
	                    this.responseHeaders[match[1]] = match[2]
	                }
	                match = this.responseHeaders[name]
	            }
	            return match === undefined ? null : match
	        },
	        overrideMimeType: function(type) {
	            this.mimeType = type
	            return this
	        },
	        // 中止请求
	        abort: function(statusText) {
	            statusText = statusText || "abort"
	            if (this.transport) {
	                this.respond(0, statusText)
	            }
	            return this
	        },
	        /**
	         * 用于派发success,error,complete等回调
	         * http://www.cnblogs.com/rubylouvre/archive/2011/05/18/2049989.html
	         * @param {Number} status 状态码
	         * @param {String} statusText 对应的扼要描述
	         */
	        dispatch: function(status, nativeStatusText) {
	            var statusText = nativeStatusText
	            // 只能执行一次，防止重复执行
	            if (!this.transport) { //2:已执行回调
	                return
	            }
	            this.readyState = 4
	            var isSuccess = status >= 200 && status < 300 || status === 304
	            if (isSuccess) {
	                if (status === 204) {
	                    statusText = "nocontent"
	                } else if (status === 304) {
	                    statusText = "notmodified"
	                } else {
	                    //如果浏览器能直接返回转换好的数据就最好不过,否则需要手动转换
	                    if (typeof this.response === "undefined") {
	                        var dataType = this.options.dataType || this.options.mimeType
	                        if (!dataType && this.responseText || this.responseXML) { //如果没有指定dataType，则根据mimeType或Content-Type进行揣测
	                            dataType = this.getResponseHeader("Content-Type") || ""
	                            dataType = dataType.match(/json|xml|script|html/) || ["text"]
	                            dataType = dataType[0]
	                        }
	                        var responseText = this.responseText || '',
	                            responseXML = this.responseXML || ''
	                        try {
	                            this.response = avalon.ajaxConverters[dataType].call(this, responseText, responseXML)
	                        } catch (e) {
	                            isSuccess = false
	                            this.error = e
	                            statusText = "parsererror"
	                        }
	                    }
	                }
	            }
	            this.status = status
	            this.statusText = statusText + ""
	            if (this.timeoutID) {
	                clearTimeout(this.timeoutID)
	                delete this.timeoutID
	            }
	            this._transport = this.transport
	            // 到这要么成功，调用success, 要么失败，调用 error, 最终都会调用 complete
	            if (isSuccess) {
	                this._resolve([this.response, statusText, this])
	            } else {
	                this._reject([this, statusText, this.error])
	            }
	            delete this.transport
	        }
	    }
	    //ajax主函数
	    avalon.ajax = function(opts, promise) {
	        if (!opts || !opts.url) {
	            avalon.error("参数必须为Object并且拥有url属性")
	        }
	        opts = ajaxExtend(opts) //处理用户参数，比如生成querystring, type大写化
	        //创建一个伪XMLHttpRequest,能处理complete,success,error等多投事件
	        var XHRProperties = {
	            responseHeadersString: "",
	            responseHeaders: {},
	            requestHeaders: {},
	            querystring: opts.querystring,
	            readyState: 0,
	            uniqueID: ("" + Math.random()).replace(/0\./, ""),
	            status: 0
	        }
	        var _reject, _resolve
	        var promise = new avalon.Promise(function(resolve, reject) {
	            _resolve = resolve
	            _reject = reject
	        })
	
	        promise.options = opts
	        promise._reject = _reject
	        promise._resolve = _resolve
	
	        var doneList = [],
	            failList = []
	
	        Array("done", "fail", "always").forEach(function(method) {
	            promise[method] = function(fn) {
	                if (typeof fn === "function") {
	                    if (method !== "fail")
	                        doneList.push(fn)
	                    if (method !== "done")
	                        failList.push(fn)
	                }
	                return this
	            }
	        })
	
	        var isSync = opts.async === false
	        if (isSync) {
	            avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃")
	            promise.async = false
	        }
	
	
	        avalon.mix(promise, XHRProperties, XHRMethods)
	
	        promise.then(function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = doneList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        }, function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = failList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        })
	
	
	        promise.done(opts.success).fail(opts.error).always(opts.complete)
	
	        var dataType = opts.dataType //目标返回数据类型
	        var transports = avalon.ajaxTransports
	
	        if ((opts.crossDomain && !supportCors || rjsonp.test(opts.url)) && dataType === "json" && opts.type === "GET") {
	            dataType = opts.dataType = "jsonp"
	        }
	        var name = opts.form ? "upload" : dataType
	        var transport = transports[name] || transports.xhr
	        avalon.mix(promise, transport) //取得传送器的request, respond, preproccess
	        if (promise.preproccess) { //这用于jsonp upload传送器
	            dataType = promise.preproccess() || dataType
	        }
	        //设置首部 1、Content-Type首部
	        if (opts.contentType) {
	            promise.setRequestHeader("Content-Type", opts.contentType)
	        }
	        //2.处理Accept首部
	        promise.setRequestHeader("Accept", accepts[dataType] ? accepts[dataType] + ", */*; q=0.01" : accepts["*"])
	        for (var i in opts.headers) { //3. 处理headers里面的首部
	            promise.setRequestHeader(i, opts.headers[i])
	        }
	        // 4.处理超时
	        if (opts.async && opts.timeout > 0) {
	            promise.timeoutID = setTimeout(function() {
	                promise.abort("timeout")
	                promise.dispatch(0, "timeout")
	            }, opts.timeout)
	        }
	        promise.request()
	        return promise
	    }
	    "get,post".replace(avalon.rword, function(method) {
	        avalon[method] = function(url, data, callback, type) {
	            if (typeof data === "function") {
	                type = type || callback
	                callback = data
	                data = void 0
	            }
	            return avalon.ajax({
	                type: method,
	                url: url,
	                data: data,
	                success: callback,
	                dataType: type
	            })
	        }
	    })
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }
	    avalon.getScript = function(url, callback) {
	        return avalon.get(url, null, callback, "script")
	    }
	    avalon.getJSON = function(url, data, callback) {
	        return avalon.get(url, data, callback, "json")
	    }
	    avalon.upload = function(url, form, data, callback, dataType) {
	        if (typeof data === "function") {
	            dataType = callback
	            callback = data
	            data = void 0
	        }
	        return avalon.ajax({
	            url: url,
	            type: "post",
	            dataType: dataType,
	            form: form,
	            data: data,
	            success: callback
	        })
	    }
	    avalon.ajaxConverters = { //转换器，返回用户想要做的数据
	        text: function(text) {
	            // return text || "";
	            return text
	        },
	        xml: function(text, xml) {
	            return xml !== void 0 ? xml : parseXML(text)
	        },
	        html: function(text) {
	            return avalon.parseHTML(text) //一个文档碎片,方便直接插入DOM树
	        },
	        json: function(text) {
	            if (!avalon.parseJSON) {
	                avalon.log("avalon.parseJSON不存在,请升级到最新版")
	            }
	            return avalon.parseJSON(text)
	        },
	        script: function(text) {
	            parseJS(text)
	            return text
	        },
	        jsonp: function() {
	            var json, callbackName
	            if (this.jsonpCallback.startsWith('avalon.')) {
	                callbackName = this.jsonpCallback.replace(/avalon\./, '')
	                json = avalon[callbackName]
	                delete avalon[callbackName]
	            } else {
	                json = window[this.jsonpCallback]
	            }
	            return json
	        }
	    }
	
	    avalon.param = function(a) {
	        var prefix,
	            s = [],
	            add = function(key, value) {
	                value = (value == null ? "" : value)
	                s[s.length] = encode(key) + "=" + encode(value)
	            }
	
	        if (Array.isArray(a) || !avalon.isPlainObject(a)) {
	            avalon.each(a, function(subKey, subVal) {
	                add(subKey, subVal)
	            })
	        } else {
	            for (prefix in a) {
	                paramInner(prefix, a[prefix], add)
	            }
	        }
	
	        // Return the resulting serialization
	        return s.join("&").replace(r20, "+")
	    }
	
	    function paramInner(prefix, obj, add) {
	        var name
	        if (Array.isArray(obj)) {
	            // Serialize array item.
	            avalon.each(obj, function(i, v) {
	                paramInner(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, add)
	            })
	        } else if (avalon.isPlainObject(obj)) {
	            // Serialize object item.
	            for (name in obj) {
	                paramInner(prefix + "[" + name + "]", obj[name], add)
	            }
	        } else {
	            // Serialize scalar item.
	            add(prefix, obj)
	        }
	    }
	
	    //将一个字符串转换为对象
	    avalon.unparam = function(input) {
	        var items, temp,
	            expBrackets = /\[(.*?)\]/g,
	            expVarname = /(.+?)\[/,
	            result = {}
	
	        if ((temp = avalon.type(input)) != 'string' || (temp == 'string' && !temp.length))
	            return {}
	        if (input.indexOf("?") !== -1) {
	            input = input.split("?").pop()
	        }
	        items = decode(input).split('&')
	
	        if (!(temp = items.length) || (temp == 1 && temp === ''))
	            return result
	
	        items.forEach(function(item) {
	            if (!item.length)
	            return
	            temp = item.split("=")
	            var key = temp.shift(),
	                value = temp.join('=').replace(/\+/g, ' '),
	                size, link,
	                subitems = []
	
	            if (!key.length)
	            return
	
	            while ((temp = expBrackets.exec(key)))
	            subitems.push(temp[1])
	
	            if (!(size = subitems.length)) {
	                result[key] = value
	                return
	            }
	            size--
	            temp = expVarname.exec(key)
	
	            if (!temp || !(key = temp[1]) || !key.length)
	            return
	
	            if (avalon.type(result[key]) !== 'object')
	                result[key] = {}
	
	            link = result[key]
	
	            avalon.each(subitems, function(subindex, subitem) {
	                if (!(temp = subitem).length) {
	                    temp = 0
	
	                    avalon.each(link, function(num) {
	                        if (!isNaN(num) && num >= 0 && (num % 1 === 0) && num >= temp)
	                            temp = Number(num) + 1
	                    })
	                }
	                if (subindex == size) {
	                    link[temp] = value
	                } else if (avalon.type(link[temp]) !== 'object') {
	                    link = link[temp] = {}
	                } else {
	                    link = link[temp]
	                }
	
	            })
	
	        })
	        return result
	    }
	
	    var rinput = /select|input|button|textarea/i
	    var rcheckbox = /radio|checkbox/
	    var rline = /\r?\n/g
	    function trimLine(val) {
	        return val.replace(rline, "\r\n")
	    }
	    //表单元素变字符串, form为一个元素节点
	    avalon.serialize = function(form) {
	        var json = {}
	        // 不直接转换form.elements，防止以下情况：   <form > <input name="elements"/><input name="test"/></form>
	        Array.prototype.filter.call(form.getElementsByTagName("*"), function(el) {
	            if (rinput.test(el.nodeName) && el.name && !el.disabled) {
	                return rcheckbox.test(el.type) ? el.checked : true //只处理拥有name并且没有disabled的表单元素
	            }
	        }).forEach(function(el) {
	            var val = avalon(el).val()
	            val = Array.isArray(val) ? val.map(trimLine) : trimLine(val)
	            var name = el.name
	            if (name in json) {
	                if (Array.isArray(val)) {
	                    json[name].push(val)
	                } else {
	                    json[name] = [json[name], val]
	                }
	            } else {
	                json[name] = val
	            }
	        })
	        return avalon.param(json, false) // 名值键值对序列化,数组元素名字前不加 []
	    }
	
	    var transports = avalon.ajaxTransports = {
	        xhr: {
	            //发送请求
	            request: function() {
	                var self = this
	                var opts = this.options
	                var transport = this.transport = new avalon.xhr
	                transport.open(opts.type, opts.url, opts.async, opts.username, opts.password)
	                if (this.mimeType && transport.overrideMimeType) {
	                    transport.overrideMimeType(this.mimeType)
	                }
	                //IE6下，如果transport中没有withCredentials，直接设置会报错
	                if (opts.crossDomain && "withCredentials" in transport) {
	                    transport.withCredentials = true
	                }
	
	                /*
	                 * header 中设置 X-Requested-With 用来给后端做标示：
	                 * 这是一个 ajax 请求。
	                 *
	                 * 在 Chrome、Firefox 3.5+ 和 Safari 4+ 下，
	                 * 在进行跨域请求时设置自定义 header，会触发 preflighted requests，
	                 * 会预先发送 method 为 OPTIONS 的请求。
	                 *
	                 * 于是，如果跨域，禁用此功能。
	                 */
	                if (!opts.crossDomain) {
	                    this.requestHeaders["X-Requested-With"] = "XMLHttpRequest"
	                }
	
	                for (var i in this.requestHeaders) {
	                    transport.setRequestHeader(i, this.requestHeaders[i] + "")
	                }
	
	                /*
	                 * progress
	                 */
	                if (opts.progressCallback) {
	                    // 判断是否 ie6-9
	                    var isOldIE = document.all && !window.atob
	                    if (!isOldIE) {
	                        transport.upload.onprogress = opts.progressCallback
	                    }
	                }
	
	                var dataType = opts.dataType
	                if ("responseType" in transport && /^(blob|arraybuffer|text)$/.test(dataType)) {
	                    transport.responseType = dataType
	                    this.useResponseType = true
	                }
	                //必须要支持 FormData 和 file.fileList 的浏览器 才能用 xhr 发送
	                //标准规定的 multipart/form-data 发送必须用 utf-8 格式， 记得 ie 会受到 document.charset 的影响
	                transport.send(opts.hasContent && (this.formdata || this.querystring) || null)
	                //在同步模式中,IE6,7可能会直接从缓存中读取数据而不会发出请求,因此我们需要手动发出请求
	
	                if (!opts.async || transport.readyState === 4) {
	                    this.respond()
	                } else {
	                    if (useOnload) { //如果支持onerror, onload新API
	                        transport.onload = transport.onerror = function(e) {
	                            this.readyState = 4 //IE9+
	                            this.status = e.type === "load" ? 200 : 500
	                            self.respond()
	                        }
	                    } else {
	                        transport.onreadystatechange = function() {
	                            self.respond()
	                        }
	                    }
	                }
	            },
	            //用于获取原始的responseXMLresponseText 修正status statusText
	            //第二个参数为1时中止清求
	            respond: function(event, forceAbort) {
	                var transport = this.transport
	                if (!transport) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID)
	                    delete this.timeoutID
	                }
	                try {
	                    var completed = transport.readyState === 4
	                    if (forceAbort || completed) {
	                        transport.onreadystatechange = avalon.noop
	                        if (useOnload) { //IE6下对XHR对象设置onerror属性可能报错
	                            transport.onerror = transport.onload = null
	                        }
	                        if (forceAbort) {
	                            if (!completed && typeof transport.abort === "function") { // 完成以后 abort 不要调用
	                                transport.abort()
	                            }
	                        } else {
	                            var status = transport.status
	                            //设置responseText
	                            var text = transport.responseText
	
	                            this.responseText = typeof text === "string" ? text : void 0
	                            //设置responseXML
	                            try {
	                                //当responseXML为[Exception: DOMException]时，
	                                //访问它会抛“An attempt was made to use an object that is not, or is no longer, usable”异常
	                                var xml = transport.responseXML
	                                this.responseXML = xml.documentElement
	                            } catch (e) {}
	                            //设置response
	                            if (this.useResponseType) {
	                                this.response = transport.response
	                            }
	                            //设置responseHeadersString
	                            this.responseHeadersString = transport.getAllResponseHeaders()
	
	                            try { //火狐在跨城请求时访问statusText值会抛出异常
	                                var statusText = transport.statusText
	                            } catch (e) {
	                                this.error = e
	                                statusText = "firefoxAccessError"
	                            }
	                            //用于处理特殊情况,如果是一个本地请求,只要我们能获取数据就假当它是成功的
	                            if (!status && isLocal && !this.options.crossDomain) {
	                                status = this.responseText ? 200 : 404
	                            //IE有时会把204当作为1223
	                            } else if (status === 1223) {
	                                status = 204
	                            }
	                            this.dispatch(status, statusText)
	                        }
	                    }
	                } catch (err) {
	                    // 如果网络问题时访问XHR的属性，在FF会抛异常
	                    // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	                    if (!forceAbort) {
	                        this.dispatch(500, err)
	                    }
	                }
	            }
	        },
	        jsonp: {
	            preproccess: function() {
	                var opts = this.options
	                var name = this.jsonpCallback = opts.jsonpCallback || "avalon.jsonp" + setTimeout("1")
	                if (rjsonp.test(opts.url)) {
	                    opts.url = opts.url.replace(rjsonp, "$1" + name)
	                } else {
	                    opts.url = opts.url + (rquery.test(opts.url) ? "&" : "?") + opts.jsonp + "=" + name
	                }
	                //将后台返回的json保存在惰性函数中
	                if (name.startsWith('avalon.')) {
	                    name = name.replace(/avalon\./, '')
	                    avalon[name] = function(json) {
	                        avalon[name] = json
	                    }
	                } else {
	                    window[name] = function(json) {
	                        window[name] = json
	                    }
	                }
	                return "script"
	            }
	        },
	        script: {
	            request: function() {
	                var opts = this.options
	                var node = this.transport = DOC.createElement("script")
	                if (opts.charset) {
	                    node.charset = opts.charset
	                }
	                var self = this
	                node.onerror = node[useOnload ? "onload" : "onreadystatechange"] = function() {
	                    self.respond()
	                }
	                node.src = opts.url
	                head.insertBefore(node, head.firstChild)
	            },
	            respond: function(event, forceAbort) {
	                var node = this.transport
	                if (!node) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID)
	                    delete this.timeoutID
	                }
	                var execute = /loaded|complete|undefined/i.test(node.readyState)
	                if (forceAbort || execute) {
	                    node.onerror = node.onload = node.onreadystatechange = null
	                    var parent = node.parentNode
	                    if (parent) {
	                        parent.removeChild(node)
	                    }
	                    if (!forceAbort) {
	                        var args
	                        if (this.jsonpCallback) {
	                            var jsonpCallback = this.jsonpCallback.startsWith('avalon.') ? avalon[this.jsonpCallback.replace(/avalon\./, '')] : window[this.jsonpCallback]
	                            args = typeof jsonpCallback === "function" ? [500, "error"] : [200, "success"]
	                        } else {
	                            args = [200, "success"]
	                        }
	
	                        this.dispatch.apply(this, args)
	                    }
	                }
	            }
	        },
	        upload: {
	            preproccess: function() {
	                var opts = this.options, formdata
	                if (typeof opts.form.append === "function") { //简单判断opts.form是否为FormData
	                    formdata = opts.form
	                    opts.contentType = ''
	                } else {
	                    formdata = new FormData(opts.form) //将二进制什么一下子打包到formdata
	                }
	                avalon.each(opts.data, function(key, val) {
	                    formdata.append(key, val) //添加客外数据
	                })
	                this.formdata = formdata
	            }
	        }
	    }
	
	
	    avalon.mix(transports.jsonp, transports.script)
	    avalon.mix(transports.upload, transports.xhr)
	
	    if (!window.FormData) {
	        var str = 'Function BinaryToArray(binary)\r\n\
	                 Dim oDic\r\n\
	                 Set oDic = CreateObject("scripting.dictionary")\r\n\
	                 length = LenB(binary) - 1\r\n\
	                 For i = 1 To length\r\n\
	                     oDic.add i, AscB(MidB(binary, i, 1))\r\n\
	                 Next\r\n\
	                 BinaryToArray = oDic.Items\r\n\
	              End Function'
	        execScript(str, "VBScript")
	        avalon.fixAjax = function() {
	            avalon.ajaxConverters.arraybuffer = function() {
	                var body = this.tranport && this.tranport.responseBody
	                if (body) {
	                    return new VBArray(BinaryToArray(body)).toArray()
	                }
	            }
	            function createIframe(ID) {
	                var iframe = avalon.parseHTML("<iframe " + " id='" + ID + "'" +
	                    " name='" + ID + "'" + " style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild
	                return (DOC.body || DOC.documentElement).insertBefore(iframe, null)
	            }
	            function addDataToForm(form, data) {
	                var ret = [],
	                    d, isArray, vs, i, e
	                for (d in data) {
	                    isArray = Array.isArray(data[d])
	                    vs = isArray ? data[d] : [data[d]]
	                    // 数组和原生一样对待，创建多个同名输入域
	                    for (i = 0; i < vs.length; i++) {
	                        e = DOC.createElement("input")
	                        e.type = 'hidden'
	                        e.name = d
	                        e.value = vs[i]
	                        form.appendChild(e)
	                        ret.push(e)
	                    }
	                }
	                return ret
	            }
	            //https://github.com/codenothing/Pure-Javascript-Upload/blob/master/src/upload.js
	            avalon.ajaxTransports.upload = {
	                request: function() {
	                    var self = this
	                    var opts = this.options
	                    var ID = "iframe-upload-" + this.uniqueID
	                    var form = opts.form
	                    var iframe = this.transport = createIframe(ID)
	                    //form.enctype的值
	                    //1:application/x-www-form-urlencoded   在发送前编码所有字符（默认）
	                    //2:multipart/form-data 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
	                    //3:text/plain  空格转换为 "+" 加号，但不对特殊字符编码。
	                    var backups = {
	                        target: form.target || "",
	                        action: form.action || "",
	                        enctype: form.enctype,
	                        method: form.method
	                    }
	                    var fields = opts.data ? addDataToForm(form, opts.data) : []
	                    //必须指定method与enctype，要不在FF报错
	                    //表单包含文件域时，如果缺少 method=POST 以及 enctype=multipart/form-data，
	                    // 设置target到隐藏iframe，避免整页刷新
	                    form.target = ID
	                    form.action = opts.url
	                    form.method = "POST"
	                    form.enctype = "multipart/form-data"
	                    this.uploadcallback = avalon.bind(iframe, "load", function(event) {
	                        self.respond(event)
	                    })
	                    form.submit()
	                    //还原form的属性
	                    for (var i in backups) {
	                        form[i] = backups[i]
	                    }
	                    //移除之前动态添加的节点
	                    fields.forEach(function(input) {
	                        form.removeChild(input)
	                    })
	                },
	                respond: function(event) {
	                    var node = this.transport, child
	                    // 防止重复调用,成功后 abort
	                    if (!node) {
	                        return
	                    }
	                    if (event && event.type === "load") {
	                        var doc = node.contentWindow.document
	                        this.responseXML = doc
	                        if (doc.body) { //如果存在body属性,说明不是返回XML
	                            this.responseText = doc.body.innerHTML
	                            //当MIME为'application/javascript' 'text/javascript",浏览器会把内容放到一个PRE标签中
	                            if ((child = doc.body.firstChild) && child.nodeName.toUpperCase() === 'PRE' && child.firstChild) {
	                                this.responseText = child.firstChild.nodeValue
	                            }
	                        }
	                        this.dispatch(200, "success")
	                    }
	                    this.uploadcallback = avalon.unbind(node, "load", this.uploadcallback)
	                    delete this.uploadcallback
	                    setTimeout(function() { // Fix busy state in FF3
	                        node.parentNode.removeChild(node)
	                    })
	                }
	            }
	            delete avalon.fixAjax
	        }
	        avalon.fixAjax()
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 2011.8.31
	 将会传送器的abort方法上传到avalon.XHR.abort去处理
	 修复serializeArray的bug
	 对XMLHttpRequest.abort进行try...catch
	 2012.3.31 v2 大重构,支持XMLHttpRequest Level2
	 2013.4.8 v3 大重构 支持二进制上传与下载
	 http://www.cnblogs.com/heyuquan/archive/2013/05/13/3076465.html
	 2014.12.25  v4 大重构 
	 2015.3.2   去掉mmPromise
	 2014.3.13  使用加强版mmPromise
	 2014.3.17  增加 xhr 的 onprogress 回调
	 */


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (avalon) {
	//chrome36的原生Promise还多了一个defer()静态方法，允许不通过传参就能生成Promise实例，
	//另还多了一个chain(onSuccess, onFail)原型方法，意义不明
	//目前，firefox24, opera19也支持原生Promise(chrome32就支持了，但需要打开开关，自36起直接可用)
	//本模块提供的Promise完整实现ECMA262v6 的Promise规范
	//2015.3.12 支持async属性
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }
	
	    function done(onSuccess) {//添加成功回调
	        return this.then(onSuccess, ng)
	    }
	    function fail(onFail) {//添加出错回调
	        return this.then(ok, onFail)
	    }
	    function defer() {
	        var ret = {};
	        ret.promise = new this(function (resolve, reject) {
	            ret.resolve = resolve
	            ret.reject = reject
	        });
	        return ret
	    }
	    var msPromise = function (executor) {
	        this._callbacks = []
	        var me = this
	        if (typeof this !== "object")
	            throw new TypeError("Promises must be constructed via new")
	        if (typeof executor !== "function")
	            throw new TypeError("not a function")
	
	        executor(function (value) {
	            _resolve(me, value)
	        }, function (reason) {
	            _reject(me, reason)
	        })
	    }
	    function fireCallbacks(promise, fn) {
	        if (typeof promise.async === "boolean") {
	            var isAsync = promise.async
	        } else {
	            isAsync = promise.async = true
	        }
	        if (isAsync) {
	            window.setTimeout(fn, 0)
	        } else {
	            fn()
	        }
	    }
	//返回一个已经处于`resolved`状态的Promise对象
	    msPromise.resolve = function (value) {
	        return new msPromise(function (resolve) {
	            resolve(value)
	        })
	    }
	//返回一个已经处于`rejected`状态的Promise对象
	    msPromise.reject = function (reason) {
	        return new msPromise(function (resolve, reject) {
	            reject(reason)
	        })
	    }
	
	    msPromise.prototype = {
	//一个Promise对象一共有3个状态：
	//- `pending`：还处在等待状态，并没有明确最终结果
	//- `resolved`：任务已经完成，处在成功状态
	//- `rejected`：任务已经完成，处在失败状态
	        constructor: msPromise,
	        _state: "pending",
	        _fired: false, //判定是否已经被触发
	        _fire: function (onSuccess, onFail) {
	            if (this._state === "rejected") {
	                if (typeof onFail === "function") {
	                    onFail(this._value)
	                } else {
	                    throw this._value
	                }
	            } else {
	                if (typeof onSuccess === "function") {
	                    onSuccess(this._value)
	                }
	            }
	        },
	        _then: function (onSuccess, onFail) {
	            if (this._fired) {//在已有Promise上添加回调
	                var me = this
	                fireCallbacks(me, function () {
	                    me._fire(onSuccess, onFail)
	                });
	            } else {
	                this._callbacks.push({onSuccess: onSuccess, onFail: onFail})
	            }
	        },
	        then: function (onSuccess, onFail) {
	            onSuccess = typeof onSuccess === "function" ? onSuccess : ok
	            onFail = typeof onFail === "function" ? onFail : ng
	            var me = this//在新的Promise上添加回调
	            var nextPromise = new msPromise(function (resolve, reject) {
	                me._then(function (value) {
	                    try {
	                        value = onSuccess(value)
	                    } catch (e) {
	                        // https://promisesaplus.com/#point-55
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                }, function (value) {
	                    try {
	                        value = onFail(value)
	                    } catch (e) {
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                })
	            })
	            for (var i in me) {
	                if (!personal[i]) {
	                    nextPromise[i] = me[i]
	                }
	            }
	            return nextPromise
	        },
	        "done": done,
	        "catch": fail,
	        "fail": fail
	    }
	    var personal = {
	        _state: 1,
	        _fired: 1,
	        _value: 1,
	        _callbacks: 1
	    }
	    function _resolve(promise, value) {//触发成功回调
	        if (promise._state !== "pending")
	            return;
	        if (value && typeof value.then === "function") {
	//thenable对象使用then，Promise实例使用_then
	            var method = value instanceof msPromise ? "_then" : "then"
	            value[method](function (val) {
	                _transmit(promise, val, true)
	            }, function (reason) {
	                _transmit(promise, reason, false)
	            });
	        } else {
	            _transmit(promise, value, true);
	        }
	    }
	    function _reject(promise, value) {//触发失败回调
	        if (promise._state !== "pending")
	            return
	        _transmit(promise, value, false)
	    }
	//改变Promise的_fired值，并保持用户传参，触发所有回调
	    function _transmit(promise, value, isResolved) {
	        promise._fired = true;
	        promise._value = value;
	        promise._state = isResolved ? "fulfilled" : "rejected"
	        fireCallbacks(promise, function () {
	            promise._callbacks.forEach(function (data) {
	                promise._fire(data.onSuccess, data.onFail);
	            })
	        })
	    }
	    function _some(any, iterable) {
	        iterable = Array.isArray(iterable) ? iterable : []
	        var n = 0, result = [], end
	        return new msPromise(function (resolve, reject) {
	            // 空数组直接resolve
	            if (!iterable.length)
	                resolve(result)
	            function loop(a, index) {
	                a.then(function (ret) {
	                    if (!end) {
	                        result[index] = ret//保证回调的顺序
	                        n++
	                        if (any || n >= iterable.length) {
	                            resolve(any ? ret : result)
	                            end = true
	                        }
	                    }
	                }, function (e) {
	                    end = true
	                    reject(e)
	                })
	            }
	            for (var i = 0, l = iterable.length; i < l; i++) {
	                loop(iterable[i], i)
	            }
	        })
	    }
	
	    msPromise.all = function (iterable) {
	        return _some(false, iterable)
	    }
	    msPromise.race = function (iterable) {
	        return _some(true, iterable)
	    }
	    msPromise.defer = defer
	
	
	
	    avalon.Promise = msPromise
	    var nativePromise = window.Promise
	    if (/native code/.test(nativePromise)) {
	        nativePromise.prototype.done = done
	        nativePromise.prototype.fail = fail
	        if (!nativePromise.defer) { //chrome实现的私有方法
	            nativePromise.defer = defer
	        }
	    }
	    return window.Promise = nativePromise || msPromise
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	//https://github.com/ecomfe/er/blob/master/src/Deferred.js
	//http://jser.info/post/77696682011/es6-promises


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	//重写mmRouter中的route方法     
	    avalon.router.route = function (method, path, query, options) {
	        path = path.trim()
	        var states = this.routingTable[method]
	        for (var i = 0, el; el = states[i++]; ) {//el为一个个状态对象，状态对象的callback总是返回一个Promise
	            var args = path.match(el.regexp)
	            if (args && el.abstract !== true) {//不能是抽象状态
	                var newParams = {params: {}}
	                avalon.mix(newParams.params, el.params)
	                newParams.keys = el.keys
	                newParams.params.query = query || {}
	                args.shift()
	                if (el.keys.length) {
	                    this._parseArgs(args, newParams)
	                }
	                if (el.stateName) {
	                    mmState.transitionTo(mmState.currentState, el, newParams.params, options)
	                } else {
	                    el.callback.apply(el, args)
	                }
	                return
	            }
	        }
	        if (this.errorback) {
	            this.errorback()
	        }
	    }
	    var _root, undefine, _controllers = {}, _states = {}
	    /*
	     *  @interface avalon.router.go 跳转到一个已定义状态上，params对参数对象
	     *  @param toName 状态name
	     *  @param params 附加参数
	     *  @param params.query 在hash后面附加的类似search的参数对
	     *  @param options 扩展配置
	     *  @param options.reload true强制reload，即便url、参数并未发生变化
	     *  @param options.replace true替换history，否则生成一条新的历史记录
	     *  @param options.confirmed true不触发onBeforeUnload,$onBeforeUnload,onBeforeExit
	     */
	    avalon.router.go = function (toName, params, options) {
	        var from = mmState.currentState,
	                to = StateModel.is(toName) ? toName : getStateByName(toName),
	                params = params || {}
	        var params = avalon.mix(true, {}, to.params, params)
	        if (to) {
	            mmState.transitionTo(from, to, params, options)
	        }
	    }
	    // 事件管理器
	    var Event = window.$eventManager = avalon.define({
	        $id: "$eventManager",
	        $flag: 0,
	        uiqKey: function () {
	            return "flag" + (++Event.$flag)
	        }
	    })
	    function removeOld() {
	        var nodes = mmState.oldNodes
	        while (nodes.length) {
	            var i = nodes.length - 1,
	                    node = nodes[i]
	            node.parentNode && node.parentNode.removeChild(node)
	            nodes.splice(i, 1)
	            node = null
	        }
	    }
	    Event.$watch("onAbort", removeOld)
	    var mmState = window.mmState = {
	        prevState: NaN,
	        currentState: NaN, // 当前状态，可能还未切换到该状态
	        activeState: NaN, // 当前实际处于的状态
	        oldNodes: [],
	        query: {}, // 从属于currentState
	        popOne: function (chain, params, callback, notConfirmed) {
	            if (mmState._toParams !== params)
	                return callback(false, {type: "abort"})
	            var cur = chain.pop(), me = this
	            if (!cur)
	                return callback()
	            // 阻止退出
	            if (notConfirmed && cur.onBeforeExit() === false)
	                return callback(false)
	            me.activeState = cur.parentState || _root
	            cur.done = function (success) {
	                cur._pending = false
	                cur.done = null
	                cur._local = null
	                if (success !== false) {
	                    if (me.activeState)
	                        return me.popOne(chain, params, callback, notConfirmed)
	                }
	                return callback(success)
	            }
	            var success = cur.onExit()
	            if (!cur._pending && cur.done)
	                cur.done(success)
	        },
	        pushOne: function (chain, params, callback, _local, toLocals) {
	            if (mmState._toParams !== params)
	                return callback(false, {type: "abort"})
	            var cur = chain.shift(), me = this
	            // 退出
	            if (!cur) {
	                chain = null
	                return callback()
	            }
	            cur.syncParams(params)
	            // 阻止进入该状态
	            if (cur.onBeforeEnter() === false) {
	                // 恢复params
	                cur.syncParams(cur.oldParams)
	                return callback(false)
	            }
	            var _local = inherit(_local)
	            me.activeState = cur // 更新当前实际处于的状态
	            cur.done = function (success) {
	                // 防止async处触发已经销毁的done
	                if (!cur.done)
	                    return
	                cur._pending = false
	                cur.done = null
	                cur.visited = true
	                // 退出
	                if (success === false) {
	                    // 这里斟酌一下 - 去掉
	                    // cur.callback.apply(cur, [params, _local])
	                    return callback(success)
	                }
	                var resolved = cur.callback.apply(cur, [params, _local])
	                resolved.$then(function (res) {
	                    // sync params to oldParams
	                    avalon.mix(true, cur.oldParams, cur.params)
	                    // 继续状态链
	                    me.pushOne(chain, params, callback, _local)
	                })
	            }
	            // 一般在这个回调里准备数据
	            var args = []
	            avalon.each(cur.keys, function (index, item) {
	                var key = item.name
	                args.push(cur.params[key])
	            })
	            cur._onEnter.apply(cur, args)
	            if (!cur._pending && cur.done)
	                cur.done()
	        },
	        transitionTo: function (fromState, toState, toParams, options) {
	            var toParams = toParams || toState.params, fromAbort
	            // state machine on transition
	            if (this.activeState && (this.activeState != this.currentState)) {
	                avalon.log("navigating to [" +
	                        this.currentState.stateName +
	                        "] will be stopped, redirect to [" +
	                        toState.stateName + "] now")
	                this.activeState.done && this.activeState.done(!"stopped")
	                fromState = this.activeState // 更新实际的fromState
	                fromAbort = true
	            }
	            mmState.oldNodes = []
	            var info = avalon.router.urlFormate(toState.url, toParams, toParams.query),
	                    me = this,
	                    options = options || {},
	                    // 是否强制reload，参照angular，这个时候会触发整个页面重刷
	                    reload = options.reload,
	                    over,
	                    fromChain = fromState && fromState.chain || [],
	                    toChain = toState.chain,
	                    i = 0,
	                    changeType, // 是params变化？query变化？这个东西可以用来配置是否屏蔽视图刷新逻辑
	                    state = toChain[i],
	                    _local = _root.sourceLocal,
	                    toLocals = []
	            if (!reload) {
	                // 找到共有父状态chain，params未变化
	                while (state && state === fromChain[i] && !state.paramsChanged(toParams)) {
	                    _local = toLocals[i] = state._local
	                    i++
	                    state = toChain[i]
	                }
	            }
	            var exitChain = fromChain.slice(i), // 需要退出的chain
	                    enterChain = toChain.slice(i), // 需要进入的chain
	                    commonLocal = _local
	            // 建立toLocals，用来计算哪些view会被替换
	            while (state = toChain[i]) {
	                _local = toLocals[i] = inherit(_local, state.sourceLocal)
	                i++
	            }
	            mmState._local = _local
	            done = function (success, e) {
	                if (over)
	                    return
	                over = true
	                me.currentState = me.activeState
	                enterChain = exitChain = commonLocal = _local = toParams = null
	                mmState.oldNodes = []
	                if (success !== false) {
	                    mmState.lastLocal = mmState.currentState._local
	                    _root.fire("updateview", me.currentState, changeType)
	                    avalon.log("transitionTo " + toState.stateName + " success")
	                    callStateFunc("onLoad", me, fromState, toState)
	                } else {
	                    return callStateFunc("onError", me, {
	                        type: "transition",
	                        message: "transitionTo " + toState.stateName + " faild",
	                        error: e,
	                        fromState: fromState,
	                        toState: toState,
	                        params: toParams
	                    }, me.currentState)
	                }
	            }
	            toState.path = ("/" + info.path).replace(/^[\/]{2,}/g, "/")
	            if (!reload && fromState === toState) {
	                changeType = toState.paramsChanged(toParams)
	                if (!changeType) {
	                    // redirect的目的状态 == this.activeState && abort
	                    if (toState == this.activeState && fromAbort)
	                        return done()
	                    // 重复点击直接return
	                    return
	                }
	            }
	
	            mmState.query = avalon.mix({}, toParams.query)
	
	            // onBeforeUnload check
	            if (options && !options.confirmed && (callStateFunc("onBeforeUnload", this, fromState, toState) === false || broadCastBeforeUnload(exitChain, enterChain, fromState, toState) === false)) {
	                return callStateFunc("onAbort", this, fromState, toState)
	            }
	            if (over === true) {
	                return
	            }
	            avalon.log("begin transitionTo " + toState.stateName + " from " + (fromState && fromState.stateName || "unknown"))
	            callStateFunc("onUnload", this, fromState, toState)
	            this.currentState = toState
	            this.prevState = fromState
	            mmState._toParams = toParams
	            if (info && avalon.history)
	                avalon.history.updateLocation(info.path + info.query, avalon.mix({}, options, {silent: true}), !fromState && location.hash)
	            callStateFunc("onBegin", this, fromState, toState)
	            this.popOne(exitChain, toParams, function (success) {
	                // 中断
	                if (success === false)
	                    return done(success)
	                me.pushOne(enterChain, toParams, done, commonLocal, toLocals)
	            }, !(options && options.confirmed))
	        }
	    }
	    //将template,templateUrl,templateProvider等属性从opts对象拷贝到新生成的view对象上的
	    function copyTemplateProperty(newObj, oldObj, name) {
	        if (name in oldObj) {
	            newObj[name] = oldObj[name]
	            delete  oldObj[name]
	        }
	    }
	    function getCacheContainer() {
	        return document.getElementsByTagName("avalon")[0]
	    }
	    var templateCache = {},
	            cacheContainer = getCacheContainer()
	    function loadCache(name) {
	        var fragment = document.createDocumentFragment(),
	                divPlaceHolder = document.getElementById(name),
	                f,
	                eles = divPlaceHolder.eles,
	                i = 0
	        if (divPlaceHolder) {
	            while (f = eles[i]) {
	                fragment.appendChild(f)
	                i++
	            }
	        }
	        return fragment
	    }
	    function setCache(name, element) {
	        var fragment = document.createDocumentFragment(),
	                divPlaceHolder = document.getElementById(name),
	                f
	        if (!divPlaceHolder) {
	            divPlaceHolder = document.createElement("div")
	            divPlaceHolder.id = name
	            cacheContainer.appendChild(divPlaceHolder)
	        }
	        // 引用
	        if (divPlaceHolder.eles) {
	            avalon.each(divPlaceHolder.eles, function (index, ele) {
	                fragment.appendChild(ele)
	            })
	        } else {
	            divPlaceHolder.eles = []
	            while (f = element.firstChild) {
	                fragment.appendChild(f)
	                divPlaceHolder.eles.push(f)
	            }
	            templateCache[name] = true
	        }
	        divPlaceHolder.appendChild(fragment)
	    }
	    function broadCastBeforeUnload(exitChain, enterChain, fromState, toState) {
	        var lastLocal = mmState.lastLocal
	        if (!lastLocal || !enterChain[0] && !exitChain[0])
	            return
	        var newLocal = mmState._local,
	                cacheQueue = []
	        for (var i in lastLocal) {
	            var local = lastLocal[i]
	            // 所有被更新的view
	            if (!(i in newLocal) || newLocal[i] != local) {
	                if (local.$ctrl && ("$onBeforeUnload" in local.$ctrl)) {
	                    if (local.$ctrl.$onBeforeUnload(fromState, toState) === false)
	                        return false
	                }
	                if (local.element && (exitChain[0] != enterChain[0]))
	                    cacheQueue.push(local)
	            }
	        }
	        avalon.each(cacheQueue, function (index, local) {
	            var ele = local.element,
	                    name = avalon(ele).data("currentCache")
	            if (name) {
	                setCache(name, ele)
	            }
	        })
	        cacheQueue = null
	    }
	    // 靠谱的解决方法
	    avalon.bindingHandlers.view = function (data) {
	        var vmodels = data.vmodels || arguments[1]
	        var currentState = mmState.currentState,
	                element = data.element,
	                $element = avalon(element),
	                viewname = data.value || data.expr || "",
	                comment = document.createComment("ms-view:" + viewname),
	                par = element.parentNode,
	                defaultHTML = element.innerHTML,
	                statename = $element.data("statename") || "",
	                parentState = getStateByName(statename) || _root,
	                currentLocal = {},
	                oldElement = element,
	                tpl = element.outerHTML
	        element.removeAttribute("ms-view") // remove right now
	        par.insertBefore(comment, element)
	        function update(firsttime, currentState, changeType) {
	            // node removed, remove callback
	            if (!document.contains(comment)) {
	                data = vmodels = element = par = comment = $element = oldElement = update = null
	                return !"delete from watch"
	            }
	            var definedParentStateName = $element.data("statename") || "",
	                    parentState = getStateByName(definedParentStateName) || _root,
	                    _local
	            if (viewname.indexOf("@") < 0)
	                viewname += "@" + parentState.stateName
	            _local = mmState.currentState._local && mmState.currentState._local[viewname]
	            if (firsttime && !_local || currentLocal === _local)
	                return
	            currentLocal = _local
	            _currentState = _local && _local.state
	            // 缓存，如果加载dom上，则是全局配置，针对template还可以开一个单独配置
	            var cacheTpl = $element.data("viewCache"),
	                    lastCache = $element.data("currentCache")
	            if (_local) {
	                cacheTpl = (_local.viewCache === false ? false : _local.viewCache || cacheTpl) && (viewname + "@" + _currentState.stateName)
	            } else if (cacheTpl) {
	                cacheTpl = viewname + "@__default__"
	            }
	            // stateB->stateB，配置了参数变化不更新dom
	            if (_local && _currentState === currentState && _local.ignoreChange && _local.ignoreChange(changeType, viewname))
	                return
	            // 需要load和使用的cache是一份
	            if (cacheTpl && cacheTpl === lastCache)
	                return
	            compileNode(tpl, element, $element, _currentState)
	            var html = _local ? _local.template : defaultHTML,
	                    fragment
	            if (cacheTpl) {
	                if (_local) {
	                    _local.element = element
	                } else {
	                    mmState.currentState._local[viewname] = {
	                        state: mmState.currentState,
	                        template: defaultHTML,
	                        element: element
	                    }
	                }
	            }
	            avalon.clearHTML(element)
	            // oldElement = element
	            element.removeAttribute("ms-view")
	            element.setAttribute("ui-view", data.value || data.expr || "")
	            // 本次更新的dom需要用缓存
	            if (cacheTpl) {
	                // 已缓存
	                if (templateCache[cacheTpl]) {
	                    fragment = loadCache(cacheTpl)
	                    // 未缓存
	                } else {
	                    fragment = avalon.parseHTML(html)
	                }
	                element.appendChild(fragment)
	                // 更新现在使用的cache名字
	                $element.data("currentCache", cacheTpl)
	                if (templateCache[cacheTpl]) {
	                    _local.$ctrl.$onCacheRendered && _local.$ctrl.$onCacheRendered.apply(element, [_local])
	                    return
	                }
	            } else {
	                element.innerHTML = html
	                $element.data("currentCache", false)
	            }
	            // default
	            if (!_local && cacheTpl)
	                $element.data("currentCache", cacheTpl)
	            avalon.each(getViewNodes(element), function (i, node) {
	                avalon(node).data("statename", _currentState && _currentState.stateName || "")
	            })
	            // merge上下文vmodels + controller指定的vmodels
	            avalon.scan(element, (_local && _local.vmodels || []).concat(vmodels || []))
	            // 触发视图绑定的controller的事件
	            if (_local && _local.$ctrl) {
	                _local.$ctrl.$onRendered && _local.$ctrl.$onRendered.apply(element, [_local])
	            }
	        }
	        update("firsttime")
	        _root.watch("updateview", function (state, changeType) {
	            return update.call(this, undefine, state, changeType)
	        })
	    }
	    if (avalon.directives) {
	        avalon.directive("view", {
	            init: avalon.bindingHandlers.view
	        })
	    }
	    function compileNode(tpl, element, $element, _currentState) {
	        if ($element.hasClass("oni-mmRouter-slide")) {
	            // 拷贝一个镜像
	            var copy = element.cloneNode(true)
	            copy.setAttribute("ms-skip", "true")
	            avalon(copy).removeClass("oni-mmRouter-enter").addClass("oni-mmRouter-leave")
	            avalon(element).addClass("oni-mmRouter-enter")
	            element.parentNode.insertBefore(copy, element)
	            mmState.oldNodes.push(copy)
	            callStateFunc("onViewEnter", _currentState, element, copy)
	        }
	        return element
	    }
	
	    function inherit(parent, extra) {
	        return avalon.mix(new (avalon.mix(function () {
	        }, {prototype: parent}))(), extra);
	    }
	
	    /*
	     * @interface avalon.state 对avalon.router.get 进行重新封装，生成一个状态对象
	     * @param stateName 指定当前状态名
	     * @param opts 配置
	     * @param opts.url  当前状态对应的路径规则，与祖先状态们组成一个完整的匹配规则
	     * @param {Function} opts.ignoreChange 当mmState.currentState == this时，更新视图的时候调用该函数，return true mmRouter则不会去重写视图和scan，请确保该视图内用到的数据没有放到avalon vmodel $skipArray内
	     * @param opts.controller 如果不写views属性,则默认view为""，为默认的view指定一个控制器，该配置会直接作为avalon.controller的参数生成一个$ctrl对象
	     * @param opts.controllerUrl 指定默认view控制器的路径，适用于模块化开发，该情形下默认通过avalon.controller.loader去加载一个符合amd规范，并返回一个avalon.controller定义的对象，传入opts.params作参数
	     * @param opts.controllerProvider 指定默认view控制器的提供者，它可以是一个Promise，也可以为一个函数，传入opts.params作参数
	     @param opts.viewCache 是否缓存这个模板生成的dom，设置会覆盖dom元素上的data-view-cache，也可以分别配置到views上每个单独的view上
	     * @param opts.views: 如果不写views属性,则默认view【ms-view=""】为""，也可以通过指定一个viewname属性来配置【ms-view="viewname"】，对多个[ms-view]容器进行处理,每个对象应拥有template, templateUrl, templateProvider，可以给每个对象搭配一个controller||controllerUrl||controllerProvider属性
	     *     views的结构为
	     *<pre>
	     *     {
	     *        "": {template: "xxx"}
	     *        "aaa": {template: "xxx"}
	     *        "bbb@": {template: "xxx"}
	     *     }
	     *</pre>
	     *     views的每个键名(keyname)的结构为viewname@statename，
	     *         如果名字不存在@，则viewname直接为keyname，statename为opts.stateName
	     *         如果名字存在@, viewname为match[0], statename为match[1]
	     * @param opts.views.{viewname}.template 指定当前模板，也可以为一个函数，传入opts.params作参数，* @param opts.views.viewname.cacheController 是否缓存view的控制器，默认true
	     * @param opts.views.{viewname}.templateUrl 指定当前模板的路径，也可以为一个函数，传入opts.params作参数
	     * @param opts.views.{viewname}.templateProvider 指定当前模板的提供者，它可以是一个Promise，也可以为一个函数，传入opts.params作参数
	     * @param opts.views.{viewname}.ignoreChange 用法同state.ignoreChange，只是针对的粒度更细一些，针对到具体的view
	     * @param {Function} opts.onBeforeEnter 切入某个state之前触发，this指向对应的state，如果return false则会中断并退出整个状态机
	     * @param {Function} opts.onEnter 进入状态触发，可以返回false，或任意不为true的错误信息或一个promise对象，用法跟视图的$onEnter一致
	     * @param {Function} onEnter.params 视图所属的state的参数
	     * @param {Function} onEnter.resolve $onEnter return false的时候，进入同步等待，直到手动调用resolve
	     * @param {Function} onEnter.reject 数据加载失败，调用
	     * @param {Function} opts.onBeforeExit state退出前触发，this指向对应的state，如果return false则会中断并退出整个状态机
	     * @param {Function} opts.onExit 退出后触发，this指向对应的state
	     * @param opts.ignoreChange.changeType 值为"param"，表示params变化，值为"query"，表示query变化
	     * @param opts.ignoreChange.viewname 关联的ms-view name
	     * @param opts.abstract  表示它不参与匹配，this指向对应的state
	     * @param {private} opts.parentState 父状态对象（框架内部生成）
	     */
	    avalon.state = function (stateName, opts) {
	        var state = StateModel(stateName, opts)
	        avalon.router.get(state.url, function (params, _local) {
	            var me = this, promises = [], _resovle, _reject, _data = [], _callbacks = []
	            state.resolved = getPromise(function (rs, rj) {
	                _resovle = rs
	                _reject = rj
	            })
	            avalon.each(state.views, function (name, view) {
	                var params = me.params,
	                        reason = {
	                            type: "view",
	                            name: name,
	                            params: params,
	                            state: state,
	                            view: view
	                        },
	                viewLocal = _local[name] = {
	                    name: name,
	                    state: state,
	                    params: state.filterParams(params),
	                    ignoreChange: "ignoreChange" in view ? view.ignoreChange : me.ignoreChange,
	                    viewCache: "viewCache" in view ? view.viewCache : me.viewCache
	                },
	                promise = fromPromise(view, params, reason)
	                promises.push(promise)
	                // template不能cache
	                promise.then(function (s) {
	                    viewLocal.template = s
	                }, avalon.noop) // 捕获模板报错
	                var prom,
	                        callback = function ($ctrl) {
	                            viewLocal.vmodels = $ctrl.$vmodels
	                            view.$controller = viewLocal.$ctrl = $ctrl
	                            resolveData()
	                        },
	                        resolveData = function () {
	                            var $onEnter = view.$controller && view.$controller.$onEnter
	                            if ($onEnter) {
	                                var innerProm = getPromise(function (rs, rj) {
	                                    var reason = {
	                                        type: "data",
	                                        state: state,
	                                        params: params
	                                    },
	                                    res = $onEnter(params, rs, function (message) {
	                                        reason.message = message
	                                        rj(reason)
	                                    })
	                                    // if promise
	                                    if (res && res.then) {
	                                        _data.push(res)
	                                        res.then(function () {
	                                            rs(res)
	                                        })
	                                        // error msg
	                                    } else if (res && res !== true) {
	                                        reason.message = res
	                                        rj(reason)
	                                    } else if (res === undefine) {
	                                        rs()
	                                    }
	                                    // res === false will pause here
	                                })
	                                innerProm = innerProm.then(function (cb) {
	                                    avalon.isFunction(cb) && _callbacks.push(cb)
	                                })
	                                _data.push(innerProm)
	                            }
	                        }
	                // controller似乎可以缓存着
	                if (view.$controller && view.cacheController !== false) {
	                    return callback(view.$controller)
	                }
	                // 加载controller模块
	                if (view.controller) {
	                    prom = promise.then(function () {
	                        callback(avalon.controller(view.controller))
	                    })
	                } else if (view.controllerUrl) {
	                    prom = getPromise(function (rs, rj) {
	                        var url = avalon.isFunction(view.controllerUrl) ? view.controllerUrl(params) : view.controllerUrl
	                        url = url instanceof Array ? url : [url]
	                        avalon.controller.loader(url, function ($ctrl) {
	                            promise.then(function () {
	                                callback($ctrl)
	                                rs()
	                            })
	                        })
	                    })
	                } else if (view.controllerProvider) {
	                    var res = avalon.isFunction(view.controllerProvider) ? view.controllerProvider(params) : view.controllerProvider
	                    prom = getPromise(function (rs, rj) {
	                        // if promise
	                        if (res && res.then) {
	                            _data.push(res)
	                            res.then(function (r) {
	                                promise.then(function () {
	                                    callback(r)
	                                    rs()
	                                })
	                            }, function (e) {
	                                reason.message = e
	                                rj(reason)
	                            })
	                            // error msg
	                        } else {
	                            promise.then(function () {
	                                callback(res)
	                                rs()
	                            })
	                        }
	                    })
	                }
	                // is promise
	                if (prom && prom.then) {
	                    promises.push(prom)
	                }
	            })
	            // 模板和controller就绪
	            getPromise(promises).$then(function (values) {
	                state._local = _local
	                // 数据就绪
	                getPromise(_data).$then(function () {
	                    avalon.each(_callbacks, function (i, func) {
	                        func()
	                    })
	                    promises = _data = _callbacks = null
	                    _resovle()
	                })
	            })
	            return state.resolved
	
	        }, state)
	
	        return this
	    }
	
	    function isError(e) {
	        return e instanceof Error
	    }
	
	    // 将所有的promise error适配到这里来
	    function promiseError(e) {
	        if (isError(e)) {
	            throw e
	        } else {
	            callStateFunc("onError", mmState, e, e && e.state)
	        }
	    }
	
	    function getPromise(excutor) {
	        var prom = avalon.isFunction(excutor) ? new Promise(excutor) : Promise.all(excutor)
	        return prom
	    }
	    Promise.prototype.$then = function (onFulfilled, onRejected) {
	        var prom = this.then(onFulfilled, onRejected)
	        prom["catch"](promiseError)
	        return prom
	    }
	    avalon.state.onViewEntered = function (newNode, oldNode) {
	        if (newNode != oldNode)
	            oldNode.parentNode.removeChild(oldNode)
	    }
	    /*
	     *  @interface avalon.state.config 全局配置
	     *  @param {Object} config 配置对象
	     *  @param {Function} config.onBeforeUnload 开始切前的回调，this指向router对象，第一个参数是fromState，第二个参数是toState，return false可以用来阻止切换进行
	     *  @param {Function} config.onAbort onBeforeUnload return false之后，触发的回调，this指向mmState对象，参数同onBeforeUnload
	     *  @param {Function} config.onUnload url切换时候触发，this指向mmState对象，参数同onBeforeUnload
	     *  @param {Function} config.onBegin  开始切换的回调，this指向mmState对象，参数同onBeforeUnload，如果配置了onBegin，则忽略begin
	     *  @param {Function} config.onLoad 切换完成并成功，this指向mmState对象，参数同onBeforeUnload
	     *  @param {Function} config.onViewEnter 视图插入动画函数，有一个默认效果
	     *  @param {Node} config.onViewEnter.arguments[0] 新视图节点
	     *  @param {Node} config.onViewEnter.arguments[1] 旧的节点
	     *  @param {Function} config.onError 出错的回调，this指向对应的state，第一个参数是一个object，object.type表示出错的类型，比如view表示加载出错，object.name则对应出错的view name，object.xhr则是当使用默认模板加载器的时候的httpRequest对象，第二个参数是对应的state
	     */
	    avalon.state.config = function (config) {
	        avalon.mix(avalon.state, config || {})
	        return avalon
	    }
	    function callStateFunc(name, state) {
	        Event.$fire.apply(Event, arguments)
	        return avalon.state[name] ? avalon.state[name].apply(state || mmState.currentState, [].slice.call(arguments, 2)) : 0
	    }
	    // 状态原型，所有的状态都要继承这个原型
	    function StateModel(stateName, options) {
	        if (this instanceof StateModel) {
	            this.stateName = stateName
	            this.formate(options)
	        } else {
	            var state = _states[stateName] = new StateModel(stateName, options || {})
	            return state
	        }
	    }
	    StateModel.is = function (state) {
	        return state instanceof StateModel
	    }
	    StateModel.prototype = {
	        formate: function (options) {
	            avalon.mix(true, this, options)
	            var stateName = this.stateName,
	                    me = this,
	                    chain = stateName.split("."),
	                    len = chain.length - 1,
	                    sourceLocal = me.sourceLocal = {}
	            this.chain = []
	            avalon.each(chain, function (key, name) {
	                if (key == len) {
	                    me.chain.push(me)
	                } else {
	                    var n = chain.slice(0, key + 1).join("."),
	                            state = getStateByName(n)
	                    if (!state)
	                        throw new Error("必须先定义" + n)
	                    me.chain.push(state)
	                }
	            })
	            if (this.url === void 0) {
	                this.abstract = true
	            }
	            var parent = this.chain[len - 1] || _root
	            if (parent) {
	                this.url = parent.url + (this.url || "")
	                this.parentState = parent
	            }
	            if (!this.views && stateName != "") {
	                var view = {}
	                "template,templateUrl,templateProvider,controller,controllerUrl,controllerProvider,viewCache".replace(/\w+/g, function (prop) {
	                    copyTemplateProperty(view, me, prop)
	                })
	                var viewname = "viewname" in this ? this.viewname : ""
	                this.views = {}
	                this.views[viewname] = view
	            }
	            var views = {},
	                    viewsIsArray = this.views instanceof Array // 如果是一个数组
	
	            avalon.each(this.views, function (maybeName, view) {
	                var name = viewsIsArray ? view.name || "" : maybeName // 默认缺省
	                if (name.indexOf("@") < 0) {
	                    name += "@" + (parent ? parent.stateName || "" : "")
	                }
	                views[name] = view
	                sourceLocal[name] = {}
	            })
	            this.views = views
	            this._self = options
	            this._pending = false
	            this.visited = false
	            this.params = inherit(parent && parent.params || {})
	            this.oldParams = {}
	            this.keys = []
	
	            this.events = {}
	        },
	        watch: function (eventName, func) {
	            var events = this.events[eventName] || []
	            this.events[eventName] = events
	            events.push(func)
	            return func
	        },
	        fire: function (eventName, state) {
	            var events = this.events[eventName] || [], i = 0
	            while (events[i]) {
	                var res = events[i].apply(this, [].slice.call(arguments, 1))
	                if (res === false) {
	                    events.splice(i, 1)
	                } else {
	                    i++
	                }
	            }
	        },
	        unwatch: function (eventName, func) {
	            var events = this.events[eventName]
	            if (!events)
	                return
	            var i = 0
	            while (events[i]) {
	                if (events[i] == func)
	                    return events.splice(i, 1)
	                i++
	            }
	        },
	        paramsChanged: function (toParams) {
	            var changed = false, keys = this.keys, me = this, params = this.params
	            avalon.each(keys, function (index, item) {
	                var key = item.name
	                if (params[key] != toParams[key])
	                    changed = "param"
	            })
	            // query
	            if (!changed && mmState.currentState === this) {
	                changed = !objectCompare(toParams.query, mmState.query) && "query"
	            }
	            return changed
	        },
	        filterParams: function (toParams) {
	            var params = avalon.mix(true, {}, this.params), keys = this.keys
	            avalon.each(keys, function (index, item) {
	                params[item.name] = toParams[item.name]
	            })
	            return params
	        },
	        syncParams: function (toParams) {
	            var me = this
	            avalon.each(this.keys, function (index, item) {
	                var key = item.name
	                if (key in toParams)
	                    me.params[key] = toParams[key]
	            })
	        },
	        _onEnter: function () {
	            this.query = this.getQuery()
	            var me = this,
	                    arg = Array.prototype.slice.call(arguments),
	                    done = me._async(),
	                    prom = getPromise(function (rs, rj) {
	                        var reason = {
	                            type: "data",
	                            state: me,
	                            params: me.params
	                        },
	                        _reject = function (message) {
	                            reason.message = message
	                            done.apply(me, [false])
	                            rj(reason)
	                        },
	                                _resovle = function () {
	                                    done.apply(me)
	                                    rs()
	                                },
	                                res = me.onEnter.apply(me, arg.concat([_resovle, _reject]))
	                        // if promise
	                        if (res && res.then) {
	                            res.then(_resovle)["catch"](promiseError)
	                            // error msg
	                        } else if (res && res !== true) {
	                            _reject(res)
	                        } else if (res === undefine) {
	                            _resovle()
	                        }
	                        // res === false will pause here
	                    })
	        },
	        /*
	         * @interface state.getQuery 获取state的query，等价于state.query
	         *<pre>
	         *  onEnter: function() {
	         *      var query = this.getQuery()
	         *      or
	         *      this.query
	         *  }
	         *</pre> 
	         */
	        getQuery: function () {
	            return mmState.query
	        },
	        /*
	         * @interface state.getParams 获取state的params，等价于state.params
	         *<pre>
	         *  onEnter: function() {
	         *      var params = this.getParams()
	         *      or
	         *      this.params
	         *  }
	         *</pre> 
	         */
	        getParams: function () {
	            return this.params
	        },
	        _async: function () {
	            // 没有done回调的时候，防止死球
	            if (this.done)
	                this._pending = true
	            return this.done || avalon.noop
	        },
	        onBeforeEnter: avalon.noop, // 切入某个state之前触发
	        onEnter: avalon.noop, // 切入触发
	        onBeforeExit: avalon.noop, // state退出前触发
	        onExit: avalon.noop // 退出后触发
	    }
	
	    _root = StateModel("", {
	        url: "",
	        views: null,
	        "abstract": true
	    })
	
	    /*
	     * @interface avalon.controller 给avalon.state视图对象配置控制器
	     * @param name 控制器名字
	     * @param {Function} factory 控制器函数，传递一个内部生成的控制器对象作为参数
	     * @param {Object} factory.arguments[0] $ctrl 控制器的第一个参数：实际生成的控制器对象
	     * @param {Object} $ctrl.$vmodels 给视图指定一个scan的vmodels数组，实际scan的时候$vmodels.concat(dom树上下文继承的vmodels)
	     * @param {Function} $ctrl.$onBeforeUnload 该视图被卸载前触发，return false可以阻止视图卸载，并阻止跳转
	     * @param {Function} $ctrl.$onEnter 给该视图加载数据，可以返回false，或任意不为true的错误信息或一个promise对象，传递3个参数
	     * @param {Object} $ctrl.$onEnter.arguments[0] params第一个参数：视图所属的state的参数
	     * @param {Function} $ctrl.$onEnter.arguments[1] resolve $onEnter 第二个参数：return false的时候，进入同步等待，直到手动调用resolve
	     * @param {Function} $ctrl.$onEnter.arguments[2] reject 第三个参数：数据加载失败，调用
	     * @param {Function} $ctrl.$onRendered 视图元素scan完成之后，调用
	     */
	    avalon.controller = function () {
	        var first = arguments[0],
	                second = arguments[1]
	        if (first && (first instanceof _controller))
	            return first
	        var $ctrl = _controller()
	        if (avalon.isFunction(first)) {
	            first($ctrl)
	        } else if (avalon.isFunction(second)) {
	            $ctrl.name = first
	            second($ctrl)
	        } else if (typeof first == "string" || typeof first == "object") {
	            first = first instanceof Array ? first : Array.prototype.slice.call(arguments)
	            avalon.each(first, function (index, item) {
	                if (typeof item == "string") {
	                    first[index] = avalon.vmodels[item]
	                }
	                item = first[index]
	                if ("$onRendered" in item)
	                    $ctrl.$onRendered = item["$onRendered"]
	                if ("$onEnter" in  item)
	                    $ctrl.$onEnter = item["$onEnter"]
	            })
	            $ctrl.$vmodels = first
	        } else {
	            throw new Error("参数错误" + arguments)
	        }
	        return $ctrl
	    }
	    /*
	     *  @interface avalon.controller.loader avalon.controller异步引入模块的加载器，默认是通过avalon.require加载
	     */
	    avalon.controller.loader = function (url, callback) {
	        // 没有错误回调...
	        avalon.require(url, function ($ctrl) {
	            callback && callback($ctrl)
	        })
	    }
	
	    function _controller() {
	        if (!(this instanceof _controller))
	            return new _controller
	        this.$vmodels = []
	    }
	    _controller.prototype = {
	    }
	
	    function objectCompare(objA, objB) {
	        for (var i in objA) {
	            if (!(i in objB) || objA[i] !== objB[i])
	                return false
	        }
	        for (var i in objB) {
	            if (!(i in objA) || objA[i] !== objB[i])
	                return false
	        }
	        return true
	    }
	
	    //【avalon.state】的辅助函数，确保返回的是函数
	    function getFn(object, name) {
	        return typeof object[name] === "function" ? object[name] : avalon.noop
	    }
	
	    function getStateByName(stateName) {
	        return _states[stateName]
	    }
	    function getViewNodes(node, query) {
	        var nodes, query = query || "ms-view"
	        if (node.querySelectorAll) {
	            nodes = node.querySelectorAll("[" + query + "]")
	        } else {
	            nodes = Array.prototype.filter.call(node.getElementsByTagName("*"), function (node) {
	                return typeof node.getAttribute(query) === "string"
	            })
	        }
	        return nodes
	    }
	
	    // 【avalon.state】的辅助函数，opts.template的处理函数
	    function fromString(template, params, reason) {
	        var promise = getPromise(function (resolve, reject) {
	            var str = typeof template === "function" ? template(params) : template
	            if (typeof str == "string") {
	                resolve(str)
	            } else {
	                reason.message = "template必须对应一个字符串或一个返回字符串的函数"
	                reject(reason)
	            }
	        })
	        return promise
	    }
	    // 【fromUrl】的辅助函数，得到一个XMLHttpRequest对象
	    var getXHR = function () {
	        return new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP")
	    }/*
	     *  @interface avalon.state.templateLoader 通过url异步加载模板的函数，默认是通过内置的httpRequest去加载，但是在node-webkit环境是不work的，因此开放了这个配置，用以自定义url模板加载器，会在一个promise实例里调用这个方法去加载模板
	     *  @param url 模板地址
	     *  @param resolve 加载成功，如果需要缓存模板，请调用<br>
	     resolve(avalon.templateCache[url] = templateString)<br>
	     否则，请调用<br>
	     resolve(templateString)<br>
	     *  @param reject 加载失败，请调用reject(reason)
	     *  @param reason 挂在失败原因的对象
	     */
	    avalon.state.templateLoader = function (url, resolve, reject, reason) {
	        var xhr = getXHR()
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                var status = xhr.status;
	                if (status > 399 && status < 600) {
	                    reason.message = "templateUrl对应资源不存在或没有开启 CORS"
	                    reason.status = status
	                    reason.xhr = xhr
	                    reject(reason)
	                } else {
	                    resolve(avalon.templateCache[url] = xhr.responseText)
	                }
	            }
	        }
	        xhr.open("GET", url, true)
	        if ("withCredentials" in xhr) {
	            xhr.withCredentials = true
	        }
	        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
	        xhr.send()
	    }
	    // 【avalon.state】的辅助函数，opts.templateUrl的处理函数
	    function fromUrl(url, params, reason) {
	        var promise = getPromise(function (resolve, reject) {
	            if (typeof url === "function") {
	                url = url(params)
	            }
	            if (typeof url !== "string") {
	                reason.message = "templateUrl必须对应一个URL"
	                return reject(reason)
	            }
	            if (avalon.templateCache[url]) {
	                return  resolve(avalon.templateCache[url])
	            }
	            avalon.state.templateLoader(url, resolve, reject, reason)
	        })
	        return promise
	    }
	    // 【avalon.state】的辅助函数，opts.templateProvider的处理函数
	    function fromProvider(fn, params, reason) {
	        var promise = getPromise(function (resolve, reject) {
	            if (typeof fn === "function") {
	                var ret = fn(params)
	                if (ret && ret.then || typeof ret == "string") {
	                    resolve(ret)
	                } else {
	                    reason.message = "templateProvider为函数时应该返回一个Promise或thenable对象或字符串"
	                    reject(reason)
	                }
	            } else if (fn && fn.then) {
	                resolve(fn)
	            } else {
	                reason.message = "templateProvider不为函数时应该对应一个Promise或thenable对象"
	                reject(reason)
	            }
	        })
	        return promise
	    }
	    // 【avalon.state】的辅助函数，将template或templateUrl或templateProvider转换为可用的Promise对象
	    function fromPromise(config, params, reason) {
	        return config.template ? fromString(config.template, params, reason) :
	                config.templateUrl ? fromUrl(config.templateUrl, params, reason) :
	                config.templateProvider ? fromProvider(config.templateProvider, params, reason) :
	                getPromise(function (resolve, reject) {
	                    reason.message = "必须存在template, templateUrl, templateProvider中的一个"
	                    reject(reason)
	                })
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
	    function Router() {
	        var table = {}
	        "get,post,delete,put".replace(avalon.rword, function(name) {
	            table[name] = []
	        })
	        this.routingTable = table
	    }
	
	    function parseQuery(url) {
	        var array = url.split("?"), query = {}, path = array[0], querystring = array[1]
	        if (querystring) {
	            var seg = querystring.split("&"),
	                    len = seg.length, i = 0, s;
	            for (; i < len; i++) {
	                if (!seg[i]) {
	                    continue
	                }
	                s = seg[i].split("=")
	                query[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
	            }
	        }
	        return {
	            path: path,
	            query: query
	        }
	    }
	
	
	    function queryToString(obj) {
	        if(typeof obj == 'string') return obj
	        var str = []
	        for(var i in obj) {
	            if(i == "query") continue
	            str.push(i + '=' + encodeURIComponent(obj[i]))
	        }
	        return str.length ? '?' + str.join("&") : ''
	    }
	
	    var placeholder = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g
	    Router.prototype = {
	        error: function(callback) {
	            this.errorback = callback
	        },
	        _pathToRegExp: function(pattern, opts) {
	            var keys = opts.keys = [],
	                    //      segments = opts.segments = [],
	                    compiled = '^', last = 0, m, name, regexp, segment;
	
	            while ((m = placeholder.exec(pattern))) {
	                name = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
	                regexp = m[4] || (m[1] == '*' ? '.*' : 'string')
	                segment = pattern.substring(last, m.index);
	                var type = this.$types[regexp]
	                var key = {
	                    name: name
	                }
	                if (type) {
	                    regexp = type.pattern
	                    key.decode = type.decode
	                }
	                keys.push(key)
	                compiled += quoteRegExp(segment, regexp, false)
	                //  segments.push(segment)
	                last = placeholder.lastIndex
	            }
	            segment = pattern.substring(last);
	            compiled += quoteRegExp(segment) + (opts.strict ? opts.last : "\/?") + '$';
	            var sensitive = typeof opts.caseInsensitive === "boolean" ? opts.caseInsensitive : true
	            //  segments.push(segment);
	            opts.regexp = new RegExp(compiled, sensitive ? 'i' : undefined);
	            return opts
	
	        },
	        //添加一个路由规则
	        add: function(method, path, callback, opts) {
	            var array = this.routingTable[method.toLowerCase()]
	            if (path.charAt(0) !== "/") {
	                throw "path必须以/开头"
	            }
	            opts = opts || {}
	            opts.callback = callback
	            if (path.length > 2 && path.charAt(path.length - 1) === "/") {
	                path = path.slice(0, -1)
	                opts.last = "/"
	            }
	            avalon.Array.ensure(array, this._pathToRegExp(path, opts))
	        },
	        //判定当前URL与已有状态对象的路由规则是否符合
	        route: function(method, path, query) {
	            path = path.trim()
	            var states = this.routingTable[method]
	            for (var i = 0, el; el = states[i++]; ) {
	                var args = path.match(el.regexp)
	                if (args) {
	                    el.query = query || {}
	                    el.path = path
	                    el.params = {}
	                    var keys = el.keys
	                    args.shift()
	                    if (keys.length) {
	                        this._parseArgs(args, el)
	                    }
	                    return  el.callback.apply(el, args)
	                }
	            }
	            if (this.errorback) {
	                this.errorback()
	            }
	        },
	        _parseArgs: function(match, stateObj) {
	            var keys = stateObj.keys
	            for (var j = 0, jn = keys.length; j < jn; j++) {
	                var key = keys[j]
	                var value = match[j] || ""
	                if (typeof key.decode === "function") {//在这里尝试转换参数的类型
	                    var val = key.decode(value)
	                } else {
	                    try {
	                        val = JSON.parse(value)
	                    } catch (e) {
	                        val = value
	                    }
	                }
	                match[j] = stateObj.params[key.name] = val
	            }
	        },
	        getLastPath: function() {
	            return getCookie("msLastPath")
	        },
	        setLastPath: function(path) {
	            setCookie("msLastPath", path)
	        },
	        /*
	         *  @interface avalon.router.redirect
	         *  @param hash 访问的url hash
	         */
	        redirect: function(hash) {
	            this.navigate(hash, {replace: true})
	        },
	        /*
	         *  @interface avalon.router.navigate
	         *  @param hash 访问的url hash
	         *  @param options 扩展配置
	         *  @param options.replace true替换history，否则生成一条新的历史记录
	         *  @param options.silent true表示只同步url，不触发url变化监听绑定
	        */
	        navigate: function(hash, options) {
	            var parsed = parseQuery((hash.charAt(0) !== "/" ? "/" : "") + hash),
	                options = options || {}
	            if(hash.charAt(0) === "/")
	                hash = hash.slice(1)// 修正出现多扛的情况 fix http://localhost:8383/mmRouter/index.html#!//
	            // 在state之内有写history的逻辑
	            if(!avalon.state || options.silent) avalon.history && avalon.history.updateLocation(hash, avalon.mix({}, options, {silent: true}))
	            // 只是写历史而已
	            if(!options.silent) {
	                this.route("get", parsed.path, parsed.query, options)
	            }
	        },
	        /*
	         *  @interface avalon.router.when 配置重定向规则
	         *  @param path 被重定向的表达式，可以是字符串或者数组
	         *  @param redirect 重定向的表示式或者url
	        */
	        when: function(path, redirect) {
	            var me = this,
	                path = path instanceof Array ? path : [path]
	            avalon.each(path, function(index, p) {
	                me.add("get", p, function() {
	                    var info = me.urlFormate(redirect, this.params, this.query)
	                    me.navigate(info.path + info.query, {replace: true})
	                })
	            })
	            return this
	        },
	        /*
	         *  @interface avalon.router.get 添加一个router规则
	         *  @param path url表达式
	         *  @param callback 对应这个url的回调
	        */
	        get: function(path, callback) {},
	        urlFormate: function(url, params, query) {
	            var query = query ? queryToString(query) : "",
	                hash = url.replace(placeholder, function(mat) {
	                    var key = mat.replace(/[\{\}]/g, '').split(":")
	                    key = key[0] ? key[0] : key[1]
	                    return params[key] !== undefined ? params[key] : ''
	                }).replace(/^\//g, '')
	            return {
	                path: hash,
	                query: query
	            }
	        },
	        /* *
	         `'/hello/'` - 匹配'/hello/'或'/hello'
	         `'/user/:id'` - 匹配 '/user/bob' 或 '/user/1234!!!' 或 '/user/' 但不匹配 '/user' 与 '/user/bob/details'
	         `'/user/{id}'` - 同上
	         `'/user/{id:[^/]*}'` - 同上
	         `'/user/{id:[0-9a-fA-F]{1,8}}'` - 要求ID匹配/[0-9a-fA-F]{1,8}/这个子正则
	         `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
	         path into the parameter 'path'.
	         `'/files/*path'` - ditto.
	         */
	        // avalon.router.get("/ddd/:dddID/",callback)
	        // avalon.router.get("/ddd/{dddID}/",callback)
	        // avalon.router.get("/ddd/{dddID:[0-9]{4}}/",callback)
	        // avalon.router.get("/ddd/{dddID:int}/",callback)
	        // 我们甚至可以在这里添加新的类型，avalon.router.$type.d4 = { pattern: '[0-9]{4}', decode: Number}
	        // avalon.router.get("/ddd/{dddID:d4}/",callback)
	        $types: {
	            date: {
	                pattern: "[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])",
	                decode: function(val) {
	                    return new Date(val.replace(/\-/g, "/"))
	                }
	            },
	            string: {
	                pattern: "[^\\/]*"
	            },
	            bool: {
	                decode: function(val) {
	                    return parseInt(val, 10) === 0 ? false : true;
	                },
	                pattern: "0|1"
	            },
	            int: {
	                decode: function(val) {
	                    return parseInt(val, 10);
	                },
	                pattern: "\\d+"
	            }
	        }
	    }
	
	    "get,put,delete,post".replace(avalon.rword, function(method) {
	        return  Router.prototype[method] = function(a, b, c) {
	            this.add(method, a, b, c)
	        }
	    })
	    function quoteRegExp(string, pattern, isOptional) {
	        var result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
	        if (!pattern)
	            return result;
	        var flag = isOptional ? '?' : '';
	        return result + flag + '(' + pattern + ')' + flag;
	    }
	    function supportLocalStorage() {
	        try {
	            localStorage.setItem("avalon", 1)
	            localStorage.removeItem("avalon")
	            return true
	        } catch (e) {
	            return false
	        }
	    }
	
	    if (supportLocalStorage()) {
	        Router.prototype.getLastPath = function() {
	            return localStorage.getItem("msLastPath")
	        }
	        var cookieID
	        Router.prototype.setLastPath = function (path) {
	            if (cookieID) {
	                clearTimeout(cookieID)
	                cookieID = null
	            }
	            localStorage.setItem("msLastPath", path)
	            cookieID = setTimeout(function () {
	                localStorage.removItem("msLastPath")
	            }, 1000 * 60 * 60 * 24)
	        }
	    }
	
	       
	
	    function escapeCookie(value) {
	        return String(value).replace(/[,;"\\=\s%]/g, function(character) {
	            return encodeURIComponent(character)
	        });
	    }
	    function setCookie(key, value) {
	        var date = new Date()//将date设置为1天以后的时间 
	        date.setTime(date.getTime() + 1000 * 60 * 60 * 24)
	        document.cookie = escapeCookie(key) + '=' + escapeCookie(value) + ";expires=" + date.toGMTString()
	    }
	    function getCookie(name) {
	        var m = String(document.cookie).match(new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')) || ["", ""]
	        return decodeURIComponent(m[1])
	    }
	
	    avalon.router = new Router
	
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/*
	 <!DOCTYPE html>
	 <html>
	 <head>
	 <meta charset="utf-8">
	 <title>路由系统</title>
	 <script src="avalon.js"></script>
	 <script>
	 require(["mmRouter"], function() {
	 var model = avalon.define('xxx', function(vm) {
	 vm.currPath = ""
	 })
	 avalon.router.get("/aaa", function(a) {
	 model.currPath = this.path
	 })
	 avalon.router.get("/bbb", function(a) {
	 model.currPath = this.path
	 })
	 avalon.router.get("/ccc", function(a) {
	 model.currPath = this.path
	 })
	 avalon.router.get("/ddd/:ddd", function(a) {//:ddd为参数
	 avalon.log(a)
	 model.currPath = this.path
	 })
	 avalon.router.get("/eee", function(a) {
	 model.currPath = this.path
	 })
	 avalon.history.start({
	 html5Mode: true,
	 basepath: "/avalon"
	 })
	 avalon.scan()
	 })
	 </script>
	 </head>
	 <body >
	 <div ms-controller="xxx">
	 <ul>
	 <li><a href="#!/aaa">aaa</a></li>
	 <li><a href="#!/bbb">bbb</a></li>
	 <li><a href="#!/ccc">ccc</a></li>
	 <li><a href="#!/ddd/222">ddd</a></li>
	 <li><a href="#!/eee">eee</a></li>
	 </ul>
	 <div style="color:red">{{currPath}}</div>
	 <div style="height: 600px;width:1px;">
	 
	 </div>
	 <p id="eee">会定位到这里</p>
	 </div>
	 
	 </body>
	 </html>
	 
	 */


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var anchorElement = document.createElement('a')
	
	    var History = avalon.History = function() {
	        this.location = location
	    }
	
	    History.started = false
	    //取得当前IE的真实运行环境
	    History.IEVersion = (function() {
	        var mode = document.documentMode
	        return mode ? mode : window.XMLHttpRequest ? 7 : 6
	    })()
	
	    History.defaults = {
	        basepath: "/",
	        html5Mode: false,
	        hashPrefix: "!",
	        iframeID: null, //IE6-7，如果有在页面写死了一个iframe，这样似乎刷新的时候不会丢掉之前的历史
	        interval: 50, //IE6-7,使用轮询，这是其时间时隔
	        fireAnchor: true,//决定是否将滚动条定位于与hash同ID的元素上
	        routeElementJudger: avalon.noop // 判断a元素是否是触发router切换的链接
	    }
	
	    var oldIE = window.VBArray && History.IEVersion <= 7
	    var supportPushState = !!(window.history.pushState)
	    var supportHashChange = !!("onhashchange" in window && (!window.VBArray || !oldIE))
	    History.prototype = {
	        constructor: History,
	        getFragment: function(fragment) {
	            if (fragment == null) {
	                if (this.monitorMode === "popstate") {
	                    fragment = this.getPath()
	                } else {
	                    fragment = this.getHash()
	                }
	            }
	            return fragment.replace(/^[#\/]|\s+$/g, "")
	        },
	        getHash: function(window) {
	            // IE6直接用location.hash取hash，可能会取少一部分内容
	            // 比如 http://www.cnblogs.com/rubylouvre#stream/xxxxx?lang=zh_c
	            // ie6 => location.hash = #stream/xxxxx
	            // 其他浏览器 => location.hash = #stream/xxxxx?lang=zh_c
	            // firefox 会自作多情对hash进行decodeURIComponent
	            // 又比如 http://www.cnblogs.com/rubylouvre/#!/home/q={%22thedate%22:%2220121010~20121010%22}
	            // firefox 15 => #!/home/q={"thedate":"20121010~20121010"}
	            // 其他浏览器 => #!/home/q={%22thedate%22:%2220121010~20121010%22}
	            var path = (window || this).location.href
	            return this._getHash(path.slice(path.indexOf("#")))
	        },
	        _getHash: function(path) {
	            if (path.indexOf("#/") === 0) {
	                return decodeURIComponent(path.slice(2))
	            }
	            if (path.indexOf("#!/") === 0) {
	                return decodeURIComponent(path.slice(3))
	            }
	            return ""
	        },
	        getPath: function() {
	            var path = decodeURIComponent(this.location.pathname + this.location.search)
	            var root = this.basepath.slice(0, -1)
	            if (!path.indexOf(root))
	                path = path.slice(root.length)
	            return path.slice(1)
	        },
	        _getAbsolutePath: function(a) {
	            return !a.hasAttribute ? a.getAttribute("href", 4) : a.href
	        },
	        /*
	         * @interface avalon.history.start 开始监听历史变化
	         * @param options 配置参数
	         * @param options.hashPrefix hash以什么字符串开头，默认是 "!"，对应实际效果就是"#!"
	         * @param options.routeElementJudger 判断a元素是否是触发router切换的链接的函数，return true则触发切换，默认为avalon.noop，history内部有一个判定逻辑，是先判定a元素的href属性是否以hashPrefix开头，如果是则当做router切换元素，因此综合判定规则是 href.indexOf(hashPrefix) == 0 || routeElementJudger(ele, ele.href)，如果routeElementJudger返回true则跳转至href，如果返回的是字符串，则跳转至返回的字符串，如果返回false则返回浏览器默认行为
	         * @param options.html5Mode 是否采用html5模式，即不使用hash来记录历史，默认false
	         * @param options.fireAnchor 决定是否将滚动条定位于与hash同ID的元素上，默认为true
	         * @param options.basepath 根目录，默认为"/"
	         */
	        start: function(options) {
	            if (History.started)
	                throw new Error("avalon.history has already been started")
	            History.started = true
	            this.options = avalon.mix({}, History.defaults, options)
	            //IE6不支持maxHeight, IE7支持XMLHttpRequest, IE8支持window.Element，querySelector, 
	            //IE9支持window.Node, window.HTMLElement, IE10不支持条件注释
	            //确保html5Mode属性存在,并且是一个布尔
	            this.html5Mode = !!this.options.html5Mode
	            //监听模式
	            this.monitorMode = this.html5Mode ? "popstate" : "hashchange"
	            if (!supportPushState) {
	                if (this.html5Mode) {
	                    avalon.log("如果浏览器不支持HTML5 pushState，强制使用hash hack!")
	                    this.html5Mode = false
	                }
	                this.monitorMode = "hashchange"
	            }
	            if (!supportHashChange) {
	                this.monitorMode = "iframepoll"
	            }
	            this.prefix = "#" + this.options.hashPrefix + "/"
	            //确认前后都存在斜线， 如"aaa/ --> /aaa/" , "/aaa --> /aaa/", "aaa --> /aaa/", "/ --> /"
	            this.basepath = ("/" + this.options.basepath + "/").replace(/^\/+|\/+$/g, "/")  // 去最左右两边的斜线
	
	            this.fragment = this.getFragment()
	
	            anchorElement.href = this.basepath
	            this.rootpath = this._getAbsolutePath(anchorElement)
	            var that = this
	
	            var html = '<!doctype html><html><body>@</body></html>'
	            if (this.options.domain) {
	                html = html.replace("<body>", "<script>document.domain =" + this.options.domain + "</script><body>")
	            }
	            this.iframeHTML = html
	            if (this.monitorMode === "iframepoll") {
	                //IE6,7在hash改变时不会产生历史，需要用一个iframe来共享历史
	                avalon.ready(function() {
	                    if(that.iframe) return
	                    var iframe = that.iframe || document.getElementById(that.iframeID) || document.createElement('iframe')
	                    iframe.src = 'javascript:0'
	                    iframe.style.display = 'none'
	                    iframe.tabIndex = -1
	                    document.body.appendChild(iframe)
	                    that.iframe = iframe.contentWindow
	                    that._setIframeHistory(that.prefix + that.fragment)
	                })
	
	            }
	
	            // 支持popstate 就监听popstate
	            // 支持hashchange 就监听hashchange
	            // 否则的话只能每隔一段时间进行检测了
	            function checkUrl(e) {
	                var iframe = that.iframe
	                if (that.monitorMode === "iframepoll" && !iframe) {
	                    return false
	                }
	                var pageHash = that.getFragment(), hash
	                if (iframe) {//IE67
	                    var iframeHash = that.getHash(iframe)
	                    //与当前页面hash不等于之前的页面hash，这主要是用户通过点击链接引发的
	                    if (pageHash !== that.fragment) {
	                        that._setIframeHistory(that.prefix + pageHash)
	                        hash = pageHash
	                        //如果是后退按钮触发hash不一致
	                    } else if (iframeHash !== that.fragment) {
	                        that.location.hash = that.prefix + iframeHash
	                        hash = iframeHash
	                    }
	
	                } else if (pageHash !== that.fragment) {
	                    hash = pageHash
	                }
	                if (hash !== void 0) {
	                    that.fragment = hash
	                    that.fireRouteChange(hash, {fromHistory: true})
	                }
	            }
	
	            //thanks https://github.com/browserstate/history.js/blob/master/scripts/uncompressed/history.html4.js#L272
	
	            // 支持popstate 就监听popstate
	            // 支持hashchange 就监听hashchange(IE8,IE9,FF3)
	            // 否则的话只能每隔一段时间进行检测了(IE6, IE7)
	            switch (this.monitorMode) {
	                case "popstate":
	                    this.checkUrl = avalon.bind(window, "popstate", checkUrl)
	                    this._fireLocationChange = checkUrl
	                    break
	                case  "hashchange":
	                    this.checkUrl = avalon.bind(window, "hashchange", checkUrl)
	                    break;
	                case  "iframepoll":
	                    this.checkUrl = setInterval(checkUrl, this.options.interval)
	                    break;
	            }
	            //根据当前的location立即进入不同的路由回调
	            avalon.ready(function() {
	                that.fireRouteChange(that.fragment || "/", {replace: true})
	            })
	        },
	        fireRouteChange: function(hash, options) {
	            var router = avalon.router
	            if (router && router.navigate) {
	                router.setLastPath(hash)
	                router.navigate(hash === "/" ? hash : "/" + hash, options)
	            }
	            if (this.options.fireAnchor) {
	                scrollToAnchorId(hash.replace(/\?.*/g,""))
	            }
	        },
	        // 中断URL的监听
	        stop: function() {
	            avalon.unbind(window, "popstate", this.checkUrl)
	            avalon.unbind(window, "hashchange", this.checkUrl)
	            clearInterval(this.checkUrl)
	            History.started = false
	        },
	        updateLocation: function(hash, options, urlHash) {
	            var options = options || {},
	                rp = options.replace,
	                st =    options.silent
	            if (this.monitorMode === "popstate") {
	                // html5 mode 第一次加载的时候保留之前的hash
	                var path = this.rootpath + hash + (urlHash || "")
	                // html5 model包含query
	                if(path != this.location.href.split("#")[0]) history[rp ? "replaceState" : "pushState"]({path: path}, document.title, path)
	                if(!st) this._fireLocationChange()
	            } else {
	                var newHash = this.prefix + hash
	                if(st && hash != this.getHash()) {
	                    this._setIframeHistory(newHash, rp)
	                    if(this.fragment) avalon.router.setLastPath(this.fragment)
	                    this.fragment = this._getHash(newHash)
	                }
	                this._setHash(this.location, newHash, rp)
	            }
	        },
	        _setHash: function(location, hash, replace){
	            var href = location.href.replace(/(javascript:|#).*$/, '')
	            if (replace){
	                location.replace(href + hash)
	            }
	            else location.hash = hash
	        },
	        _setIframeHistory: function(hash, replace) {
	            if(!this.iframe) return
	            var idoc = this.iframe.document
	                idoc.open()
	                idoc.write(this.iframeHTML)
	                idoc.close()
	            this._setHash(idoc.location, hash, replace)
	        }
	    }
	
	    avalon.history = new History
	
	    //https://github.com/asual/jquery-address/blob/master/src/jquery.address.js
	
	    //劫持页面上所有点击事件，如果事件源来自链接或其内部，
	    //并且它不会跳出本页，并且以"#/"或"#!/"开头，那么触发updateLocation方法
	    avalon.bind(document, "click", function(event) {
	        var defaultPrevented = "defaultPrevented" in event ? event['defaultPrevented'] : event.returnValue === false,
	            routeElementJudger = avalon.history.options.routeElementJudger
	        if (defaultPrevented || event.ctrlKey || event.metaKey || event.which === 2)
	            return
	        var target = event.target
	        while (target.nodeName !== "A") {
	            target = target.parentNode
	            if (!target || target.tagName === "BODY") {
	                return
	            }
	        }
	
	        if (targetIsThisWindow(target.target)) {
	            var href = oldIE ? target.getAttribute("href", 2) : target.getAttribute("href") || target.getAttribute("xlink:href")
	            var prefix = avalon.history.prefix
	            if (href === null) { // href is null if the attribute is not present
	                return
	            }
	            var hash = href.replace(prefix, "").trim()
	            if(!(href.indexOf(prefix) === 0 && hash !== "")) {
	                hash = routeElementJudger(target, href)
	                if(hash === true) hash = href
	            }
	            if (hash) {
	                event.preventDefault()
	                avalon.router && avalon.router.navigate(hash)
	            }
	        }
	    })
	
	    //判定A标签的target属性是否指向自身
	    //thanks https://github.com/quirkey/sammy/blob/master/lib/sammy.js#L219
	    function targetIsThisWindow(targetWindow) {
	        if (!targetWindow || targetWindow === window.name || targetWindow === '_self' || (targetWindow === 'top' && window == window.top)) {
	            return true
	        }
	        return false
	    }
	    //得到页面第一个符合条件的A标签
	    function getFirstAnchor(list) {
	        for (var i = 0, el; el = list[i++]; ) {
	            if (el.nodeName === "A") {
	                return el
	            }
	        }
	    }
	
	    function scrollToAnchorId(hash, el) {
	        if ((el = document.getElementById(hash))) {
	            el.scrollIntoView()
	        } else if ((el = getFirstAnchor(document.getElementsByName(hash)))) {
	            el.scrollIntoView()
	        } else {
	            window.scrollTo(0, 0)
	        }
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	
	// 主要参数有 basepath  html5Mode  hashPrefix  interval domain fireAnchor


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @cnName Cookie工具模块
	 * @enName cookie
	 * @introduce
	 *    <p>处理cookie的工具函数集合， 与store模块的接口一致， 即包含get, set, forEach, remove, clear, getAll</p>
	 *  @updatetime 2011-11-17
	 */
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    function parseCookieValue(s) {
	        if (s.indexOf('"') === 0) {
	// This is a quoted cookie as according to RFC2068, unescape...
	            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	        }
	        try {
	            return  decodeURIComponent(s.replace(/\+/g, ' '))//处理加号
	        } catch (e) {
	            return s
	        }
	    }
	
	    //
	    var Cookie = {
	        /*
	         * @interface 将两个字符串变成一个cookie字段 
	         *<pre class="brush:javascript;gutter:false;toolbar:false">
	         *    Cookie.stringify('foo', 'bar', { httpOnly: true })  => "foo=bar; httpOnly"
	         *</pre>
	         *  @param name {String} cookie的名字不能为空
	         *  @param val {String} cookie的名字不能为空
	         *  @param opts {Undefined|Object|Number} 配置对象，如果为数字则当成maxAge,否则为对象时，里面可以配置maxAge, domain, path, expires, httpOnly, secure
	         */
	        stringify: function(name, val, opts) {
	            var pairs = [name + "=" + encodeURIComponent(val)]
	            if (isFinite(opts) && typeof opts === "number") {
	                pairs.push("Max-Age=" + opts)
	            } else {
	                opts = opts || {}
	                if (opts.maxAge)
	                    pairs.push("Max-Age=" + opts.maxAge)
	                if (opts.domain)
	                    pairs.push("Domain=" + opts.domain)
	                if (opts.path)
	                    pairs.push("Path=" + opts.path)
	                if (opts.expires)
	                    pairs.push("Expires=" + opts.expires.toUTCString())
	                if (opts.httpOnly)
	                    pairs.push("HttpOnly")
	                if (opts.secure)
	                    pairs.push("Secure")
	            }
	            return pairs.join("; ")
	        },
	        /*
	         *  @interface 遍历所有cookie 
	         *  @param callback {Function} 里面会依次传入key与value
	         */
	        forEach: function(callback) {
	            var pairs = String(document.cookie).split(/; */)
	            pairs.forEach(function(pair) {
	                var index = pair.indexOf('=')
	                if (index === -1) {
	                    return
	                }
	                var key = pair.substr(0, index).trim()
	                var val = pair.substr(++index, pair.length).trim();
	                callback(key, parseCookieValue(val))
	            })
	        },
	        /*
	         *  @interface 获取某一cookie 
	         *  @param name {String} 
	         *  @return {String}
	         */
	        get: function(name) {
	            var ret
	            try {
	                Cookie.forEach(function(key, value) {
	                    if (key === name) {
	                        ret = value
	                        throw ""
	                    }
	                })
	            } catch (e) {
	            }
	            return ret
	        },
	        /*
	         *  @interface 获取所有cookie，以对象形式返回
	         *  @returns {Object}
	         */
	        getAll: function() {
	            var obj = {}
	            Cookie.forEach(function(key, value) {
	                if (!(key in obj)) {
	                    obj[key] = value
	                }
	            })
	            return obj
	        },
	        /*
	         *  @interface 添加或设置某一cookie
	         *  @param name {String} 
	         *  @param value {String} 
	         *  @return {Undefined|Object|Number}
	         */
	        set: function(key, val, opts) {
	            document.cookie = Cookie.stringify.apply(0, arguments)
	        },
	        /*
	         *  @interface 移除某一cookie
	         *  @param name {String} 
	         *  @param opt {Object|Undefined} 
	         */
	        remove: function(key, opt) {
	            opt = opt || {}
	            if (!opt.expires) {
	                opt.expires = new Date(1970, 0, 1)
	            }
	            Cookie.set(key, '', opt)
	        },
	        /*
	         *  @interface 移除所有cookie
	         */
	        clear: function() {
	            Cookie.forEach(function(key, value) {
	                Cookie.remove(key)
	            })
	        }
	    }
	
	
	    avalon.cookie = Cookie
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [例子1](avalon.cookie.ex1.html)
	 */
	
	
	//2012.8.19 (mass Framework) 全新cookie工具类
	//2014.7.8 移至avalon.ui

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 日期范围选择的双日历
	 * @enName coupledatepicker
	 * @introduce
	 *    <p>coupledatepicker其实是普通日历的升级版，可以通过设置起始日期与结束日期的最小间隔天数和最大间隔天数将截止日期限制在一定的选择范围中</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13),
	        __webpack_require__(14), 
	        __webpack_require__(15),
	        __webpack_require__(24), 
	        __webpack_require__(30)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, sourceHTML) {
	    var widget = avalon.ui.coupledatepicker = function(element, data, vmodels) {
	        var options = data.coupledatepickerOptions,
	            parseDate = ((typeof options.parseDate === "function") && options.parseDate.bind(options)) || widget.defaults.parseDate.bind(options),
	            formatDate = ((typeof options.formatDate === "function") && options.formatDate.bind(options)) || widget.defaults.formatDate.bind(options),
	            duplex = options.duplex && options.duplex.split(","),
	            container = options.container,
	            rules = options.rules,
	            _toMinDate = "",
	            _toMaxDate = "",
	            rangeRules = "",
	            duplexFrom,
	            duplexTo,
	            inputFromVM,
	            inputToVM
	
	        // 获取rules配置对象
	        if (rules && avalon.type(rules) === 'string') {
	            var ruleVM = avalon.getModel(rules, vmodels)
	            rules = ruleVM[1][ruleVM[0]];
	        }
	        if (rules && avalon.type(rules) === "object") { // 让rules对象的toMinDate、toMaxDate、fromMinDate、fromMaxDate是可监控的属性
	            rules = avalon.mix({}, rules.$model || rules)
	            rules.toMinDate = rules.toMinDate || ""
	            rules.toMaxDate = rules.toMaxDate || ""
	            rules.fromMinDate = rules.fromMinDate || ""
	            rules.fromMaxDate = rules.fromMaxDate || ""
	        } else {
	            rules = ""
	        }
	        options.rules = rules
	        _toMinDate = rules.toMinDate
	        _toMaxDate = rules.toMaxDate
	        rangeRules = options.rules && options.rules.rules || ""
	        rangeRules = rangeRules.length > 0 ? rangeRules.split(",") : []
	
	        if (typeof container === "string") {
	            container = container.split(",")
	            container[0] = document.getElementById(container[0])
	            container[1] = document.getElementById(container[1])
	        }
	        if (!container.length) {
	            container = element.getElementsByTagName("div")
	        }
	        options.container = container = (container.length ? avalon.slice(container, 0) : container)
	        options.template = initValues(options.getTemplate(sourceHTML, options))
	
	        var vmodel = avalon.define(data.coupledatepickerId, function(vm) {
	            avalon.mix(vm, options)
	            vm.$skipArray = ["widgetElement","container","calendarWrapper", "template", "changeMonthAndYear", "startDay", "fromLabel", "toLabel", "duplex"]
	            vm.widgetElement = element
	            vm.fromSelectCal = function(date) {
	                if (vmodel.rules && vmodel.rules.rules) {
	                    applyRules(date)
	                }
	            }
	            vm.getDates = function() {
	                var inputFromValue = duplexFrom ? duplexFrom[1][duplexFrom[0]] : vmodel.inputFromValue,
	                    inputFromDate = parseDate(inputFromValue),
	                    inputToValue = duplexTo ? duplexTo[1][duplexTo[0]] : vmodel.inputToValue,
	                    inputToDate = parseDate(inputToValue)
	
	                return (inputFromDate && inputToDate && [inputFromDate, inputToDate]) || null
	            } 
	            vm.$fromConfig = {
	                changeMonthAndYear: options.changeMonthAndYear,
	                startDay: options.startDay,
	                parseDate: parseDate,
	                formatDate: formatDate,
	                minDate: "rules.fromMinDate",
	                maxDate: "rules.fromMaxDate",
	                onSelect: vm.fromSelectCal,
	                calendarLabel: options.fromLabel,
	                onInit: function(fromVM) {
	                    inputFromVM = fromVM
	                    options.disabled && (inputFromVM.disabled = true)
	                }
	            }
	            vm.$toConfig = {
	                changeMonthAndYear: options.changeMonthAndYear,
	                startDay: options.startDay,
	                parseDate: parseDate,
	                formatDate: formatDate,
	                minDate: "rules.toMinDate",
	                maxDate: "rules.toMaxDate",
	                calendarLabel: options.toLabel,
	                onInit: function(toVM) {
	                    inputToVM = toVM
	                    options.disabled && (inputToVM.disabled = true)
	                }
	            }
	            vm.$init = function(continueScan) {
	                var template = options.template.split("MS_OPTION_TEMPLATE"),
	                    containerTemp = template[0],
	                    inputOnlyTemp = template[1],
	                    calendar = null,
	                    inputOnly = null,
	                    fromInput = null,
	                    toInput = null,
	                    fromContainer = null,
	                    toContainer = null,
	                    calendarTemplate = "",
	                    inputFromValue = "",
	                    scanVM = [vmodel]
	
	                avalon(element).addClass("oni-coupledatepicker")
	                if (duplexFrom) {
	                    inputFromValue = duplexFrom[1][duplexFrom[0]]
	                    scanVM.push(duplexFrom[1])
	                }
	                if (duplexTo) {
	                    scanVM.push(duplexTo[1])
	                }
	                applyRules(inputFromValue && parseDate(inputFromValue))
	
	                if (container.length) {
	                    calendarTemplate = inputOnlyTemp 
	                    inputOnly = avalon.parseHTML(inputOnlyTemp)
	                    fromInput = inputOnly.firstChild
	                    toInput = inputOnly.lastChild
	                    fromContainer = container[0]
	                    toContainer = container[1]
	                    fromContainer.appendChild(fromInput)
	                    toContainer.appendChild(toInput)
	                    avalon(fromContainer).addClass("oni-coupledatepicker-item")
	                    avalon(toContainer).addClass("oni-coupledatepicker-item")
	                } else {
	                    calendarTemplate = containerTemp
	                    calendar = avalon.parseHTML(calendarTemplate)
	                    element.appendChild(calendar)
	                }
	                avalon.scan(element, scanVM.concat(vmodels))
	                if (typeof options.onInit === "function") {
	                    options.onInit.call(element, vmodel, options, vmodels)
	                }
	            };
	            vm.$remove = function() {
	                element.innerHTML = element.textContent = "";
	            };
	        })
	        vmodel.$watch("disabled", function(val) {
	            inputFromVM.disabled = val
	            inputToVM.disabled = val
	        })
	
	        var _c = {  
	            '+M': function(time ,n) {
	                var _d = time.getDate()
	                time.setMonth(time.getMonth() + n)
	                if(time.getDate() !== _d) {
	                    time.setDate(0)
	                } 
	            },
	            '-M': function(time ,n) { 
	                var _d = time.getDate()
	                time.setMonth(time.getMonth() - n)
	                if(time.getDate() !== _d) {
	                    time.setDate(0)
	                }
	            },
	            '+D': function(time ,n) { 
	                time.setDate(time.getDate() + n)
	            },
	            '-D': function(time ,n) { 
	                time.setDate(time.getDate() - n)
	            },
	            '+Y': function(time ,n) { 
	                time.setFullYear(time.getFullYear() + n) 
	            },
	            '-Y': function(time ,n) { 
	                time.setFullYear(time.getFullYear() - n) 
	            }
	        };
	
	        function initValues(template) {
	            if (duplex) {
	                var duplexLen = duplex.length,
	                    duplexVM1 = avalon.getModel(duplex[0].trim(), vmodels),
	                    duplexVM2 = duplexLen === 1 ? null : avalon.getModel(duplex[1].trim(), vmodels),
	                    duplexVal1 = duplexVM1[1][duplexVM1[0]],
	                    duplexVal2 = duplexVM2 ? duplexVM2[1][duplexVM2[0]] : "";
	                duplexFrom = duplexVM1
	                duplexTo = duplexVM2
	                setValues(duplexLen, duplexVal1, duplexVal2)
	                if (duplexFrom) {
	                    template = template.replace(/MS_OPTION_FROMDUPLEX/g, duplex[0].trim())
	                }
	                if (duplexTo) {
	                    template = template.replace(/MS_OPTION_TODUPLEX/g, duplex[1].trim())
	                }
	            } 
	            if (!duplexFrom) {
	                options.inputFromValue = ""
	                template = template.replace(/MS_OPTION_FROMDUPLEX/g, "inputFromValue")
	            }
	            if (!duplexTo) {
	                options.inputToValue = ""
	                template = template.replace(/MS_OPTION_TODUPLEX/g, "inputToValue")
	            }
	            return template
	        }
	        function setValues(len, from, to) {
	            if (len) {
	                if (len == 2) {
	                    if (duplexFrom) {
	                        duplexFrom[1][duplexFrom[0]] = from && parseDate(from) && from || ""
	                    } else {
	                        vmodel.inputFromValue = from && parseDate(from) && from || ""
	                    }
	                    if (duplexTo) {
	                        duplexTo[1][duplexTo[0]] = to && parseDate(to) && to || ""
	                    } else {
	                        vmodel.inputToValue = to && parseDate(to) && to || ""
	                    }
	                } else if (len == 1) {
	                    if (duplexFrom) {
	                        duplexFrom[1][duplexFrom[0]] = from && parseDate(from) && from || ""
	                    } else {
	                        vmodel.inputFromValue = from && parseDate(from) && from || ""
	                    }
	                }
	            }
	        }
	        function applyRules(date) {
	            var minDate = _toMinDate && parseDate(_toMinDate), 
	                maxDate = _toMaxDate && parseDate(_toMaxDate),
	                inputToValue = duplexTo ? duplexTo[1][duplexTo[0]] : vmodel.inputToValue,
	                rules = vmodel.rules,
	                minDateRule,
	                maxDateRule,
	                inputToDate,
	                df = {}
	
	            if (!date) return 
	            for (var i = 0, type = ['defaultDate', 'minDate', 'maxDate']; i < type.length; i++) {
	                if (rangeRules[i]) {
	                    df[type[i]] = calcDate(rangeRules[i], date)
	                }
	            }
	            minDateRule = df['minDate']
	            maxDateRule = df['maxDate']
	            minDate = (minDateRule ? minDateRule.getTime() : -1) > (minDate ? minDate.getTime() : -1) ? minDateRule : minDate
	            maxDate = (maxDateRule ? maxDateRule.getTime() : Number.MAX_VALUE) > (maxDate ? maxDate.getTime() : Number.MAX_VALUE) ? maxDate : maxDateRule
	            if(!inputToValue && df["defaultDate"]){
	                inputToValue = formatDate(df["defaultDate"])
	            }
	            if(minDate){
	                var toMinDateFormat = formatDate(minDate)
	                if(!inputToValue) {
	                    inputToValue = toMinDateFormat
	                }
	            }
	            inputToDate = inputToValue && parseDate(inputToValue)
	            if(inputToDate && isDateDisabled(inputToDate, minDate, maxDate)) {
	                inputToValue = toMinDateFormat
	            }
	            if (duplexTo) {
	                duplexTo[1][duplexTo[0]] = inputToValue
	            } else {
	                vmodel.inputToValue = inputToValue
	            }
	            if (minDate) {
	                rules.toMinDate = cleanDate(minDate)
	            } 
	            if (maxDate) {
	                rules.toMaxDate = cleanDate(maxDate)
	            }
	        }
	        // 根据minDate和maxDate的设置判断给定的日期是否不可选
	        function isDateDisabled(date, minDate, maxDate){
	            var time = date.getTime()
	            if(minDate && time < minDate.getTime()){
	                return true
	            } else if(maxDate && time > maxDate.getTime()) {
	                return true
	            }
	            return false
	        }
	        function calcDate(desc , date){
	            var time,
	                _date,
	                re = /([+-])?(\d+)([MDY])?/g, 
	                arr,
	                key;
	            desc = (desc || "").toString()
	            arr = re.exec(desc)
	            key = arr && ((arr[1] || '+') + (arr[3] || 'D'))
	            time = date ? date : new Date()
	            _date = new Date(typeof time === "string" ? parseDate(time) : time)
	            if (key && _c[key]) {
	                _c[key](_date ,arr[2] * 1)
	            }
	            return _date
	        }
	        return vmodel
	    }
	    // 将日期时间转为00:00:00
	    function cleanDate( date ){
	        date.setHours(0)
	        date.setMinutes(0)
	        date.setSeconds(0)
	        date.setMilliseconds(0)
	        return date
	    }
	    widget.version = 1.0
	    widget.defaults = {
	        container : [], //必选，渲染的容器，每个元素类型为 {Element|JQuery|String}
	        fromLabel : '选择起始日期', //@config 设置起始日期日历框的说明文字
	        toLabel : '选择结束日期', //@config 设置结束日期日历框的说明文字
	        changeMonthAndYear: false,
	        widgetElement: "", // accordion容器
	        disabled: false, //@config 设置是否禁用组件
	        startDay: 1, //@config 设置每一周的第一天是哪天，0代表Sunday，1代表Monday，依次类推, 默认从周一开始
	        separator: "-", //@config 日期格式的分隔符，可以是"/"或者你希望的符号，但如果是除了"-"和"/"之外的字符则需要和parseDate和formatDate配合使用，以便组件能正常运作
	        /**
	         * @config 设置双日历框的工作规则
	            <pre class="brush:javascript;gutter:false;toolbar:false">
	            {
	                rules: 'null, 0D, 8D',
	                fromMinDate: '2014-05-02',
	                fromMaxDate: '2014-06-28',
	                toMinDate: '2014-06-01',
	                toMaxDate: '2014-07-12'
	            }
	            </pre> 
	         * 可以是绑定组件时定义的配置对象中的一个rules对象，也可以是一个字符串，指向一个上述对象。
	         * 其中对象中的rules属性定义结束初始日期异常时默认显示的日期、初始日期和结束日子之间最小相隔天数、最大相隔天数，格式是[+-]\d[DMY]，分别代表几天、几个月或者几年，也可以附加+或者-号，+号表示正数几天，-号表示负数几天
	         * fromMinDate代表起始日期可以设置的最小日期
	         * fromMaxDate代表起始日期可以设置的最大日期
	         * toMinDate代表结束日期可以设置的最小日期
	         * toMaxDate代表结束日期可以设置的最大日期
	         */
	        rules: "",
	        /**
	         * @config {Function} 将符合日期格式要求的字符串解析为date对象并返回，不符合格式的字符串返回null,用户可以根据自己需要自行配置解析过程
	         * @param str {String} 需要解析的日期字符串
	         * @returns {Date} 解析后的日期对象 
	         */
	        parseDate: function(str){
	            if (avalon.type(str) === "date") return str
	            var separator = this.separator
	            var reg = "^(\\d{4})" + separator+ "(\\d{1,2})"+ separator+"(\\d{1,2})$"
	            reg = new RegExp(reg)
	            var x = str.match(reg)
	            return x ? new Date(x[1],x[2] * 1 -1 , x[3]) : null
	        },
	        /**
	         * @config {Function} 将日期对象转换为符合要求的日期字符串
	         * @param date {Date} 需要格式化的日期对象
	         * @returns {String} 格式化后的日期字符串 
	         */
	        formatDate: function(date){
	            if (avalon.type(date) !== "date") {
	                avalon.log("the type of " + date + "must be Date")
	                return ""
	            }
	            var separator = this.separator,
	                year = date.getFullYear(), 
	                month = date.getMonth(), 
	                day = date.getDate()
	
	            return year + separator + this.formatNum( month + 1 , 2 ) + separator + this.formatNum(day , 2)
	        },
	        formatNum: function(n, length){
	            n = String(n)
	            for( var i = 0 , len = length - n.length; i < len; i++)
	                n = "0" + n
	            return n
	        },
	        getTemplate: function(str, options) {
	            return str
	        }
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [不同构建方式的coupledatepicker，注意按demo说明方式设置](avalon.coupledatepicker.ex1.html)
	 [配置双日历框的日历说明文字、设置日历显示每周的第一天从周日开始](avalon.coupledatepicker.ex2.html)
	 [初始化双日历框的起始日期和结束日期、不同方式切换禁用日历](avalon.coupledatepicker.ex3.html)
	 [初始日期和截止日期之间的最小相隔天数和最大相隔天数](avalon.coupledatepicker.ex4.html)
	 [配置双日历框的解析和显示规则](avalon.coupledatepicker.ex5.html)
	 */


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    function getChildVM(expr, vm, strLen) {
	        var t = vm, pre, _t;
	        for (var i = 0, len = expr.length; i < len; i++) {
	            var k = expr[i];
	            _t = t.$model || t;
	            if (typeof _t[k] !== 'undefined') {
	                pre = t;
	                t = t[k];
	            } else {
	                return;
	            }
	        }
	        if (strLen > 1) {
	            return pre[k];
	        } else {
	            return pre;
	        }
	    }
	   // 在一堆VM中，提取某一个VM的符合条件的子VM
	   // 比如 vm.aaa.bbb = {} ; 
	   // avalon.getModel("aaa.bbb", vmodels) ==> ["bbb", bbbVM, bbbVM所在的祖先VM（它位于vmodels中）]
	    avalon.getModel = function(expr, vmodels){
	        if (!expr) {
	            return null;
	        }
	        var str = expr.split('.'),
	            strLen = str.length,
	            last = str[strLen-1];
	        if (str.length != 1) {
	            str.pop();
	        }
	        for (var i = 0, len = vmodels.length; i < len; i++) {
	            var ancestor = vmodels[i];
	            var child = getChildVM(str, ancestor, strLen);
	            if (typeof child !== 'undefined' && (child.hasOwnProperty(last) || Object.prototype.hasOwnProperty.call(child, last))) {
	                return [last, child, ancestor];
	            }
	        }
	        return null;
	    }
	    return avalon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-coupledatepicker-item\">\n    <input\n    ms-widget=\"datepicker, $, $fromConfig\"\n    ms-duplex=\"MS_OPTION_FROMDUPLEX\"/>   \n</div>\n<span class=\"label\">-</span>\n<div class=\"oni-coupledatepicker-item\">\n    <input \n    ms-widget=\"datepicker, $, $toConfig\"\n    ms-duplex=\"MS_OPTION_TODUPLEX\"/>\n</div>\nMS_OPTION_TEMPLATE\n<input\n    ms-widget=\"datepicker, $, $fromConfig\"\n    ms-duplex=\"MS_OPTION_FROMDUPLEX\"/>   \n<input \n    ms-widget=\"datepicker, $, $toConfig\"\n    ms-duplex=\"MS_OPTION_TODUPLEX\"/>"

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 日期选择器
	 * @enName datepicker
	 * @introduce
	 *    <p>datepicker组件方便快速创建功能齐备的日历组件，通过不同的配置日历可以满足显示多个月份、通过prev、next切换月份、或者通过下拉选择框切换日历的年份、月份，当然也可以手动输入日期，日历组件也会根据输入域中的日期值高亮显示对应日期等等各种需求</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), 
	        __webpack_require__(16),
	        __webpack_require__(17), 
	        __webpack_require__(18),
	        __webpack_require__(26),
	        __webpack_require__(24),
	        __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, holidayDate, sourceHTML) {
	    var calendarTemplate = sourceHTML,
	        HOLIDAYS,
	        ONE_DAY = 24 * 60 * 60 * 1000,
	        firstYear = 1901,
	        lastYear = 2050;
	
	    var widget = avalon.ui.datepicker = function(element, data, vmodels) {
	        var options = data.datepickerOptions,
	            msDuplexName = element.msData["ms-duplex"],
	            duplexVM = msDuplexName && avalon.getModel(msDuplexName, vmodels), 
	            parseDate = options.parseDate,
	            formatDate = options.formatDate,
	            minDate = options.minDate, 
	            maxDate = options.maxDate,
	            monthYearChangedBoth = false,
	            datepickerData = [],            
	            _initValue = "",
	            daysWrapper = null,
	            years=[],
	            minDateVM,
	            maxDateVM,
	            calendar,
	            month, 
	            day, 
	            year
	
	        calendarTemplate = options.template = options.getTemplate(calendarTemplate, options)
	        avalon.scan(element, vmodels)
	        options.disabled = element.disabled || options.disabled
	        formatDate = formatDate.bind(options) //兼容IE6、7使得formatDate方法中的this指向options
	        parseDate = parseDate.bind(options)
	        minDate = (minDate !== null) && validateDate(minDate)
	        maxDate = (maxDate !== null) && validateDate(maxDate)
	        if(options.minDate && !minDate) { // minDate是某个VM的属性名
	            minDateVM = avalon.getModel(options.minDate, vmodels)
	            minDateVM && (minDate = validateDate(minDateVM[1][minDateVM[0]]))
	        }
	        minDate = options.minDate = minDate && cleanDate(minDate)
	        if(options.maxDate && !maxDate) { // maxDate 是某个VM的属性名，需要进一步解析
	            maxDateVM = avalon.getModel(options.maxDate, vmodels)
	            maxDateVM && (maxDate = validateDate(maxDateVM[1][maxDateVM[0]]))
	        }
	        maxDate = options.maxDate = maxDate && cleanDate(maxDate) 
	        minDate ? firstYear = minDate.getFullYear() : 0
	        maxDate ? lastYear = maxDate.getFullYear() : 0
	        if (avalon.type(options.years) === "array") {
	            years = options.years    
	        } else {
	            for (var i = firstYear; i <= lastYear; i++) {
	                years.push(i)
	            }    
	        }
	        if (options.mobileMonthAndYear) {
	            options.mobileYear = 0
	        }
	        options.changeMonthAndYear && (options.mobileMonthAndYear = false)
	        initValue()
	
	        var unbindEvents = avalon.noop
	
	        var vmodel = avalon.define(data.datepickerId, function(vm) {
	
	            //初始化增加语言包设置
	            avalon.mix(vm, options, {
	                regional: widget.defaultRegional
	            })
	            vm.$skipArray = ["container", "showDatepickerAlways", "timer", "sliderMinuteOpts",
	                "sliderHourOpts", "template", "widgetElement", "rootElement", "dayNames", "allowBlank",
	                "months", "years", "numberOfMonths",
	                "showOtherMonths", "watermark", "weekNames",
	                "stepMonths", "changeMonthAndYear", "startDay", "mobileMonthAndYear",
	                "formatErrorTip" 
	            ]
	            vm._uc = false //更新calendar
	            vm._height = 150
	            vm.dateError = vm.dateError || ""
	            vm.weekNames = []
	            vm.tip = vm.tip || ""
	            vm.widgetElement = element
	            vm.rootElement = {}
	            vm.data = []
	            vm.prevMonth = -1 //控制prev class是否禁用
	            vm.nextMonth = -1 //控制next class是否禁用
	            vm.month = month
	            vm._month = month + 1
	            vm.year = year
	            vm.day = day
	            vm.years = years
	            vm.months = [1,2,3,4,5,6,7,8,9,10,11,12]
	            vm._position = "absolute"            
	            vm._datepickerToggle = true
	            vm._monthToggle = false
	            vm._yearToggle = false
	            vm._years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
	            vm.elementYear = year
	            vm.elementMonth = month
	            vm._getPositionClass = function(position) {
	                var _position = vm._position
	                if (_position === 'absolute') {
	                    switch(position) {
	                        case "rb":
	                            return 'oni-datepicker-wrapper-right' 
	                        break
	                        case "lt":
	                            return 'oni-datepicker-wrapper-top' 
	                        break
	                        case "rt": 
	                            return 'oni-datepicker-wrapper-top-right' 
	                        break
	                        default:
	                            return position 
	                        break
	                    }
	                }
	            }
	            vm._setWeekClass = function(dayName) {
	                var dayNames = vmodel.regional.day
	                if (dayNames) {
	                    if ((dayNames.indexOf(dayName) % 7 == 0) || (dayNames.indexOf(dayName) % 7 == 6)) {
	                        return "oni-datepicker-week-end"
	                    } else {
	                        return ""
	                    }
	                }
	            }
	            vm._setDayClass = function(index, outerIndex, rowIndex, day) {
	                var className = "",
	                    dayItem = {}
	                if (day === "") {
	                    return ""
	                }
	                dayItem = datepickerData[rowIndex]["rows"][outerIndex][index]
	                if (dayItem.weekend) {
	                    className += " oni-datepicker-week-end"
	                }
	                if (!dayItem.month) {
	                    className += " oni-datepicker-day-none"
	                }
	                if (dayItem.selected) {
	                    className += " oni-datepicker-selected"
	                }
	                if (dayItem.dateDisabled) {
	                    className += " oni-state-disabled"
	                }
	                return className.trim()
	            }
	            vm._setHoverClass = function(index, outerIndex, rowIndex, day) {
	                var className = "",
	                    dayItem = {}
	                if (day === "") {
	                    return ""
	                }
	                dayItem = datepickerData[rowIndex]["rows"][outerIndex][index]
	                className = "oni-datepicker-day-hover"
	                return className
	            }
	            vm._setMobileYearClass = function(yearItem, elementYear, monthItem, elementMonth) {
	                var className = ""
	                if (yearItem === elementYear && monthItem === elementMonth) {
	                    className += " oni-datepicker-selected"
	                }
	                if (vmodel.mobileYearDisabled(yearItem)) {
	                    className += " oni-state-disabled"
	                }
	                return className
	            }
	            vm._rowShow = function(rowDays) {
	                var len = rowDays.length,
	                    flag = false
	                for (var i = 0; i < len; i++) {
	                    if (rowDays[i] !== "") {
	                        flag = true
	                        break;
	                    }
	                }
	                return flag
	            }
	            vm.sliderMinuteOpts = {
	                onInit: function(sliderMinute, options, vmodels) {
	                    sliderMinute.$watch("value", function(val) {
	                        vmodel.minute = val
	                    })
	                    vmodel.$watch("minute", function(val) {
	                        sliderMinute.value = val
	                    })
	                }
	            }
	            vm.sliderHourOpts = {
	                onInit: function(sliderHour, options, vmodels) {    
	                    sliderHour.$watch("value", function(val) {
	                        vmodel.hour = val
	                    })
	                    vmodel.$watch("hour", function(val) {
	                        sliderHour.value = val
	                    })
	                }
	            }
	            vm.$yearVmId = vm.$id+"year";
	            vm.$monthVmId = vm.$id+"month";
	            vm.$yearOpts = {
	                width: 60,
	                listWidth: 60,
	                height: 160,
	                position: false,
	                listClass: "oni-datepicker-dropdown",
	                onSelect: function(e) {
	                    e.stopPropagation()
	                }
	            }
	            vm.$monthOpts = {
	                width: 45,
	                height: 160,
	                listWidth: 45,
	                position: false,
	                listClass: "oni-datepicker-dropdown",
	                onSelect: function(e) {
	                    e.stopPropagation()
	                }
	            }
	            vm._selectDates = function(month) {
	                if (vmodel.mobileMonthAndYear) {
	                    vmodel._monthToggle = false
	                    vmodel._yearToggle = false
	                    vmodel._datepickerToggle = true
	                    monthYearChangedBoth = true
	                    vmodel.year = vmodel.mobileYear
	                    vmodel.month = month
	                }
	            }
	            vm._selectMonths = function(event, year) {
	                if (vmodel.mobileMonthAndYear) {
	                    if (year) {
	                        if (!vmodel.mobileYearDisabled(year)) {
	                            vmodel.mobileYear = year
	                        } else {
	                            return 
	                        }
	                    } else {
	                        vmodel.mobileYear = vmodel.year
	                    }
	                    vmodel._monthToggle = true
	                    vmodel._yearToggle = false
	                    vmodel._datepickerToggle = false
	                } 
	            }
	            vm._selectYears = function() {
	                if (vmodel.mobileMonthAndYear) {
	                    vmodel._monthToggle = false
	                    vmodel._yearToggle = true
	                    vmodel._datepickerToggle = false
	                }
	            }
	            vm.getInitTime = function(timeDate) {
	                var date = formatDate(timeDate),
	                    time = timeDate.toTimeString(),
	                    now = time.substr(0, time.lastIndexOf(":"));
	                vmodel.hour = timeDate.getHours()
	                vmodel.minute = timeDate.getMinutes()
	                return date + ' ' + now
	            }
	            vm._dateCellRender = function(outerIndex, index, rowIndex, date) {
	                var dateCellRender = vmodel.dateCellRender,
	                    calendar = datepickerData[rowIndex],
	                    month = calendar.month,
	                    year = calendar.year
	
	                if (dateCellRender && (typeof dateCellRender === 'function')) {
	                    var dayItem = datepickerData[rowIndex]["rows"][outerIndex][index]
	                    if (month === vmodel.month && year === vmodel.year) {
	                        if (date === "") {
	                            dayItem.html = ""
	                            return date
	                        }
	                        date = dateCellRender(date, vmodel, dayItem)
	                        dayItem.html = date
	                        return date
	                    } else {
	                        return dayItem.html
	                    }
	                }
	                return date
	            }
	            vm._getNow = function() {
	                var date = new Date(),
	                    time = date.toTimeString(),
	                    now = time.substr(0, time.lastIndexOf(":"));
	                vmodel.hour = date.getHours()
	                vmodel.minute = date.getMinutes()
	                return now
	            }
	            vm._selectTime = function(event) {
	                var timeFilter = avalon.filters.timer,
	                    hour = timeFilter(vmodel.hour),
	                    minute = timeFilter(vmodel.minute),
	                    time = hour + ":" + minute,
	                    _date = formatDate(parseDate(element.value));
	                event.stopPropagation()
	                element.value = _date + " " + time
	                if (!vmodel.showDatepickerAlways) {
	                    vmodel.toggle = false
	                }
	                if (options.onSelectTime && avalon.type(options.onSelectTime) === "function") {
	                    options.onSelectTime.call(vmodel, vmodel)
	                }
	            }
	            vm._selectYearMonth = function(event) {
	                event.stopPropagation();
	            }
	            // 点击prev按钮切换到当前月的上个月，如当前月存在minDate则prev按钮点击无效
	            vm._prev = function(prevFlag, event) {
	                if(!prevFlag) {
	                    return false
	                }
	                toggleMonth("prev")
	                event.stopPropagation()
	            }
	            // 点击next按钮切换到当前月的下一个月，如果当前月存在maxDate则next按钮点击无效
	            vm._next = function(nextFlag, event) {
	                if(!nextFlag) {
	                    return false
	                }
	                toggleMonth("next")
	                event.stopPropagation()
	            }
	            vm._prevYear = function(year) {
	                if (year === vmodel.years[0]) {
	                    return
	                }
	                vmodel.mobileYear = vmodel.mobileYear - 1 
	            }
	            vm._nextYear = function(year) {
	                if (year === vmodel.years[vmodel.years.length-1]) {
	                    return
	                }
	                vmodel.mobileYear = vmodel.mobileYear + 1
	            }
	            vm._prevYears = function() { 
	                if (vmodel._years[0] <= vmodel.years[0]) {
	                    return
	                }
	                updateMobileYears(vmodel._years[0] - 1)
	            }
	            vm._nextYears = function() {
	                var _years = vmodel._years,
	                    years = vmodel.years;
	                if (_years[_years.length-1] >= years[years.length-1]) {
	                    return
	                }
	                updateMobileYears(_years[9] + 1)
	            }
	            vm.mobileYearDisabled = function(year) {
	                var years = vmodel.years
	                if (year < years[0] || year > years[years.length-1]) {
	                    return true
	                } else {
	                    return false
	                }
	            }
	            vm.getRawValue = function() {
	                return element.value
	            }
	            vm.getDate =  function() {
	                var value = vmodel.getRawValue()
	                return parseDate(value)
	            }
	            // 年份选择器渲染ok之后为其绑定dropdown组件并扫描渲染出dropdown
	            vm._afterYearRendered = function() {
	                this.setAttribute("ms-widget", ["dropdown", vm.$yearVmId, "$yearOpts"].join(","))
	                this.setAttribute("ms-duplex", "year")
	                avalon.scan(this, vmodel)
	            }
	            // 月份选择器渲染ok之为其绑定dropdown组件并扫描渲染出dropdown
	            vm._afterMonthRendered = function() {
	                this.setAttribute("ms-widget", ["dropdown", vm.$monthVmId, "$monthOpts"].join(","))
	                this.setAttribute("ms-duplex", "_month")
	                avalon.scan(this, vmodel)
	            }
	            // 选择日期
	            vm._selectDate = function(index, outerIndex, rowIndex, event) {
	                var timerFilter = avalon.filters.timer,
	                    _oldMonth = vmodel.month,
	                    _oldYear = vmodel.year,
	                    dayItem = datepickerData[rowIndex]["rows"][outerIndex][index],
	                    year = dayItem.year,
	                    month = dayItem.month,
	                    day = +dayItem.day,
	                    dateDisabled = dayItem.dateDisabled
	                event.stopPropagation()
	                event.preventDefault()
	                if (month !== false && !dateDisabled && !vmodel.showDatepickerAlways) {
	                    var _date = new Date(year, month, day),
	                        date = formatDate(_date),
	                        calendarWrapper = options.type ==="range" ? element["data-calenderwrapper"] : null
	                    
	                    vmodel.tip = getDateTip(cleanDate(_date)).text
	                    vmodel.dateError = "#cccccc"
	                    if (!calendarWrapper && !vmodel.timer) {
	                        element.value = date
	                        vmodel.toggle = false
	                    } else { // range datepicker时需要切换选中日期项的类名
	                        if (vmodel.timer) {
	                            date = date + " " + timerFilter(vmodel.hour) + ":" + timerFilter(vmodel.minute)
	                        }
	                        element.value = date
	                    }
	
	                    if (month === _oldMonth && year === _oldYear && vmodel.day == day) {
	                        vmodel.$fire("day", day)
	                    } else {
	                        vmodel.day = day
	                    }
	                    if (month !== _oldMonth && year !== _oldYear) {
	                        monthYearChangedBoth = true
	                        vmodel.year = year
	                        vmodel.month = month
	                    } else if (month !== _oldMonth) {
	                        vmodel.month = month
	                    } else if (year !== _oldYear) {
	                        vmodel.year = year
	                    }
	                }
	                if (!vmodel.showDatepickerAlways && !duplexVM) {
	                    if (typeof vmodel.onSelect === "string") {
	                        avalon.log("onSelect 回调必须是个function！")
	                        return
	                    }
	                    vmodel.onSelect.call(null, date, vmodel, avalon(element).data())
	                }
	            }
	
	            //设置语言包
	            vm.setRegional = function(regional) {
	                vmodel.regional = regional
	            }
	            vm.dataRendered = function() {
	                if (!daysWrapper) {
	                    daysWrapper = document.getElementById('oni-datepicker-days')
	                    daysWrapper && (daysWrapper.id = '')
	                }
	            }
	            vm.$init = function(continueScan) {
	                var elementPar = element.parentNode,
	                    initDate = null
	
	                calendar = avalon.parseHTML(calendarTemplate).firstChild
	                elementPar.insertBefore(calendar, element)
	                elementPar.insertBefore(element, calendar)
	                avalon(element).attr("ms-css-width", "width")
	                vmodel.weekNames = calendarHeader()
	
	                if (element.tagName === "INPUT" && vmodel.type !== "range") {
	                    var div = document.createElement("div")
	                    div.className = "oni-datepicker-input-wrapper"
	                    div.setAttribute("ms-class", "oni-datepicker-active:toggle")
	                    div.setAttribute("ms-css-border-color", "dateError")
	                    div.setAttribute("ms-hover", "oni-state-hover")
	                    elementPar.insertBefore(div,element)
	                    div.appendChild(element)
	                    if (vmodel.showTip) {
	                        var tip = avalon.parseHTML("<div class='oni-datepicker-tip'>{{tip}}<i class='oni-icon oni-icon-calendar-o'>&#xf088;</i></div>")
	                        div.appendChild(tip)
	                    } else {
	                        element.style.paddingRight = "0px"
	                    }
	                    div.appendChild(calendar)
	                }
	                if (vmodel.timer) {
	                    vmodel.width = 100
	                    var time = validateTime(_initValue)
	                    if (_initValue && time) {
	                        _initValue = vmodel.getInitTime(time)
	                    }
	                }
	                element.value = _initValue
	                if (initDate = parseDate(_initValue)) {
	                    vmodel.tip = getDateTip(cleanDate(initDate)).text
	                }
	                element.disabled = vmodel.disabled
	
	                if (vmodel.showDatepickerAlways) {
	                    element.style.display = "none"
	                    vmodel.toggle = true
	                    vmodel._position = "relative"
	                    div.style.borderWidth = 0
	                } else {
	                    bindEvents(calendar, div)
	                }
	                
	                if (options.type === "range") {
	                    div = element["data-calenderwrapper"]
	                    vmodel._position = "static"
	                } else {
	                    avalon.scan(div, [vmodel])
	                }
	                vm.rootElement = div
	                avalon.scan(calendar, [vmodel].concat(vmodels))
	                setTimeout(function() {
	                    calendarDays(vmodel.month, vmodel.year)
	                }, 10)
	
	                if (typeof options.onInit === "function" ){
	                    //vmodels是不包括vmodel的
	                    options.onInit.call(element, vmodel, options, vmodels)
	                }
	            }
	            vm._getTitle = function(year, month) {
	                return vmodel.regional.titleFormat.call(vmodel.regional, year, month)
	            }
	            vm.$remove = function() {
	                unbindEvents()
	                var elementPar = element.parentNode,
	                    eleParPar = elementPar.parentNode,
	                    calendarPar = calendar.parentNode
	
	                calendar.innerHTML = calendar.textContent = ""
	                calendarPar.removeChild(calendar)
	                eleParPar.removeChild(elementPar)
	            }
	        })
	        getDateTip = getDateTip.bind(vmodel)
	        vmodel.$watch("toggle", function(val) {
	            var dateFormat = element.value,
	                date = parseDate(dateFormat),
	                elementYear = date && date.getFullYear(),
	                elementMonth = date && date.getMonth()
	            if (val) {
	                vmodel.elementMonth = elementMonth || -1
	                vmodel.elementYear = elementYear || -1
	                if (daysWrapper) {
	                    vmodel._height = avalon(daysWrapper).height()
	                    daysWrapper = null
	                }
	            } else {
	                if (vmodel.year != elementYear && vmodel.month != elementMonth) {
	                    if (!date) {
	                        monthYearChangedBoth = true
	                        var today = new Date,
	                            yearToday = today.getFullYear(),
	                            monthToday = today.getMonth()
	
	                        if (vmodel.year == yearToday && vmodel.month == monthToday) {
	                            setCalendarDays(vmodel.month, vmodel.year, vmodel.day)
	                        } else if (vmodel.year == yearToday) {
	                            vmodel.month = monthToday
	                        } else if (vmodel.month == monthToday) {
	                            vmodel.year = yearToday
	                        } else {
	                            monthYearChangedBoth = true
	                            vmodel.year = yearToday
	                            vmodel.month = monthToday
	                        }
	                    } else {
	                        monthYearChangedBoth = true
	                        vmodel.year = elementYear
	                        vmodel.month = elementMonth
	                    }
	                } else if (vmodel.year != elementYear) {
	                    vmodel.year = elementYear
	                } else if (vmodel.month != elementMonth) {
	                    vmodel.month = elementMonth
	                }
	
	                // 防止Month, Year下拉框的浮层不被关闭。
	                avalon.vmodels[vmodel.$yearVmId] && (avalon.vmodels[vmodel.$yearVmId].toggle = false);
	                avalon.vmodels[vmodel.$monthVmId] && (avalon.vmodels[vmodel.$monthVmId].toggle = false);
	
	                vmodel.onClose(new Date(vmodel.year,vmodel.month,vmodel.day), vmodel)
	            }
	        })
	        vmodel.$watch("year", function(year) {
	            if (vmodel.mobileMonthAndYear) {
	                updateMobileYears(year)
	            }
	            if (!monthYearChangedBoth) {
	                setCalendarDays(vmodel.month, year, vmodel.day)
	            } else {
	                monthYearChangedBoth = false
	            }
	            vmodel.onChangeMonthYear(year, vmodel.month+1, vmodel)
	        })
	        if (vmodel.changeMonthAndYear) {
	            vmodel.$watch("_month", function(month) {
	                vmodel.month = month - 1
	            }) 
	        }
	        vmodel.$watch("month", function(month) {
	            vmodel._month = month + 1
	            setCalendarDays(month, vmodel.year, vmodel.day)
	            vmodel.onChangeMonthYear(vmodel.year, month, vmodel)
	        })
	        vmodel.$watch("day", function(newDay, oldDay) {
	            var data = datepickerData,
	                month = vmodel.month,
	                year = vmodel.year,
	                exitLoop = false,
	                dateYear,
	                dateMonth, 
	                dateDay
	
	            for (var i = 0, len = data.length; i < len; i++) {
	                var dataItem = data[i]
	
	                if (dataItem.year == year && dataItem.month == month) {
	                    var dataRows = dataItem.rows
	
	                    for (var j = 0, jLen = dataRows.length; j < jLen; j++) {
	                        var dataRow = dataRows[j]
	
	                        for (var k = 0, kLen = dataRow.length; k < kLen; k++) {
	                            var dayItem = dataRow[k],
	                                date = dayItem.day
	
	                            if (date == newDay && dayItem.month == month && dayItem.year == year) {
	                                dayItem.selected = true
	                                vmodel.data[i]["rows"][j].set(k, "").set(k, dayItem._day)
	                            } else if (dayItem.selected) {
	                                dayItem.selected = false
	                                vmodel.data[i]["rows"][j].set(k, "").set(k, dayItem._day)
	                            }
	                        }
	                    }
	                } else {
	
	                    for (var j = 0, jLen = dataRows.length; j < jLen; j++) {
	                        var dataRow = dataRows[j]
	
	                        for (var k = 0, kLen = dataRow.length; k < kLen; k++) {
	                            var dateItem = dataRow[k]
	
	                            if (dayItem.selected) {
	                                dayItem.selected = false
	                                vmodel.data[i]["rows"][j].set(k, "").set(k, dayItem._day)
	                                exitLoop = true
	                                break;
	                            }
	                        }
	                        if (exitLoop) {
	                            break;
	                        }
	                    }
	                }
	                if (exitLoop) {
	                    break;
	                }
	            }
	        })
	        // 这里的处理使得设置外部disabled或者组件VM的disabled同步
	        vmodel.$watch("disabled", function(val) {
	            element.disabled = val
	        })
	        vmodel.$watch("minDate", function(val) {
	            var minDate = validateDate(val)
	            if (minDate) {
	                vmodel.minDate = cleanDate(minDate)
	            } else {
	                vmodel.minDate = ""
	            }
	            setCalendarDays(vmodel.month, vmodel.year, vmodel.day)
	
	        })
	        vmodel.$watch("maxDate", function(val) {
	            var maxDate = validateDate(val)
	            if (maxDate) {
	                vmodel.maxDate = cleanDate(maxDate)    
	            } else {
	                vmodel.maxDate = ""
	            }
	            setCalendarDays(vmodel.month, vmodel.year, vmodel.day)
	
	        })
	        duplexVM && duplexVM[1].$watch(duplexVM[0], function (val) {
	            var currentYear,
	                currentMonth,
	                date
	
	            if (date = parseDate(val)) {
	                currentYear = date.getFullYear()
	                currentMonth = date.getMonth()
	                vmodel.day = date.getDate()
	                if (currentMonth !== vmodel.month && currentYear !== vmodel.year) {
	                    monthYearChangedBoth = true
	                    vmodel.year = currentYear
	                    vmodel.month = currentMonth
	                } else if (currentYear !== vmodel.year) {
	                    vmodel.year = currentYear
	                } else if (currentMonth !== vmodel.month) {
	                    vmodel.month = currentMonth
	                }
	                vmodel.dateError = '#cccccc'
	                vmodel.tip = getDateTip(cleanDate(date)).text
	                if (typeof vmodel.onSelect === "string") {
	                    avalon.log("onSelect 回调必须是个function！")
	                    return
	                }
	                vmodel.onSelect.call(null, date, vmodel, avalon(element).data())
	            } else {
	                if (!vmodel.allowBlank) {
	                    vmodel.tip = vmodel.formatErrorTip;
	                    vmodel.dateError = '#ff8888';
	                } else {
	                    vmodel.tip = ""
	                }
	            }
	        })
	        minDateVM && minDateVM[1].$watch(minDateVM[0], function(val) {
	            vmodel.minDate = val
	        })
	        maxDateVM && maxDateVM[1].$watch(maxDateVM[0], function(val) {
	            vmodel.maxDate = val;
	        })
	        function initValue() {
	            var value = element.value,
	                _date = parseDate(value),
	                today = cleanDate(new Date()),
	                _initDate = _date,
	                dateDisabled = false;
	
	            if (value && !_date) {
	                options.tip = options.formatErrorTip
	                options.dateError = "#ff8888"
	                _initDate = today
	            }
	            if (options.allowBlank) {
	                if (!value){
	                    options.tip = ""
	                    _initDate = today
	                } else if (_date) {
	                    dateDisabled = isDateDisabled(_date, options)
	                }
	            } else {
	                if (!value) {
	                    value = formatDate(today)
	                    options.tip = getDateTip(today).text  
	                    _initDate = today  
	                    dateDisabled = isDateDisabled(today, options)
	                } else if (_date) {
	                    dateDisabled = isDateDisabled(_date, options)
	                }
	            }
	            if (dateDisabled) {
	                _initDate = options.minDate || options.maxDate
	                value = formatDate(_initDate)
	            } 
	
	            year = _initDate.getFullYear()
	            month =  _initDate.getMonth()
	            day = _initDate.getDate()
	            _initValue = value
	        }
	        function updateMobileYears(year) { //todo--- 看能不能把数组的赋值，变成set的方式
	            var years = vmodel._years,
	                _year3 = (year + "").substr(0, 3),
	                newYears = [];
	            if (!~years.indexOf(year)) {
	                for (var i = 0; i <= 9; i++) {
	                    newYears.push(Number(_year3+i))
	                }
	                vmodel._years = newYears
	            } 
	        }
	        // 根据minDate和maxDate的设置判断给定的日期是否不可选
	        function isDateDisabled(date, vmodel) {
	            var time = date.getTime(),
	                minDate = vmodel.minDate,
	                maxDate = vmodel.maxDate;
	            if(minDate && time < minDate.getTime()){
	                return true;
	            } else if(maxDate && time > maxDate.getTime()) {
	                return true;
	            }
	            return false;
	        }
	        //todo-- 看看事件绑定这块可否优化
	        // 初始化时绑定各种回调
	        function bindEvents(calendar, tipContainer) {
	            // focus Input元素时显示日历组件
	            var arr = [
	                [element, "focus", function(e) {
	                    vmodel.toggle = true;
	                }],
	                // 切换日期年月或者点击input输入域时不隐藏组件，选择日期或者点击文档的其他地方则隐藏日历组件
	                [document, "click", function(e) {
	                    var target = e.target;
	                    if(options.type==="range") {
	                        return ;
	                    }
	                    if(!calendar.contains(target) && !tipContainer.contains(target) && vmodel.toggle && !vmodel.timer) {
	                        vmodel.toggle = false;
	                        return ;
	                    } else if(!vmodel.toggle && !vmodel.disabled && tipContainer.contains(target)){
	                        vmodel.toggle = true;
	                        return ;
	                    }
	                }],
	
	                // 处理用户的输入
	                [element, "keydown", function(e) {
	                    var keyCode = e.keyCode,  operate, eChar;
	                    eChar = e.key;
	                    if(eChar) {
	                        switch(eChar) {
	                            case "-": 
	                                operate = "-";
	                            break;
	                            case "/":
	                                operate = "/";
	                            break;
	                        }
	                    } else {
	                        switch(keyCode) {
	                            case 189: 
	                                operate = "-";
	                            break;
	                            case 191:
	                                operate = "/";
	                            break;
	                        }
	                    }
	                    if(!vmodel.toggle) {
	                        vmodel.toggle = true;
	                    }
	                    // 37:向左箭头； 39:向右箭头；8:backspace；46:Delete
	                    if((keyCode<48 || (keyCode>57 && keyCode<96) || keyCode>105) && keyCode !==13 && keyCode!==8 && options.separator !== operate && keyCode !== 27 && keyCode !== 9 && keyCode !== 37 && keyCode!== 39 && keyCode!==46) {
	                        e.preventDefault();
	                        return false;
	                    } 
	                }],
	                [element, "keyup", function(e) {
	                    var value = element.value,
	                        year = vmodel.year, 
	                        month = vmodel.month, 
	                        keyCode = e.keyCode,
	                        dateMonth,
	                        dateYear,
	                        date
	                    if (keyCode === 37 || keyCode === 39) {
	                        return false;
	                    }
	                    // 当按下Enter、Tab、Esc时关闭日历
	                    if (keyCode === 13 || keyCode == 27 || keyCode == 9) {
	                        vmodel.toggle = false
	                        return false
	                    }
	                    if (date = parseDate(value)) {
	                        dateMonth = date.getMonth()
	                        dateYear = date.getFullYear()
	                        vmodel.dateError = "#cccccc"
	                        vmodel.tip = getDateTip(cleanDate(date)).text
	                        vmodel.day = date.getDate()
	
	                        if (month != dateMonth && year != dateYear) {
	                            monthYearChangedBoth = true
	                            vmodel.year = dateYear
	                            vmodel.month = dateMonth
	                        } else if (month != dateMonth) {
	                            vmodel.month = dateMonth
	                        } else {
	                            vmodel.year = dateYear
	                        }
	                    } else {
	                        if (vmodel.allowBlank && value == "") {
	                            vmodel.tip = ""
	                            vmodel.dateError = "#cccccc"
	                            return
	                        }
	                        vmodel.tip = vmodel.formatErrorTip;
	                        vmodel.dateError = "#ff8888";
	                    }
	                }]
	            ]
	            avalon.each(arr, function(i, item) {
	                avalon.bind(item[0], item[1], item[2])
	            })
	            unbindEvents = function() {
	                avalon.each(arr, function(i, item) {
	                    avalon.unbind(item[0], item[1], item[2])
	                })
	                arr = null
	            }
	        }
	        // 通过prev、next按钮切换月份
	        function toggleMonth(operate) {
	            var month = vmodel.month, 
	                year = vmodel.year,
	                stepMonths = vmodel.stepMonths,
	                numberOfMonths = vmodel.numberOfMonths,
	                firstDayOfNextMonth,
	                firstDayMonth = 0,
	                firstDayYear = 0
	
	            if (operate === "next") {
	                month = month + stepMonths + numberOfMonths -1
	            } else {
	                month = month - stepMonths - numberOfMonths + 1
	            }
	            firstDayOfNextMonth = new Date(year, month, 1)
	            firstDayMonth = firstDayOfNextMonth.getMonth()
	            firstDayYear = firstDayOfNextMonth.getFullYear()
	            if (firstDayYear != vmodel.year) {
	                monthYearChangedBoth = true
	                vmodel.year = firstDayYear
	                vmodel.month = firstDayMonth
	            } else {
	                vmodel.month = firstDayMonth
	            }
	        }
	        // 日历头部的显示名
	        function calendarHeader() {
	            var weekNames = [],
	                startDay = options.startDay;
	            for(var j = 0 , w = vmodel.regional.dayNames ; j < 7 ; j++){
	                var n = ( j + startDay ) % 7;
	                weekNames.push(w[n]);
	            }
	            return weekNames;
	        }
	        function calendarDate(cellDate, vmodel, valueDate, dateMonth, dateYear, days, _days, day) {
	            var selected = false,
	                tip = getDateTip(cellDate),
	                _day = tip && tip.cellText || day,
	                weekDay = cellDate.getDay(),
	                weekend = weekDay % 7 == 0 || weekDay % 7 == 6,
	                dateDisabled = isDateDisabled(cellDate, vmodel)
	            if (valueDate && valueDate.getDate() === +day && dateMonth===valueDate.getMonth() && dateYear===valueDate.getFullYear()) {
	                selected = true
	            }    
	            days.push({day:day+"",_day: _day+"", month: dateMonth, year: dateYear, weekend: weekend, selected: selected, dateDisabled: dateDisabled})
	            _days.push(_day+"")
	        }
	        // 根据month、year得到要显示的日期数据
	        function calendarDays (month, year) {
	            if (typeof vmodel.onBeforeRender === "function") {
	                vmodel.onBeforeRender(vmodel, month, year, function() {
	                    _calendarDays(month, year)
	                })
	                return 
	            }
	            _calendarDays(month, year)
	        }
	        function _calendarDays(month, yeaer) {
	            var startDay = vmodel.startDay,
	                firstDayOfMonth = new Date(year, month , 1),
	                cellDate =  new Date(year , month , 1 - ( firstDayOfMonth.getDay() - startDay + 7 ) % 7 ),
	                showOtherMonths = vmodel.showOtherMonths,
	                valueDate = parseDate(element.value),
	                minDate = vmodel.minDate,
	                maxDate = vmodel.maxDate,
	                prev = minDate ? (year-minDate.getFullYear())*12+month-minDate.getMonth() > 0: true,
	                next = maxDate ? (maxDate.getFullYear()-year)*12+maxDate.getMonth()-month > 0: true,
	                rows = [],
	                _rows = [],
	                data = [],
	                _data = [],
	                days = [],
	                _days = [],
	                dateYear,
	                dateMonth,
	                day
	
	            vmodel.prevMonth = prev
	            vmodel.nextMonth = next
	
	            for (var i = 0, len = vmodel.numberOfMonths; i < len; i++) {
	                
	                for (var m=0; m<6; m++) {
	                    days = []
	                    _days = []
	                    
	                    for (var n = 0; n < 7; n++) {
	                        dateMonth = cellDate.getMonth()
	                        dateYear = cellDate.getFullYear()
	                        day = cellDate.getDate()
	                        if (dateYear === year && dateMonth === month) { 
	                            calendarDate(cellDate, vmodel, valueDate, dateMonth, dateYear, days, _days, day)
	                        } else {
	                            if (showOtherMonths && m === 0 && (dateYear < year || dateMonth < month)) {
	                                calendarDate(cellDate, vmodel, valueDate, dateMonth, dateYear, days, _days, day)
	                            } else {
	                                _days.push("")
	                                days.push({day:"", month: false, weekend: false, selected:false,dateDisabled: true})
	                            }
	                        }
	                        cellDate = new Date(cellDate.setDate(day+1))
	                    } 
	                    rows.push(days)
	                    _rows.push(_days)
	                }
	                data.push({
	                    year: year,
	                    month: month,
	                    rows: rows
	                })
	                _data.push({
	                    year: year,
	                    month: month, 
	                    rows: _rows
	                })
	                month += 1
	                firstDayOfMonth = new Date(year, month, 1)
	                year = firstDayOfMonth.getFullYear();
	                month = firstDayOfMonth.getMonth();
	                cellDate = new Date(year , month , 1 - ( firstDayOfMonth.getDay() - startDay + 7 ) % 7 )
	                rows = []
	                _rows = []
	            }
	            datepickerData = data
	            vmodel.data = _data
	        }
	        function setCalendarDate(cellDate, vmodel, valueDate, dateMonth, dateYear, dateDay, day, i, m, n) {
	            var selected = false,
	                month = valueDate && valueDate.getMonth(),
	                year = valueDate && valueDate.getFullYear(),
	                tip = getDateTip(cellDate),
	                _day = tip && tip.cellText || dateDay, 
	                weekDay = cellDate.getDay(),
	                weekend = weekDay % 7 == 0 || weekDay % 7 == 6,
	                dateDisabled = isDateDisabled(cellDate, vmodel),
	                dayItem = datepickerData[i]["rows"][m][n],
	                rowItem = vmodel.data[i]["rows"][m]
	
	            _day = _day + ''
	
	            if (dateDay === +day && dateMonth === month && dateYear === year) {
	                selected = true
	            }    
	            if (dayItem._day == _day && (dayItem.selected != selected || dayItem.dateDisabled != dateDisabled)) {
	                avalon.mix(dayItem, {month: dateMonth, year: dateYear, selected: selected, dateDisabled: dateDisabled})
	                rowItem.set(n, "").set(n, _day)
	            } else if (dayItem._day == _day) {
	                avalon.mix(dayItem, {month: dateMonth, year: dateYear})
	            } else {
	                avalon.mix(dayItem, {day:dateDay+"",_day: _day, month: dateMonth, year: dateYear, weekend: weekend, selected: selected, dateDisabled: dateDisabled})
	                rowItem.set(n, _day)
	            }
	        }
	        function setCalendarDays(month, year, day) {
	            if (typeof vmodel.onBeforeRender === "function") {
	                vmodel.onBeforeRender(vmodel, month, year, function() {
	                    _setCalendarDays(month, year, day)
	                })
	                return 
	            }
	            _setCalendarDays(month, year, day)
	        }
	        function _setCalendarDays(month, year, day) {
	            var startDay = vmodel.startDay,
	                firstDayOfMonth = new Date(year, month , 1),
	                cellDate =  new Date(year , month , 1 - ( firstDayOfMonth.getDay() - startDay + 7 ) % 7 ),
	                showOtherMonths = vmodel.showOtherMonths,
	                valueDate = parseDate(element.value),
	                minDate = vmodel.minDate,
	                maxDate = vmodel.maxDate,
	                prev = minDate ? (year-minDate.getFullYear())*12+month-minDate.getMonth() > 0: true,
	                next = maxDate ? (maxDate.getFullYear()-year)*12+maxDate.getMonth()-month > 0: true,
	                dateYear,
	                dateMonth,
	                dateDay
	
	            vmodel.prevMonth = prev
	            vmodel.nextMonth = next
	            
	            for (var i = 0, len = vmodel.numberOfMonths; i < len; i++) {
	                
	                vmodel.data[i].year = year
	                vmodel.data[i].month = month
	                datepickerData[i].year = year
	                datepickerData[i].month = month
	                for (var m=0; m<6; m++) {
	
	                    for (var n = 0; n < 7; n++) {
	                        dateMonth = cellDate.getMonth()
	                        dateYear = cellDate.getFullYear()
	                        dateDay = cellDate.getDate()
	
	                        if (dateYear === year && dateMonth === month) { 
	                            setCalendarDate(cellDate, vmodel, valueDate, dateMonth, dateYear, dateDay, day, i, m, n)
	                        } else {
	                            if (showOtherMonths && m === 0 && (dateYear < year || dateMonth < month)) {
	                                setCalendarDate(cellDate, vmodel, valueDate,dateMonth, dateYear, dateDay, day, i, m, n)
	                            } else {
	                                vmodel.data[i]["rows"][m].set(n, "")
	                                avalon.mix(datepickerData[i]["rows"][m][n], {day:"",_day: "", month: false, weekend: false, selected:false,dateDisabled: true})
	                            }
	                        }
	                        if (m === 5 && n === 0) { // 强行触发_rowShow，控制最后一行元素的可见或隐藏
	                            vmodel._uc = !vmodel._uc
	                        }
	                        cellDate = new Date(cellDate.setDate(dateDay+1))
	                    } 
	                }
	                month += 1
	                firstDayOfMonth = new Date(year, month, 1)
	                year = firstDayOfMonth.getFullYear()
	                month = firstDayOfMonth.getMonth()
	                cellDate = new Date(year, month, 1 - (firstDayOfMonth.getDay() - startDay + 7) % 7)
	            }
	        }
	        // 检验date
	        function validateDate(date) {
	            if (typeof date == "string") {
	                return parseDate(date)
	            } else {
	                return date;
	            }
	        }
	        // 检验time
	        function validateTime(date) {
	            if (typeof date == "string") {
	                var theDate = parseDate(date),
	                    timeReg = /\s[0-2]?[0-9]:[0-5]?[0-9]/,
	                    _time = date.match(timeReg)
	                if (theDate && _time && _time.length) {
	                    var time = _time[0].split(':'),
	                        hour = +time[0],
	                        minute = +time[1]
	                    theDate = new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate(), hour, minute)
	                }
	                return theDate
	            } else {
	                return date;
	            }
	        }
	        return vmodel
	    }
	
	    widget.regional = []
	    widget.regional["zh-CN"] = {
	        holidayDate: initHoliday(holidayDate),
	        dayNames: ['日', '一', '二', '三', '四', '五', '六'],  //该变量被注册到了vm中，同时在方法中使用
	        weekDayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	        monthNames: ['一月','二月','三月','四月','五月','六月',
	            '七月','八月','九月','十月','十一月','十二月'],
	        monthNamesShort: ['一月','二月','三月','四月','五月','六月',
	            '七月','八月','九月','十月','十一月','十二月'],
	        closeText: "Done",
	        prevText: "前",
	        prevDayText: "昨天",
	        nextText: "后",
	        nextDayText: "明天",
	        dayAfterTomorrow: "后天",
	        currentDayText: "今天",
	        currentDayFullText: "今天",
	        showMonthAfterYear: true,
	        titleFormat: function(year, month) {
	            return year + "年" + " " + this.monthNames[month]
	        },
	        dayText: "天",
	        weekText: "周",
	        yearText: "年",
	        monthText: "月",
	        timerText: "时间",
	        hourText: "时",
	        minuteText: "分",
	        nowText: "现在",
	        confirmText: "确定"
	    }
	
	    //设置默认语言包
	    widget.defaultRegional = widget.regional["zh-CN"]
	
	    widget.version = 1.0
	    widget.defaults = {
	        calendarWidth: 196, //@config 设置日历展示宽度
	        startDay: 1, //@config 设置每一周的第一天是哪天，0代表Sunday，1代表Monday，依次类推, 默认从周一开始
	        minute: 0, //@config 设置time的默认minute
	        hour: 0, //@config 设置time的hour
	        width: 90, //@config 设置日历框宽度
	        showTip: true, //@config 是否显示节日提示
	        disabled: false, //@config 是否禁用日历组件
	        changeMonthAndYear: false, //@config 是否可以通过下拉框选择月份或者年份
	        mobileMonthAndYear: false, //@config PC端可以通过设置changeMonthAndYear为true使用dropdown的形式选择年份或者月份，但是移动端只能通过设置mobileMonthAndYear为true来选择月份、年份
	        showOtherMonths: false, //@config 是否显示非当前月的日期
	        numberOfMonths: 1, //@config 一次显示的日历月份数, 默认一次显示一个
	        allowBlank : false, //@config 是否允许日历框为空
	        minDate : null, //@config 最小的可选日期，可以配置为Date对象，也可以是yyyy-mm-dd格式的字符串，或者当分隔符是“/”时，可以是yyyy/mm/dd格式的字符串
	        maxDate : null, //@config 最大的可选日期，可以配置为Date对象，也可以是yyyy-mm-dd格式的字符串，或者当分隔符是“/”时，可以是yyyy/mm/dd格式的字符串
	        stepMonths : 1, //@config 当点击next、prev链接时应该跳过几个月份, 默认一个月份
	        toggle: false, //@config 设置日历的显示或者隐藏，false隐藏，true显示
	        separator: "-", //@config 日期格式的分隔符,默认“-”，可以配置为"/"，而且默认日期格式必须是yyyy-mm-dd
	        calendarLabel: "选择日期", //@config 日历组件的说明label
	        /**
	         * @config {Function} 当month或者year更新时调用的回调
	         * @param year {Number} 当前日期的year
	         * @param month {Number} 当前日期的month(0-11)
	         * @param vmodel {Number} 日历组件对应vmodel
	         */
	        onChangeMonthYear: avalon.noop, 
	        /**
	         * @config {Function} 格式化输出日期单元格内容
	         * @param date {Date} 当前的日期
	         * @param vmodel {Vmodel} 日历组件对应vmodel
	         * @param dateItem {Object} 对应的包含日期相关信息的对象
	         */
	        dateCellRender: false,
	        watermark: true, //@config 是否显示水印文字
	        zIndex: -1, //@config设置日历的z-index
	        showDatepickerAlways: false, //@config是否总是显示datepicker
	        timer: false, //@config 是否在组件中可选择时间
	        position: '', //@config 设置datepicker的显示位置，可以为"rb"、"lt"、"rt"或者自定义的class,默认""
	        /**
	         * @config {Function} 在渲染日期前的准备工作，比如格式化日期前需请求的服务器数据
	         * @param vmodel {Object} 当前日期组件对应的Vmodel
	         * @param month {Number} 当前month(0-11) 
	         * @param year {Number} 当前year
	         */
	        onBeforeRender: null,
	        /**
	         * @config {Function} 选中日期后的回调
	         * @param date {String} 当前选中的日期
	         * @param vmodel {Object} 当前日期组件对应的Vmodel
	         * @param data {Object} 绑定组件的元素的data属性组成的集合
	         */
	        onSelect: avalon.noop, 
	        /**
	         * @config {Function} 日历关闭的回调
	         * @param date {Object} 当前日期
	         * @param vmodel {Object} 当前日期组件对应的Vmodel
	         */
	        onClose: avalon.noop,
	        /**
	         * @config {Function} 在设置了timer为true时，选择日期、时间后的回调
	         * @param vmodel {Object} 当前日期组件对应的Vmodel
	         */
	        onSelectTime: avalon.noop,
	        /**
	         * @config {Function} 将符合日期格式要求的字符串解析为date对象并返回，不符合格式的字符串返回null,用户可以根据自己需要自行配置解析过程
	         * @param str {String} 要解析的日期字符串
	         * @returns {Date} Date格式的日期
	         */
	        parseDate: parseDate,
	        /**
	         * @config {Function} 将日期对象转换为符合要求的日期字符串
	         * @param date {Date} 要格式化的日期对象
	         * @returns {String} 格式化后的日期
	         */
	        formatDate: function(date){
	            if (avalon.type(date) !== "date") {
	                avalon.log("the type of " + date + "must be Date")
	                return ""
	            }
	            var separator = this.separator,
	                year = date.getFullYear(),
	                month = date.getMonth(),
	                day = date.getDate();
	            return year + separator + this.formatNum(month + 1 , 2) + separator + this.formatNum(day , 2);
	        },
	        // 格式化month和day，使得其始终为两位数，比如2为02,1为01
	        formatNum: function(n, length){
	            n = String(n);
	            for( var i = 0 , len = length - n.length ; i < len ; i++)
	                n = "0" + n;
	            return n;
	        },
	        widgetElement: "", // accordion容器
	        formatErrorTip: "格式错误",
	        getTemplate: function(str, options) {
	            return str;
	        }
	    }
	    avalon.filters.timer = function(str) {
	        var num = +str;
	        if (num >= 0 && num <=9) {
	            str = "0" + str;
	        }
	        return str;
	    }
	    function cleanDate( date ){
	        date.setHours(0);
	        date.setMinutes(0);
	        date.setSeconds(0);
	        date.setMilliseconds(0);
	        return date;
	    }
	    // 获取节日信息并设置相应显示，提供中文语言包对于节日的支持
	    function initHoliday( data ){
	        var _table = {},
	            _data = [];
	        for( var k in data ){
	            var v = data[ k ],
	                _date = parseDate( k );
	
	            if( _date ){
	                v.date = _date;
	                _data.push( v );
	            }
	        }
	        _data.sort( function( a , b ){
	            return ( a.dayIndex || 0 ) - ( b.dayIndex || 0 );
	        });
	        for( var k = 0 , len = _data.length ; k < len ; k++ ){
	            var v = _data[k],
	                _date = v.date,
	                beforeTime = v.beforeTime || 0,
	                afterTime = v.afterTime || 0;
	            _date.setDate( _date.getDate() - beforeTime - 1 );
	            for( var i = -v.beforeTime ; i < afterTime + 1 ; i++ ){
	                _date.setDate( _date.getDate() + 1 );
	                _table[ _date.getTime() ] =  {
	                    text : v['holidayName'] + ( i < 0 ? '前' + -i + '天' : i > 0 ? '后' + i + '天' : ""),
	                    cellClass : i === 0 && v['holidayClass'] || "",
	                    cellText : i === 0 && v['holidayText'] || ""
	                };
	            }
	        }
	        return _table;
	    }
	
	    function parseDate(str){
	        if (!str) {
	            return null
	        }
	        if (avalon.type(str) === "date") return str
	        var separator = this.separator || "-";
	        var reg = "^(\\d{4})" + separator+ "(\\d{1,2})"+ separator+"(\\d{1,2})[\\s\\w\\W]*$";
	        reg = new RegExp(reg);
	        var x = str.match(reg);
	        return x ? new Date(x[1],x[2] * 1 -1 , x[3]) : null;
	    }
	
	    // 解析传入日期，如果是节日或者节日前三天和后三天只能，会相应的显示节日前几天信息，如果是今天就显示今天，其他情况显示日期对应的是周几
	    function getDateTip(curDate) {
	        if(!curDate)
	            return;
	
	        //如果没有传递语言设置，使用默认的语言包
	        var regional
	        if(this.$id && this.regional) {
	            regional = this.regional
	        } else {
	            regional = widget.defaultRegional
	        }
	
	        var holidays = regional.holidayDate || {}
	        var now = (cleanDate(new Date())).getTime(),
	            curTime = curDate.getTime(),
	            dayNames = regional.dayNames;
	        if(now == curTime) {
	            return {
	                    text : regional.currentDayFullText,
	                    cellClass : 'c_today',
	                    cellText : regional.currentDayText
	                };
	        } else if(now == curTime - ONE_DAY) {
	            return {
	                    text : regional.nextDayText,
	                    cellClass : ""
	                };
	        } else if(now == curTime - ONE_DAY * 2) {
	            return {
	                    text : regional.dayAfterTomorrow ,
	                    cellClass : ""
	                };
	        }
	        var tip = holidays && holidays[curDate.getTime()];
	        if(!tip) {
	            return {text: regional.weekDayNames[curDate.getDay()]};
	        } else {
	            return tip;
	        }
	    };
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [默认配置的日历框、allowBlank为true时的不同](avalon.datepicker.ex1.html)
	 [配置日历周一-周日的对应的显示名、使日历的每一周从周日开始、通过下拉选框切换选择日历显示年份、月份](avalon.datepicker.ex2.html)
	 [显示非当前月日期、通过prev、next每次切换3个月、一次显示多个月份](avalon.datepicker.ex3.html)
	 [设置日期可选的最小日期、最大日期、以及初始值异常的显示情况](avalon.datepicker.ex4.html)
	 [设置toggle切换日历显示与隐藏、calendarLabel配置日历顶部说明文字](avalon.datepicker.ex5.html)
	 [ms-duplex初始化日期、allowBlank为false or true时组件对不同初始值的处理方式](avalon.datepicker.ex6.html)
	 [组件选择日期后的change回调、关闭时的onClose回调、切换月份、年份的onChangeMonthYear回调](avalon.datepicker.ex7.html)
	 [自定义parseDate、formatDate方法正确解析和显示日期](avalon.datepicker.ex8.html)
	 [切换日历组件的禁用与否，以及手动输入日期的结果](avalon.datepicker.ex9.html)
	 [移动端日期、年份选择](avalon.datepicker.ex10.html)
	 [具有时间选择功能的datepicker](avalon.datepicker.ex11.html)
	 [带格式化输出配置的datepicker](avalon.datepicker.ex12.html)
	 [多语言支持](avalon.datepicker.ex13.html)
	 [datepicker的验证](avalon.datepicker.ex14.html)
	 [datepicker显示位置的设置](avalon.datepicker.ex15.html)
	 [datepicker宽度、格式自定义](avalon.datepicker.ex16.html)
	 [onBeforRender异步获取数据格式化日历](avalon.datepicker.ex17.html)
	 */


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    var HolidayStyle = {
	        "元旦节" : {
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_yuandan",
	            "holidayText" : "元旦"
	        },
	        "除夕" : {
	            "afterTime": 0,
	            "beforeTime": 0,
	            "dayIndex": 0,
	            "holidayClass" : "c_chuxi",
	            "holidayText" : "除夕"
	        },
	        "春节" : {
	            "afterTime": 0,
	            "beforeTime": 0,
	            "dayIndex": 0,
	            "holidayClass" : "c_chunjie",
	            "holidayText" : "春节"
	        },
	        "元宵节" : {
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_yuanxiao",
	            "holidayText" : "元宵"
	        },
	        "清明节" : {
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_qingming",
	            "holidayText" : "清明"
	        },
	        "劳动节" :{
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_wuyi",
	            "holidayText" : "劳动"
	        },
	        "端午节":{
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_duanwu",
	            "holidayText" : "端午"
	        },
	        "中秋节":{
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_zhongqiu",
	            "holidayText" : "中秋"
	        },
	        "国庆节":{
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_guoqing",
	            "holidayText" : "国庆"
	        },
	        "圣诞节":{
	            "afterTime": 3,
	            "beforeTime": 3,
	            "dayIndex": 0,
	            "holidayClass" : "c_shengdan",
	            "holidayText" : "圣诞"
	        }
	    };
	    var HolidayData = {
	        "2014-01-01": {
	            "holidayName": "元旦节"
	        },
	        "2014-01-30": {
	            "holidayName": "除夕"
	        },
	        "2014-01-31": {
	            "holidayName": "春节"
	        },
	        "2014-02-01": {
	            "holidayName": "正月初二"
	        },
	        "2014-02-02": {
	            "holidayName": "正月初三"
	        },
	        "2014-02-14": {
	            "holidayName": "元宵节"
	        },
	        "2014-04-05": {
	            "holidayName": "清明节"
	        },
	        "2014-05-01": {
	            "holidayName": "劳动节"
	        },
	        "2014-06-01": {
	            "holidayName": "儿童节"
	        },
	        "2014-06-02": {
	            "holidayName": "端午节"
	        },
	        "2014-09-08": {
	            "holidayName": "中秋节"
	        },
	        "2014-09-10": {
	            "holidayName": "教师节"
	        },
	        "2014-10-01": {
	            "holidayName": "国庆节"
	        },
	        "2014-12-25": {
	            "holidayName": "圣诞节"
	        },
	        "2015-01-01": {
	            "holidayName": "元旦节"
	        },
	        "2015-02-18": {
	            "holidayName": "除夕"
	        },
	        "2015-02-19": {
	            "holidayName": "春节"
	        },
	        "2015-02-20": {
	            "holidayName": "正月初二"
	        },
	        "2015-02-21": {
	            "holidayName": "正月初三"
	        },
	        "2015-03-05": {
	            "holidayName": "元宵节"
	        },
	        "2015-04-05": {
	            "holidayName": "清明节"
	        },
	        "2015-05-01": {
	            "holidayName": "劳动节"
	        },
	        "2015-06-01": {
	            "holidayName": "儿童节"
	        },
	        "2015-06-20": {
	            "holidayName": "端午节"
	        },
	        "2015-09-27": {
	            "holidayName": "中秋节"
	        },
	        "2015-10-01": {
	            "holidayName": "国庆节"
	        },
	        "2015-12-25": {
	            "holidayName": "圣诞节"
	        }
	    };
	    for( var x in HolidayData ){
	        if( HolidayData.hasOwnProperty(x)){
	            var data = HolidayData[x],
	                name = data.holidayName;
	            if( name && HolidayStyle[ name ] ){
	                var style = HolidayStyle[ name ];
	                for( var y in style){
	                    if( style.hasOwnProperty(y) && !(y in data)){
	                        data[y] = style[y];
	                    }
	                }
	            }
	        }
	    }
	    return HolidayData;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-datepicker\"\n     ms-visible=\"toggle\"\n     ms-class=\"oni-datepicker-multiple:numberOfMonths!==1\">\n    <div class=\"oni-datepicker-wrapper\" ms-css-position=\"_position\" ms-class=\"{{_getPositionClass(position)}}\">\n        <div class=\"oni-datepicker-content\">\n            <div class=\"oni-datepicker-label\" ms-if=\"numberOfMonths===1\">{{calendarLabel}}</div>\n            <i  class=\"oni-datepicker-prev oni-icon\" \n                ms-if=\"numberOfMonths!==1\" \n                ms-click=\"_prev(prevMonth, $event)\"\n                ms-class=\"oni-datepicker-prev-disabled:!prevMonth\" \n                style=\"left:15px;\">&#xf047;</i>\n            <i  class=\"oni-datepicker-next oni-icon\" \n                ms-if=\"numberOfMonths!==1\" \n                ms-click=\"_next(nextMonth, $event)\"\n                ms-class=\"oni-datepicker-next-disabled:!nextMonth\" \n                style=\"right:15px;\">&#xf03e;</i>\n            <div class=\"oni-datepicker-content-content\" \n                 ms-repeat-calendar=\"data\" \n                 ms-visible=\"_datepickerToggle\"\n                 ms-css-width='calendarWidth'\n                 data-repeat-rendered=\"dataRendered\">\n                <div class=\"oni-datepicker-header\" ms-if=\"numberOfMonths===1\">\n                    <i class=\"oni-datepicker-prev oni-icon\" \n                       ms-click=\"_prev(prevMonth, $event)\"\n                       ms-class=\"oni-datepicker-prev-disabled:!prevMonth\">&#xf047;</i>\n                    <i class=\"oni-datepicker-next oni-icon\"    \n                       ms-click=\"_next(nextMonth, $event)\"\n                       ms-class=\"oni-datepicker-next-disabled:!nextMonth\">&#xf03e;</i>\n                    <div class=\"oni-datepicker-title\" ms-if=\"changeMonthAndYear && regional.showMonthAfterYear\">\n                        <select ms-each=\"years\" data-each-rendered=\"_afterYearRendered\">\n                            <option ms-attr-value=\"el\">{{el}}</option>\n                        </select>&nbsp;{{regional.yearText}}&nbsp;\n                        <select ms-each=\"months\" data-each-rendered=\"_afterMonthRendered\">\n                            <option ms-attr-value=\"{{el}}\">{{el}}</option>\n                        </select>&nbsp;{{regional.monthText}}\n                    </div>\n                    <div class=\"oni-datepicker-title\" ms-if=\"changeMonthAndYear && !regional.showMonthAfterYear\">\n                        <select ms-each=\"months\" data-each-rendered=\"_afterMonthRendered\">\n                            <option ms-attr-value=\"{{el}}\">{{el}}</option>\n                        </select>&nbsp;{{regional.monthText}}\n                        <select ms-each=\"years\" data-each-rendered=\"_afterYearRendered\">\n                            <option ms-attr-value=\"el\">{{el}}</option>\n                        </select>&nbsp;{{regional.yearText}}&nbsp;\n                    </div>\n                    <div class=\"oni-datepicker-title\"\n                         ms-click=\"_selectMonths\"\n                         ms-if=\"!changeMonthAndYear\">\n                        <span ms-hover=\"oni-state-hover:mobileMonthAndYear\" ms-html=\"_getTitle(calendar.year, calendar.month)\"></span>\n                    </div> \n                </div>\n                <div class=\"oni-datepicker-header\" ms-if=\"numberOfMonths!==1\">\n                    <div class=\"oni-datepicker-title\">\n                        <span ms-hover=\"oni-state-hover:mobileMonthAndYear\" ms-html=\"_getTitle(calendar.year, calendar.month)\"></span>\n                    </div> \n                </div>\n                <table class=\"oni-datepicker-calendar-week\">\n                    <thead>\n                        <tr>\n                            <th ms-repeat=\"weekNames\"\n                                ms-class=\"{{_setWeekClass(el)}}\">{{el}}\n                            </th>\n                        </tr>\n                    </thead>\n                </table>\n                <table class=\"oni-datepicker-calendar-days\" id='oni-datepicker-days'>\n                    <tbody>\n                        <tr ms-repeat-days=\"calendar.rows\"\n                            ms-visible=\"_rowShow(days, _uc)\">\n                            <td class=\"oni-datepicker-default\"\n                                ms-repeat-item=\"days\"\n                                ms-class=\"{{_setDayClass($index, $outer.$index, $outer.$outer.$index, item)}}\"\n                                ms-hover=\"{{_setHoverClass($index, $outer.$index, $outer.$outer.$index, item)}}\"\n                                ms-click=\"_selectDate($index, $outer.$index, $outer.$outer.$index, $event)\"\n                                ms-html=\"_dateCellRender($outer.$index, $index, $outer.$outer.$index, item)\"\n                                ms-attr-title=\"_dateCellRender($outer.$index, $index, $outer.$outer.$index, item)\"\n                                ></td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"oni-datepicker-timer\" ms-if=\"timer\">\n                    <label>\n                        <span>{{regional.timerText}}</span>\n                        <b>{{hour|timer}}</b>&nbsp;:\n                        <b>{{minute|timer}}</b>\n                    </label>\n                    <p>\n                        <span>{{regional.hourText}}</span>\n                        <input ms-widget=\"slider, $, sliderHourOpts\" data-slider-max=\"23\" data-slider-min=\"0\" data-slider-value=\"hour\" data-slider-width=\"140\">\n                    </p>\n                    <p>\n                        <span>{{regional.minuteText}}</span>\n                        <input ms-widget=\"slider, $, sliderMinuteOpts\" data-slider-max=\"59\" data-slider-min=\"0\" data-slider-width=\"140\" data-slider-value=\"minute\">\n                    </p>\n                </div>\n                <div class=\"oni-datepicker-timer oni-helper-clearfix\" ms-if=\"timer\">\n                    <button type=\"button\" class=\"oni-btn oni-btn-small\" style=\"float: left\" ms-click=\"_getNow\">{{regional.nowText}}</button>\n                    <button type=\"button\" class=\"oni-btn oni-btn-primary oni-btn-small\" style=\"float:right\" ms-click=\"_selectTime\">{{regional.confirmText}}</button>\n                </div>\n                <div class=\"oni-datepicker-watermark\" \n                     ms-if=\"watermark\"\n                     ms-css-font-size='_height'\n                     ms-css-line-height='{{_height}}px'\n                     ms-css-width='calendarWidth'\n                     ms-css-height='_height'>\n                    {{calendar.month+1}}\n                </div>\n            </div>\n            <div class=\"oni-datepicker-content-content oni-datepicker-month-year\" ms-if=\"mobileMonthAndYear\" ms-visible=\"_monthToggle\" ms-css-width='calendarWidth'>\n                <table>\n                    <thead>\n                        <tr class=\"oni-datepicker-title\">\n                            <th class=\"prev\" style=\"visibility: visible;text-align:left\">\n                                <i class=\"oni-datepicker-prev oni-icon\" \n                                   ms-click=\"_prevYear(mobileYear)\"\n                                   ms-class=\"oni-datepicker-prev-disabled:mobileYear===years[0]\">&#xf047;</i>\n                            </th>\n                            <th style=\"text-align:center\" \n                                ms-click=\"_selectYears\" \n                                ms-hover=\"oni-state-hover:mobileMonthAndYear\">{{mobileYear}}</th>\n                            <th class=\"next\" style=\"visibility: visible;text-align:right\">\n                                <i class=\"oni-datepicker-next oni-icon\" \n                                   ms-click=\"_nextYear(mobileYear)\"\n                                   ms-class=\"oni-datepicker-prev-disabled:mobileYear===years[years.length-1]\">&#xf03e;</i>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td colspan=\"3\" style=\"padding:0px\">\n                                <span ms-repeat-m=\"months\" \n                                      ms-class=\"oni-datepicker-selected: (m-1)===elementMonth && mobileYear===elementYear\"\n                                      ms-click=\"_selectDates(m-1)\"\n                                      ms-hover=\"oni-datepicker-day-hover\">{{regional.monthNamesShort[m - 1]}}</span>\n                            </td>\n                        </tr>\n                    </tbody>\n                    <tfoot>\n                        <tr>\n                            <th colspan=\"3\" class=\"today\" style=\"display: none;\">Today</th>\n                        </tr>\n                        <tr>\n                            <th colspan=\"3\" class=\"clear\" style=\"display: none;\">Clear</th>\n                        </tr>\n                    </tfoot>\n                </table>\n            </div>\n\n            <div class=\"oni-datepicker-content-content oni-datepicker-month-year\" ms-if=\"mobileMonthAndYear\" ms-visible=\"_yearToggle\" ms-css-width='calendarWidth'>\n                <table>\n                    <thead>\n                        <tr class=\"oni-datepicker-title\">\n                            <th class=\"prev\" style=\"visibility: visible;text-align:left\">\n                                <i class=\"oni-datepicker-prev oni-icon\" \n                                   ms-click=\"_prevYears\" \n                                   ms-class=\"oni-datepicker-prev-disabled:_years[0]<=years[0]\">&#xf047;</i>\n                            </th>\n                            <th style=\"text-align:center\" \n                                ms-hover=\"oni-state-hover:mobileMonthAndYear\">{{_years[0]}}-{{_years[9]}}\n                            </th>\n                            <th class=\"next\" style=\"visibility: visible;text-align:right\">\n                                <i class=\"oni-datepicker-next oni-icon\" \n                                    ms-click=\"_nextYears\"\n                                    ms-class=\"oni-datepicker-next-disabled:_years[_years.length-1]>=years[years.length-1]\">&#xf03e;</i>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td colspan=\"3\" style=\"padding:0px\">\n                                <span class=\"oni-datepicker-prev-year\"\n                                      ms-class=\"{{_setMobileYearClass(_years[0]-1, elementYear, month, elementMonth)}}\"\n                                      ms-click=\"_selectMonths($event, _years[0]-1)\"\n                                      ms-hover=\"oni-datepicker-day-hover\"\n                                >{{_years[0]-1}}</span>\n                                <span ms-repeat-y=\"_years\" \n                                      ms-class=\"_setMobileYearClass(y, elementYear, month, elementMonth)\"\n                                      ms-click=\"_selectMonths($event, y)\"\n                                      ms-hover=\"oni-datepicker-day-hover\"\n                                >{{y}}</span>\n                                <span class=\"oni-datepicker-next-year\"\n                                      ms-class=\"{{_setMobileYearClass(_years[9]+1, elementYear, month, elementMonth)}}\"\n                                      ms-click=\"_selectMonths($event, _years[9]+1)\"\n                                      ms-hover=\"oni-datepicker-day-hover\"\n                                >{{_years[9]+1}}</span>\n                            </td>\n                        </tr>\n                    </tbody>\n                    <tfoot>\n                        <tr>\n                            <th colspan=\"3\" class=\"today\" style=\"display: none;\">Today</th></tr>\n\n                            <tr><th colspan=\"3\" class=\"clear\" style=\"display: none;\">Clear</th>\n                        </tr>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//avalon 1.3.6 2014.11.06
	/**
	 *
	 * @cnName 下拉框
	 * @enName dropdown
	 * @introduce
	 *
	 <p>因为原生<code>select</code>实在是难用，avalon的dropdown组件在兼容原生<code>select</code>的基础上，对其进行了增强。</p>
	 <ul>
	 <li>1，支持在标题和下拉菜单项中使用html结构，可以用来信息的自定义显示</li>
	 <li>2，同时支持通过html以及配置项两种方式设置组件</li>
	 <li>3，通过配置，可以让下拉框自动识别在屏幕中的位置，来调整向上或者向下显示</li>
	 </ul>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2),
	    __webpack_require__(19),
	    __webpack_require__(13),
	    __webpack_require__(20),
	    __webpack_require__(24),
	    __webpack_require__(25)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, template) {
	    var styleReg = /^(\d+).*$/;
	    var ie6=!-[1,]&&!window.XMLHttpRequest;
	    var widget = avalon.ui.dropdown = function(element, data, vmodels) {
	        var $element = avalon(element),
	            elemParent = element.parentNode,
	            options = data.dropdownOptions,
	            hasBuiltinTemplate = true, //标志是否通过model值构建下拉列表
	            dataSource,
	            dataModel,
	            templates, titleTemplate, listTemplate,
	            blurHandler,
	            scrollHandler,
	            resizeHandler,
	            keepState = false
	
	        //将元素的属性值copy到options中
	        "multiple,size".replace(avalon.rword, function(name) {
	            if (hasAttribute(element, name)) {
	                options[name] = element[name]
	            }
	        })
	        //将元素的属性值copy到options中
	        options.enable = !element.disabled
	
	        //读取template
	        templates = options.template = options.getTemplate(template, options)
	            .replace(/MS_OPTION_ID/g, data.dropdownId).split("MS_OPTION_TEMPLATE")
	        titleTemplate = templates[0]
	        listTemplate = templates[1]
	        dataSource = options.data.$model || options.data
	
	        //由于element本身存在ms-if或者内部包含ms-repeat等绑定，在抽取数据之前，先对element进行扫描
	        element.removeAttribute("ms-duplex");
	        avalon.scan(element, vmodels);
	
	        //数据抽取
	        dataModel = getDataFromHTML(element)
	        hasBuiltinTemplate = !!dataModel.length
	
	        if (dataModel.length === 0) {
	            dataModel = getDataFromOption(dataSource);
	        }
	
	        options.data = dataModel
	        avalon(element).css('display', 'none');
	
	        //转换option
	        _buildOptions(options);
	        for (var i = 0, n = dataModel.length; i < n; i++) {
	            if (dataModel[i].value == options.value) {
	                options.activeIndex = i
	                options.currentOption = avalon.mix(true, {}, dataModel[i]);
	                break;
	            }
	        }
	        var titleNode, listNode;
	        var vmodel = avalon.define(data.dropdownId, function(vm) {
	            avalon.mix(vm, options);
	            vm.$skipArray = ["widgetElement", "duplexName", "menuNode", "dropdownNode", "scrollWidget", "rootElement"];
	            if(vm.multiple && vm.$hasDuplex && vm.$skipArray.indexOf("value") === -1) {
	                vm.$skipArray.push("value")
	            }
	            vm.render = function(data) {
	                if (data === void 0) {
	                    return
	                }
	                vmodel.data = getDataFromOption(data.$model || data)
	                if (vmodel.toggle) {
	                    vmodel._styleFix(true)
	                }
	            }
	            vm.widgetElement = element;
	            vm.rootElement = {}
	            vm.menuWidth = "auto";   //下拉列表框宽度
	            vm.menuHeight = vm.height;  //下拉列表框高度
	            vm.dataSource = dataSource;    //源节点的数据源，通过dataSource传递的值将完全模拟select
	            vm.focusClass =  false
	            vm.$init = function(continueScan) {
	                //根据multiple的类型初始化组件
	                if (vmodel.multiple) {
	                    //创建菜单
	                    listNode = createListNode();
	                    var list = listNode.firstChild;
	                    elemParent.insertBefore(listNode, element);
	                    list.appendChild(element);
	                } else {//如果是单选
	                    var title;
	                    titleNode = avalon.parseHTML(titleTemplate);
	                    title = titleNode.firstChild;
	                    elemParent.insertBefore(titleNode, element);
	                    title.appendChild(element);
	                    titleNode = title;
	
	                    //设置title宽度
	                    vmodel.titleWidth = computeTitleWidth();
	                    //设置label值
	                    setLabelTitle(vmodel.value);
	
	                    //注册blur事件
	                    blurHandler = avalon.bind(document.body, "click", function(e) {
	                        //判断是否点击发生在dropdown节点内部
	                        //如果不在节点内部即发生了blur事件
	                        if(titleNode.contains(e.target)) {
	                            vmodel._toggle()
	                            return
	                        } else if(listNode && listNode.contains(e.target)) {
	                            return
	                        }
	                        if (!vmodel.__cursorInList__ && !vmodel.multiple && vmodel.toggle) {
	                            vmodel.toggle = false;
	                        }
	                    })
	
	                    if(vmodel.position) {
	                        //监听window的滚动及resize事件，重新定位下拉框的位置
	                        scrollHandler = avalon.bind(window, "scroll", _positionListNode)
	                        resizeHandler = avalon.bind(window, "resize", _positionListNode)
	                    }
	
	                }
	
	                //如果原来的select没有子节点，那么为它添加option与optgroup
	                if (!hasBuiltinTemplate) {
	                    element.appendChild(getFragmentFromData(dataModel));
	                    avalon.each(["multiple", "size"], function(i, attr) {
	                        avalon(element).attr(attr, vmodel[attr]);
	                    });
	                }
	
	                if (!vmodel.multiple) {
	                    var duplexName = (element.msData["ms-duplex"] || "").trim(),
	                        duplexModel;
	
	                    if (duplexName && (duplexModel = avalon.getModel(duplexName, vmodels))) {
	                        duplexModel[1].$watch(duplexModel[0], function(newValue) {
	                            vmodel.value = newValue;
	                        })
	                    }
	
	                    vmodel.$watch("value", function(n, o) {
	                        avalon.nextTick(function(){
	                            var onChange = avalon.type(vmodel.onChange) === "function" && vmodel.onChange || false
	                            if (keepState) {
	                                keepState = false
	                                return
	                            }
	                            function valueStateKeep(stateKeep) {
	                                if (stateKeep) {
	                                    keepState = true
	                                    vmodel.value = o
	                                } else {
	                                    if (duplexModel) {
	                                        duplexModel[1][duplexModel[0]] = n
	                                        element.value = n
	                                    }
	                                    vmodel.currentOption = setLabelTitle(n);
	                                }
	                            }
	                            if ((onChange && onChange.call(element, n, o, vmodel, valueStateKeep) !== false) || !onChange) {
	                                if (duplexModel) {
	                                    duplexModel[1][duplexModel[0]] = n
	                                    element.value = n
	                                }
	                                vmodel.currentOption = setLabelTitle(n);
	                            }
	                        })
	                    });
	                } else {
	                    vmodel.value.$watch("length", function() {
	                        vmodel.multipleChange = !vmodel.multipleChange;
	                        optionsSync();
	                    })
	                }
	
	                //同步disabled或者enabled
	                var disabledAttr = element.msData["ms-disabled"],
	                    disabledModel,
	                    enabledAttr = element.msData["ms-enabled"],
	                    enabledModel;
	
	                if(disabledAttr && (disabledModel = avalon.getModel(disabledAttr, vmodels))) {
	                    disabledModel[1].$watch(disabledModel[0], function(n) {
	                        vmodel.enable = !n;
	                    });
	                    vmodel.enable = !disabledModel[1][disabledModel[0]];
	                }
	
	                if(enabledAttr && (enabledModel = avalon.getModel(enabledAttr, vmodels))) {
	                    enabledModel[1].$watch(enabledModel[0], function(n) {
	                        vmodel.enable = n;
	                    })
	                    vmodel.enable = enabledModel[1][enabledModel[0]];
	                }
	                vmodel.enable = !element.disabled;
	
	                //同步readOnly
	                var readOnlyAttr = vmodel.readonlyAttr,
	                    readOnlyModel;
	
	                if(readOnlyAttr && (readOnlyModel = avalon.getModel(readOnlyAttr, vmodels))) {
	                    readOnlyModel[1].$watch(readOnlyModel[0], function(n) {
	                        vmodel.readOnly = n;
	                    });
	                    vmodel.readOnly = readOnlyModel[1][readOnlyModel[0]];
	                }
	
	                //获取$source信息
	                if(vmodel.$source) {
	                    if(avalon.type(vmodel.$source) === "string") {
	                        var sourceModel = avalon.getModel(vmodel.$source, vmodels);
	
	                        sourceModel && ( vmodel.$source = sourceModel[1][sourceModel[0]] );
	
	                    } else if(!vmodel.$source.$id) {
	                        vmodel.$source = null
	                    } else if(vmodel.$source.length > 0) {
	                        vmodel._refresh(vmodel.$source.length);
	                    }
	
	                    //对data的改变做监听，由于无法检测到对每一项的改变，检测数据项长度的改变
	                    vmodel.$source && vmodel.$source.$watch && vmodel.$source.$watch('length', function(n) {
	                        vmodel._refresh(n)
	                    });
	                }
	                avalon.scan(element.parentNode, [vmodel].concat(vmodels));
	                if(continueScan){
	                    continueScan()
	                } else{
	                    avalon.log("请尽快升到avalon1.3.7+")
	                    if (typeof options.onInit === "function") {
	                        options.onInit.call(element, vmodel, options, vmodels)
	                    }
	                }
	                vmodel.multiple && optionsSync()
	            }
	
	            vm.repeatRendered = function() {
	                if(vmodel.multiple) {
	                    avalon.vmodels["scrollbar-" + vmodel.$id].update()
	                }
	            }
	
	            /**
	             * @interface 当组件移出DOM树时,系统自动调用的销毁函数
	             */
	            vm.$remove = function() {
	                if (blurHandler) {
	                    avalon.unbind(window, "click", blurHandler)
	                }
	                if(scrollHandler) {
	                    avalon.unbind(window, "scroll", scrollHandler)
	                }
	                if(resizeHandler) {
	                    avalon.unbind(window, "resize", resizeHandler)
	                }
	                vmodel.toggle = false;
	                listNode && vmodel.container && vmodel.container.contains(listNode) && vmodel.container.removeChild(listNode);
	                avalon.log("dropdown $remove")
	            }
	
	
	            vm._select = function(index, event) {
	                var option = vmodel.data[index].$model;
	                if (option && option.enable && !option.group) {
	                    var oldValue = vmodel.value;
	                    //根据multiple区分对待, 多选时可以为空值
	                    if (vmodel.multiple) {
	                        index = vmodel.value.indexOf(option.value)
	                        if (index > -1) {
	                            vmodel.value.splice(index, 1)
	                        } else {
	                            vmodel.value.push(option.value)
	                        }
	
	                    } else {
	                        vmodel.value = option.value;
	                    }
	                    // vmodel.currentOption = option;
	                    vmodel.toggle = false;
	                    if(avalon.type(vmodel.onSelect) === "function") {
	                        vmodel.onSelect.call(element, event, vmodel.value, oldValue, vmodel);
	                    }
	                    vmodel.activeIndex = index
	                }
	            };
	            /**
	             *
	             * @param len 新数据长度
	             * @private
	             */
	            vm._refresh = function(len) {
	                vmodel.data.clear();
	                vmodel.label = '';
	                vmodel.__cursorInList__ = false
	                if (len > 0) {
	                    //当data改变时，解锁滚动条
	                    vmodel._disabledScrollbar(false);
	                    vmodel.data.pushArray(getDataFromOption(vmodel.$source.$model || vmodel.$source));
	                    var option
	                    //当data改变时，尝试使用之前的value对label和title进行赋值，如果失败，使用data第一项
	                    if (!(option = setLabelTitle(vmodel.value))) {
	                        vmodel.currentOption = vmodel.data[0].$model;
	                        vmodel.activeIndex = 0;
	                        var v = vmodel.data[0].value;
	                        if(vmodel.multiple && !(v instanceof Array)) v = [v]; // 保证类型一致
	                        setLabelTitle(vmodel.value = v);
	                    } else {
	                        vmodel.activeIndex = vmodel.data.$model.indexOf(option)
	                    }
	                    if (vmodel.menuNode) {
	                        vmodel._styleFix(true)
	                    }
	                }
	            };
	
	
	            vm._titleenter = function() {
	                if (vmodel.hoverAutoShow) {
	                    vmodel._toggle()
	                    // vmodel.toggle = true
	                }
	            };
	            vm._titleleave = function() {
	                if (vmodel.hoverAutoShow) {
	                    vmodel.toggle = false
	                }
	            };
	            
	            vm._keydown = function(event) {
	                if(vmodel.keyboardEvent === false) {
	                    return;
	                }
	
	                //如果是单选下拉框，可以通过键盘移动
	                if (!vmodel.multiple) {
	                    var index = vmodel.activeIndex || 0,
	                        oldValue = vmodel.value;
	
	                    //区分上下箭头和回车
	                    switch (event.keyCode) {
	                        case 9:
	                        // tab
	                        case 27:
	                            // escape
	                            event.preventDefault()
	                            break;
	                        case 13:
	                            vmodel._select(index, event)
	                            break;
	                        case 38:
	                        case 63233: //safari 向上
	                            event.preventDefault();
	                            index = getEnableOption(vmodel.data, index)
	                            if(index === null) {
	                                return
	                            }
	                            vmodel.value = vmodel.data[index].value
	                            vmodel.activeIndex = index
	                            vmodel.scrollTo(index)
	                            if(avalon.type(vmodel.onSelect) === "function") {
	                                vmodel.onSelect.call(element, event, vmodel.value, oldValue, vmodel);
	                            }
	                            break;
	                        case 40:
	                        case 63235: //safari 向下
	                            event.preventDefault();
	                            index = getEnableOption(vmodel.data, index, true)
	                            if(index === null) {
	                                return
	                            }
	                            vmodel.value = vmodel.data[index].value
	                            vmodel.activeIndex = index
	                            vmodel.scrollTo(index)
	                            if(avalon.type(vmodel.onSelect) === "function") {
	                                vmodel.onSelect.call(element, event, vmodel.value, oldValue, vmodel);
	                            }
	                            break
	                    }
	                }
	            }
	            //下拉列表的显示依赖toggle值，该函数用来处理下拉列表的初始化，定位
	            vm._toggle = function(b) {
	                if ((vmodel.data.length ===0 && !vmodel.realTimeData)|| !vmodel.enable || vmodel.readOnly) {
	                    vmodel.toggle = false;
	                    return;
	                }
	
	                //为了防止显示时调整高度造成的抖动，将节点初始化放在改变toggle值之前
	                if (!listNode) {//只有单选下拉框才存在显示隐藏的情况
	                    var list;
	                    listNode = createListNode();
	                    list = listNode.firstChild;
	                    vmodel.container.appendChild(listNode)
	                    listNode = list
	                    vm.rootElement = list
	                    avalon.scan(list, [vmodel].concat(vmodels))
	                    vmodel.menuNode = document.getElementById("menu-" + vmodel.$id)     //下拉列表框内层容器 （包裹滚动条部分的容器）
	                    vmodel.dropdownNode = document.getElementById("list-" + vmodel.$id) //下拉列表框内容（有滚动条的部分）
	                }
	
	                //如果参数b不为布尔值，对toggle值进行取反
	                if (typeof b !== "boolean") {
	                    vmodel.toggle = !vmodel.toggle;
	                    return;
	                }
	
	                if (!b) {
	                    avalon.type(vmodel.onHide) === "function" && vmodel.onHide.call(element, listNode, vmodel);
	                } else {
	                    var firstItemIndex, selectedItemIndex, value = vmodel.value;
	                    if (avalon.type(value) !== "array") {
	                        value = [value];
	                    }
	
	                    //计算activeIndex的值
	                    if (vmodel.activeIndex == null) {
	                        avalon.each(vmodel.data, function(i, item) {
	                            if (firstItemIndex === void 0 && item.enable) {
	                                firstItemIndex = i;
	                            }
	                            if (item.value === value[0]) {
	                                selectedItemIndex = i;
	                                return false;
	                            }
	                            return true;
	                        });
	
	                        if (!selectedItemIndex) {
	                            selectedItemIndex = firstItemIndex;
	                        }
	                        vmodel.activeIndex = selectedItemIndex || 0;
	                    }
	                    vmodel.scrollWidget = avalon.vmodels["scrollbar-" + vmodel.$id];
	                    vmodel._styleFix();
	                    vmodel._position();
	                    if(avalon.type(vmodel.onShow) === "function") {
	                        vmodel.onShow.call(element, listNode, vmodel);
	                    }
	                }
	            };
	
	            vm.$watch("toggle", function(b) {
	                vmodel.focusClass = b
	                vmodel._toggle(b);
	            });
	
	            vm.toggle = false;
	
	            vm._position = function() {
	                var $titleNode = avalon(titleNode);
	                //计算浮层当前位置，对其进行定位，默认定位正下方
	                //获取title元素的尺寸及位置
	                var offset = $titleNode.offset(),
	                    outerHeight = $titleNode.outerHeight(true),
	                    $listNode = avalon(listNode),
	                    $sourceNode = avalon(titleNode.firstChild),
	                    listHeight = $listNode.height(),
	                    $window = avalon(window),
	                    css = {},
	                    offsetParent = listNode.offsetParent,
	                    $offsetParent = avalon(offsetParent);
	
	                while ($sourceNode.element && $sourceNode.element.nodeType != 1) {
	                    $sourceNode = avalon($sourceNode.element.nextSibling);
	                }
	
	                //计算浮层的位置
	                if (options.position && offset.top + outerHeight + listHeight > $window.scrollTop() + $window.height() && offset.top - listHeight > $window.scrollTop()) {
	                    css.top = offset.top - listHeight;
	                } else {
	                    css.top = offset.top + outerHeight - $sourceNode.css("borderBottomWidth").replace(styleReg, "$1");
	                }
	
	                if(offsetParent && (offsetParent.tagName !== "BODY" && offsetParent.tagName !== "HTML")) {
	                    //修正由于边框带来的重叠样式
	                    css.top = css.top  - $offsetParent.offset().top + listNode.offsetParent.scrollTop;
	                    css.left = offset.left - $offsetParent.offset().left + listNode.offsetParent.scrollLeft;
	                } else {
	                    //修正由于边框带来的重叠样式
	                    css.left = offset.left;
	                }
	
	                //显示浮层
	                $listNode.css(css);
	            }
	            //是否当前鼠标在list区域
	            vm.__cursorInList__ = false
	
	            //单选下拉框在失去焦点时会收起
	            vm._listenter = function() {
	                vmodel.__cursorInList__ = true
	                if (vmodel.hoverAutoShow) {
	                    vmodel.toggle = true
	                }
	            }
	
	            vm._listleave = function() {
	                vmodel.__cursorInList__ = false
	                if (vmodel.hoverAutoShow) {
	                    vmodel.toggle = false
	                }
	            };
	            vm._blur = function() {
	                if (!vmodel.__cursorInList__ && !vmodel.multiple && vmodel.toggle) {
	                    vmodel.toggle = false;
	                }
	            }
	
	            /**
	             * @interface
	             * @param newValue 设置控件的值，需要注意的是dropdown设置了multiple属性之后，值是数组，未设置multiple属性的时候，可以接受字符串，数字，布尔值；未设置该值时，效果是返回当前控件的值
	             * @returns vmodel.value 控件当前的值
	             */
	            vm.val = function(newValue) {
	                if (typeof newValue !== "undefined") {
	                    if (avalon.type(newValue) !== "array") {
	                        newValue = [newValue];
	                    }
	                    vmodel.value = newValue;
	                }
	                return vmodel.value;
	            }
	
	            vm.isActive = function(el) {
	                var value = el.value, enable = el.enable, group = el.group;
	                if (vmodel.multiple) {
	                    return vmodel.value.indexOf(value) > -1 && enable && !group;
	                } else {
	                    return vmodel.value === value && enable && !group;
	                }
	            }
	
	            //当下拉列表中的项目发生改变时，调用该函数修正显示，顺序是修正下拉框高宽 --> 滚动条更新显示 --> 定位下拉框
	            vm._styleFix = function(resetHeight) {
	                var MAX_HEIGHT = options.height || 200,
	                    $menu = avalon(vmodel.menuNode),
	                    height = '' 
	
	                if (resetHeight) {
	                    vmodel.menuHeight = ''
	                    avalon(vmodel.dropdownNode).css({ 'height': '' });
	                }
	                
	                height = vmodel.dropdownNode.scrollHeight
	                vmodel.menuWidth = !ie6 ? vmodel.listWidth - $menu.css("borderLeftWidth").replace(styleReg, "$1") - $menu.css("borderRightWidth").replace(styleReg, "$1") : vmodel.listWidth;
	                if (height > MAX_HEIGHT) {
	                    vmodel._disabledScrollbar(false);
	                    height = MAX_HEIGHT;
	                    avalon(vmodel.dropdownNode).css({
	                        "width": vmodel.menuWidth - vmodel.scrollWidget.getBars()[0].width()
	                    });
	                } else {
	                    vmodel._disabledScrollbar(true);
	                    avalon(vmodel.dropdownNode).css({
	                        "width": vmodel.menuWidth
	                    })
	                }
	                vmodel.menuHeight = height;
	                vmodel.updateScrollbar();
	                vmodel.scrollTo(vmodel.activeIndex);
	            };
	
	            //利用scrollbar的样式改变修正父节点的样式
	            vm.updateScrollbar = function() {
	                vmodel.scrollWidget.update();
	            }
	
	            //通过当前的activeIndex，更新scrollbar的滚动位置
	            vm.scrollTo = function(activeIndex) {
	
	                if(!vmodel.dropdownNode) return;
	                //计算是否需要滚动
	                var nodes = siblings(vmodel.dropdownNode.firstChild),
	                    $activeNode = avalon(nodes[activeIndex]),
	                    menuHeight = vmodel.menuHeight,
	                    nodeTop = nodes.length ? $activeNode.position().top - avalon(nodes[0]).position().top : 0,
	                    nodeHeight = nodes.length ? $activeNode.height() : 0,
	                    scrollTop = vmodel.dropdownNode.scrollTop
	
	                if(nodeTop > scrollTop + menuHeight - nodeHeight || nodeTop + nodeHeight < scrollTop) {
	                    vmodel.scrollWidget.scrollTo(0, nodeTop + nodeHeight - menuHeight)
	                }
	            }
	
	            //禁用滚动条，当下拉列表的高度小于最大高度时，只显示当前高度，需要对滚动条做禁用
	            vm._disabledScrollbar = function(b) {
	                vmodel.scrollWidget && (vmodel.scrollWidget.disabled = !!b)
	            }
	
	        });
	
	        vmodel.$watch("enable", function(n) {
	            if(!n) {
	                vmodel.toggle = false;
	            }
	        });
	
	        vmodel.$watch("readOnly", function(n) {
	            if(!!n) {
	                vmodel.toggle = false;
	            }
	        });
	
	        //在multiple模式下同步select的值
	        //http://stackoverflow.com/questions/16582901/javascript-jquery-set-values-selection-in-a-multiple-select
	        function optionsSync() {
	            avalon.each(element.getElementsByTagName("option"), function(i, option) {
	                if(vmodel.value.$model.indexOf(option.value) > -1 || vmodel.value.$model.indexOf( parseData(option.value) ) > -1) {
	                    try {
	                        option.selected = true
	                    } catch(e) {
	                        avalon(option).attr("selected", "selected");
	                    }
	                } else {
	                    try {
	                        option.selected = false
	                    } catch(e) {
	                        option.removeAttribute("selected")
	                    }
	                }
	            })
	        }
	
	        function _buildOptions(opt) {
	            //为options添加value与duplexName
	            //如果原来的select元素绑定了ms-duplex，那么取得其值作value
	            //如果没有，则先从上层VM的配置对象中取，再没有则从内置模板里抽取
	            var duplexName = (element.msData["ms-duplex"] || "").trim()
	            var duplexModel
	            if (duplexName && (duplexModel = avalon.getModel(duplexName, vmodels))) {
	                opt.value = duplexModel[1][duplexModel[0]]
	                opt.$hasDuplex = true
	            } else if (!hasBuiltinTemplate) {
	                if (!Array.isArray(opt.value)) {
	                    opt.value = [opt.value || ""]
	                }
	            } else {
	                var values = []
	                Array.prototype.forEach.call(element.options, function(option) {
	                    if (option.selected) {
	                        values.push(parseData(option.value))
	                    }
	                })
	                opt.value = values
	            }
	            if (!opt.multiple) {
	                if(Array.isArray(opt.value)) {
	                    opt.value = opt.value[0] !== void 0 ? opt.value[0] : ""
	                }
	                //尝试在当前的data中查找value对应的选项，如果没有，将value设置为data中的option第一项的value
	                var option = opt.data.filter(function(item) {
	                    return item.value === opt.value  && !item.group
	                }),
	                    options = opt.data.filter(function(item) {
	                        return !item.group
	                    })
	
	                if(option.length === 0 && options.length > 0) {
	                    opt.value = options[0].value
	
	                    //如果存在duplex，同步该值
	                    if(duplexModel) {
	                        duplexModel[1][duplexModel[0]] = opt.value
	                    }
	                }
	            }
	
	            //处理data-duplex-changed参数
	            var changedCallbackName = $element.attr("data-duplex-changed"),
	                changedCallbackModel;    //回调函数
	            if (changedCallbackName && (changedCallbackModel = avalon.getModel(changedCallbackName, vmodels))) {
	                opt.changedCallback = changedCallbackModel[1][changedCallbackModel[0]]
	            }
	            opt.duplexName = duplexName
	
	            //处理container
	            var docBody = document.body, container = opt.container;
	
	            // container必须是dom tree中某个元素节点对象或者元素的id，默认将dialog添加到body元素
	            opt.container = (avalon.type(container) === "object" && container.nodeType === 1 && docBody.contains(container) ? container : document.getElementById(container)) || docBody;
	        }
	
	        /**
	         * 生成下拉框节点
	         * @returns {*}
	         */
	        function createListNode() {
	            return avalon.parseHTML(listTemplate);
	        }
	
	        //设置label以及title
	        function setLabelTitle(value) {
	            if(!vmodel.multiple && avalon.type(value)==="array") {
	                value = value[0];
	            }
	
	            var option = vmodel.data.$model.filter(function(item) {
	                return item.value === value;
	            });
	
	            option = option.length > 0 ? option[0] : null
	
	            if(!option && vmodel.data.length) {
	                avalon.log("[log] avalon.dropdown 设置label出错");
	            } else if (option) {
	                vmodel.label = option.label;
	                vmodel.title = option.title || option.label || "";
	            }
	
	            return option;
	        }
	
	        //计算title的宽度
	        function computeTitleWidth() {
	            var title = document.getElementById("title-" + vmodel.$id),
	                $title = avalon(title);
	            return vmodel.width - $title.css("paddingLeft").replace(styleReg, "$1") - $title.css("paddingRight").replace(styleReg, "$1");
	        }
	
	        //定位listNode
	        function _positionListNode() {
	            if(!vmodel.multiple && listNode) {
	                vmodel._position();
	            }
	        }
	
	        return vmodel;
	    };
	
	    widget.version = "1.0";
	
	    widget.defaults = {
	        realTimeData: false,
	        container: null, //@config 放置列表的容器
	        width: 200, //@config 自定义宽度
	        listWidth: 200, //@config 自定义下拉列表的宽度
	        titleWidth: 0,  //@config title部分宽度
	        height: 200, //@config 下拉列表的高度
	        enable: true, //@config 组件是否可用
	        readOnly: false, //@config 组件是否只读
	        hoverAutoShow: false, //@config 是否开启鼠标移入打开下拉列表鼠标移出关闭下拉列表功能
	        readonlyAttr: null, //@config readonly依赖的属性
	        currentOption: null,  //@config 组件当前的选项
	        data: [], //@config 下拉列表显示的数据模型
	        $source: null, //@config 下拉列表的数据源
	        textFiled: "text", //@config 模型数据项中对应显示text的字段,可以传function，根据数据源对text值进行格式化
	        valueField: "value", //@config 模型数据项中对应value的字段
	        value: [], //@config 设置组件的初始值
	        label: "", //@config 设置组件的提示文案，可以是一个字符串，也可以是一个对象
	        multiple: false, //@config 是否为多选模式
	        listClass: "",   //@config 列表添加自定义className来控制样式
	        title: "",
	        titleClass: "",   //@config title添加自定义className来控制样式
	        activeIndex: null,
	        size: 1,
	        menuNode: null,
	        dropdownNode: null,
	        scrollWidget: null,
	        position: true, //@config 是否自动定位下拉列表
	        onSelect: null,  //@config 点击选项时的回调
	        onShow: null,    //@config 下拉框展示的回调函数
	        onHide: null,    //@config 下拉框隐藏的回调函数
	        onChange: null,  //@config value改变时的回调函数
	        $hasDuplex: false, 
	        multipleChange: false,
	        keyboardEvent: true,  //@config 是否支持键盘事件
	        /**
	         * @config 模板函数,方便用户自定义模板
	         * @param str {String} 默认模板
	         * @param opts {Object} VM
	         * @returns {String} 新模板
	         */
	        getTemplate: function(str, options) {
	            return str
	        },
	        onInit: avalon.noop     //@config 初始化时执行方法
	    };
	
	    //用于将字符串中的值转换成具体值
	    function parseData(data) {
	        try {
	            data = data === "true" ? true :
	                data === "false" ? false :
	                    data === "null" ? null :
	                        +data + "" === data ? +data : data;
	        } catch (e) {
	        }
	        return data
	    }
	
	    //根据dataSource构建数据结构
	    //从VM的配置对象提取数据源, dataSource为配置项的data数组，但它不能直接使用，需要转换一下
	    //它的每一个对象代表option或optGroup，
	    //如果是option则包含label, enable, value
	    //如果是optGroup则包含label, enable, options(options则包含上面的option)
	    //每个对象中的enable如果不是布尔，则默认为true; group与parent则框架自动添加
	    function getDataFromOption(data, arr, parent) {
	        var ret = arr || []
	        parent = parent || null
	        for (var i = 0, el; el = data[i++]; ) {
	            if (Array.isArray(el.options)) {
	                ret.push({
	                    label: el.label,
	                    value: el.value,
	                    enable: ensureBool(el.enable, true),
	                    group: true,
	                    parent: parent,
	                    toggle: true
	                })
	                getDataFromOption(el.options, ret, el)
	            } else {
	                if(typeof el === "string") {
	                    el = {
	                        label: el,
	                        value: el,
	                        title: el
	                    }
	                }
	                ret.push({
	                    label: el.label,
	                    value: el.value,
	                    title: el.title,
	                    enable: ensureBool(parent && parent.enable, true) && ensureBool(el.enable, true),
	                    group: false,
	                    parent: parent,
	                    data: el,           //只有在dataModel的模式下有效
	                    toggle: true
	                })
	            }
	        }
	
	        return ret
	    }
	    function getFragmentFromData(data) {
	        var ret = document.createDocumentFragment(), parent, node
	        for (var i = 0, el; el = data[i++]; ) {
	            if (el.group) {
	                node = document.createElement("optgroup")
	                node.label = el.label
	                node.disabled = !el.enable
	                ret.appendChild(node)
	                parent = node
	            } else {
	                node = document.createElement("option")
	                node.text = el.label
	                node.value = el.value
	                node.disabled = !el.enable
	                if (el.parent && parent) {
	                    parent.appendChild(node)
	                } else {
	                    ret.appendChild(node)
	                }
	            }
	        }
	        return ret
	    }
	
	    function ensureBool(value, defaultValue) {
	        return typeof value === "boolean" ? value : defaultValue
	    }
	
	    //从页面的模板提取数据源, option元素的value会进一步被处理
	    //label： option或optgroup元素显示的文本
	    //value: 其value值，没有取innerHTML
	    //enable: 是否可用
	    //group: 对应的元素是否为optgroup
	    //parent: 是否位于分组内，是则为对应的对象
	    function getDataFromHTML(select, arr, parent) {
	        var ret = arr || []
	        var elems = select.children
	        parent = parent || null
	        for (var i = 0, el; el = elems[i++]; ) {
	            if (el.nodeType === 1) {//过滤注释节点
	                if (el.tagName === "OPTGROUP") {
	                    parent = {
	                        label: el.label,
	                        value: "",
	                        enable: !el.disabled,
	                        group: true,        //group不能添加ui-state-active
	                        parent: false,
	                        toggle: true
	                    }
	                    ret.push(parent)
	                    getDataFromHTML(el, ret, parent)
	                } else if (el.tagName === "OPTION") {
	                    ret.push({
	                        label: el.label.trim()||el.text.trim()||el.value.trim(), //IE9-10有BUG，没有进行trim操作
	                        title: el.title.trim(),
	                        value: parseData(el.value.trim()||el.text.trim()),
	                        enable: ensureBool(parent && parent.enable, true) && !el.disabled,
	                        group: false,
	                        parent: parent,
	                        toggle: true
	                    })
	                }
	            }
	        }
	        return ret
	    }
	
	    /**
	     * 在用户使用键盘上下箭头选择选项时，需要跳过被禁用的项，即向上或者向下找到非禁用项
	     * @param data 用来选择的数据项
	     * @param index 当前index
	     * @param direction {Boolean} 方向，true为下，false为上，默认为上
	     * @return ret 使用的项在数组中的下标
	     */
	    function getEnableOption(data, index, direction) {
	        var size = data.size(),
	            left = [],
	            right = [],
	            dataItem = {},
	            i,
	            ret
	
	        //将data用index分成两段
	        //当向上选择时，选择从左段的队尾到右段的队头
	        //当向下选择时，选择从右端的对头到左段的队尾
	        for(i = 0; i < index; i ++) {
	            dataItem = data[i]
	            if(dataItem.enable && !dataItem.group && dataItem.toggle) {
	                left.push(i)
	            }
	        }
	        for(i = index + 1; i < size; i ++) {
	            dataItem = data[i]
	            if(dataItem.enable && !dataItem.group && dataItem.toggle) {
	                right.push(i)
	            }
	        }
	        if(left.length === 0 && right.length === 0) {
	            ret = null
	        }else if(direction) {
	            ret = right.length > 0? right.shift(): left.shift()
	        } else {
	            ret = left.length > 0? left.pop(): right.pop()
	        }
	
	        return ret
	    }
	
	    var hasAttribute = document.documentElement.hasAttribute ? function(el, attr) {
	        return el.hasAttribute(attr)
	    } : function(el, attr) {//IE67
	        var outer = el.outerHTML, part = outer.slice(0, outer.search(/\/?['"]?>(?![^<]*<['"])/));
	        return new RegExp("\\s" + attr + "\\b", "i").test(part);
	    }
	    return avalon;
	
	    /**
	     * 获取元素节点的所有兄弟节点
	     * @param n
	     * @returns {Array}
	     */
	    function siblings( n) {
	        var r = [];
	
	        for ( ; n; n = n.nextSibling ) {
	            if ( n.nodeType === 1) {
	                r.push( n );
	            }
	        }
	
	        return r;
	    }
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/**
	 @links
	 
	[使用html配置multiple组件](avalon.dropdown.ex16.html)
	 [使用html配置multiple组件](avalon.dropdown.ex1.html)
	 [使用html配置multiple并使用双工绑定](avalon.dropdown.ex2.html)
	 [使用option配置multiple并使用双工绑定](avalon.dropdown.ex3.html)
	 [使用html配置dropdown组件](avalon.dropdown.ex4.html)
	 [使用html配置dropdown并使用双工绑定](avalon.dropdown.ex5.html)
	 [使用option配置dropdown并使用双工绑定](avalon.dropdown.ex6.html)
	 [dropdown disabled](avalon.dropdown.ex7.html)
	 [dropdown readOnly](avalon.dropdown.ex8.html)
	 [options可以使用repeat生成](avalon.dropdown.ex9.html)
	 [更改模板，使用button作为触发器](avalon.dropdown.ex10.html)
	 [异步渲染组件的选项](avalon.dropdown.ex11.html)
	 [联动的dropdown](avalon.dropdown.ex12.html)
	 [dropdown状态保持功能](avalon.dropdown.ex13.html)
	 [多个dropdown共享状态](avalon.dropdown.ex14.html)
	 [鼠标移入移出下拉菜单自动显示隐藏](avalon.dropdown.ex15.html)
	 */


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-dropdown\"\n     ms-class=\"oni-state-disabled:!enable\"\n     ms-class-1=\"{{titleClass}}\"\n     ms-css-width=\"{{width}}\"\n     ms-class-2=\"oni-state-focus: focusClass\"\n     ms-hover=\"oni-state-hover\"\n     ms-mouseenter=\"_titleenter\"\n     ms-mouseleave=\"_titleleave\"\n     ms-keydown=\"_keydown\"\n     tabindex=\"0\">\n    <div class=\"oni-dropdown-source\">\n        <div class=\"oni-dropdown-input\"\n             ms-attr-title=\"title\"\n             ms-css-width=\"titleWidth\"\n             id=\"title-MS_OPTION_ID\">{{label|sanitize|html}}</div>\n        <div class=\"oni-dropdown-icon-wrap\">\n            <i class=\"oni-dropdown-icon oni-icon oni-icon-angle-up\"\n               ms-visible=\"toggle\">&#xf028;</i>\n            <i class=\"oni-dropdown-icon oni-icon oni-icon-angle-down\"\n               ms-visible=\"!toggle\">&#xf032;</i>\n        </div>\n    </div>\n</div>\nMS_OPTION_TEMPLATE\n<div class=\"oni-dropdown\"\n     ms-class=\"oni-dropdown-menu:!multiple\"\n     ms-class-1=\"{{listClass}}\"\n     ms-css-width=\"{{listWidth}}\"\n     ms-mouseenter=\"_listenter\"\n     ms-mouseleave=\"_listleave\"\n     ms-visible=\"toggle||multiple\">\n    <div class=\"oni-dropdown-menu-inner\"\n         ms-css-width=\"menuWidth\"\n         ms-css-height=\"menuHeight\"\n         ms-widget=\"scrollbar,scrollbar-MS_OPTION_ID\" id=\"menu-MS_OPTION_ID\">\n        <div class=\"oni-scrollbar-scroller\"\n             id=\"list-MS_OPTION_ID\">\n            <div ms-repeat=\"data\" class=\"oni-dropdown-item\"\n                 ms-click-12=\"_select($index, $event)\"\n                 ms-attr-title=\"el.title||el.label\"\n                 ms-visible=\"el.toggle\"\n                 ms-hover=\"oni-state-hover: el.enable\"\n                 ms-class-1=\"oni-state-disabled:!el.enable\"\n                 ms-class-2=\"oni-state-active:isActive(el, multipleChange)\"\n                 ms-class-4=\"oni-dropdown-group:el.group\"\n                 ms-class-5=\"oni-dropdown-divider:el.group && !$first\"\n                 data-repeat-rendered=\"repeatRendered\"\n                 >{{el.label|sanitize|html}}</div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @cnName 滚动条组件
	 * @enName scrollbar
	 * @introduce
	 *  <p> 自定义滚动条样式，绑定ms-widget="scrollbar"的元素内必须包含一个class="oni-scrollbar-scroller"的视窗元素</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, template) {
	
	    // get by className, not strict
	    function getByClassName(cname, par) {
	        var par = par || document.body
	        if(par.getElementsByClassName) {
	            return par.getElementsByClassName(cname)
	        } else {
	            var child = par.getElementsByTagName("*"),
	                arr = []
	            avalon.each(child, function(i, item) {
	                var ele = avalon(item)
	                if(ele.hasClass(cname)) arr.push(item)
	            })
	            return arr
	        }
	    }
	
	    function strToNumber(s) {
	        return Math.round(parseFloat(s)) || 0
	    }
	
	    // 响应wheel,binded
	    var wheelBinded,
	        wheelArr = [],
	        keyArr = [],
	        scrollerGetted = []
	
	    var widget = avalon.ui.scrollbar = function(element, data, vmodels) {
	        var options = data.scrollbarOptions
	        //方便用户对原始模板进行修改,提高定制性
	        options.template = options.getTemplate(template, options)
	
	        var vmodel = avalon.define(data.scrollbarId, function(vm) {
	            avalon.mix(vm, options)
	            vm.widgetElement = element
	            vm.draggerHeight = vm.draggerWidth = ""
	            vm.inFocuse = false
	            vm._position = []
	            vm.rootElement = element
	            vm.viewElement = element
	            vm.$skipArray = ["rootElement"]
	            vm.dragging = false
	
	            var inited,
	                bars = [],
	                scroller
	            vm.$init = function(continueScan) {
	                if(inited) return
	                inited = true
	                vmodel.widgetElement.style.position = "relative"
	                //document body情形需要做一下修正
	                vmodel.viewElement = vmodel.widgetElement == document.body ? document.getElementsByTagName(
	                    "html")[0] : vmodel.widgetElement
	                vmodel.viewElement.style.overflow = vmodel.viewElement.style.overflowX = vmodel.viewElement.style.overflowY = "hidden"
	                if(vmodel.widgetElement == document.body) vmodel.widgetElement.style.overflow = vmodel.widgetElement.style.overflowX = vmodel.widgetElement.style.overflowY = "hidden"
	                vmodel._position = vmodel.position.split(",")
	
	                var frag = avalon.parseHTML(options.template)
	                vmodel.widgetElement.appendChild(frag)
	                if (continueScan) {
	                    continueScan()
	                } else {
	                    avalon.log("avalon请尽快升到1.3.7+")
	                    avalon.scan(element, [vmodel].concat(vmodels))
	                    if (typeof options.onInit === "function") {
	                        options.onInit.call(element, vmodel, options, vmodels)
	                    }
	                }
	                var children = vmodel.widgetElement.childNodes
	                avalon.each(children, function(i, item) {
	                    var ele = avalon(item)
	                    if(ele.hasClass("oni-scrollbar") || ele.hasClass("ui-scrollbar")) {
	                        bars.push(ele)
	                    } else if(ele.hasClass("oni-scrollbar-scroller") || ele.hasClass("ui-scrollbar-scroller")) {
	                        scroller = ele
	                    }
	                })
	                // 竖直方向支持滚轮事件
	                if(vmodel.position.match(/left|right/g)) {
	                    var vs = [],hs = []
	                    avalon.each(vmodel._position, function(i, item) {
	                        if(item.match(/left|right/g)) {
	                            vs.push([i, item])
	                        } else {
	                            hs.push([i, item])
	                        }
	                    })
	
	                    function wheelLike(diretion, arr, e, func) {
	                        avalon.each(arr, function(i, item) {
	                            if(!bars[i].data("oni-scrollbar-needed")) return
	                            vmodel._computer(func || function(obj) {
	                                return vmodel._clickComputer(obj, diretion)
	                            }, item[0], item[1], function(breakOut) {
	                                if(!breakOut) e.preventDefault()
	                            }, "breakOutCallbackCannotIgnore")
	                        })
	                    }
	                    function myOnWheel(e) {
	                        if(vmodel.disabled) return
	                        if(vmodel.inFocuse) {
	                            wheelLike(e.wheelDelta > 0 ? "up" : "down", vs, e)
	                        }
	                    }
	                    function myKeyDown(e) {
	                        if(vmodel.disabled) return
	                        var k = e.keyCode
	                        if(k > 32 && k < 41 & vmodel.inFocuse) {
	                            // 方向按键
	                            if(k in {37:1, 39: 1, 38: 1, 40:1}) {
	                                wheelLike(k in {37:1, 38:1} ? "up" : "down", k in {38: 1, 40:1} ? vs : hs, e)
	                            // end or home
	                            // pageup or pagedown
	                            } else{
	                                var diretion = k in {33: 1, 36: 1} ? "up" : "down"
	                                wheelLike(diretion, vs, e, function(obj) {
	                                    var _top = scroller[0].scrollTop
	                                    // home, pageup
	                                    if(k in {33: 1, 36: 1}) {
	                                        if(_top) e.preventDefault()
	                                    // end, pagedown
	                                    } else {
	                                        if(_top < obj.scrollerH - obj.viewH) e.preventDefault()
	                                    }
	                                    // home or end
	                                    // end plus 100, easy to trigger breakout
	                                    if(k in {36: 1, 35: 1}) {
	                                        return {
	                                            x: 0,
	                                            y: k == 36 ? 0 : obj.draggerparHeight - obj.draggerHeight + 100
	                                        }
	                                    // pageup or pagedown
	                                    // a frame
	                                    } else {
	                                        // frame 计算方式更新为百分比
	                                        var frame = (obj.draggerparHeight - obj.draggerHeight) * obj.viewH / (obj.scrollerH - obj.viewH)
	                                        return vmodel._clickComputer(obj, diretion, strToNumber(frame) || 1)
	                                    }
	                                })
	                            }
	                        }
	                    }
	                    // document.body直接如此处理
	                    if(vmodel.widgetElement == document.body) {
	                        vmodel.inFocuse = true
	                        wheelArr.push(myOnWheel)
	                        keyArr.push(myKeyDown)
	                    } else {
	                        avalon.bind(element, "mouseenter", function(e) {
	                            vmodel.inFocuse = true
	                            wheelArr.push(myOnWheel)
	                            keyArr.push(myKeyDown)
	                        })
	                        avalon.bind(element, "mouseleave", function(e) {
	                            vmodel.inFocuse = false
	                            for(var i = 0, len = wheelArr.length; i < len; i++) {
	                                if(wheelArr[i] === myOnWheel) {
	                                    wheelArr.splice(i, 1)
	                                    keyArr.splice(i, 1)
	                                    break
	                                }
	                            }
	                        })
	                    }
	                    // 所有组件实例公用一个事件绑定
	                    if(!wheelBinded) {
	                        wheelBinded = true
	                        avalon.bind(document, "mousewheel", function(e) {
	                            var cb = wheelArr[wheelArr.length - 1]
	                            cb && cb(e)
	                        })
	                        // keyborad,,,simida
	                        // left 37
	                        // right 39
	                        // top 38
	                        // down 40
	                        // pageup 33
	                        // pagedown 34
	                        // home 36
	                        // end 35
	                        avalon.bind(document, "keydown", function(e) {
	                           var cb = keyArr[keyArr.length - 1]
	                            cb && cb(e)
	                        })
	                    }
	
	                }
	
	
	                avalon.bind(element, "mouseenter", function() {
	                    avalon.each(bars, function(i, item) {
	                        vmodel._show("e", false, item)
	                    })
	                })
	                avalon.bind(element, "mouseleave", function() {
	                    vmodel._hide()
	                })
	
	                vmodel.update("init")
	
	                if(scroller && scrollerGetted.length) {
	                    avalon.each(scrollerGetted, function(i, func) {
	                        func()
	                    })
	                    scrollerGetted = []
	                }
	            }
	
	            // data-draggable-before-start="beforeStartFn" 
	            // data-draggable-start="startFn" 
	            // data-draggable-drag="dragFn" 
	            // data-draggable-before-stop="beforeStopFn" 
	            // data-draggable-stop="stopFn" 
	            // data-draggable-containment="parent" 
	            vm.$draggableOpts = {
	                beforeStart: function() {
	                    vmodel.dragging = true
	                },
	                drag: function(e, data) {
	                    var dr = avalon(data.element)
	                    vmodel._computer(function(obj) {
	                        var a = {
	                            x: strToNumber(dr.css("left")) >> 0,
	                            y: strToNumber(dr.css("top")) >> 0
	                        }
	                        // easy to break out
	                        if(a.x == obj.draggerparWidth - obj.draggerWidth) a.x += 100
	                        if(a.y == obj.draggerparHeight - obj.draggerHeight) a.y += 100
	                        return a
	                    }, dr.attr("oni-scrollbar-index"), dr.attr("oni-scrollbar-pos"))
	                }, 
	                handle: function(e, data) {
	                    return !vmodel.disabled && this
	                },
	                containment: "parent"
	            }
	            vm.$draggableOpts.stop = function(e, data) {
	                vmodel.$draggableOpts.drag(e, data)
	                vmodel.dragging = false
	                avalon(data.element).removeClass("oni-state-active")
	            }
	
	            vm.$remove = function() {
	                avalon.each(bars, function(i, bar) {
	                    bar[0] && bar[0].parentNode && bar[0].parentNode.removeChild(bar[0])
	                })
	            }
	
	            vm._onScroll = function() {
	                if(vmodel.show != "scrolling") return     
	                avalon.each(bars, function(i, item) {
	                    vmodel._show("e", false, item)
	                })
	            }
	            vm._show = function(e, always, index) {
	                if(vmodel.show != "scrolling") return
	                e.stopPropagation && e.stopPropagation()
	                var item = index.css ? index : bars[index]
	                if(item) {
	                    clearTimeout(item.data("oni-scrollbar-hidetimer"))
	                    item.css("visibility", "visible")
	                    item.css("opacity", 1)
	                    if(!always) {
	                        item.data("oni-scrollbar-hidetimer", setTimeout(function() {
	                            item.css("opacity", 0)
	                        }, 1000))
	                    }
	                }
	            }
	            vm._hide = function(e,index) {
	                if(vmodel.show != "scrolling") return
	                if(index && bars[index]) {
	                    bars[index].css("opacity", 0)
	                } else {
	                    avalon.each(bars, function(i, item) {
	                        item.css("opacity", 0)
	                    })
	                }
	            }
	            //@interface getBars()返回所有的滚动条元素，avalon元素对象
	            vm.getBars = function() {
	                return bars
	            }
	            //@interface getScroller()返回scroller avalon对象
	            vm.getScroller = function() {
	                return scroller
	            }
	            //@interface update()更新滚动条状态，windowresize，内容高度变化等情况下调用，不能带参数
	            vm.update = function(ifInit, x, y) {
	                if(vmodel.disabled) return
	                if(!scroller) return scrollerGetted.push(function() {
	                    vmodel.update(ifInit, x, y)
	                })
	                var ele = avalon(vmodel.viewElement),
	                    // 滚动内容宽高
	                    viewW,
	                    viewH,
	                    // 计算滚动条可以占据的宽或者高
	                    // barH = strToNumber(ele.css("height")),
	                    barH = vmodel.widgetElement === document.body? vmodel.viewElement.clientHeight : strToNumber(ele.css("height")),
	                    barW = strToNumber(ele.css("width")),
	                    // 滚动视野区宽高，存在滚动视野区宽高和滚动宽高不一致的情况
	                    h = vmodel.viewHeightGetter(ele),
	                    w = vmodel.viewWidthGetter(ele),
	                    p = vmodel.position,
	                    barDictionary,
	                    barMinus = {},
	                    y = y == void 0 ? vmodel.scrollTop : y,
	                    x = x == void 0 ? vmodel.scrollLeft : x
	                //document body情形需要做一下修正
	                if(vmodel.viewElement != vmodel.widgetElement) {
	                    p.match(/right|left/g) && avalon(vmodel.widgetElement).css("height", barH)
	                }
	                // 水平方向内间距
	                var hPadding = scroller.width() - scroller.innerWidth(),
	                    // 竖直方向内间距
	                    vPadding = scroller.height() - scroller.innerHeight()
	                scroller.css("height", h + vPadding)
	                scroller.css("width", w + hPadding )
	                viewW = scroller[0].scrollWidth
	                viewH = scroller[0].scrollHeight
	                barDictionary = {
	                    "top": p.match(/top/g) && viewW > w,
	                    "right": p.match(/right/g) && viewH > h,
	                    "bottom": p.match(/bottom/g) && viewW > w,
	                    "left": p.match(/left/g) && viewH > h
	                }
	                if(bars.length > 1) {
	                    var ps = ["top", "right", "bottom", "left"]
	                    for(var i = 0; i < 4; i++) {
	                        barMinus[ps[i]] = [(barDictionary[i ? ps[i - 1] : ps[3]] && 1) >> 0, (barDictionary[i < 3 ? ps[i + 1] : ps[0]] && 1) >> 0]
	                        if(i > 1) barMinus[ps[i]] = barMinus[ps[i]].reverse()
	                    }
	                }
	                // 根据实际视窗计算，计算更新scroller的宽高
	                // 更新视窗
	                h = scroller.innerHeight()
	                w = scroller.innerWidth()
	                avalon.each(vmodel._position, function(i, item) {
	                    var bar = bars[i],
	                        isVertical = item.match(/left|right/),
	                        dragger
	                    if(bar) {
	                        dragger = avalon(getByClassName("oni-scrollbar-dragger", bar.element)[0])
	                    }
	                    // 拖动逻辑前移，确保一定是初始化了的
	                    if(ifInit && dragger) {
	                        dragger.attr("ms-draggable", "$,$draggableOpts")
	                        dragger.attr("oni-scrollbar-pos", item)
	                        dragger.attr("oni-scrollbar-index", i)
	                        avalon.scan(dragger[0], vmodel)
	                    }
	                    // hidden bar
	                    if(!barDictionary[item]) {
	                        if(bar) {
	                            bar.css("opacity", 0)
	                            bar.css("visibility", "hidden")
	                            bar.data("oni-scrollbar-needed", false)
	                        }
	                        return
	                    } else {
	                        if(bar) {
	                            bar.data("oni-scrollbar-needed", true)
	                            bar.css("visibility", "visible")
	                            if(vmodel.show == "scrolling" || vmodel.show == "never"){
	                                bar.css("opacity", 0)
	                            } else {
	                                bar.css("opacity", 1)
	                            }
	                        }
	                    }
	                    if(bar) {
	                        var sh = strToNumber(bar.css("height")),
	                            sw = strToNumber(bar.css("width")),
	                            bh = sh,
	                            bw = sw,
	                            draggerpar = avalon(getByClassName("oni-scrollbar-draggerpar", bar[0])[0]),
	                            headerLength = vmodel.showBarHeader ? 2 : 0
	                        // 更新滚动条没有两端的箭头的时候依旧要重新计算相邻两个bar的间隔
	                        var draggerParCss = []
	                        if(bars.length > 1) {
	                            var barCss = [], minus = barMinus[item]
	                            if(isVertical) {
	                                barCss = [
	                                    ["top", minus[0] * bw],
	                                    ["height", (barH - bw * (minus[0] + minus[1]))]
	                                ]
	                                draggerParCss = [
	                                    ["top", (headerLength/2) * bw],
	                                    ["height", (barH - bw * (minus[0] + minus[1] + headerLength))]
	                                ]
	                            } else {
	                                barCss = [
	                                    ["left", minus[0] * bh],
	                                    ["width", (barW - bh * (minus[0] + minus[1]))]
	                                ]
	                                draggerParCss = [
	                                    ["left", (headerLength/2) * bh],
	                                    ["width", (barW - bh * (headerLength + minus[0] + minus[1]))]
	                                ]
	                            }
	                            avalon.each(barCss, function(index, css) {
	                                bar.css.apply(bar, css)
	                            })
	                            bh = bar.height()
	                            bw = bar.width()
	                        } else {
	                            if(isVertical) {
	                                draggerParCss = [
	                                    ["top", bw],
	                                    ["height", (barH - bw * 2)]
	                                ]
	                            } else {
	                                draggerParCss = [
	                                    ["left", bh],
	                                    ["width", (barW - bh * 2)]
	                                ]
	                            }
	                        }
	                        var ex
	                        if(isVertical) {
	                            ex = vmodel.show == "always" ? bw : 0
	                            scroller.css("width", w + hPadding - ex)
	                        } else {
	                            ex = vmodel.show == "always" ? bh : 0
	                            scroller.css("height", h + vPadding - ex)
	                        }
	                        avalon.each(draggerParCss, function(index, css) {
	                            draggerpar.css.apply(draggerpar, css)
	                        })
	                        sh = bh - headerLength * bw
	                        sw = bw - headerLength * bh
	                        // 更新滚动头
	                        var draggerCss
	                        if(isVertical) {
	                            var draggerTop = y,
	                                draggerHeight =strToNumber(h * sh / viewH)
	                                // 限定一个dragger的最小高度
	                                draggerHeight = vmodel.limitRateV * bw > draggerHeight && vmodel.limitRateV * bw || draggerHeight
	                                draggerTop = draggerTop < 0 ? 0 : draggerTop
	                                draggerTop = draggerTop > viewH - h ? viewH - h : draggerTop
	                                //draggerTop = sh * draggerTop / viewH
	                                draggerTop = strToNumber((sh - draggerHeight) * draggerTop / (viewH - h))
	                                draggerTop = Math.min(sh - draggerHeight, draggerTop)
	                            draggerCss = [
	                                ["width", "100%"],
	                                ["height", draggerHeight],
	                                ["top", draggerTop]
	                            ]
	                            y = y > 0 ? (y > viewH - h + ex ?  viewH - h + ex : y) : 0
	                        } else {
	                            var draggerLeft = x,
	                                draggerWidth = strToNumber(w * sw / viewW)
	                                // limit width to limitRateH * bh
	                                draggerWidth = vmodel.limitRateH * bh > draggerWidth && vmodel.limitRateH * bh || draggerWidth
	                                draggerLeft = draggerLeft < 0 ? 0 : draggerLeft
	                                draggerLeft = draggerLeft > viewW - w ? viewW - w : draggerLeft
	                                // draggerLeft = sw * draggerLeft / viewW
	                                draggerLeft = strToNumber((sw - draggerWidth) * draggerLeft / (viewW - w))
	                                draggerLeft = Math.min(sw - draggerWidth, draggerLeft)
	                            draggerCss = [
	                                ["height", "100%"],
	                                ["width", draggerWidth],
	                                ["left", draggerLeft]
	                            ]
	                            x = x > 0 ? (x > viewW - w + ex ? viewW - w + ex : x) : 0
	                        }
	                        avalon.each(draggerCss, function(index, css) {
	                            dragger.css.apply(dragger, css)
	                        })
	                        if(ifInit) {
	                            if(isVertical) {
	                                vmodel._scrollTo(void 0, y)
	                            } else {
	                                vmodel._scrollTo(x, void 0)
	                            }
	                        }
	                        if(vmodel.showBarHeader) {
	                            if(y == 0 && isVertical || !isVertical && x == 0) {
	                                avalon(getByClassName("oni-scrollbar-arrow-up", bar[0])[0]).addClass("oni-state-disabled")
	                            } else {
	                                avalon(getByClassName("oni-scrollbar-arrow-up", bar[0])[0]).removeClass("oni-state-disabled")
	                            }
	                            if(y >= draggerpar.innerHeight() - dragger.innerHeight() && isVertical || !isVertical && x >= draggerpar.innerWidth() - dragger.innerWidth()) {
	                               !vmodel.breakOutCallback && avalon(getByClassName("oni-scrollbar-arrow-down", bar[0])[0]).addClass("oni-state-disabled")
	                            } else {
	                                avalon(getByClassName("oni-scrollbar-arrow-down", bar[0])[0]).removeClass("oni-state-disabled")
	                            }
	                        }
	                    }
	                })
	            }
	
	            // 点击箭头
	            vm._arrClick = function(e, diretion, position, barIndex) {
	                if(vmodel.disabled) return
	                vmodel._computer(function(obj) {
	                    return vmodel._clickComputer(obj, diretion)
	                }, barIndex, position)
	            }
	
	            vm._clickComputer = function(obj, diretion, step) {
	                var step = step || obj.step || 40,
	                    l = strToNumber(obj.dragger.css("left")) >> 0,
	                    r = strToNumber(obj.dragger.css("top")) >> 0,
	                    x = diretion == "down" ? l + step : l - step,
	                    y = diretion == "down" ? r + step : r - step
	                return {
	                    x: x,
	                    y: y
	                }
	            }
	            // 长按
	            vm._arrDown = function($event, diretion, position, barIndex,ismouseup) {
	                if(vmodel.disabled) return
	                var se = this,
	                    ele = avalon(se)
	                clearInterval(ele.data("mousedownTimer"))
	                clearTimeout(ele.data("setTimer"))
	                var bar = bars[barIndex]
	                if(ismouseup || ele.hasClass("oni-state-disabled")) {
	                    return ele.removeClass("oni-state-active")
	                }
	                // 延时开启循环
	                ele.data("setTimer", setTimeout(function(){
	                    ele.addClass("oni-state-active")
	                    ele.data("mousedownTimer", setInterval(function() {
	                        return vmodel._computer(function(obj) {
	                                return vmodel._clickComputer(obj, diretion)
	                            }, barIndex, position ,function(breakOut) {
	                                if(!breakOut) return
	                                clearInterval(ele.data("mousedownTimer"))
	                                clearTimeout(ele.data("setTimer"))
	                            })
	                    }, 120))
	                }, 10))
	            }
	            // 点击滚动条
	            vm._barClick = function(e, position, barIndex) {
	                if(vmodel.disabled) return
	                var ele = avalon(this)
	                if(ele.hasClass("oni-scrollbar-dragger")) return
	                vmodel._computer(function(obj) {
	                    return {
	                        x: Math.ceil(e.pageX - obj.offset.left - obj.draggerWidth / 2),
	                        y : Math.ceil(e.pageY - obj.offset.top - obj.draggerHeight / 2)
	                    }
	                }, barIndex, position)
	            }
	            // 计算滚动条位置
	            vm._computer = function(axisComputer, barIndex, position, callback, breakOutCallbackCannotIgnore) {
	                if(vmodel.disabled) return
	                var bar = bars[barIndex]
	                if(bar && bar.data("oni-scrollbar-needed")) {
	                    var obj = {},
	                        isVertical = position.match(/left|right/g)
	                    obj.dragger = avalon(getByClassName("oni-scrollbar-dragger", bar[0])[0])
	                    obj.draggerWidth = strToNumber(obj.dragger.css("width"))
	                    obj.draggerHeight = strToNumber(obj.dragger.css("height"))
	                    obj.draggerpar = avalon(obj.dragger[0].parentNode)
	                    obj.draggerparWidth = strToNumber(obj.draggerpar.css("width"))
	                    obj.draggerparHeight = strToNumber(obj.draggerpar.css("height"))
	                    obj.offset = obj.draggerpar.offset()
	                    obj.up = avalon(getByClassName("oni-scrollbar-arrow-up", bar[0])[0])
	                    obj.down = avalon(getByClassName("oni-scrollbar-arrow-down", bar[0])[0])
	                    obj.viewer = avalon(vmodel.viewElement)
	                    // obj.viewH = vmodel.viewHeightGetter(obj.viewer)
	                    // obj.viewW = vmodel.viewWidthGetter(obj.viewer)
	                    // 更新的时候要用viewer先计算
	                    // 计算的时候直接用scroller作为视窗计算宽高
	                    // obj.viewH = vmodel.viewHeightGetter(scroller)
	                    // obj.viewW = vmodel.viewWidthGetter(scroller)
	                    obj.viewH = scroller.innerHeight()
	                    obj.viewW = scroller.innerWidth()
	                    obj.scrollerH = scroller[0].scrollHeight
	                    obj.scrollerW = scroller[0].scrollWidth
	                    obj.step = isVertical ? 40 * (obj.draggerparHeight - obj.draggerHeight) / (obj.scrollerH - obj.viewH) : 40 * (obj.draggerparWidth - obj.draggerWidth) / (obj.scrollerW - obj.viewW)
	                    obj.step = strToNumber(obj.step) || 1
	
	                    var xy = axisComputer(obj),
	                        breakOut
	                        xy.x = strToNumber(xy.x)
	                        xy.y = strToNumber(xy.y)
	
	                    if(isVertical) {
	                        if(xy.y < 0) {
	                            xy.y = 0
	                            obj.up.addClass("oni-state-disabled")
	                            breakOut = ["v", "up"]
	                        } else {
	                            obj.up.removeClass("oni-state-disabled")
	                        }
	                        if(xy.y > obj.draggerparHeight - obj.draggerHeight) {
	                            xy.y = obj.draggerparHeight - obj.draggerHeight
	                            breakOut = ["v", "down"]
	                            obj.down.addClass("oni-state-disabled")
	                        } else {
	                            obj.down.removeClass("oni-state-disabled")
	                        }
	                        var c = strToNumber((obj.scrollerH - obj.viewH) * xy.y / (obj.draggerparHeight - obj.draggerHeight)) - vmodel.scrollTop
	                        obj.dragger.css("top", xy.y)
	                        vmodel._scrollTo(void 0, strToNumber((obj.scrollerH - obj.viewH) * xy.y / (obj.draggerparHeight - obj.draggerHeight)))
	                    } else {
	                        if(xy.x < 0) {
	                            xy.x = 0
	                            breakOut = ["h", "up"]
	                            obj.up.addClass("oni-state-disabled")
	                        } else {
	                            obj.up.removeClass("oni-state-disabled")
	                        }
	                        if(xy.x > obj.draggerparWidth - obj.draggerWidth) {
	                            xy.x = obj.draggerparWidth - obj.draggerWidth
	                            breakOut = ["h", "down"]
	                            // 有溢出检测回调，不disable
	                            !vmodel.breakOutCallback && obj.down.addClass("oni-state-disabled")
	                        } else {
	                            obj.down.removeClass("oni-state-disabled")
	                        }
	                        obj.dragger.css("left", xy.x)
	                        vmodel._scrollTo(strToNumber((obj.scrollerW - obj.viewW) * xy.x / (obj.draggerparWidth - obj.draggerWidth)), void 0)
	                    }
	
	                }
	                // 回调，溢出检测
	                (!vmodel.breakOutCallback || breakOutCallbackCannotIgnore) && callback && callback(breakOut)
	                vmodel.breakOutCallback && vmodel.breakOutCallback(breakOut, vmodel, obj)
	            }
	            vm._scrollTo = function(x, y) {
	                if(y != void 0) {
	                    scroller[0].scrollTop = y
	                    vmodel.scrollTop = scroller[0].scrollTop
	                }
	                if(x != void 0) {
	                    scroller[0].scrollLeft = x
	                    vmodel.scrollLeft = scroller[0].scrollLeft
	                }
	            }
	
	            //@interface scrollTo(x,y) 滚动至 x,y
	            vm.scrollTo = function(x, y) {
	                vmodel.update(!"ifInit", x, y)
	                vm._scrollTo(x, y)
	            }
	
	            vm._initWheel = function(e, type) {
	                if(type == "enter") {
	                    vmodel.inFocuse = true
	                } else {
	                    vmodel.inFocuse = false
	                }
	            }
	            vm._draggerDown = function(e, isdown) {
	                if(vmodel.disabled) return
	                var ele = avalon(this)
	                if(isdown) {
	                    ele.addClass("oni-state-active")
	                } else {
	                    ele.removeClass("oni-state-active")
	                }
	            }
	            vm._stopPropagation = function(e) {
	                e.stopPropagation()
	            }
	        })
	      
	        vmodel.$watch("scrollLeft", function(newValue, oldValue) {
	            vmodel._onScroll()
	            vmodel.onScroll && vmodel.onScroll(newValue, oldValue, "h", vmodel)
	        })
	        vmodel.$watch("scrollTop", function(newValue, oldValue) {
	            vmodel._onScroll()
	            vmodel.onScroll && vmodel.onScroll(newValue, oldValue, "v", vmodel)
	        })
	
	        return vmodel
	    }
	    widget.defaults = {
	        disabled: false, //@config 组件是否被禁用，默认为否
	        toggle: true, //@config 组件是否显示，可以通过设置为false来隐藏组件
	        position: "right", //@config scrollbar出现的位置,right右侧，bottom下侧，可能同时出现多个方向滚动条
	        limitRateV: 1.5, //@config 竖直方向，拖动头最小高度和拖动头宽度比率
	        limitRateH: 1.5, //@config 水平方向，拖动头最小宽度和高度的比率
	        scrollTop: 0, //@config 竖直方向滚动初始值，负数会被当成0，设置一个极大值等价于将拖动头置于bottom
	        scrollLeft: 0, //@config 水平方向滚动初始值，负数会被当成0处理，极大值等价于拖动头置于right
	        show: "always", //@config never一直不可见，scrolling滚动和hover时候可见，always一直可见
	        showBarHeader: true,//@config 是否显示滚动条两端的上下箭头
	        draggerHTML: "", //@config 滚动条拖动头里，注入的html碎片
	        breakOutCallback: false, //@config breakOutCallback(["h", "up"], vmodel) 滚动到极限位置的回调，用来实现无线下拉等效果 breakOutCallback(["h", "up"], vmodel) 第一个参数是一个数组，分别是滚动条方向【h水平，v竖直】和超出极限的方向【up是向上或者向左，down是向右或者向下】，第三个参数是一个对象，包含滚动条的元素，宽高等信息
	        //@config onInit(vmodel, options, vmodels) 完成初始化之后的回调,call as element's method
	        onInit: avalon.noop,
	        viewHeightGetter: function(viewElement) {
	            return viewElement.innerHeight()
	        }, //@config viewHeightGetter(viewElement) 配置计算视窗高度计函数，默认返回innerHeight
	        viewWidthGetter: function(viewElement) {
	            return viewElement.innerWidth()
	        }, //@config viewWidthGetter(viewElement) 配置计算视窗宽度计函数，默认返回innerWidth
	        getTemplate: function(tmpl, opts) {
	            return tmpl
	        },//@config getTemplate(tpl, opts) 定制修改模板接口
	        onScroll: function(newValue, oldValue, diretion, vmodel) {
	
	        },//@config onScroll(newValue, oldValue, diretion, vmodel) 滚动回调,scrollLeft or scrollTop变化的时候触发，参数为newValue, oldValue, diretion, vmodel diretion = h 水平方向，= v 竖直方向
	        size: "normal", //@config srollbar size,normal为10px，small为8px，large为14px
	        $author: "skipper@123"
	    }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div ms-repeat-pos=\"_position\" class=\"oni-scrollbar oni-helper-reset oni-helper-clearfix oni-widget\"\n     ms-visible=\"!disabled\"\n\t ms-class-100=\"oni-scrollbar-{{pos}}\" \n\t ms-class-101=\"oni-scrollbar-{{size}} oni-scrollbar-{{pos}}-{{size}}\" \n\t ms-class-102=\"oni-state-disabled:disabled\" \n\t ms-mouseenter=\"_show($event, 'always', $index)\" \n\t ms-visible=\"toggle\">\n\t<div ms-if=\"showBarHeader\" class=\"oni-scrollbar-arrow oni-scrollbar-arrow-up\" \n\t ms-click=\"_arrClick($event, 'up', pos, $index)\" \n\t ms-mousedown=\"_arrDown($event,'up', pos, $index)\" \n\t ms-class-100=\"oni-state-disabled:disabled\" \n\t ms-mouseup=\"_arrDown($event,'up', pos, $index,'release')\" \n\t ms-hover=\"oni-state-hover oni-scrollbar-arrow-hover\"><b class=\"oni-scrollbar-trangle  oni-scrollbar-trangle-up\"></b></div>\n\t<div class=\"oni-scrollbar-draggerpar\" ms-click=\"_barClick($event, pos, $index)\">\n\t\t<div class=\"oni-scrollbar-dragger\"\n\t\tms-attr-data-draggable-axis=\"pos == 'left' || pos == 'right' ? 'y' : 'x'\" \n\t\tms-click=\"_stopPropagation($event)\" \n\t\tms-class-100=\"oni-state-disabled:disabled\" \n\t\tms-mouseover=\"_show($event,'always',$index)\" \n\t\tms-mousedown=\"_draggerDown($event, true)\" \n\t\tms-mouseup=\"_draggerDown($event, false)\" \n\t\tms-mouseout=\"_draggerDown($event, false)\" \n\t\tms-hover=\"oni-state-hover\"\n\t\t>{{draggerHTML | html}}</div>\n\t</div>\n\t<div ms-if=\"showBarHeader\" class=\"oni-scrollbar-arrow oni-scrollbar-arrow-down\"\n\t ms-click=\"_arrClick($event, 'down', pos, $index)\"\n\t ms-mousedown=\"_arrDown($event,'down', pos, $index)\" \n\t ms-mouseup=\"_arrDown($event,'down', pos, $index,'release')\" \n\t ms-class-100=\"oni-state-disabled:disabled\" \n\t ms-hover=\"oni-state-hover\"><b class=\"oni-scrollbar-trangle oni-scrollbar-trangle-down\"></b></div>\n</div>"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var defaults = {
	        ghosting: false, //是否影子拖动，动态生成一个元素，拖动此元素，当拖动结束时，让原元素到达此元素的位置上,
	        delay: 0,
	        axis: "xy",
	        started: true,
	        start: avalon.noop,
	        beforeStart: avalon.noop,
	        drag: avalon.noop,
	        beforeStop: avalon.noop,
	        stop: avalon.noop,
	        scrollPlugin: true,
	        scrollSensitivity: 20,
	        scrollSpeed: 20
	    }
	
	    var styleEl = document.getElementById("avalonStyle")
	    //拖动时禁止文字被选中，禁止图片被拖动
	    var cssText = ".ui-helper-global-drag *{ -webkit-touch-callout: none;" +
	            "-khtml-user-select: none;" +
	            "-moz-user-select: none;" +
	            "-ms-user-select: none;" +
	            "user-select: none;}" +
	            ".ui-helper-global-drag img{-webkit-user-drag:none; " +
	            "pointer-events:none;}"
	    try {
	        styleEl.innerHTML += cssText;
	    } catch (e) {
	        styleEl.styleSheet.cssText += cssText;
	    }
	
	    var body
	    var ua = navigator.userAgent;
	    var isAndroid = /Android/i.test(ua);
	    var isBlackBerry = /BlackBerry/i.test(ua)
	    var isWindowPhone = /IEMobile/i.test(ua)
	    var isIOS = /iPhone|iPad|iPod/i.test(ua)
	    var isMobile = isAndroid || isBlackBerry || isWindowPhone || isIOS
	    if (!isMobile) {
	        var dragstart = "mousedown"
	        var drag = "mousemove"
	        var dragstop = "mouseup"
	    } else {
	        dragstart = "touchstart"
	        drag = "touchmove"
	        dragstop = "touchend"
	    }
	
	    var draggable = avalon.bindingHandlers.draggable = function(data, vmodels) {
	        var args = data.value.match(avalon.rword) || []
	        var ID  = args[0] ||  "$"
	        var opts = args[1] ||"draggable"
	        var model, vmOptions
	        if (ID != "$") {
	            model = avalon.vmodels[ID]//如果指定了此VM的ID
	            if (!model) {
	                return
	            }
	        }
	        data.element.removeAttribute("ms-draggable")
	        if (!model) {//如果使用$或绑定值为空，那么就默认取最近一个VM，没有拉倒
	            model = vmodels.length ? vmodels[0] : null
	        }
	        var fnObj = model || {}
	        if (model && typeof model[opts] === "object") {//如果指定了配置对象，并且有VM
	            vmOptions = model[opts]
	            if (vmOptions.$model) {
	                vmOptions = vmOptions.$model
	            }
	            fnObj = vmOptions
	        }
	
	        var element = data.element
	        var $element = avalon(element)
	        var options = avalon.mix({}, defaults, vmOptions || {}, data[opts] || {}, avalon.getWidgetData(element, "draggable"));
	
	        //修正drag,stop为函数
	        "drag,stop,start,beforeStart,beforeStop".replace(avalon.rword, function(name) {
	            var method = options[name]
	            if (typeof method === "string") {
	                if (typeof fnObj[method] === "function") {
	                    options[name] = fnObj[method]
	
	                }
	            }
	        })
	        if (options.axis !== "" && !/^(x|y|xy)$/.test(options.axis)) {
	            options.axis = "xy"
	        }
	        body = document.body //因为到这里时，肯定已经domReady
	
	        $element.bind(dragstart, function(e) {
	            var data = avalon.mix({}, options, {
	                element: element,
	                $element: $element,
	                pageX: getPosition(e, "X"), //相对于页面的坐标, 会改动
	                pageY: getPosition(e, "Y"), //相对于页面的坐标，会改动
	                marginLeft: parseFloat($element.css("marginLeft")) || 0,
	                marginTop: parseFloat($element.css("marginTop")) || 0
	            })
	            data.startPageX = data.pageX//一次拖放只赋值一次
	            data.startPageY = data.pageY//一次拖放只赋值一次
	            options.axis.replace(/./g, function(a) {
	                data["drag" + a.toUpperCase() ] = true
	            })
	            if (!data.dragX && !data.dragY) {
	                data.started = false
	            }
	            //在处理手柄拖动前做些事情
	            if (typeof options.beforeStart === "function") {
	                options.beforeStart.call(data.element, e, data)
	            }
	
	            if (data.handle && fnObj) {// 实现手柄拖动
	                var handle = fnObj[data.handle]
	                handle = typeof handle === "function" ? handle : data.handle
	                if (typeof handle === "function") {
	                    var checked = handle.call(element, e, data)//要求返回一节点
	                    if (checked && checked.nodeType === 1) {
	                        if (!element.contains(checked)) {
	                            return // 不能返回 false，这会阻止文本被选择
	                        }
	                    } else {
	                        return
	                    }
	                }
	            }
	            fixUserSelect()
	            var position = $element.css("position")
	
	            //如果原元素没有被定位
	            if (!/^(?:r|a|f)/.test(position)) {
	                element.style.position = "relative";
	                element.style.top = "0px"
	                element.style.left = "0px"
	            }
	
	            if (options.delay && isFinite(options.delay)) {
	                data.started = false;
	                setTimeout(function() {
	                    data.started = true
	                }, options.delay)
	            }
	
	            var startOffset = $element.offset()
	            if (options.ghosting) {
	                var clone = element.cloneNode(true)
	                avalon(clone).css("opacity", .7).width(element.offsetWidth).height(element.offsetHeight)
	                data.clone = clone
	                if (position !== "fixed") {
	                    clone.style.position = "absolute"
	                    clone.style.top = startOffset.top - data.marginTop + "px"
	                    clone.style.left = startOffset.left - data.marginLeft + "px"
	                }
	                body.appendChild(clone)
	            }
	            var target = avalon(data.clone || data.element)
	            //拖动前相对于offsetParent的坐标
	            data.startLeft = parseFloat(target.css("left"))
	            data.startTop = parseFloat(target.css("top"))
	
	            //拖动后相对于offsetParent的坐标
	            //如果是影子拖动，代理元素是绝对定位时，它与原元素的top, left是不一致的，因此当结束拖放时，不能直接将改变量赋给原元素
	            data.endLeft = parseFloat($element.css("left")) - data.startLeft
	            data.endTop = parseFloat($element.css("top")) - data.startTop
	
	            data.clickX = data.pageX - startOffset.left //鼠标点击的位置与目标元素左上角的距离
	            data.clickY = data.pageY - startOffset.top  //鼠标点击的位置与目标元素左上角的距离
	            setContainment(options, data)//修正containment
	            draggable.dragData = data//决定有东西在拖动
	            "start,drag,beforeStop,stop".replace(avalon.rword, function(name) {
	                //console.log(options[name])
	                draggable[name] = [options[name]]
	            })
	            draggable.plugin.call("start", e, data)
	        })
	
	    }
	    var xy2prop = {
	        "X": "Left",
	        "Y": "Top"
	    }
	    //插件系统
	    draggable.dragData = {}
	    draggable.start = []
	    draggable.drag = []
	    draggable.stop = []
	    draggable.beforeStop = []
	    draggable.plugin = {
	        add: function(name, set) {
	            for (var i in set) {
	                var fn = set[i]
	                if (typeof fn === "function" && Array.isArray(draggable[i])) {
	                    fn.isPlugin = true
	                    fn.pluginName = name + "Plugin"
	                    draggable[i].push(fn)
	                }
	            }
	        },
	        call: function(name, e, data) {
	            var array = draggable[name]
	            if (Array.isArray(array)) {
	                array.forEach(function(fn) {
	                    //用户回调总会执行，插件要看情况
	                    if (typeof fn.pluginName === "undefined" ? true : data[fn.pluginName]) {
	                        fn.call(data.element, e, data)
	                    }
	                })
	            }
	            if (name === "stop") {
	                for (var i in draggable) {
	                    array = draggable[i]
	                    if (Array.isArray(array)) {
	                        array.forEach(function(fn) {
	                            if (!fn.isPlugin) {// 用户回调都是一次性的，插件的方法永远放在列队中
	                                avalon.Array.remove(array, fn)
	                            }
	                        })
	                    }
	                }
	            }
	        }
	    }
	
	    //统一处理拖动的事件
	    var lockTime = new Date - 0, minTime = document.querySelector ? 12 : 30
	    avalon(document).bind(drag, function(e) {
	        var time = new Date - lockTime
	        if (time > minTime) {//减少调用次数，防止卡死IE6-8
	            lockTime = time
	            var data = draggable.dragData
	            if (data.started === true) {
	                //fix touchmove bug;  
	                //IE 在 img 上拖动时默认不能拖动（不触发 mousemove，mouseup 事件，mouseup 后接着触发 mousemove ...）
	                //防止 html5 draggable 元素的拖放默认行为 (选中文字拖放)
	                e.preventDefault();
	                //使用document.selection.empty()来清除选择，会导致捕获失败 
	                var element = data.clone || data.element
	                setPosition(e, element, data, "X")
	                setPosition(e, element, data, "Y")
	                draggable.plugin.call("drag", e, data)
	            }
	        }
	    })
	
	    //统一处理拖动结束的事件
	    avalon(document).bind(dragstop, function(e) {
	        var data = draggable.dragData
	        if (data.started === true) {
	            restoreUserSelect()
	            var element = data.element
	            draggable.plugin.call("beforeStop", e, data)
	            if (data.dragX) {
	                setPosition(e, element, data, "X", true)
	            }
	            if (data.dragY) {
	                setPosition(e, element, data, "Y", true)
	            }
	            if (data.clone) {
	                body.removeChild(data.clone)
	            }
	            draggable.plugin.call("stop", e, data)
	            draggable.dragData = {}
	        }
	    })
	
	
	    function getPosition(e, pos) {
	        var page = "page" + pos
	        return isMobile ? e.changedTouches[0][page] : e[page]
	    }
	
	    function setPosition(e, element, data, pos, end) {
	        var page = getPosition(e, pos)
	        if (data.containment) {
	            var min = pos === "X" ? data.containment[0] : data.containment[1]
	            var max = pos === "X" ? data.containment[2] : data.containment[3]
	            var check = page - (pos === "X" ? data.clickX : data.clickY)
	            if (check < min) {
	                page += Math.abs(min - check)
	            } else if (check > max) {
	                page -= Math.abs(max - check)
	            }
	        }
	        data["page" + pos] = page//重设pageX, pageY
	        var Prop = xy2prop[pos]
	        var prop = Prop.toLowerCase()
	
	        var number = data["start" + Prop] + page - data["startPage" + pos] + (end ? data["end" + Prop] : 0)
	        data[prop] = number
	
	        if (data["drag" + pos]) {//保存top, left
	            element.style[ prop ] = number + "px"
	        }
	
	    }
	
	
	    var rootElement = document.documentElement
	    var fixUserSelect = function() {
	        avalon(rootElement).addClass("ui-helper-global-drag")
	    }
	    var restoreUserSelect = function() {
	        avalon(rootElement).removeClass("ui-helper-global-drag")
	    }
	
	    if (window.VBArray && !("msUserSelect" in rootElement.style)) {
	        var _ieSelectBack;//fix IE6789
	        function returnFalse() {
	            var e = window.event || {}
	            e.returnValue = false
	        }
	        fixUserSelect = function() {
	            _ieSelectBack = body.onselectstart;
	            body.onselectstart = returnFalse;
	        }
	        restoreUserSelect = function() {
	            body.onselectstart = _ieSelectBack;
	        }
	    }
	
	    function setContainment(o, data) {
	        if (!o.containment) {
	            if (Array.isArray(data.containment)) {
	                return
	            }
	            data.containment = null;
	            return;
	        }
	        var elemWidth = data.$element.width()
	        var elemHeight = data.$element.height()
	        if (o.containment === "window") {
	            var $window = avalon(window)
	            //左， 上， 右， 下
	            data.containment = [
	                $window.scrollLeft(),
	                $window.scrollTop(),
	                $window.scrollLeft() + $window.width() - data.marginLeft - elemWidth,
	                $window.scrollTop() + $window.height() - data.marginTop - elemHeight
	            ]
	            return;
	        }
	
	        if (o.containment === "document") {
	            data.containment = [
	                0,
	                0,
	                avalon(document).width() - data.marginLeft,
	                avalon(document).height() - data.marginTop
	            ]
	            return;
	        }
	
	        if (Array.isArray(o.containment)) {
	            var a = o.containment
	            data.containment = [a[0], a[1], a[2] - elemWidth, a[3] - elemHeight]
	            return;
	        }
	
	        if (o.containment === "parent" || o.containment.charAt(0) === "#") {
	            var elem
	            if (o.containment === "parent") {
	                elem = data.element.parentNode;
	            } else {
	                elem = document.getElementById(o.containment.slice(1))
	            }
	            if (elem) {
	                var $offset = avalon(elem).offset()
	                data.containment = [
	                    $offset.left + data.marginLeft, //如果元素设置了marginLeft，设置左边界时需要考虑它 
	                    $offset.top + data.marginTop,
	                    $offset.left + elem.offsetWidth - data.marginLeft - elemWidth,
	                    $offset.top + elem.offsetHeight - data.marginTop - elemHeight
	                ]
	            }
	        }
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))


/***/ },
/* 23 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 滑块
	 * @enName slider
	 * @introduce
	 *    <p>slider组件用来拖动手柄选择数值，可以水平拖动、垂直拖动、设置range使得两边都可以拖动，或者根据设置的步长更新滑块数值</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22), 
	        __webpack_require__(27), 
	        __webpack_require__(24), 
	        __webpack_require__(28), 
	        __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, sourceHTML) {
	    /**
	     * @global Handlers ： 保存页面上所有滑动手柄
	     * @global Index :点中手柄在Handlers中的索引，或滑动手柄在handlers中的索引 
	     * @gloabal focusElement: 页面上点中的手柄元素的引用，当按下方向键时，滑动作用域此元素
	     **/
	    var Handlers = [], Index = 0, FocusElement, template = sourceHTML;
	    var widget = avalon.ui["slider"] = function(element, data, vmodels) {
	
	        var $element = avalon(element)
	        var options = data.sliderOptions
	
	        var isHorizontal = options.orientation === "horizontal"
	        //将整个slider划分为N等分, 比如100, 227
	        var valueMin = options.min 
	        var valueMax = options.max  
	        var oRange = options.range //true min max， 默认为false
	        var values = options.values
	        var twohandlebars = oRange === true
	        var value = Number(options.value) //第几等份
	        if (isNaN(value)) {
	            var valVM = avalon.getModel(options.value, vmodels);
	            if (valVM) {
	                value = valVM[1][valVM[0]];
	            }
	        }
	        options.template = options.getTemplate(template, options);
	        // 固定最小的一边
	        if (oRange === "min" && values) {
	            value = values[0]
	        } else if (oRange === "max" && values) { // 固定最大的一边
	            value = values[1]
	        }
	        // 如果没有配置value和values,且range是min或者max，重置value
	        if (!value && oRange === "min" && !values && value !== 0) {
	            value =  valueMin || value;
	        } else if (!value && oRange === 'max' && !values && value !== 0) {
	            value = valueMax || value;
	        }
	        if (options.step !== 1 && !/\D/.test(options.step)) {
	            value = correctValue(value);
	        }
	        // 如果滑动块有双手柄，重置values
	        if (twohandlebars) {
	            if (Array.isArray(values)) {
	                values = values.length === 1 ? [values[0], values[0]] : values.concat()
	            } else {
	                values = [valueMin, valueMax]
	            }
	        }
	        // 修正模板
	        var sliderHTML = options.template.replace(/MS_OPTION_WIDTHORHEIGHT/g, isHorizontal? "width": "height").replace(/MS_OPTION_LEFTORBOTTOM/g, isHorizontal? "left" : "bottom");
	        // handlers保存滑动块上的手柄，域Handlers进行区分
	        var slider = avalon.parseHTML(sliderHTML).firstChild, handlers = []
	        element.parentNode.insertBefore(slider, element.nextSibling)
	        $element.addClass("oni-helper-hidden-accessible")
	
	        function value2Percent(val) { // 将value值转换为百分比
	            if (val < valueMin) {
	                val = valueMin
	            }
	            if (val > valueMax) {
	                val = valueMax
	            }
	            return parseFloat(((val-valueMin) / (valueMax-valueMin) * 100).toFixed(5))
	        }
	        function percent2Value(percent) {//0~1
	            var val = (valueMax-valueMin) * percent +valueMin
	            val = correctValue(val);
	            return parseFloat(val.toFixed(3))
	        }
	        function correctValue(val) {
	            var step = (options.step > 0) ? options.step : 1
	            var stepLength
	            try {
	                stepLength = step.toString().split(".")[1].length
	                }
	                catch (e) {
	                stepLength = 0
	                }
	            var m = Math.pow(10, stepLength)
	            var valModStep = (val-valueMin) * m % step * m
	            var n = (val-valueMin) / step 
	            val = (valueMin * m + (valModStep * 2 >= step ? step * m * Math.ceil(n) : step * m * Math.floor(n))) / m
	            return val
	        }
	        var vmodel = avalon.define(data.sliderId, function(vm) {
	            avalon.mix(vm, options);
	            vm.$skipArray = ["template","rootElement", "widgetElement", "step", "_dragEnd"]
	            vm.rootElement = slider
	            vm.widgetElement = element
	            vm.step = (options.step > 0) ? options.step : 1
	            vm.disabled = element.disabled
	            vm.percent = twohandlebars ? value2Percent(values[1] - values[0] + valueMin) : value2Percent(value)
	            vm.percent0 = twohandlebars ? value2Percent(values[0]) : 0
	            vm.percent1 = twohandlebars ? value2Percent(values[1]) : 0
	            vm.value = twohandlebars ? values.join() : value
	            vm.values = values
	            vm.$axis = isHorizontal ? "x" : "y"
	            vm.$valueMin = valueMin
	            vm.$valueMax = valueMax
	            vm.$twohandlebars = twohandlebars
	            vm.$percent2Value = percent2Value
	            vm.$pixelTotal = 0
	            vm._dragEnd = false;
	            vm.dragstart = function(event, data) {
	                vmodel.$pixelTotal = isHorizontal ? slider.offsetWidth : slider.offsetHeight
	                Handlers = handlers  // 很关键，保证点击的手柄始终在Handlers中，之后就可以通过键盘方向键进行操作
	                data.started = !vmodel.disabled
	                data.dragX = data.dragY = false
	                Index = handlers.indexOf(data.element)
	                data.$element.addClass("oni-state-active")
	                options.onDragStart.call(null, event, data);
	            }
	            vm.dragend = function(event, data, keyVal) {
	                data.$element.removeClass("oni-state-active")
	                // dragCaculate(event, data, keyVal)
	                options.onDragEnd.call(null, event, data);
	                vmodel._dragEnd = false; 
	            }
	            vm.drag = function(event, data, keyVal) {
	                dragCaculate(event, data, keyVal)
	                options.onDrag.call(null, vmodel, data);
	                vmodel._dragEnd = true;
	            }
	            vm.$init = function() {
	                var a = slider.getElementsByTagName("b")
	                for (var i = 0, el; el = a[i++]; ) {
	                    el.sliderModel = vmodel
	                    if (!twohandlebars && avalon(el).hasClass("hander___flag")) {
	                        handlers.push(el);
	                        avalon(el).removeClass("hander___flag")
	                        break;
	                    } else if ( twohandlebars && !avalon(el).hasClass("hander___flag")) {
	                        handlers.push(el);
	                    } 
	                }
	                avalon(element).css({display: "none", height:0, width: 0, padding: 0})
	                avalon(slider).css("width", vmodel.width)
	                avalon.scan(slider, [vmodel].concat(vmodels))
	                if (typeof options.onInit === "function" ){
	                    //vmodels是不包括vmodel的
	                    options.onInit.call(element, vmodel, options, vmodels)
	                }
	            }
	            vm.$remove = function() {
	                slider.innerHTML = slider.textContent = ""
	                slider.parentNode.removeChild(slider);
	            }
	        })
	        vmodel.$watch("value", function(val) {
	            val = correctValue(Number(val) || 0);
	            if (!val || val < Number(vmodel.min)) {
	                val = 0;
	            } else if (val > Number(vmodel.max)) {
	                val = vmodel.max;
	            }
	            vmodel.value = val;
	            vmodel.percent = value2Percent(val)
	            if (!vmodel._dragEnd) {
	                options.onDragEnd.call(null, data);
	            }
	        })
	        function dragCaculate(event, data, keyVal) {
	            if (isFinite(keyVal)) {
	                var val = keyVal
	            } else {
	                var prop = isHorizontal ? "left" : "top"
	                var pixelMouse = data[prop] + parseFloat(data.$element.css("border-top-width"))
	                //如果是垂直时,往上拖,值就越大
	                var percent = (pixelMouse / vmodel.$pixelTotal) //求出当前handler在slider的位置
	                if (!isHorizontal) { // 垂直滑块，往上拖动时pixelMouse变小，下面才是真正的percent，所以需要调整percent
	                    percent = Math.abs(1 - percent)
	                }
	                if (percent > 0.999) {
	                    percent = 1
	                }
	                if (percent < 0.001) {
	                    percent = 0
	                }
	                val = percent2Value(percent)
	            }
	            if (twohandlebars) { //水平时，小的0在左边，大的1在右边，垂直时，小的0在下边，大的1在上边
	                if (Index === 0) { 
	                    var check = vmodel.values[1]
	                    if (val > check) {
	                        val = check
	                    }
	                } else {
	                    check = vmodel.values[0]
	                    if (val < check) {
	                        val = check
	                    }
	                }
	                vmodel.values[Index] = val
	                vmodel["percent" + Index] = value2Percent(val)
	                vmodel.value = vmodel.values.join()
	                vmodel.percent = value2Percent(vmodel.values[1] - vmodel.values[0] + valueMin)
	            } else {
	                vmodel.value = val
	                vmodel.percent = value2Percent(val)
	            }
	        }
	        return vmodel
	    }
	    widget.defaults = {
	        max: 100, //@config 组件的最大值
	        min: 0, //@config 组件的最小值
	        width: -1,
	        orientation: "horizontal", //@config 组件是水平拖动还是垂直拖动，垂直是“vertical”
	        /**
	         * @config 滑块是否显示滑动范围，配置值可以是true、min、max
	            <p>true: 显示滑动范围</p>
	            <p>min: 滑块值最小的一端固定</p>
	            <p>max: 滑块值最大的一端固定</p>
	         */
	        range: false,
	        step: 1, //@config 滑块滑动的步值
	        value: 0, //@config 滑块的当前值，当range为true时，value是滑块范围表示的两个值，以“,”分隔
	        values: null, //@config 当range为true时，values数组需要有两个值，表示滑块范围
	        disabled: false, //@config 是否禁用滑块, 设为true时滑块禁用
	        /**
	         * @config {Function} 滑动开始的回调
	         * @param event {Object} 事件对象
	         * @param data {Object} 滑动的数据信息
	         */
	        onDragStart: avalon.noop,
	        /**
	         * @config {Function} 滑动时的回调
	         * @param vmodel {Object} 组件对应的Vmodel
	         * @param data {Object} 滑动的数据信息
	         */
	        onDrag: avalon.noop,
	        /**
	         * @config {Function} 滑动结束时的回调
	         * @param data {Object} 滑动的数据信息
	         */
	        onDragEnd: avalon.noop,
	        getTemplate: function(str, options) {
	            return str;
	        }
	    }
	    avalon(document).bind("click", function(e) { // 当点击slider之外的区域取消选中状态
	        e.stopPropagation();
	        var el = e.target
	        var Index = Handlers.indexOf(el)
	        if (Index !== -1) {
	            if (FocusElement) {
	                FocusElement.removeClass("oni-state-focus");
	            }
	            FocusElement = avalon(el).addClass("oni-state-focus")
	        } else if (FocusElement) {
	            FocusElement.removeClass("oni-state-focus")
	            FocusElement = null
	        }
	   })
	    avalon(document).bind("keydown", function(e) { // 当选中某个手柄之后通过键盘上的方向键控制手柄的slider
	        // e.preventDefault();
	        if (FocusElement) {
	            var vmodel = FocusElement[0].sliderModel
	            var percent = Handlers.length == 1 ? vmodel.percent : vmodel["percent" + Index]
	            var val = vmodel.$percent2Value(percent / 100), keyVal
	            switch (e.which) {
	                case 34 : // pageDown
	                case 39:  // right
	                case 38:  // down
	                    keyVal = Math.min(val + 1, vmodel.$valueMax)
	                    break;
	                case 33: // pageUp
	                case 37: // left
	                case 40: // up
	                    keyVal = Math.max(val - 1, vmodel.$valueMin)
	                    break
	                case 36: // home
	                    keyVal = vmodel.$valueMin
	                    break
	                case 35: // end
	                    keyVal = vmodel.$valueMax
	                    break
	            }
	            if (isFinite(keyVal)) {
	                vmodel.drag(e, {}, keyVal)
	            }
	        }
	    })
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [slider组件使用概览](avalon.slider.ex.html)
	 [基本的slider组件，配置有dragstart、drag、dragend回调](avalon.slider.ex1.html)
	 [切换禁用slider组件](avalon.slider.ex2.html)
	 [配置slider组件max、min、value值](avalon.slider.ex3.html)
	 [配置slider的range为true、min、max实现不同的slider效果](avalon.slider.ex4.html)
	 [配置slider的步长step](avalon.slider.ex5.html)
	 [配置orientation选项使得slider为垂直拖动块](avalon.slider.ex6.html)
	 [利用slider组件滚动图片](avalon.slider.ex7.html)
	 */


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-slider oni-widget oni-corner-all\"\n     ms-class-1 = \"oni-slider-horizontal: orientation==='horizontal'\"\n     ms-class-2 = \"oni-slider-vertical: orientation !== 'horizontal'\"\n     ms-class-oni-state-disabled=\"disabled\"> \n    <div class=\"oni-slider-range oni-widget-header oni-corner-all\" \n         ms-class-1 = \"oni-slider-range-min:range==='min'\"\n         ms-class-2 = \"oni-slider-range-max:range==='max'\"\n         ms-css-MS_OPTION_WIDTHORHEIGHT = \"{{range === 'max' ? 100-percent : percent}}%\"\n         ms-css-MS_OPTION_LEFTORBOTTOM = \"{{ $twohandlebars ? percent0 : 'auto'}}%\"\n         ms-if = \"range\"\n         style=\"width: 100%;\">\n    </div>\n    <b  class=\"oni-slider-handle  oni-corner-all hander___flag\"\n        ms-css-MS_OPTION_LEFTORBOTTOM = \"{{percent}}%\"\n        ms-data-axis = \"$axis\"\n        ms-draggable\n        data-draggable-start=\"dragstart\" \n        data-draggable-stop=\"dragend\" \n        data-draggable-drag=\"drag\" \n        data-draggable-containment=\"parent\" \n        ms-hover=\"oni-state-hover\"\n        ms-if = \"!$twohandlebars\"\n        ></b>\n    <b  class=\"oni-slider-handle  oni-corner-all\"\n        ms-css-MS_OPTION_LEFTORBOTTOM = \"{{percent0}}%\"\n        ms-data-axis = \"$axis\"\n        ms-draggable\n        data-draggable-start=\"dragstart\" \n        data-draggable-stop=\"dragend\" \n        data-draggable-drag=\"drag\" \n        data-draggable-containment=\"parent\" \n        ms-hover=\"oni-state-hover\"\n        ms-if = \"$twohandlebars\"\n        ></b>\n    <b  class=\"oni-slider-handle  oni-corner-all\"\n        ms-css-MS_OPTION_LEFTORBOTTOM = \"{{percent1}}%\"\n        ms-data-axis = \"$axis\"\n        ms-draggable\n        data-draggable-start=\"dragstart\" \n        data-draggable-stop=\"dragend\" \n        data-draggable-drag=\"drag\" \n        data-draggable-containment=\"parent\" \n        ms-hover=\"oni-state-hover\"\n     \n        ms-if = \"$twohandlebars\"\n        ></b>\n</div>"

/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @cnName 分页组件
	 * @enName pager
	 * @introduce
	 *  <p> 分页组件 用于各种列表与表格的下方 。</p>
	 */
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2),
	    __webpack_require__(32),
	    __webpack_require__(24),
	    __webpack_require__(33)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (avalon, template) {
	
	    var widget = avalon.ui.pager = function (element, data, vmodels) {
	        var options = data.pagerOptions
	        var pageOptions = options.options
	        if (Array.isArray(pageOptions)) {
	            options.options = pageOptions.map(function (el) {
	                var obj = {}
	                switch (typeof el) {
	                    case "number":
	                    case "string":
	                        obj.value = el
	                        obj.text = el
	                        return obj
	                    case "object":
	                        return el
	                }
	            })
	        } else {
	            options.options = []
	        }
	        if (vmodels.cb) {
	            template = template.replace(/ms-title/g, "ms-attr-title")
	        }
	        //方便用户对原始模板进行修改,提高制定性
	        options.template = options.getTemplate(template, options)
	        options._currentPage = options.currentPage
	        var vmodel = avalon.define(data.pagerId, function (vm) {
	            avalon.mix(vm, options, {
	                regional: widget.defaultRegional
	            })
	            vm.widgetElement = element
	            vm.rootElement = {}
	            vm.$skipArray = ["showPages", "rootElement", "widgetElement", "template", "ellipseText", "alwaysShowPrev", "alwaysShowNext"]
	            //这些属性不被监控
	            vm.$init = function (continueScan) {
	                var pageHTML = options.template
	                element.style.display = "none"
	                setTimeout(function () {
	                    element.innerHTML = pageHTML
	                    vm.rootElement = element.getElementsByTagName("*")[0]
	                    element.style.display = "block"
	                    if (continueScan) {
	                        continueScan()
	                    } else {
	                        avalon.log("avalon请尽快升到1.3.7+")
	                        avalon.scan(element, [vmodel].concat(vmodels))
	                        if (typeof options.onInit === "function") {
	                            options.onInit.call(element, vmodel, options, vmodels)
	                        }
	                    }
	                }, 100)
	            }
	            vm.$remove = function () {
	                element.innerHTML = element.textContent = ""
	            }
	            vm.jumpPage = function (event, page) {
	                event.preventDefault()
	                var enabled = this.className.indexOf("state-disabled") === -1
	                if (enabled && page !== vm.currentPage) {
	                    switch (page) {
	                        case "first":
	                            vm.currentPage = 1
	                            break
	                        case "last":
	                            vm.currentPage = vm.totalPages
	                            break
	                        case "next":
	                            vm.currentPage++
	                            if (vm.currentPage > vm.totalPages) {
	                                vm.currentPage = vm.totalPages
	                            }
	                            break
	                        case "prev":
	                            vm.currentPage--
	                            if (vm.currentPage < 1) {
	                                vm.currentPage = 1
	                            }
	                            break
	                        default:
	                            vm.currentPage = page
	                            break
	                    }
	                    vm.onJump.call(element, event, vm)
	                    efficientChangePages(vm.pages, getPages(vm))
	                }
	            }
	            vm.$watch("totalItems", function () {
	                efficientChangePages(vm.pages, getPages(vm))
	            })
	            vm.$watch("perPages", function (a) {
	                vm.currentPage = 1
	                efficientChangePages(vm.pages, getPages(vm))
	            })
	            vm.$watch("currentPage", function (a) {
	                vmodel._currentPage = a
	                efficientChangePages(vm.pages, getPages(vm))
	            })
	            vm.isShowPrev = function () {
	                var a = vm.alwaysShowPrev;
	                var b = vm.firstPage
	                return a || b !== 1
	            }
	            vm.isShowNext = function () {
	                var a = vm.alwaysShowNext
	                var b = vm.lastPage
	                var c = vm.totalPages
	                return a || b !== c
	            }
	
	            vm.changeCurrentPage = function (e, value) {
	                if (e.type === "keyup") {
	                    value = this.value
	                    if (e.keyCode !== 13)
	                        return
	                } else {
	                    value = vmodel._currentPage
	                }
	                value = parseInt(value, 10) || 1
	                if (value > vmodel.totalPages || value < 1)
	                    return
	                //currentPage需要转换为Number类型 fix lb1064@qq.com
	                vmodel.currentPage = value
	                vmodel.pages = getPages(vmodel)
	                vmodel.onJump.call(element, e, vm);
	            }
	            vm.pages = []
	            vm.getPages = getPages
	
	            //设置语言包
	            vm.setRegional = function (regional) {
	                vmodel.regional = regional
	            }
	            vm._getTotalPages = function (totalPages) {
	                //return {{regional.totalText}}{{totalPages}}{{regional.pagesText}}，{{regional.toText}}{{regional.numberText}}
	                var regional = vmodel.regional,
	                        html = [regional.totalText, totalPages]
	
	                if (totalPages > 1) {
	                    html.push(regional.pagesText)
	                } else {
	                    html.push(regional.pageText)
	                }
	
	                html = html.concat([" ", regional.jumpToText, regional.numberText])
	
	                return html.join("")
	            }
	
	            /**
	             * @config {Function} 获取页码上的title的函数
	             * @param {String|Number} a 当前页码的类型，如first, prev, next, last, 1, 2, 3
	             * @param {Number} currentPage 当前页码
	             * @param {Number} totalPages 最大页码
	             * @returns {String}
	             */
	            vm.getTitle = function (a, currentPage, totalPages) {
	
	                var regional = vmodel.regional
	
	                switch (a) {
	                    case "first":
	                        if (currentPage == 1) {
	                            return regional.currentText
	                        }
	                        return regional.jumpToText + " " + regional.firstText
	                    case "prev":
	                        return regional.jumpToText + " " + regional.prevText
	                    case "next":
	                        return regional.jumpToText + " " + regional.nextText
	                    case "last":
	                        if (currentPage == totalPages) {
	                            return regional.currentText
	                        }
	                        return regional.jumpToText + " " + regional.lastText
	                    default:
	                        if (a === currentPage) {
	                            return regional.currentText
	                        }
	                        return regional.jumpToText + regional.numberText + " " + a + regional.pageText
	                }
	            }
	        })
	        vmodel.pages = getPages(vmodel)
	
	        return vmodel
	    }
	    //vmodel.pages = getPages(vmodel) 会波及一些其他没有改动的元素节点,现在只做个别元素的添加删除操作
	    function efficientChangePages(aaa, bbb) {
	        var obj = {}
	        for (var i = 0, an = aaa.length; i < an; i++) {
	            var el = aaa[i]
	            obj[el] = {action: "del", el: el}
	        }
	        for (var i = 0, bn = bbb.length; i < bn; i++) {
	            var el = bbb[i]
	            if (obj[el]) {
	                obj[el] = {action: "retain", el: el}
	            } else {
	                obj[el] = {action: "add", el: el}
	            }
	        }
	        var scripts = []
	        for (var i in obj) {
	            scripts.push({
	                action: obj[i].action,
	                el: obj[i].el
	            })
	        }
	        scripts.sort(function (a, b) {
	            return a.el - b.el
	        })
	        scripts.forEach(function (el, index) {
	            el.index = index
	        })
	        //添加添加
	        var reverse = []
	        for (var i = 0, el; el = scripts[i++]; ) {
	            switch (el.action) {
	                case "add":
	                    aaa.splice(el.index, 0, el.el)
	                    break;
	                case "del":
	                    reverse.unshift(el)
	                    break;
	            }
	        }
	        //再删除
	        for (var i = 0, el; el = reverse[i++]; ) {
	            aaa.splice(el.index, 1)
	        }
	
	    }
	
	    //默认语言包为中文简体
	    widget.regional = []
	    widget.regional["zh-CN"] = {
	        prevText: "上一页",
	        nextText: "下一页",
	        confirmText: "确定",
	        totalText: "共",
	        pagesText: "页",
	        pageText: "页",
	        toText: "到",
	        jumpToText: "跳转到",
	        currentText: "当前页",
	        firstText: "第一页",
	        lastText: "最后一页",
	        numberText: "第"
	    }
	
	    //设置默认语言包
	    widget.defaultRegional = widget.regional["zh-CN"]
	
	    widget.defaults = {
	        perPages: 10, //@config {Number} 每页包含多少条目
	        showPages: 10, //@config {Number} 中间部分一共要显示多少页(如果两边出现省略号,即它们之间的页数) 
	        currentPage: 1, //@config {Number} 当前选中的页面 (按照人们日常习惯,是从1开始)，它会被高亮 
	        _currentPage: 1, //@config {Number}  跳转台中的输入框显示的数字，它默认与currentPage一致
	        totalItems: 200, //@config {Number} 总条目数
	        totalPages: 0, //@config {Number} 总页数,通过Math.ceil(vm.totalItems / vm.perPages)求得
	        pages: [], //@config {Array} 要显示的页面组成的数字数组，如[1,2,3,4,5,6,7]
	        nextText: ">", //@config {String} “下一页”分页按钮上显示的文字 
	        prevText: "<", //@config {String} “上一页”分页按钮上显示的文字 
	        ellipseText: "…", //@config {String} 省略的页数用什么文字表示 
	        firstPage: 0, //@config {Number} 当前可显示的最小页码，不能小于1
	        lastPage: 0, //@config {Number} 当前可显示的最大页码，不能大于totalPages
	        alwaysShowNext: false, //@config {Boolean} 总是显示向后按钮
	        alwaysShowPrev: false, //@config {Boolean} 总是显示向前按钮
	        showFirstOmit: false,
	        showLastOmit: false,
	        showJumper: false, //是否显示输入跳转台
	        /*
	         * @config {Function} 用于重写模板的函数 
	         * @param {String} tmpl
	         * @param {Object} opts
	         * @returns {String}
	         */
	        getTemplate: function (tmpl, opts) {
	            return tmpl
	        },
	        options: [], // @config {Array}数字数组或字符串数组或对象数组,但都转换为对象数组,每个对象都应包含text,value两个属性, 用于决定每页有多少页(看avalon.pager.ex3.html) 
	        /**
	         * @config {Function} 页面跳转时触发的函数,如果当前链接处于不可以点状态(oni-state-disabled),是不会触发的
	         * @param {Event} e
	         * @param {Object} vm  组件对应的VM
	         */
	        onJump: function (e, vm) {
	        }
	    }
	
	    function getPages(vm) {
	        var c = vm.currentPage, max = Math.ceil((vm.totalItems||0) / vm.perPages), pages = [], s = vm.showPages,
	                left = c, right = c
	        //一共有p页，要显示s个页面
	        vm.totalPages = max
	        if (max <= s) {
	            for (var i = 1; i <= max; i++) {
	                pages.push(i)
	            }
	        } else {
	            pages.push(c)
	            while (true) {
	                if (pages.length >= s) {
	                    break
	                }
	                if (left > 1) {//在日常生活是以1开始的
	                    pages.unshift(--left)
	                }
	                if (pages.length >= s) {
	                    break
	                }
	                if (right < max) {
	                    pages.push(++right)
	                }
	            }
	        }
	        vm.firstPage = pages[0] || 1
	        vm.lastPage = pages[pages.length - 1] || 1
	        vm.showFirstOmit = vm.firstPage > 2
	        vm.showLastOmit = vm.lastPage < max - 1
	        return  pages//[0,1,2,3,4,5,6]
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 * @other
	 * <p>pager 组件有一个重要的jumpPage方法，用于决定它的跳转方式。它有两个参数，第一个事件对象，第二个是跳转方式，见源码：</p>
	 ```javascript
	 vm.jumpPage = function(event, page) {
	 event.preventDefault()
	 if (page !== vm.currentPage) {
	 switch (page) {
	 case "first":
	 vm.currentPage = 1
	 break
	 case "last":
	 vm.currentPage = vm.totalPages
	 break
	 case "next":
	 vm.currentPage++
	 if (vm.currentPage > vm.totalPages) {
	 vm.currentPage = vm.totalPages
	 }
	 break
	 case "prev":
	 vm.currentPage--
	 if (vm.currentPage < 1) {
	 vm.currentPage = 1
	 }
	 break
	 default:
	 vm.currentPage = page
	 break
	 }
	 vm.onJump.call(element, event, vm)
	 efficientChangePages(vm.pages, getPages(vm))
	 }
	 }
	 ```
	 */
	
	/**
	 *  @links
	 [显示跳转台](avalon.pager.ex1.html)
	 [指定回调onJump](avalon.pager.ex2.html)
	 [改变每页显示的数量](avalon.pager.ex3.html)
	 [指定上一页,下一页的文本](avalon.pager.ex4.html)
	 [通过左右方向键或滚轮改变页码](avalon.pager.ex5.html)
	 [总是显示上一页与下一页按钮](avalon.pager.ex6.html)
	 [多语言支持](avalon.pager.ex7.html)
	 *
	 */
	//http://luis-almeida.github.io/jPages/defaults.html
	//http://gist.corp.qunar.com/jifeng.yao/gist/demos/pager/pager.html
	


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-pager\" onselectstart=\"return false;\" unselectable=\"on\" ms-visible=\"!!totalPages\">\n    <span class=\"oni-pager-prev\"\n          ms-class=\"oni-state-disabled:firstPage==1\"\n          ms-if=\"isShowPrev()\"\n          ms-attr-title=\"getTitle('prev')\" \n          ms-click=\"jumpPage($event,'prev')\" \n          ms-text=\"prevText\"\n          ></span>\n    <span class=\"oni-pager-item\"\n          ms-visible=\"firstPage!==1\" \n          ms-attr-title=\"getTitle('first', currentPage)\" \n          ms-click=\"jumpPage($event,'first')\" \n          ms-class-oni-state-active=\"currentPage == 1\"\n          ms-hover=\"oni-state-hover\">1</span>\n    <span class='oni-pager-omit'\n          ms-if=\"showFirstOmit\" \n          ms-text=\"ellipseText\"\n          ></span>\n    <span  class=\"oni-pager-item\" \n           ms-repeat=\"pages\" \n           ms-attr-title=\"getTitle(el, currentPage)\"\n           ms-hover=\"oni-state-hover\"\n           ms-click=\"jumpPage($event,el)\"\n           ms-class-oni-state-active=\"el == currentPage\" \n           ms-text=\"el\"\n           ></span>\n    <span class=\"oni-pager-omit\"\n          ms-if=\"showLastOmit\" \n          ms-text=\"ellipseText\"\n          ></span>\n    <span class=\"oni-pager-item \"\n          ms-visible=\"lastPage!==totalPages\" \n          ms-attr-title=\"getTitle('last', currentPage, totalPages)\" \n          ms-hover=\"oni-state-hover\" \n          ms-click=\"jumpPage($event,'last')\"  \n          ms-text=\"totalPages\"\n          ></span>\n    <span class=\"oni-pager-next\"\n          ms-if=\"isShowNext()\" \n          ms-attr-title=\"getTitle('next')\"\n          ms-click=\"jumpPage($event,'next')\" \n          ms-class=\"oni-state-disabled:lastPage==totalPages\"\n          ms-text=\"nextText\"\n          ></span>\n    <div class=\"oni-pager-jump\" ms-if=\"showJumper\">\n        <span class=\"oni-pager-text\" ms-html=\"_getTotalPages(totalPages)\"></span>\n        <div class=\"oni-pager-textbox-wrapper\">\n            <input class=\"oni-pager-textbox\" ms-duplex=\"_currentPage\" data-duplex-event=\"change\" ms-keyup=\"changeCurrentPage\">\n        </div>\n        <span class=\"oni-pager-text\">{{regional.pageText}}</span>\n        <button class=\"oni-pager-button\" ms-click=\"changeCurrentPage\" >{{regional.confirmText}}</button>\n    </div>\n</div>\n"

/***/ },
/* 33 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 对话框
	 * @enName dialog
	 * @introduce
	 *    <p>dialog组件提供弹窗显示或者隐藏,通过简单配置可以水平居中显示dialog弹窗，此组件支持弹窗中再弹窗，也可以用来模拟alert的行为，非常方便</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), 
	    __webpack_require__(35),
	    __webpack_require__(36),
	    __webpack_require__(24), 
	    __webpack_require__(38),
	    __webpack_require__(22)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon, sourceHTML) {
	
	    var template = sourceHTML,
	        widgetArr = template.split("MS_OPTION_WIDGET"),
	        _maskLayer = widgetArr[0], // 遮罩层html(string)
	        maskLayer = avalon.parseHTML(_maskLayer).firstChild, // 遮罩层节点(dom node)
	        maskLayerExist = false, // 页面不存在遮罩层就添加maskLayer节点，存在则忽略
	        _maskLayerSimulate = template.split("MS_OPTION_LAYOUT_SIMULATE")[1],
	        maskLayerSimulate = avalon.parseHTML(_maskLayerSimulate).firstChild, 
	        dialogShows = [], //存在层上层时由此数组判断层的个数
	        dialogNum = 0, //保存页面dialog的数量，当dialogNum为0时，清除maskLayer
	        //IE6 userAgent Mozilla/4.0(compatible;MISE 6.0;Windows NT 6.1;...)
	        isIE6 = (window.navigator.userAgent || '').toLowerCase().indexOf('msie 6') !== -1,
	        iFrame = null,
	        body = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
	
	    var widget = avalon.ui.dialog = function(element, data, vmodels) {
	        dialogNum++
	        var options = data.dialogOptions
	        options.type = options.type.toLowerCase() 
	        options.template = options.getTemplate(template, options)
	        var _footerArr = options.template.split("MS_OPTION_FOOTER"),
	            _contentArr = _footerArr[0].split("MS_OPTION_CONTENT"),
	            _headerArr = _contentArr[0].split("MS_OPTION_HEADER"),
	            _innerWraperArr = _headerArr[0].split("MS_OPTION_INNERWRAPPER"),
	            _content = _contentArr[1], //content wrapper html
	            _lastHeader = _headerArr[1], //header html
	            _lastFooter = _footerArr[1].split("MS_OPTION_LAYOUT_SIMULATE")[0], //footer html
	            _innerWrapper = _innerWraperArr[1], //inner wrapper html
	            _lastContent = "", //dialog content html
	            lastContent = "", //dialog content node
	            $element = avalon(element),
	            onDraftClick = options.onDraftClick;
	            onDraftClickVM = null,
	            onConfirm = options.onConfirm,
	            onConfirmVM = null,
	            onCancel = options.onCancel,
	            onCancelVM = null,
	            onOpen = options.onOpen,
	            onOpenVM = null,
	            onClose = options.onClose,
	            onCloseVM = null,
	            toggleClose = true,
	            position = isIE6 ? "absolute" : "fixed"
	
	        if (typeof onConfirm === "string") {
	            onConfirmVM = avalon.getModel(onConfirm, vmodels)
	            options.onConfirm = onConfirmVM && onConfirmVM[1][onConfirmVM[0]] || avalon.noop
	        }
	
	        if (typeof onDraftClick === "string") {
	            onDraftClickVM = avalon.getModel(onDraftClick, vmodels)
	            options.onDraftClick = onDraftClickVM && onDraftClickVM[1][onDraftClickVM[0]] || avalon.noop
	        }
	
	        if (typeof onCancel ==="string") {
	            onCancelVM = avalon.getModel(onCancel, vmodels)
	            options.onCancel = onCancelVM && onCancelVM[1][onCancelVM[0]] || avalon.noop
	        }
	        if (typeof onClose ==="string") {
	            avalon.log("ms-widget='dialog' data-dialog-on-close 此用法已经被废弃")
	            onCloseVM = avalon.getModel(onClose, vmodels)
	            options.onClose = onCloseVM && onCloseVM[1][onCloseVM[0]] || avalon.noop
	        }
	        if (typeof onOpen ==="string") {
	            onOpenVM = avalon.getModel(onOpen, vmodels)
	            options.onOpen = onOpenVM && onOpenVM[1][onOpenVM[0]] || avalon.noop
	        }
	        _lastFooter = options.getFooter(_lastFooter, options)
	        var vmodel = avalon.define(data.dialogId, function(vm) {
	            avalon.mix(vm, options)
	            vm.$skipArray = ["widgetElement", "template", "container", "modal", "zIndexIncrementGlobal", "initChange", "content"]
	            vm.widgetElement = element
	            vm.position = position
	            // 如果显示模式为alert或者配置了showClose为false，不显示关闭按钮
	            vm.showClose = vm.type === "alert" ? false : vm.showClose
	            vm.initChange = true
	            // 点击确定按钮，根据回调返回值是否为false决定是否关闭弹窗
	            vm._confirm = function(e) {
	                if (typeof vmodel.onConfirm !== "function") {
	                    throw new Error("onConfirm必须是一个回调方法")
	                }
	                // 在用户回调返回false时，不关闭弹窗
	                if(vmodel.onConfirm.call(e.target, e, vmodel) !== false){
	                    vmodel._close(e)
	                }
	            }
	
	            vm._draftClick = function(e) {
	                if (typeof vmodel.onDraftClick !== "function") {
	                    throw new Error("onDraftClick必须是一个回调方法")
	                }
	                // 在用户回调返回false时，不关闭弹窗
	                if(vmodel.onDraftClick.call(e.target, e, vmodel) !== false){
	                    vmodel._close(e)
	                }
	            }
	            // 显示dialogmask
	            vm._open = function(updateZIndex) {
	                var len = 0, //当前显示的dialog的个数
	                    selectLength = document.getElementsByTagName("select").length,
	                    maxZIndex = vmodel.zIndex
	
	                avalon.Array.ensure(dialogShows, vmodel)
	                len = dialogShows.length
	                if (len) {
	                    if (vmodel.modal) {
	                        avalon(maskLayer).css("display", "block")
	                    }
	                    avalon(maskLayerSimulate).css("display", "block")
	                }
	                // 通过zIndex的提升来调整遮罩层，保证层上层存在时遮罩层始终在顶层dialog下面(顶层dialog zIndex-1)但是在其他dialog上面
	                maskLayer.style.zIndex = 2 * len + maxZIndex -1
	                maskLayerSimulate.style.zIndex = 2 * len + maxZIndex -1
	                element.style.zIndex =  2 * len + maxZIndex
	                if(updateZIndex) {
	                    return 
	                }
	                document.documentElement.style.overflow = "hidden"
	                resetCenter(vmodel, element)
	                // IE6下遮罩层无法覆盖select解决办法
	                if (isIE6 && selectLength && iFrame === null && vmodel.modal) {
	                    iFrame = createIframe()
	                } else if(isIE6 && selectLength && vmodel.modal) { 
	                    iFrame.style.display = "block"
	                    iFrame.style.width = maskLayer.style.width
	                    iFrame.style.height = maskLayer.style.height
	                    iFrame.style.zIndex = maskLayer.style.zIndex -1
	                }
	                vmodel.onOpen.call(element, vmodel)
	            }
	            
	            // 隐藏dialog
	            vm._close = function(e) {
	                avalon.Array.remove(dialogShows, vm)
	                var len = dialogShows.length,
	                    maxZIndex = vmodel.zIndex,
	                    topShowDialog = len && dialogShows[len-1]
	
	                if (e) {
	                    toggleClose = false
	                }
	                vmodel.toggle = false
	
	                /* 处理层上层的情况，因为maskLayer公用，所以需要其以将要显示的dialog的toggle状态为准 */
	                if (topShowDialog && topShowDialog.modal) {
	                    avalon(maskLayer).css("display", "block")
	                    avalon(maskLayerSimulate).css("display", "block")
	                    topShowDialog.widgetElement.style.display = "block"
	                    resetCenter(topShowDialog, topShowDialog.widgetElement)
	                } else {
	                    avalon(maskLayer).css("display", "none")
	                    avalon(maskLayerSimulate).css("display", "none")
	                    if (iFrame !== null) {
	                        iFrame.style.display = "none"
	                    }
	                    document.documentElement.style.overflow = ""
	                    vmodel.onClose.call(element, vmodel)
	                    return 
	                }
	                // 重置maskLayer的z-index,当最上层的dialog关闭，通过降低遮罩层的z-index来显示紧邻其下的dialog
	                var layoutZIndex = 2 * len + maxZIndex - 1
	                maskLayer.style.zIndex = layoutZIndex
	                maskLayerSimulate.style.zIndex = layoutZIndex
	                if (iFrame) {
	                    iFrame.style.zIndex = layoutZIndex -1
	                }
	                vmodel.onClose.call(element, vmodel)
	            }
	
	            // 点击"取消"按钮，根据回调返回值是否为false决定是否关闭dialog
	            vm._cancel = function(e) {
	                if (typeof vmodel.onCancel != "function") {
	                    throw new Error("onCancel必须是一个回调方法")
	                }
	                // 在用户回调返回false时，不关闭弹窗
	                if(vmodel.onCancel.call(e.target, e, vmodel) !== false){
	                    vmodel._close(e)
	                }
	            }
	/**
	         * @config {Function} 动态修改dialog的content
	         * @param m {Object} 重新渲染dialog的配置对象，包括title、content、content中涉及的插值表达式，需要注意的是，title和content不是真正渲染的内容，所以不需要avalon进行扫描监控，定义的时候必须在其前面加上"$",否则组件不会渲染成想要的效果
	         */
	            /**
	             * @config {Function} 可以动态改变dialog的显示内容
	             * @param content {String} 要替换的content，可以是已经渲染ok的view也可以是未解析渲染的模板
	             * @param noScan {Boolean} 当content是模板时noScan设为false或者不设置，组件会自动解析渲染模板，如果是已经渲染ok的，将noScan设为true，组件将不再进行解析操作
	             * @param contentVmodels {Array} 如果content为未解析的模板，noScan为false，contentVmodels是用来解析模板content的vmodels
	             */
	            vm.setContent = function(content, noScan, contentVmodels) {
	                var scanVmodels = contentVmodels ? contentVmodels : [vmodel].concat(vmodels)
	                _lastContent = content
	                lastContent.innerHTML = _lastContent
	                if (!noScan) {
	                    avalon.scan(lastContent, scanVmodels)
	                }
	                return vmodel
	            }
	
	            // 动态修改dialog的title
	            vm.setTitle = function(title) {
	                vmodel.title = title
	                return vmodel
	            }
	
	            // 重新渲染dialog
	            vm.setModel = function(m) {
	                // 这里是为了充分利用vm._ReanderView方法，才提前设置一下element.innerHTML
	                if (!!m.$content) {
	                    vmodel.setContent(m.$content, m.noScan, [vmodel].concat(findModel(m)).concat(vmodels))
	                }
	                if (!!m.$title) {
	                    vmodel.title = m.$title
	                }
	                return vmodel
	            }
	            // 将零散的模板(dialog header、dialog content、 dialog footer、 dialog wrapper)组合成完整的dialog
	            vm._renderView = function() {
	                var innerWrapper = null // 保存innerWraper元素节点
	                // 用户只能通过data-dialog-width配置width，不可以通过ms-css-width来配置，配置了也无效
	                element.setAttribute("ms-css-width", "width")
	                lastContent = avalon.parseHTML(_content).firstChild
	                _lastContent = element.innerHTML || vmodel.content
	                element.innerHTML = ""
	                lastContent.innerHTML = _lastContent
	                innerWrapper = avalon.parseHTML(_innerWrapper).firstChild
	                innerWrapper.innerHTML = _lastHeader
	                innerWrapper.appendChild(lastContent)
	                innerWrapper.appendChild(avalon.parseHTML(_lastFooter))
	                element.appendChild(innerWrapper)
	                if (!maskLayerExist) {
	                    document.body.appendChild(maskLayer)
	                    document.body.appendChild(maskLayerSimulate)
	                    maskLayerExist = true
	                }
	            }
	
	            vm.$init = function(continueScan) {
	                var container = vmodel.container,
	                    clientHeight = body.clientHeight,
	                    docBody = document.body,
	                    // container必须是dom tree中某个元素节点对象或者元素的id，默认将dialog添加到body元素
	                    elementParent = ((avalon.type(container) === "object" && container.nodeType === 1 && docBody.contains(container)) ? container : document.getElementById(container)) || docBody,
	                    defaults = avalon.ui.dialog.defaults
	                if (!defaults.zIndex) {
	                    defaults.zIndex = getMaxZIndex() //保存body直接子元素中最大的z-index值， 保证dialog在最上层显示
	                    vmodel.zIndex = defaults.zIndex
	                }
	
	                if (avalon(docBody).height() < clientHeight) {
	                    avalon(docBody).css("min-height", clientHeight)
	                }
	                if (vmodel.draggable) {
	                    $element.attr("ms-draggable", "")
	                    vmodel.draggable = {
	                        handle: function(e){
	                            var el = e.target
	                            do {
	                                if (el.className === "oni-dialog-header") {
	                                    return el
	                                }
	                                if (el.className === "oni-dialog") {
	                                    return
	                                }
	                            } while (el = el.parentNode)
	                        }
	                    }
	                }
	                vmodel.zIndex = vmodel.zIndex + vmodel.zIndexIncrementGlobal
	                vmodel.title = vmodel.title || "&nbsp;"
	                $element.addClass("oni-dialog")
	                element.setAttribute("ms-visible", "toggle")
	                element.setAttribute("ms-css-position", "position")
	                vm._renderView()
	                if (docBody.contains(maskLayerSimulate) && docBody == elementParent) {
	                    maskLayerSimulate.appendChild(element)
	                } else {
	                    elementParent.appendChild(element)
	                }
	                // 当窗口尺寸发生变化时重新调整dialog的位置，始终使其水平垂直居中
	                element.resizeCallback = avalon(window).bind("resize", throttle(resetCenter, 50, 100, [vmodel, element]))
	                element.scrollCallback = avalon(window).bind("scroll", throttle(resetCenter, 50, 100, [vmodel, element, true]))
	
	                avalon.scan(element, [vmodel].concat(vmodels))
	                if (continueScan) {
	                    continueScan()
	                } else {
	                    avalon.log("avalon请尽快升到1.3.7+")
	                    avalon.scan(element, [vmodel].concat(vmodels))
	                    if (typeof options.onInit === "function") {
	                        options.onInit.call(element, vmodel, options, vmodels)
	                    }
	                }
	            }
	
	            // 自动清理方法
	            vm.$remove = function() {
	                dialogNum--
	                element.innerHTML = ""
	                avalon.unbind(window, "resize", element.resizeCallback)
	                avalon.unbind(window, "scroll", element.scrollCallback)
	                if (!dialogNum) {
	                    maskLayer.parentNode.removeChild(maskLayer)
	                    maskLayer.parentNode.removeChild(maskLayerSimulate)
	                    maskLayerExist = false
	                }
	            }
	
	            // 打开dialog之后处理zIndex使dialog正常显示
	            vm.$watch("toggle", function(val) {
	                if (val) {
	                    vmodel._open()
	                } else {
	                    if (toggleClose === false) {
	                        toggleClose = true
	                    } else {
	                        vmodel._close()
	                    }
	                }
	            })
	
	            // 可以手动设置最大zIndex
	            vm.$watch("zIndex", function(val) {
	                if (vmodel.initChange) {
	                    vmodel.initChange = false
	                } else {
	                    vmodel._open(true)
	                }
	            })
	        })
	        return vmodel
	    }
	    widget.version = 1.0
	    widget.defaults = {
	        width: 480, //@config 设置dialog的width
	        title: "&nbsp;", //@config 设置弹窗的标题
	        draggable: false, //@config 设置dialog是否可拖动
	        type: "confirm", //@config 配置弹窗的类型，可以配置为alert来模拟浏览器
	        hasDraft:false,  //是否有新增的其他按钮   Modified By Zhangnan
	        content: "", //@config 配置dialog的content，默认取dialog的innerHTML作为dialog的content，如果innerHTML为空，再去取content配置项.需要注意的是：content只在初始化配置的起作用，之后需要通过setContent来动态的修改
	        /**
	         * @config {Function} 定义点击"确定"按钮后的回调操作
	         * @param event {Number} 事件对象
	         * @param vmodel {Object} 组件对应的Vmodel
	         * @returns {Boolean} 如果return false，dialog不会关闭，用于异步操作
	         */
	        onDraftClick:avalon.noop,   //新增的按钮的事件
	        onConfirm: avalon.noop, 
	        /**
	         * @config {Function} 定义显示dialog时的回调
	         * @param vmodel {Object} 组件对应的Vmodel
	         */
	        onOpen: avalon.noop, 
	        /**
	         * @config {Function} 定义点击"取消"按钮后的回调操作
	         * @param event {Object} 事件对象
	         * @param vmodel {Object} 组件对应的Vmodel
	         * @returns {Boolean} 如果return false，dialog不会关闭，用于异步操作
	         */
	        onCancel: avalon.noop, 
	        /**
	         * @config {Function} 定义点击"关闭"按钮后的回调操作
	         * @param event {Object} 事件对象
	         * @param vmodel {Object} 组件对应的Vmodel
	         */
	        onClose: avalon.noop, //点击右上角的“关闭”按钮的回调
	        //@config 动态修改dialog的title,也可通过dialogVM.title直接修改
	        setTitle: avalon.noop, 
	        setContent: avalon.noop, 
	        /**
	         * @config {Function} 重新渲染模板
	         * @param m {Object} 重新渲染dialog的配置对象，包括title、content、content中涉及的插值表达式，需要注意的是，title和content不是真正渲染的内容，所以不需要avalon进行扫描监控，定义的时候必须在其前面加上"$",否则组件不会渲染成想要的效果
	         */
	        setModel: avalon.noop, 
	        //@config配置dialog是否显示"取消"按钮，但是如果type为alert，不论showClose为true or false都不会显示"取消"按钮
	        showClose: true, 
	        toggle: false, //@config 通过此属性的决定dialog的显示或者隐藏状态
	        widgetElement: "", //@config 保存对绑定元素的引用
	        container: "body", //@config dialog元素的上下文父元素，container必须是dialog要appendTo的父元素的id或者元素dom对象
	        confirmName: "确定", //@config 配置dialog的"确定"按钮的显示文字
	        cancelName: "取消", //@config 配置dialog的"取消"按钮的显示文字
	        getTemplate: function(str, options) {
	            return str
	        },
	        /**
	         * @config {Function} 通过此方法配置dialog的footer
	         * @param tmp {String} dialog默认模板的footer
	         * @returns {String} 用户自定义的dialog的footer 
	         */
	        getFooter: function(tmp) {
	            return tmp
	        },
	        modal: true, //@config 是否显示遮罩
	        zIndex: 0, //@config 通过设置vmodel的zIndex来改变dialog的z-index,默认是body直接子元素中的最大z-index值，如果都没有设置就默认的为10
	        zIndexIncrementGlobal: 0 //@config 相对于zIndex的增量, 用于全局配置，如果只是作用于单个dialog那么zIndex的配置已足够，设置全局需要通过avalon.ui.dialog.defaults.zIndexIncrementGlobal = Number来设置
	    }
	    avalon(window).bind("keydown", function(e) {
	        var keyCode = e.which,
	            dialogShowLen = dialogShows.length;
	        if (keyCode === 27 && dialogShowLen) {
	            dialogShows[dialogShowLen - 1].toggle = false
	        }
	    })
	    // 获取重新渲染dialog的vmodel对象
	    function findModel(m) {
	        var model = m
	        if (model) { // 如果m为字符串参数，说明是要在已存在的vmodels中查找对应id的vmodel
	            if (avalon.type(model) === 'string') {
	                model = avalon.vmodels[model]
	            } 
	        } else { // 如果没有传递参数m，则返回空vmodel
	            model = avalon.define('dialogVM' + setTimeout("1"), function(vm) {
	            })
	        }
	        if (!model) {
	            throw new Error("您查找的"+model+"不存在")
	        }
	        // 如果传入的是avalon的vmodel格式的参数对象，直接返回，如果是普通的对象，将其转换为avalon的监控对象
	        if (avalon.isPlainObject(model) && !model.$id && !model.$accessors) {
	            model = avalon.define('dialogVM' + setTimeout("1"), function(vm) {
	                avalon.mix(vm, m)
	            })
	        }
	        return [].concat(model)
	    }
	
	    // resize、scroll等频繁触发页面回流的操作要进行函数节流
	    function throttle(fn, delay, mustRunDelay, args){
	        var timer = null
	        var t_start
	        return function(){
	            var context = this, t_curr = +new Date()
	            clearTimeout(timer)
	            if(!t_start){
	                t_start = t_curr
	            }
	            if(t_curr - t_start >= mustRunDelay){
	                fn.apply(context, args)
	                t_start = t_curr
	            }
	            else {
	                timer = setTimeout(function(){
	                    fn.apply(context, args)
	                }, delay)
	            }
	        }
	     }
	
	    // 使dialog始终出现在视窗中间
	    function resetCenter(vmodel, target, scroll) {
	        var clientWidth, clientHeight,
	            targetOffsetWidth, targetOffsetHeight,
	            $maskLayer = avalon(maskLayer),
	            $maskLayerSimulate = avalon(maskLayerSimulate),
	            $target = avalon(target),
	            scrollTop, scrollLeft,
	            documentElement,
	            top = 0,
	            left = 0
	
	
	        if (!vmodel.toggle) return
	
	        documentElement = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body
	        // clientWidth和clientHeight在现有浏览器都是兼容的(IE5),但在混杂模式下，得通过documentView属性提供宽度和高度
	        clientWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth: document.body.clientWidth
	        
	        clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight: document.body.clientHeight
	
	        scrollTop = document.body.scrollTop + document.documentElement.scrollTop
	        scrollLeft = documentElement.scrollLeft
	
	        targetOffsetWidth = target.offsetWidth 
	        targetOffsetHeight = target.offsetHeight
	
	        if (targetOffsetHeight < clientHeight) {
	            top = (clientHeight - targetOffsetHeight) / 2
	        } else {
	            top = 0
	        }
	        if (targetOffsetWidth < clientWidth) {
	            left = (clientWidth - targetOffsetWidth) / 2 + scrollLeft
	        } else {
	            left = 0
	        }
	        if (targetOffsetHeight < clientHeight && targetOffsetWidth < clientWidth) {
	            if (!isIE6) {
	                vmodel.position = "fixed"
	            }
	        } else {
	            if (!isIE6) {
	                vmodel.position = "absolute"    
	            }
	        }
	        if (scroll && vmodel.position == "fixed") return
	        if (vmodel.position === "absolute") {
	            if (dialogShows.length > 1) {
	                for (var i = 0; i < dialogShows.length -1; i++) {
	                    dialogShows[i].widgetElement.style.display = "none"
	                }
	            }
	            $maskLayer.css({height: clientHeight, width: clientWidth, top: scrollTop, position: "absolute"})
	            $maskLayerSimulate.css({height: clientHeight, width: clientWidth, top: scrollTop, overflow: "auto", position: "absolute"})
	        } else {
	            if (dialogShows.length > 1) {
	                for (var i = 0; i < dialogShows.length -1; i++) {
	                    dialogShows[i].widgetElement.style.display = "block"
	                }
	            }
	            $maskLayer.css({height: "auto", width: "auto", top: 0, position: "fixed"})
	            $maskLayerSimulate.css({height: "auto", width: "auto", top: 0, position: "static"})
	        }
	        $target.css({left: left, top: top})
	    }
	   
	    // 获取body子元素最大的z-index
	    function getMaxZIndex() {
	        var children = document.body.children,
	            maxIndex = 10, //当body子元素都未设置zIndex时，默认取10
	            zIndex;
	        for (var i = 0, el; el = children[i++];) {
	            if (el.nodeType === 1) {
	                if (el === maskLayer) continue
	                zIndex = ~~avalon(el).css("z-index")
	                if (zIndex) {
	                    maxIndex = Math.max(maxIndex, zIndex)
	                }
	            }
	        }
	        return maxIndex + 1
	    }
	    // IE6下创建iframe遮住不能被遮罩层遮住的select
	    function createIframe() {
	        var iframe = document.createElement('<iframe src="javascript:\'\'" style="position:absolute;top:0;left:0;bottom:0;margin:0;padding:0;right:0;zoom:1;width:'+maskLayer.style.width+';height:'+maskLayer.style.height+';z-index:'+(maskLayer.style.zIndex-1)+';"></iframe>')
	        document.body.appendChild(iframe)
	        return iframe
	    }
	
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [dialog功能全览](avalon.dialog.ex.html)
	 [默认配置的dialog组件](avalon.dialog.ex1.html)
	 [拥有回调操作的dialog](avalon.dialog.ex2.html)
	 [不显示关闭按钮的dialog](avalon.dialog.ex3.html)
	 [嵌套dialog](avalon.dialog.ex4.html)
	 [模拟alert](avalon.dialog.ex5.html)
	 [模拟alert，showClose配置无效](avalon.dialog.ex6.html)
	 [自定义dialog的width](avalon.dialog.ex7.html)
	 [通过container配置项设置dialog元素的上下文父元素](avalon.dialog.ex8.html)
	 [修改dialog的title、content、或者重新渲染dialog](avalon.dialog.ex9.html)
	 [通过加载avalon.draggable实现拖拽](avalon.dialog.ex10.html)
	 [改变dialog的z-index](avalon.dialog.ex11.html)
	 */

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div class=\"oni-dialog-layout\"></div>\nMS_OPTION_WIDGET\n<div ms-widget=\"dialog,MS_OPTION_ID,MS_OPTION_OPTS\" ms-css-position=\"position\">MS_OPTION_DIALOG_CONTENT</div>\nMS_OPTION_INNERWRAPPER\n<div class=\"oni-dialog-inner\"></div>\nMS_OPTION_HEADER\n<div class=\"oni-dialog-header\">\n    <div class=\"oni-dialog-close\" ms-click=\"_close\" ms-if=\"showClose\">\n        <i class=\"oni-icon oni-icon-times\">&#xf003;</i>\n    </div>\n    <div class=\"oni-dialog-title\">{{ title|html }}</div>\n</div>\nMS_OPTION_CONTENT\n<div class=\"oni-dialog-content\"></div>\nMS_OPTION_FOOTER\n<div class=\"oni-dialog-footer oni-helper-clearfix\">\n    <div class=\"oni-dialog-btns\">\n        <button ms-widget=\"button\" ms-if=\"hasDraft\" data-button-color=\"success\" ms-hover=\"oni-state-hover\" ms-click=\"_draftClick\">{{draftName}}</button>\n        <button ms-widget=\"button\"  data-button-color=\"success\" ms-hover=\"oni-state-hover\" ms-click=\"_confirm\">{{confirmName}}</button>\n        <button ms-widget=\"button\" ms-if=\"type =='confirm'\" ms-click=\"_cancel\">{{cancelName}}</button>\n    </div>\n</div>\nMS_OPTION_LAYOUT_SIMULATE\n<div></div>"

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// avalon 1.3.6
	/**
	 * 
	 * @cnName 按钮组件
	 * @enName button
	 * @introduce
	 * <p>按钮组件提供丰富的样式、形式选择，除与bootstrap可用的button样式保持一致外，支持small、default、big、large四种尺寸，同时支持图标button，可以是仅有图标的button，图标在左边的button、图标在右边的button、两边都有图标的button，当然也支持图标组，有水平图标组、垂直图标组两种形式</p>
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(24), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    var baseClasses = ["oni-button", "oni-widget", "oni-state-default"],
	        typeClasses = "oni-button-icons-only oni-button-icon-only oni-button-text-icons oni-button-text-icon-primary oni-button-text-icon-secondary oni-button-text-only"
	
	    var widget = avalon.ui.button = function(element, data, vmodels) {
	        var options = data.buttonOptions,
	            btnModel,
	            $element = avalon(element)
	            
	        function stop(event) {
	            if (options.disabled) {
	                event.preventDefault()
	                event.stopImmediatePropagation()
	            }
	        }
	        btnModel = {
	            $init: function() {
	                var data = options.data,
	                    elementType = "",
	                    label = options.label,
	                    buttonWidth = 0,
	                    elementTagName = element.tagName.toLowerCase()
	
	                if (options.groups && data.length > 1) {
	                    var buttons = ""
	                    
	                    data.forEach(function(button, index) {
	                        var buttonStr = "<span ms-widget='button'"
	                        if (button.type !== void 0) {
	                            buttonStr += " data-button-type='" + button.type + "'"
	                        }
	                        if (button.iconPosition !== void 0) {
	                            buttonStr += " data-button-icon-position='" + button.iconPosition + "'"
	                        }
	                        if (button.icon !== void 0) {
	                            buttonStr += " data-button-icon='" + button.icon + "'"
	                        }
	                        if (button.color !== void 0) {
	                            buttonStr += " data-button-color='" + button.color + "'"
	                        }
	                        if (button.size !== void 0) {
	                            buttonStr += " data-button-size='" + button.size + "'"
	                        }
	                        if (button.disabled !== void 0) {
	                            buttonStr += " data-button-disabled='" + button.disabled + "'"
	                        }
	                        if (button.label !== void 0) {
	                            buttonStr += " data-button-label='" + button.label + "'"
	                        }
	                        buttonStr += ">" + (button.text || "") + "</span>"
	                        buttons += buttonStr
	                    })
	                    element.innerHTML = buttons
	                    element.setAttribute("ms-widget", "buttonset")
	                    if (options.direction == "vertical") {
	                        element.setAttribute("data-buttonset-direction", "vertical")
	                    }
	                    if (!options.corner) {
	                        element.setAttribute("data-buttonset-corner", options.corner)
	                    }
	                    if (options.width) {
	                        element.setAttribute("data-buttonset-width", parseInt(options.width))
	                    }
	                    avalon.scan(element, vmodels)
	                    return
	                }
	                if (typeof options.disabled !== "boolean") {
	                    element.disabled = !!options.disabled
	                } else {
	                    element.disabled = options.disabled
	                }
	
	                if (elementTagName === "input") {
	                    elementType = "input"
	                }
	                if (buttonWidth = parseInt(options.width)) {
	                    element.style.width = buttonWidth + "px"
	                }
	                $element.bind("mousedown", function(event) {
	                    stop(event)
	                    $element.addClass("oni-state-active")
	                })
	                $element.bind("mouseup", function(event) {
	                    stop(event)
	                    $element.removeClass("oni-state-active")
	                })
	                $element.bind("blur", function() {
	                    $element.removeClass("oni-state-active")
	                    $element.removeClass("oni-state-focus");
	                })
	                $element.bind("focus", function() {
	                    $element.addClass("oni-state-focus");
	                })
	                if (!options.label) {
	                    label = elementType === "input" ? element.value : element.innerHTML
	                }
	                options.elementType = elementType
	                options.label = label
	                createButton(element, options)
	                avalon.scan(element, vmodels)
	            }
	        }
	        btnModel.$init()
	    }
	    avalon.ui.buttonset = function(element, data, vmodels) {
	        var options = data.buttonsetOptions,
	            buttonsetCorner = options.corner,
	            direction = options.direction,
	            $element = avalon(element)
	
	        buttonsetCorner = buttonsetCorner !== void 0 ? buttonsetCorner : true
	        var btnGroup = {
	            $init: function() {
	                var elementClass = []
	                elementClass.push("oni-buttonset"),
	                firstButtonClass = "oni-corner-left",
	                lastButtonClass = "oni-corner-right",
	                children = element.childNodes, 
	                buttons = [] // 收集button组元素
	                buttonWidth = options.width,
	                firstElement = true
	
	                for (var i = 0, el; el = children[i++]; ) {
	                    if (el.nodeType === 1) {
	                        el.setAttribute("data-button-corner", "false")
	                        buttons.push(el)
	                        if (firstElement) {
	                            avalon(el).addClass("oni-button-first")
	                            firstElement = false
	                        }
	                    }
	                }
	                var n = buttons.length
	                if (n && buttonsetCorner) {
	                    if (direction === "vertical") {
	                        firstButtonClass = "oni-corner-top"
	                        lastButtonClass = "oni-corner-bottom"
	                    }
	                    avalon(buttons[0]).addClass(firstButtonClass)
	                    avalon(buttons[n - 1]).addClass(lastButtonClass)
	                }
	                if (direction === "vertical") {
	                    elementClass.push("oni-buttonset-vertical")
	                }
	                $element.addClass(elementClass.join(" "))
	                data.buttons = buttons
	                avalon.scan(element, vmodels)
	                if (buttonWidth = parseInt(buttonWidth)) {
	                    (function(buttonWidth) {
	                        var btns = [].concat(buttons)
	                        setTimeout(function() {
	                            for (var i = 0; button = btns[i++];) {
	                                var $button = avalon(button),
	                                    buttonName = button.tagName.toLowerCase()
	                                if (buttonName === "input" || buttonName === "button") {
	                                    button.style.width = buttonWidth + "px"
	                                } else {
	                                    button.style.width = (buttonWidth - parseInt($button.css("border-left-width")) - parseInt($button.css("border-right-width")) - parseInt($button.css("padding-left")) * 2) + "px"
	                                }
	                            }
	                        }, 10)
	                    })(buttonWidth)
	                    return 
	                }
	
	                (function(buttons) {
	                    var interval = 0,
	                        maxButtonWidth = 0
	                    buttons = buttons.concat()
	                    interval = setInterval(function() {
	                        var buttonWidth = 0,
	                            innerWidth = 0,
	                            $button
	                        for (var i = 0, button; button = buttons[i++];) {
	                            buttonWidth = Math.max(buttonWidth, avalon(button).outerWidth())
	                        }
	                        if (buttonWidth === maxButtonWidth) {
	                            maxButtonWidth += 1
	                            for (var i = 0, button; button = buttons[i++];) {
	                                var buttonName = button.tagName.toLowerCase(),
	                                    $button = avalon(button)
	
	                                if (buttonName === "input" || buttonName === "button") {
	                                    button.style.width = maxButtonWidth + "px"
	                                    
	                                } else {
	                                    button.style.width = (maxButtonWidth - parseInt($button.css("border-left-width")) - parseInt($button.css("border-right-width")) - parseInt($button.css("padding-left")) * 2) + "px"
	                                }
	                            }
	                            clearInterval(interval)
	                            return 
	                        }
	                        maxButtonWidth = buttonWidth
	                    }, 100)
	                })(buttons)
	            }
	        }
	        btnGroup.$init()
	    }
	    function createButton (element, options) {
	        var buttonText, 
	            buttonClasses = baseClasses.concat(),
	            iconText = false,
	            icons = options.icon || "",
	            corner = options.corner
	
	        options.label = options.label || ""
	        if (corner) {
	            buttonClasses.push("oni-corner-all")    
	            if (corner = parseInt(corner)) {
	                element.style.borderRadius = corner + "px"
	            }        
	        }
	        if (options.size) {
	            buttonClasses.push("oni-button-" + options.size)
	        }
	        if (options.color) {
	            buttonClasses.push("oni-button-" + options.color)
	        }
	        if (options.disabled) {
	            buttonClasses.push("oni-state-disabled")
	        }
	        avalon(element).addClass(buttonClasses.join(" "))
	        if (options.elementType === "input" && options.label) {
	            avalon(element).val(options.label)
	            
	            return
	        }
	        switch (options.type) {
	            case "text":
	                buttonText = "<span class='oni-button-text'>" + options.label + "</span>"
	                break;
	            case "labeledIcon": 
	                iconText = true
	            case "icon":
	                switch (options.iconPosition) {
	                    case "left": 
	                        buttonText = "<i class='oni-icon oni-icon-left'>" + icons.replace(/\\/g, "") + "</i>" + "<span class='oni-button-text oni-button-text-right" + (!iconText ? " oni-button-text-hidden" : "") + "'>" + options.label + "</span>"
	                    break;
	                    case "right":
	                        buttonText = "<span class='oni-button-text oni-button-text-left" + (!iconText ? " oni-button-text-hidden" : "") + "'>" + options.label + "</span>" + "<i class='oni-icon oni-icon-right'>" + icons.replace(/\\/g, "") + "</i>"
	                    break;
	                    case "left-right":
	                        var iconArr = icons && icons.split("-") || ["", ""],
	                            iconLeft = iconArr[0],
	                            iconRight = iconArr[1]
	                        buttonText = "<i class='oni-icon oni-icon-left'>" + iconLeft.replace(/\\/g, "") + "&nbsp;</i>" + "<span class='oni-button-text oni-button-text-middle" + (!iconText ? " oni-button-text-hidden" : "") + "'>" + options.label + "</span>" + "<i class='oni-icon oni-icon-right'>&nbsp;" + iconRight.replace(/\\/g, "") + "</i>"
	                    break;
	                }
	            break;
	        }
	        element.innerHTML = buttonText
	    }
	    widget.version = 1.0
	    widget.defaults = {
	        groups: false, //@config 是否是button组
	        direction: "", //@config button组的方向，有水平button组和垂直button组，默认是水平，可以设置为"vertical"
	        /**
	         * @config <p>data属性配置button组的内容，每一个数组元素都是一个包含单个按钮基本信息的对象。</p>
	         * <p>注意，请只在button组由至少两个按钮组成时，才配置button组件为button组，也就是设置groups为true时，且配置相应的data</p>
	         * <p>当然还有一种直接列出button组内容的方式，不过这种情况需要指定组件名为buttonset，请看<a href="./avalon.button.ex4.html">demo 4</a>a></p>
	         * <pre>
	            data: [{
	                type: "labeledIcon",
	                iconPosition: "right",
	                icon: "\&\#xf04c;",
	                size: "large",
	                color: "success",
	                text: "暂停"
	            }, {
	                type: "labeledIcon",
	                iconPosition: "right",
	                icon: "\&\#xf04b;",
	                size: "large",
	                color: "success",
	                text: "播放"
	            }, {
	                type: "labeledIcon",
	                iconPosition: "right",
	                icon: "\&\#xf074;",
	                size: "large",
	                color: "success",
	                text: "拖曳"
	            }]                                
	         </pre>
	         */
	        data: [], 
	        type: "text", //@config 配置button的展示形式，仅文字展示，还是仅图标展示，或者文字加图标的展示方式，三种方式分别对应："text"、"icon"、"labeledIcon"
	        iconPosition: "left", //@config 当type为icon或者labeledIcon时，定义icon在哪边，默认在text的左边，也可以配置为右边("right"),或者两边都有("left-right")
	        icon: "", //@config  当type为icon或者labeledIcon时，定义展示icon的内容，本组件的icon是使用web font实现，当iconPosition为"left"或者"right"时，将icon的码赋给icon，当iconPosition为"left-right",将left icon与right icon的码以"-"分隔，比如data-button-icon="\&\#xf001;-\&\#xf06b;"
	        size: "", //@config button有四个尺寸"small", "default", "big", "large"
	        color: "", //@config 定义button的颜色，默认提供了"primary", "warning", "danger", "success", "info", "inverse", "default" 7中颜色，与bootstrap保持一致
	        corner: true, //@config 设置是否显示圆角，可以布尔值或者Number类型，布尔只是简单的说明显示或者不显示，Number则在表示显示与否的同时，也是在指定圆角的大小，圆角默认是2px。
	        style: "", // 用于定义button的展现形式，比如"flat" "glow" "rounded" "3D" "pill" 本组件，仅提供flat的实现
	        disabled: false, //@config 配置button的禁用状态
	        label: "", //@config 设置button的显示文字，label的优先级高于元素的innerHTML
	        width: "" //@config 设置button的宽度，注意button的盒模型设为了border-box
	    }
	    return avalon
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @links
	 [设置button的大小、宽度，展示不同类型的button](avalon.button.ex1.html)
	 [设置button的width和color](avalon.button.ex2.html)
	 [通过ms-widget="button, $, buttonConfig"的方式设置button组](avalon.button.ex3.html)
	 [通过ms-widget="buttonset"的方式设置button](avalon.button.ex4.html)
	 */


/***/ },
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @cnName 验证框架
	 * @enName validation
	 * @introduce
	 *  <p>基于avalon ms-duplex2.0的强大验证框架，大家可以直接在avalon.duplexHooks添加验证规则，
	 *  也可以在配置对象上的validationHooks中添加验证规则。</p>
	 *  <p>验证规则如下定义:</p>
	 *  ```javascript
	 *   alpha_numeric: { //这是名字，不能存在-，因为它是这样使用的ms-duplex-int-alpha_numeric="prop"
	 message: '必须为字母或数字',  //这是错误提示，可以使用{{expr}}插值表达式，但这插值功能比较弱，
	 //里面只能是某个单词，两边不能有空格
	 get: function(value, data, next) {//这里的传参是固定的，next为回调
	 next(/^[a-z0-9]+$/i.test(value))//这里是规则
	 //如果message有{{expr}}插值表达式，需要用data.data.expr = aaa设置参数，
	 //aaa可以通过data.element.getAttribute()得到
	 return value //原样返回value
	 }
	 },
	 *  ```
	 *  <p>在validationHooks中自定验证规则，每个都必须写<b style="color:red">message</b>
	 *  (<span style="color:lightgreen">message不能为空字符串</span>)与<b style="color:red">get</b>方法。</p>
	 *  <p>验证规则不惧怕任何形式的异步，只要你决定进行验证时，执行next方法就行。next 需要传入布尔。</p>
	 *  ```javascript
	 *      async: {
	 message : "异步验证" , 
	 get : function( value , data, next ){
	 setTimeout(function(){
	 next(true)
	 },3000)
	 return value
	 }
	 },
	 *  ```
	 * <p> 另一个例子:</p>
	 *  ```javascript
	 beijing: {
	 message : "当前位置必须是在{{city}}" , 
	 get : function( value ,data, next ){
	 $.ajax({
	 url : "http://ws.qunar.com/ips.jcp" , 
	 dataType : "jsonp" , 
	 jsonpCallback : "callback" , 
	 success : function( data, textStatus, jqXHR  ){
	 data.data.city = "北京"
	 next( data.city == value )
	 }
	 })
	 return value
	 }
	 }
	 *  ```
	 *  <p>注意，本组件是基于<code>avalon1.3.7</code>开发，如果是很旧的版本，可以使用avalon.validation.old.js，它一直兼容到avalon1.2.0。</p>
	 *  <p>注意，本组件只能绑定在<code>form元素</code>上, &lt;form ms-widget="validation"&gt;&lt;/&gt</p>
	 *  <p>验证框架提供了各式各样的回调，满足你最挑剔的需求：</p>
	 *  ```javascript
	 *  onSuccess, onError, onComplete, onValidateAll, onReset, onResetAll
	 *  ```
	 * <p>其中，前面四个是一个系列，它们都有1个参数，是一个对象数组，里面一些<code>验证规则对象</code>（如果成功，数组为空）； onReset是在元素获取焦点做重置工作的，如清理类名，
	 * 清空value值，onResetAll是用于重置整个表单，它会在组件执行它辖下的所有元素的onReset回调后再执行。</p>
	 * <p><b>验证规则对象</b>的结构如下：</p>
	 * ```javascript
	 * {
	 *   element: element, //添加了ms-duplex绑定的元素节点，它应该位于form[ms-widget="validation"]这个元素下
	 *   data: {city: "北京"}，
	 *   message: '当前位置必须是在{{city}}',
	 *   validateRule: "beijing",
	 *   getMessage: function(){}//用户调用到方法即可以拿到完整的错误消息——“当前位置必须是在北京”
	 * }
	 * ```
	 * <p>如果用户指定了<code>norequired</code>验证规则，如果input为空, 那么就会跳过之后的所有验证; 在定义拦截器时,务必将它放在最前面,
	 * 如ms-duplex-norequired-int-gt='xxx'
	 * </p>
	 */
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(avalon) {
	    if (!avalon.duplexHooks) {
	        throw new Error("你的版本少于avalon1.3.7，不支持ms-duplex2.0，请使用avalon.validation.old.js")
	    }
	    //==========================avalon.validation的专有逻辑========================
	
	    function idCard(val) {
	        if ((/^\d{15}$/).test(val)) {
	            return true;
	        } else if ((/^\d{17}[0-9xX]$/).test(val)) {
	            var vs = "1,0,x,9,8,7,6,5,4,3,2".split(","),
	                ps = "7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2".split(","),
	                ss = val.toLowerCase().split(""),
	                r = 0;
	            for (var i = 0; i < 17; i++) {
	                r += ps[i] * ss[i];
	            }
	            return (vs[r % 11] == ss[17]);
	        }
	    }
	    // isCorrectDate("2015-2-21") true
	    // isCorrectDate("2015-2-31") false
	
	    function isCorrectDate(value) {
	        if (typeof value === "string" && value) { //是字符串但不能是空字符
	            var arr = value.split("-") //可以被-切成3份，并且第1个是4个字符
	            if (arr.length === 3 && arr[0].length === 4) {
	                var year = ~~arr[0] //全部转换为非负整数
	                var month = ~~arr[1] - 1
	                var date = ~~arr[2]
	                var d = new Date(year, month, date)
	                return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
	            }
	        }
	        return false
	    }
	
	    //  var remail = /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/
	    var remail = /^([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+@([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+\.[A-Z]{2,3}$/i
	    var ripv4 = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i
	    var ripv6 = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
	    //规则取自淘宝注册登录模块
	    var phoneOne = {
	        //中国移动
	        cm: /^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,
	        //中国联通
	        cu: /^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
	        //中国电信
	        ce: /^(?:0?1)(?:33|53|8[079])\d{8}$/,
	        //中国大陆
	        cn: /^(?:0?1)[3458]\d{9}$/
	        //中国香港
	        //   hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
	        //澳门
	        // macao: /^6\d{7}$/,
	        //台湾
	        //  tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$//*,
	        //韩国
	        //  kr:/^(?:0?[17])(?:\d{9}|\d{8})$/,
	        //日本
	        // jp:/^(?:0?[789])(?:\d{9}|\d{8})$/*/
	    }
	    /*
	     * http://login.sdo.com/sdo/PRes/4in1_2/js/login.js
	     * function isPhone(val){
	     var gvPhoneRegExpress=new Array();
	     gvPhoneRegExpress.push(/^14[57]\d{8}$/);
	     gvPhoneRegExpress.push(/^15[012356789]\d{8}$/);
	     gvPhoneRegExpress.push(/^13[0-9]\d{8}$/);
	     gvPhoneRegExpress.push(/^18[012456789]\d{8}$/);
	     var lvCellphoneIsOk=false;
	     for (var i=0;i<gvPhoneRegExpress.length;i++){
	     if(gvPhoneRegExpress[i].test(val)){
	     lvCellphoneIsOk=true;
	     break;
	     }
	     }
	     return lvCellphoneIsOk;
	     }
	     其他手机号码正则
	     /^(13\d\d|15[012356789]\d|18[012356789]\d|14[57]\d|17(0[059]|[78]\d))\d{7}$/
	     /^(?:(?:13|18|15)[0-9]{9}|(?:147|170|176|177|178|199|196)[0-9]{8})$/; 
	     
	     */
	
	    avalon.mix(avalon.duplexHooks, {
	        trim: {
	            get: function(value, data) {
	                if (data.element.type !== "password") {
	                    value = String(value || "").trim()
	                }
	                return value
	            }
	        },
	        required: {
	            message: '该项为必填项',
	            get: function(value, data, next) {
	                next(value !== "")
	                return value
	            }
	        },
	        norequired: {
	            message: '非必填项可以不填',
	            get: function(value, data, next) {
	                next(true)
	                return value
	            }
	        },
	        "int": {
	            message: "必须填入整数",
	            get: function(value, data, next) {
	                next(/^\-?\d+$/.test(value))
	                return value
	            }
	        },
	        phone: {
	            message: "输入的手机号不是正确的手机号码",
	            get: function(value, data, next) {
	                var ok = false
	                value = String(value || "").trim()
	                for (var i in phoneOne) {
	                    if (phoneOne[i].test(value)) {
	                        ok = true;
	                        break
	                    }
	                }
	                next(ok)
	                return value
	            }
	        },
	        decimal: {
	            message: '必须是金额,保留到小数点后两位',
	            get: function(value, data, next) {
	                next(/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value))
	                return value
	            }
	        },
	        alpha: {
	            message: '必须是字母',
	            get: function(value, data, next) {
	                next(/^[a-z]+$/i.test(value))
	                return value
	            }
	        },
	        alpha_numeric: {
	            message: '必须为字母或数字',
	            get: function(value, data, next) {
	                next(/^[a-z0-9]+$/i.test(value))
	                return value
	            }
	        },
	      tele:{
	        message: '请输入正确格式的电话号码',
	        get: function(value, data, next) {
	          next(/^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^\(0\d{2}\)-?\d{8}$)|(^\(0\d{3}\)-?\d{7}$)$/.test(value))
	          return value
	        }
	      },
	        alpha_dash: {
	            message: '必须为字母或数字及下划线等特殊字符',
	            validate: function(value, data, next) {
	                next(/^[a-z0-9_\-]+$/i.test(value))
	                return value
	            }
	        },
	        chs: {
	            message: '必须是中文字符',
	            get: function(value, data, next) {
	                next(/^[\u4e00-\u9fa5]+$/.test(value))
	                return value
	            }
	        },
	        chs_numeric: {
	            message: '必须是中文字符或数字及下划线等特殊字符',
	            get: function(value, data, next) {
	                next(/^[\\u4E00-\\u9FFF0-9_\-]+$/i.test(value))
	                return value
	            }
	        },
	        qq: {
	            message: "腾讯QQ号从10000开始",
	            get: function(value, data, next) {
	                next(/^[1-9]\d{4,10}$/.test(value))
	                return value
	            }
	        },
	        id: {
	            message: "输入的身份证格式不正确",
	            get: function(value, data, next) {
	                next(idCard(value))
	                return value
	            }
	        },
	        ipv4: {
	            message: "ip地址不正确",
	            get: function(value, data, next) {
	                next(ripv4.test(value))
	                return value
	            }
	        },
	        ipv6: {
	            message: "ip地址不正确",
	            get: function(value, data, next) {
	                next(ripv6.test(value))
	                return value
	            }
	        },
	        email: {
	            message: "邮件地址错误",
	            get: function(value, data, next) {
	                next(remail.test(value))
	                return value
	            }
	        },
	      paypsd:{
	        message: "必须为六位数字",
	        get: function(value, data, next) {
	          next(/^[0-9]{6}$/.test(value))
	          return value
	        }
	      },
	        url: {
	            message: "URL格式错误",
	            get: function(value, data, next) {
	                next(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value))
	                return value
	            }
	        },
	        repeat: {
	            message: "两次密码输入不一致",
	            get: function(value, data, next) {
	                var id = data.element.getAttribute("data-duplex-repeat") || ""
	                var other = avalon(document.getElementById(id)).val() || ""
	                next(value === other)
	                return value
	            }
	        },
	        date: {
	            message: '必须符合日期格式 YYYY-MM-DD',
	            get: function(value, data, next) {
	                next(isCorrectDate(value))
	                return value
	            }
	        },
	        passport: {
	            message: '护照格式错误或过长',
	            get: function(value, data, next) {
	                next(/^[a-zA-Z0-9]{4,20}$/i.test(value))
	                return value
	            }
	        },
	        minlength: {
	            message: '最少输入{{min}}个字',
	            get: function(value, data, next) {
	                var elem = data.element
	                var a = parseInt(elem.getAttribute("minlength"), 10)
	                if (!isFinite(a)) {
	                    a = parseInt(elem.getAttribute("data-duplex-minlength"), 10)
	                }
	                var num = data.data.min = a
	                next(value.length >= num)
	                return value
	            }
	        },
	        maxlength: {
	            message: '最多输入{{max}}个字',
	            get: function(value, data, next) {
	                var elem = data.element
	                var a = parseInt(elem.getAttribute("maxlength"), 10)
	                if (!isFinite(a)) {
	                    a = parseInt(elem.getAttribute("data-duplex-maxlength"), 10)
	                }
	                var num = data.data.max = a
	                next(value.length <= num)
	                return value
	            }
	        },
	        gt: {
	            message: '必须大于{{max}}',
	            get: function(value, data, next) {
	                var elem = data.element
	                var a = parseInt(elem.getAttribute("max"), 10)
	                if (!isFinite(a)) {
	                    a = parseInt(elem.getAttribute("data-duplex-gt"), 10)
	                }
	                var num = data.data.max = a
	                next(parseFloat(value) > num)
	                return value
	            }
	        },
	        lt: {
	            message: '必须小于{{min}}',
	            get: function(value, data, next) {
	                var elem = data.element
	                var a = parseInt(elem.getAttribute("min"), 10)
	                if (!isFinite(a)) {
	                    a = parseInt(elem.getAttribute("data-duplex-lt"), 10)
	                }
	                var num = data.data.min = a
	                next(parseFloat(value) < num)
	                return value
	            }
	        },
	        //contain
	        eq: {
	            message: '必须等于{{eq}}',
	            get: function(value, data, next) {
	                var elem = data.element
	                var a = parseInt(elem.getAttribute("data-duplex-eq"), 10)
	                var num = data.data.eq = a
	                next(parseFloat(value) == num)
	                return value
	            }
	        },
	        contains: {
	            message: "必须包含{{array}}中的一个",
	            get: function(val, data, next) {
	                var vmValue = [].concat(val).map(String)
	                var domValue = (data.element.getAttribute("data-duplex-contains") || "").split(",")
	                data.data.array = domValue
	                var has = false
	                for (var i = 0, n = vmValue.length; i < n; i++) {
	                    var v = vmValue[i]
	                    if (domValue.indexOf(v) >= 0) {
	                        has = true
	                        break
	                    }
	                }
	                next(has)
	                return val
	            }
	        },
	        contain: {
	            message: "必须包含{{array}}",
	            get: function(val, data, next) {
	                var vmValue = [].concat(val).map(String)
	                var domValue = (data.element.getAttribute("data-duplex-contain") || "").split(",")
	                data.data.array = domValue.join('与')
	                if (!vmValue.length) {
	                    var has = false
	                } else {
	                    has = true
	                    for (var i = 0, n = domValue.length; i < n; i++) {
	                        var v = domValue[i]
	                        if (vmValue.indexOf(v) === -1) {
	                            has = false
	                            break
	                        }
	                    }
	                }
	                next(has)
	                return val
	            }
	        },
	        pattern: {
	            message: '必须匹配/{{pattern}}/这样的格式',
	            get: function(value, data, next) {
	                var elem = data.element
	                var h5pattern = elem.getAttribute("pattern")
	                var mspattern = elem.getAttribute("data-duplex-pattern")
	                var pattern = data.data.pattern = h5pattern || mspattern
	                var re = new RegExp('^(?:' + pattern + ')$')
	                next(re.test(value))
	                return value
	            }
	        }
	    })
	    //<input type="number" max=x min=y step=z/> <input type="range" max=x min=y step=z/>
	    //
	
	        function fixEvent(event) {
	            if (event.target) {
	                return event
	            }
	            var ret = {}
	            for (var i in event) {
	                ret[i] = event[i]
	            }
	            var target = ret.target = event.srcElement
	            if (event.type.indexOf("key") === 0) {
	                ret.which = event.charCode != null ? event.charCode : event.keyCode
	            } else if (/mouse|click/.test(event.type)) {
	                var doc = target.ownerDocument || document
	                var box = doc.compatMode === "BackCompat" ? doc.body : doc.documentElement
	                ret.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
	                ret.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
	                ret.wheelDeltaY = ret.wheelDelta
	                ret.wheelDeltaX = 0
	            }
	            ret.timeStamp = new Date - 0
	            ret.originalEvent = event
	            ret.preventDefault = function() { //阻止默认行为
	                event.returnValue = false
	            }
	            ret.stopPropagation = function() { //阻止事件在DOM树中的传播
	                event.cancelBubble = true
	            }
	            return ret
	        }
	    var widget = avalon.ui.validation = function(element, data, vmodels) {
	        var options = data.validationOptions
	        var onSubmitCallback
	        var vmodel = avalon.define(data.validationId, function(vm) {
	            avalon.mix(vm, options)
	            vm.$skipArray = ["widgetElement", "data", "validationHooks", "validateInKeyup", "validateAllInSubmit", "resetInBlur"]
	            vm.widgetElement = element
	            vm.data = []
	            /**
	             * @interface 为元素绑定submit事件，阻止默认行为
	             */
	            vm.$init = function() {
	                element.setAttribute("novalidate", "novalidate");
	                avalon.scan(element, [vmodel].concat(vmodels))
	                if (vm.validateAllInSubmit) {
	                    onSubmitCallback = avalon.bind(element, "submit", function(e) {
	                        e.preventDefault()
	                        vm.validateAll(vm.onValidateAll)
	                    })
	                }
	                if (typeof options.onInit === "function") { //vmodels是不包括vmodel的
	                    options.onInit.call(element, vmodel, options, vmodels)
	                }
	            }
	            /**
	             * @interface 销毁组件，移除相关回调
	             */
	            vm.$destory = function() {
	                vm.data = []
	                onSubmitCallback && avalon.unbind(element, "submit", onSubmitCallback)
	                element.textContent = element.innerHTML = ""
	            }
	
	            /**
	             * @interface 验证当前元素下的所有非disabled元素
	             * @param callback {Null|Function} 最后执行的回调，如果用户没传就使用vm.onValidateAll
	             */
	
	            vm.validateAll = function(callback) {
	                var fn = typeof callback === "function" ? callback : vm.onValidateAll
	                var promise = vm.data.filter(function(data) {
	                    var el = data.element
	                    return el && !el.disabled && vmodel.widgetElement.contains(el)
	                }).map(function(data) {
	                    return vm.validate(data, true)
	                })
	                Promise.all(promise).then(function(array) {
	                    var reasons = []
	                    for (var i = 0, el; el = array[i++];) {
	                        reasons = reasons.concat(el)
	                    }
	                    if (vm.deduplicateInValidateAll) {
	                        var uniq = {}
	                        reasons = reasons.filter(function(data) {
	                            var el = data.element
	                            var id = el.getAttribute("data-validation-id")
	                            if (!id) {
	                                id = setTimeout("1")
	                                el.setAttribute("data-validation-id", id)
	                            }
	                            if (uniq[id]) {
	                                return false
	                            } else {
	                                uniq[id] = true
	                                return true
	                            }
	                        })
	                    }
	                    fn.call(vm.widgetElement, reasons) //这里只放置未通过验证的组件
	                })
	            }
	
	            /**
	             * @interface 重置当前表单元素
	             * @param callback {Null|Function} 最后执行的回调，如果用户没传就使用vm.onResetAll
	             */
	            vm.resetAll = function(callback) {
	                vm.data.filter(function(el) {
	                    return el.element
	                }).forEach(function(data) {
	                    try {
	                        vm.onReset.call(data.element, {
	                            type: "reset"
	                        }, data)
	                    } catch (e) {}
	                })
	                var fn = typeof callback == "function" ? callback : vm.onResetAll
	                fn.call(vm.widgetElement)
	            }
	            /**
	             * @interface 验证单个元素对应的VM中的属性是否符合格式<br>此方法是框架自己调用
	             * @param data {Object} 绑定对象
	             * @param isValidateAll {Undefined|Boolean} 是否全部验证,是就禁止onSuccess, onError, onComplete触发
	             * @param event {Undefined|Event} 方便用户判定这是由keyup,还是blur等事件触发的
	             */
	            vm.validate = function(data, isValidateAll, event) {
	                var value = data.valueAccessor()
	                var inwardHooks = vmodel.validationHooks
	                var globalHooks = avalon.duplexHooks
	                var promises = []
	                var elem = data.element
	                data.validateParam.replace(/\w+/g, function(name) {
	                    var hook = inwardHooks[name] || globalHooks[name]
	                    if (!elem.disabled) {
	                        var resolve, reject
	                            promises.push(new Promise(function(a, b) {
	                                resolve = a
	                                reject = b
	                            }))
	                            var next = function(a) {
	                                if (data.norequired && value === "") {
	                                    a = true
	                                }
	                                if (a) {
	                                    resolve(true)
	                                } else {
	                                    var reason = {
	                                        element: elem,
	                                        data: data.data,
	                                        message: elem.getAttribute("data-duplex-" + name + "-message") || elem.getAttribute("data-duplex-message") || hook.message,
	                                        validateRule: name,
	                                        getMessage: getMessage
	                                    }
	                                    resolve(reason)
	                                }
	                        }
	                        data.data = {}
	                        hook.get(value, data, next)
	                    }
	                })
	                //如果promises不为空，说明经过验证拦截器
	                var lastPromise = Promise.all(promises).then(function(array) {
	                    var reasons = []
	                    for (var i = 0, el; el = array[i++];) {
	                        if (typeof el === "object") {
	                            reasons.push(el)
	                        }
	                    }
	                    if (!isValidateAll) {
	                        if (reasons.length) {
	                            vm.onError.call(elem, reasons, event)
	                        } else {
	                            vm.onSuccess.call(elem, reasons, event)
	                        }
	                        vm.onComplete.call(elem, reasons, event)
	                    }
	                    return reasons
	                })
	                return lastPromise
	
	            }
	            //收集下方表单元素的数据
	            vm.$watch("avalon-ms-duplex-init", function(data) {
	                var inwardHooks = vmodel.validationHooks
	                data.valueAccessor = data.evaluator.apply(null, data.args)
	
	                switch (avalon.type(data.valueAccessor())) {
	                    case "array":
	                        data.valueResetor = function() {
	                            this.valueAccessor([])
	                        }
	                        break
	                    case "boolean":
	                        data.valueResetor = function() {
	                            this.valueAccessor(false)
	                        }
	                        break
	                    case "number":
	                        data.valueResetor = function() {
	                            this.valueAccessor(0)
	                        }
	                        break
	                    default:
	                        data.valueResetor = function() {
	                            this.valueAccessor("")
	                        }
	                        break
	                }
	
	                var globalHooks = avalon.duplexHooks
	                if (typeof data.pipe !== "function" && avalon.contains(element, data.element)) {
	                    var params = []
	                    var validateParams = []
	                    data.param.replace(/\w+/g, function(name) {
	                        var hook = inwardHooks[name] || globalHooks[name]
	                        if (hook && typeof hook.get === "function" && hook.message) {
	                            validateParams.push(name)
	                        } else {
	                            params.push(name)
	                        }
	                        if (name === "norequired") {
	                            data.norequired = true
	                        }
	                    })
	                    data.validate = vm.validate
	                    data.param = params.join("-")
	                    data.validateParam = validateParams.join("-")
	                    if (validateParams.length) {
	                        if (vm.validateInKeyup) {
	                            data.bound("keyup", function(e) {
	                                var type = data.element && data.element.getAttribute("data-duplex-event")
	                                if (!type || /^(?:key|mouse|click|input)/.test(type)) {
	                                    var ev = fixEvent(e)
	                                    setTimeout(function() {
	                                        vm.validate(data, 0, ev)
	                                    })
	                                }
	                            })
	                        }
	                        if (vm.validateInBlur) {
	                            data.bound("blur", function(e) {
	                                vm.validate(data, 0, fixEvent(e))
	                            })
	                        }
	                        if (vm.resetInFocus) {
	                            data.bound("focus", function(e) {
	                                vm.onReset.call(data.element, fixEvent(e), data)
	                            })
	                        }
	                        var array = vm.data.filter(function(el) {
	                            return el.element
	                        })
	                        avalon.Array.ensure(array, data)
	                        vm.data = array
	                    }
	
	                    return false
	                }
	            })
	        })
	
	        return vmodel
	    }
	    var rformat = /\\?{{([^{}]+)\}}/gm
	
	        function getMessage() {
	            var data = this.data || {}
	            return this.message.replace(rformat, function(_, name) {
	                return data[name] == null ? "" : data[name]
	            })
	        }
	    widget.defaults = {
	        validationHooks: {}, //@config {Object} 空对象，用于放置验证规则
	        onSuccess: avalon.noop, //@config {Function} 空函数，单个验证成功时触发，this指向被验证元素this指向被验证元素，传参为一个对象数组外加一个可能存在的事件对象
	        onError: avalon.noop, //@config {Function} 空函数，单个验证失败时触发，this与传参情况同上
	        onComplete: avalon.noop, //@config {Function} 空函数，单个验证无论成功与否都触发，this与传参情况同上
	        onValidateAll: avalon.noop, //@config {Function} 空函数，整体验证后或调用了validateAll方法后触发；有了这东西你就不需要在form元素上ms-on-submit="submitForm"，直接将提交逻辑写在onValidateAll回调上
	        onReset: avalon.noop, //@config {Function} 空函数，表单元素获取焦点时触发，this指向被验证元素，大家可以在这里清理className、value
	        onResetAll: avalon.noop, //@config {Function} 空函数，当用户调用了resetAll后触发，
	        validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
	        validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
	        validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
	        resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
	        deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
	    }
	    //http://bootstrapvalidator.com/
	    //https://github.com/rinh/jvalidator/blob/master/src/index.js
	    //http://baike.baidu.com/view/2582.htm?fr=aladdin&qq-pf-to=pcqq.group
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	/**
	 @other
	 <p>avalon.validation自带了许多<code>验证规则</code>，满足你一般的业务需求。</p>
	 <p>大家可以在onReset的回调里得到第二个参数data, 然后调用data.valueResetor()将VM中的数据也置空,如布尔数据变false, 
	 数值数据变0,数组数据变[],字符串数组变成""
	 
	 </p>
	 
	 <h2>错误提示信息的添加</h2>
	 <p>比如说&lt;input ms-duplex-alpha="aaa"/&lt;要求用户输出的都是字母，如果输入其他类型的内容，
	 它就会报错<b style="color:red">必须是字母</b>。为什么呢，因为alpha为一个内置拦截器，
	 定义在avalon.duplexHooks上，结构为</p>
	 ```javascript
	 alpha: {
	 message: '必须是字母',
	 get: function(value, data, next) {
	 next(/^[a-z]+$/i.test(value))
	 return value
	 }
	 },
	 ```
	 如果想显示别的提示信息有三种办法，一就是重写这个栏截器的message属性；
	 二就是添加data-duplex-message="新提示信息"（不过这个已经不提倡使用了，
	 因为一个表单控制可能使用N个拦截器做验证，如ms-duplex-required-alpha-minlength，
	 这会覆盖其他拦截器的默认提示信息）；三就是使用data-duplex-alpha-message="专门用于alpha提示信息" 
	 ```html
	 <input ms-duplex-required-alpha-minlength="aaa" data-duplex-alpha-message="只能全是英文字母"
	 ```    
	 此外，提示信息里面可以使用插值表达式，虽然不能使用变量，也应该够用，比如说minlength拦截器
	 ```javascript
	 minlength: {
	 message: '最少输入{{min}}个字',
	 get: function(value, data, next) {
	 var elem = data.element
	 var a = parseInt(elem.getAttribute("minlength"), 10)
	 if (!isFinite(a)) {
	 a = parseInt(elem.getAttribute("data-duplex-minlength"), 10)
	 }
	 var num = data.data.min = a
	 next(value.length >= num)
	 return value
	 }
	 },
	 ```          
	 我们必须传入一个min参数,这要在元素上添加
	 ```html
	 <input ms-duplex-minlength="aaa" data-duplex-min="6"
	 ```         
	 这样报错时就提示要<b>最少输入6个字</b>      
	 */
	
	/**
	 @links
	 [自带验证规则required,int,decimal,alpha,chs,ipv4,phone](avalon.validation.ex1.html)
	 [自带验证规则qq,id,email,url,date,passport,pattern](avalon.validation.ex2.html)
	 [自带验证规则maxlength,minlength,lt,gt,eq,repeat](avalon.validation.ex3.html)
	 [自带验证规则contains,contain](avalon.validation.ex4.html)
	 [自带验证规则repeat(重复密码)](avalon.validation.ex5.html)
	 [自定义验证规则](avalon.validation.ex6.html)
	 [自带验证规则norequied](avalon.validation.ex7.html)
	 [禁止获得焦点时的onRest回调 resetInFocus ](avalon.validation.ex8.html)
	 [与textbox组件的混用, ms-duplex-string的使用 ](avalon.validation.ex9.html)
	 [验证表单元素存在disabled的情况 ](avalon.validation.ex10.html)
	 [deduplicateInValidateAll:true对validatieAll回调的reasons数组根据element进行去重 ](avalon.validation.ex13.html)
	 [验证dropdown组件 ](avalon.validation.ex14.html)
	 
	 
	 */

/***/ }
]);
//# sourceMappingURL=build.js.map