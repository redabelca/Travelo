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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Partials
var data_1 = __webpack_require__(0);
var _layout_1 = __webpack_require__(1);
var _DOM_1 = __webpack_require__(2);
var _ready_1 = __webpack_require__(4);
//Components
var _travelo_side_nav_1 = __webpack_require__(5);
(function (w) {
    function init() {
        data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        _DOM_1.addEvent(w, 'scroll', function () {
            data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        });
        //Menu
        _travelo_side_nav_1.menu();
    }
    _ready_1.ready(init);
})(window);


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
var _DOM_1 = __webpack_require__(2);
var _css_1 = __webpack_require__(6);
var _snippets_1 = __webpack_require__(7);
var bg = _DOM_1.getEl('.bg-black-screen'), sdNv = _DOM_1.getEl('.sideNav'), sideNavLis = _DOM_1.getEl('.sideNav-items-li', true), closeBtn = _DOM_1.getEl('.sideNav-close-btn'), Eassigned = 0;
function slideInAndOut() {
    _css_1.toggleCss(bg, 'bg-black-screen_show');
    _css_1.toggleCss(sdNv, 'translate-0');
    _snippets_1.loop(sideNavLis.length, 100, function (i) {
        _css_1.toggleCss(sideNavLis[i], 'translate-0');
        _css_1.toggle2Css(sideNavLis[i], 'op0', 'op1');
    });
}
function menu() {
    _DOM_1.addEvent(_DOM_1.getEl('.header-nav-humb'), 'click', function (e) {
        slideInAndOut();
        if (!Eassigned) {
            _DOM_1.addEvent(closeBtn, 'click', slideInAndOut);
            _DOM_1.addEvent(bg, 'click', slideInAndOut);
            _DOM_1.addEvent(sdNv, 'click', function (e) {
                if (e.target.tagName.toLowerCase() == 'a' && e.target.nextElementSibling) {
                    _css_1.toggleCss(e.target.nextElementSibling, 'block');
                }
                else if (e.target.tagName.toLowerCase() == 'li' && e.target.querySelector('ul')) {
                    _css_1.toggleCss(e.target.querySelector('ul'), 'block');
                }
            });
            Eassigned = 1;
        }
    });
}
exports.menu = menu;
//bind click event into the humberger menu 


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var data_1 = __webpack_require__(0);
//Css
function itContainsCSS(el, clasParentObjName, css) {
    if (el.classList) {
        return data_1.data[clasParentObjName].classlist.contains(css);
    }
    else {
        if (data_1.data[clasParentObjName].classname.indexOf(css) === -1) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.itContainsCSS = itContainsCSS;
function addCss(el, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
        el.classList.add(css);
    }
    else {
        el.className += ' ' + css;
    }
    if (storeClasInDataOrNot) {
        updateCss(el, clasParentObjName);
    }
}
exports.addCss = addCss;
function removeCss(el, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
        el.classList.remove(css);
    }
    else {
        el.className.replace(css, '');
    }
    if (storeClasInDataOrNot) {
        updateCss(el, clasParentObjName);
    }
}
exports.removeCss = removeCss;
function updateCss(el, clasParentObjName) {
    if (!data_1.data[clasParentObjName]) {
        data_1.data[clasParentObjName] = {
            classname: el.className,
            classlist: el.classList
        };
    }
    else {
        data_1.data[clasParentObjName].classlist = el.classList;
        data_1.data[clasParentObjName].classname = el.className;
    }
}
exports.updateCss = updateCss;
function hasClass(el, css) {
    if (el.classList) {
        return el.classList.contains(css);
    }
    else {
        if (el.className.indexOf(css) === -1) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.hasClass = hasClass;
function toggle2Css(el, css1, css2) {
    if (hasClass(el, css1)) {
        el.className = el.className.replace(css1, css2);
    }
    else if (hasClass(el, css2)) {
        el.className = el.className.replace(css2, css1);
    }
    else {
        alert('error in toggle2Css');
    }
}
exports.toggle2Css = toggle2Css;
function toggleCss(el, css) {
    if (el.classList) {
        el.classList.toggle(css);
    }
    else {
        if (el.className.indexOf(css) === -1) {
            el.className += ' ' + css;
        }
        else {
            el.className = el.className.replace(css, '');
        }
    }
}
exports.toggleCss = toggleCss;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Snipets
function circleInCSS(step, startAngle, r) {
    var percentageStep = 100 / step, i = percentageStep, j = startAngle, angleStep = 360 / step, rStep = (r / step), x, y;
    for (; i <= 100; i += percentageStep) {
        j += angleStep;
        r -= rStep;
        x = Math.cos((j * Math.PI) / 180) * r;
        y = Math.sin((j * Math.PI) / 180) * r;
        console.log(i + '%{transform:translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px);}');
    }
}
exports.circleInCSS = circleInCSS;
function startCount(number, el, time) {
    var toAdd = time / 0.05, start = ((number - toAdd) >= 0) ? (number - toAdd) : 0, i = 0;
    el.innerHTML = start + '%';
    loop(toAdd, 50, function () {
        i++;
        el.innerHTML = (start + i) + '%';
    });
}
exports.startCount = startCount;
function loop(limit, stepTime, fn, cb) {
    var i = -1, inter = setInterval(function () {
        if (++i >= limit) {
            clearInterval(inter);
            cb && cb(i);
        }
        else {
            fn(i);
        }
    }, stepTime);
}
exports.loop = loop;
function asyncScript(src, cb) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
            r = true;
            cb && cb();
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}
exports.asyncScript = asyncScript;


/***/ })
/******/ ]);