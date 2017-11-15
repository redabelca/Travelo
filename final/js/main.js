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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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


/***/ }),
/* 4 */
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
function addCss(el, css) {
    if (el.classList) {
        el.classList.add(css);
    }
    else {
        el.className += ' ' + css;
    }
}
exports.addCss = addCss;
function removeCss(el, css) {
    if (el.classList) {
        el.classList.remove(css);
    }
    else {
        el.className.replace(css, '');
    }
}
exports.removeCss = removeCss;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
//Partials
var data_1 = __webpack_require__(0);
var _layout_1 = __webpack_require__(1);
var _DOM_1 = __webpack_require__(2);
var _ready_1 = __webpack_require__(6);
var _optimization_1 = __webpack_require__(3);
//Components
var _travelo_side_nav_1 = __webpack_require__(7);
var _travelo_header_1 = __webpack_require__(9);
(function (w) {
    function init() {
        data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        _DOM_1.addEvent(w, 'scroll', _optimization_1.throttle(function () {
            data_1.updateData('scrollTop', _layout_1.getWindowScrollY());
        }, 300));
        //Menu
        _travelo_side_nav_1.menu();
        //Header
        _travelo_header_1.header();
    }
    _ready_1.ready(init);
})(window);


/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _DOM_1 = __webpack_require__(2);
var _css_1 = __webpack_require__(4);
var _snippets_1 = __webpack_require__(8);
//sidenav slide
var bg = _DOM_1.getEl('.bg-black-screen'), sdNv = _DOM_1.getEl('.sideNav'), sideNavLis = _DOM_1.getEl('.sideNav-items-li', true), closeBtn = _DOM_1.getEl('.sideNav-close-btn'), Eassigned = 0;
function slideInAndOut() {
    setTimeout(function () { _css_1.toggleCss(bg, 'bg-black-screen_show'); }, 500);
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
// 


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//Snipets
exports.__esModule = true;
exports.t = setTimeout;
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var _smooth_scroll_1 = __webpack_require__(10);
var data_1 = __webpack_require__(0);
var _DOM_1 = __webpack_require__(2);
var _css_1 = __webpack_require__(4);
var _optimization_1 = __webpack_require__(3);
var _layout_1 = __webpack_require__(1);
var tp = _DOM_1.getEl('#top'), menu = _DOM_1.getEl('.header-nav-humb');
function header() {
    _DOM_1.addEvent(tp, 'click', function () {
        window.requestAnimationFrame(function (t) {
            _smooth_scroll_1.loopAnimateScroll(t, data_1.data.scrollTop, 1500, 'easeInOutQuad', data_1.data.scrollTop);
        });
    });
    var distanceToHeaderBtm = data_1.top(_DOM_1.getEl('.header-nav').parentElement) + _layout_1.getOffsetHeight(_DOM_1.getEl('.header-nav').parentElement), cssAdded = 0;
    _DOM_1.addEvent(window, 'scroll', _optimization_1.throttle(function () {
        if (data_1.data.scrollTop > distanceToHeaderBtm && !cssAdded) {
            _css_1.addCss(menu, 'humb_afterScroll');
            _css_1.addCss(tp, 'top_show');
            setTimeout(function () {
                _css_1.addCss(menu, 'humb_show');
                cssAdded = 1;
            }, 300);
        }
        else if (data_1.data.scrollTop < distanceToHeaderBtm && cssAdded) {
            _css_1.removeCss(menu, 'humb_afterScroll');
            _css_1.removeCss(tp, 'top_show');
            setTimeout(function () {
                _css_1.removeCss(menu, 'humb_show');
                cssAdded = 0;
            }, 300);
        }
    }, 600));
}
exports.header = header;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function easingPattern(easing, time) {
    var pattern;
    // Default Easing Patterns
    if (easing === 'easeInQuad')
        pattern = time * time; // accelerating from zero velocity
    if (easing === 'easeOutQuad')
        pattern = time * (2 - time); // decelerating to zero velocity
    if (easing === 'easeInOutQuad')
        pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
    if (easing === 'easeInCubic')
        pattern = time * time * time; // accelerating from zero velocity
    if (easing === 'easeOutCubic')
        pattern = (--time) * time * time + 1; // decelerating to zero velocity
    if (easing === 'easeInOutCubic')
        pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
    if (easing === 'easeInQuart')
        pattern = time * time * time * time; // accelerating from zero velocity
    if (easing === 'easeOutQuart')
        pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
    if (easing === 'easeInOutQuart')
        pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
    if (easing === 'easeInQuint')
        pattern = time * time * time * time * time; // accelerating from zero velocity
    if (easing === 'easeOutQuint')
        pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
    if (easing === 'easeInOutQuint')
        pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
    return pattern || time; // no easing, no acceleration
}
;
var start, timeLapsed, percentage, position;
//duration,distance how to inculde it in this function ?
function loopAnimateScroll(timestamp, distance, duration, easing, startLocation /*,condition?:Function*/) {
    if (!start) {
        start = timestamp;
    }
    timeLapsed = parseInt(String(timestamp - start));
    percentage = timeLapsed / duration;
    percentage = (percentage > 1) ? 1 : percentage;
    position = distance * easingPattern(easing, percentage);
    window.scrollTo(0, startLocation - Math.floor(position));
    if (position < distance) {
        window.requestAnimationFrame(function (t) { loopAnimateScroll(t, distance, duration, easing, startLocation /*,condition*/); });
    }
    else {
        timeLapsed = percentage = start = position = 0;
    }
}
exports.loopAnimateScroll = loopAnimateScroll;
;
//need polyfills in the same github repo nit ghat telgahom 


/***/ })
/******/ ]);