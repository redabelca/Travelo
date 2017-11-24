/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _layout_1 = __webpack_require__(1);
exports.data = {};
function updateData(nameOfData, value) {
    exports.data[nameOfData] = value;
}
exports.updateData = updateData;
function top(el) {
    return el.getBoundingClientRect().top + _layout_1.getWindowScrollY();
}
exports.top = top;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var data_1 = __webpack_require__(0);
//Layout
function getWindowScrollY() {
    return window.scrollY || window.pageYOffset || document.body.scrollTop;
}
exports.getWindowScrollY = getWindowScrollY;
function getOffsetHeight(el) {
    return el.offsetHeight || el.scrollHeight || el.getBoundingClientRect().height;
}
exports.getOffsetHeight = getOffsetHeight;
function CSSPropertyNumber(el, CSSProperty) {
    return Number(window.getComputedStyle(el)[CSSProperty].replace('px', ''));
}
exports.CSSPropertyNumber = CSSPropertyNumber;
function isItAppears(baseName) {
    return data_1.data.scrollTop >= data_1.data[baseName + 'Distance'];
}
exports.isItAppears = isItAppears;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Partials
var data_1 = __webpack_require__(0);
var _layout_1 = __webpack_require__(1);
var _DOM_1 = __webpack_require__(3);
var _ready_1 = __webpack_require__(4);
var _optimization_1 = __webpack_require__(5);
(function (w) {
    function init() {
        data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        _DOM_1.addEvent(w, 'scroll', _optimization_1.throttle(function () {
            data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        }, 300));
        //Menu
        // menu(); 
        //Header
        // header();
        //Comment
        //comment();
    }
    _ready_1.ready(init);
})(window);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//get and Event
function getEl(el, all) {
    return all ? document.querySelectorAll(el) : document.querySelector(el);
}
exports.getEl = getEl;
function addEvent(el, eventWithoutOn, fn) {
    if (el.addEventListener) {
        el.addEventListener(eventWithoutOn, fn, false);
    }
    else if (el.attachEvent) {
        el.attachEvent('on' + eventWithoutOn, fn);
    }
}
exports.addEvent = addEvent;
function rmvEvent(el, eventWithoutOn, fn) {
    if (el.removeEventListener) {
        el.removeEventListener(eventWithoutOn, fn, false);
    }
    else if (el.detachEvent) {
        el.detachEvent("on" + eventWithoutOn, fn);
    }
    else {
        el["on" + eventWithoutOn] = null;
    }
}
exports.rmvEvent = rmvEvent;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Ready
function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", fn);
    }
    else {
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "interactive" || document.readyState === "complete") {
                fn();
            }
        });
    }
}
exports.ready = ready;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Optimization
var now1 = Date.now || function () {
    return new Date().getTime();
};
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options)
        options = {};
    var later = function () {
        previous = options.leading === false ? 0 : now1();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
            context = args = null;
    };
    return function () {
        var now = now1();
        if (!previous && options.leading === false)
            previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        var last = now1() - timestamp;
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = now1();
        var callNow = immediate && !timeout;
        if (!timeout)
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
exports.debounce = debounce;


/***/ })
/******/ ]);