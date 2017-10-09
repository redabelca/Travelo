var l = console.log,
  al = alert,
  d = document,
  w = window,
  lib = {
    //Get and event
    getId: function (id) {
      if (d.getElementById) {
        return d.getElementById(id);
      } else {
        return d.querySelectorAll('#' + id);
      }
    },
    getClass: function (clas) {
      if (d.getElementsByClassName) {
        return d.getElementsByClassName(clas);
      } else {
        return d.querySelectorAll('.' + clas);
      }
    },
    addEvent: function (el, eventWithoutOn, fn) {
      if (el.addEventListener) {
        el.addEventListener(eventWithoutOn, fn, false);
      } else if (el.attachEvent) {
        el.attachEvent('on' + eventWithoutOn, fn);
      } else {
        el['on' + eventWithoutOn] = fn;
      }
    },
    //Data
    updateData: function (nameOfData, value) {
      data[nameOfData] = value;
    },
    top: function (el) {
      return el.getBoundingClientRect().top + lib.getWindowScrollY();
    },
    //Layout
    getWindowScrollY: function () {
      return w.scrollY || w.pageYOffset || d.body.scrollTop;
    },
    getOffsetHeight: function (el) {
      return el.offsetHeight || el.getBoundingClientRect().height || lib.CSSPropertyNumber(el, 'height');
    },
    CSSPropertyNumber: function (el, CSSProperty) {
      return Number(w.getComputedStyle(el)[CSSProperty].replace('px', ''));
    },
    isItAppears: function (baseName) {
      return data.scrollTop >= data[baseName + 'Distance'];
    },
    //Animation
    animationMonitor: function (distancesArrayName) {
      data[distancesArrayName].sort(function (a, b) {
        return a.distance - b.distance;
      });
      lib.addEvent(w, 'scroll', function () {
        if (data[distancesArrayName][0] && lib.isItAppears(data[distancesArrayName][0].basename)) {
          data[distancesArrayName][0].fn();
          data[distancesArrayName].shift();
          //if it doesn't work make a var that hold the index
          //and i++ when .fn() done
        }
      });
    },
    registerForMonitor: function (distancesArrayName /*optional*/ , baseName, fn) {
      if (typeof data[distancesArrayName] !== "object") {
        data[distancesArrayName] = [];
      }
      data[distancesArrayName].push({
        basename: baseName,
        distance: data[baseName + 'Distance'],
        fn: fn
      });
    }, //el must be prepaired for anim
    prepareElForAnimation: function (el, baseName, percentageOfHeight /*optional*/ ) {
      var per = percentageOfHeight || 0.5;
      lib.updateData(baseName + 'Top', lib.top(el));
      lib.updateData(baseName + 'Height', lib.getOffsetHeight(el));
      lib.updateData(baseName + 'Distance', data[baseName + 'Top'] + (data[baseName + 'Height'] * per) - (window.innerHeight + (data.scrollTop || 0)));
    },
    whichActionEvent: function (action /*either animation or transition*/ ) {
      var t, el = document.body,
        transitions = {
          'transition': 'transitionend',
          'OTransition': 'oTransitionEnd',
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        },
        animations = {
          'animation': 'animationend',
          'OAnimation': 'oAnimationEnd',
          'MozAnimation': 'animationend',
          'WebkitAnimation': 'webkitAnimationEnd'
        };

      if (action === 'animation') {
        for (t in animations) {
          if (el.style[t] !== undefined) {
            data[action + 'Event'] = animations[t];
            return animations[t];
          }
        }
      } else {
        for (t in transitions) {
          if (el.style[t] !== undefined) {
            data[action + 'Event'] = transitions[t];
            return transitions[t];
          }
        }
      }
    },
    onActionEnd: function (elem, action, fn, cb) {
      var actionEvent = data[action + 'Event'] || lib.whichActionEvent();
      lib.addEvent(elem, actionEvent, fn(elem));
      cb(elem);
    },
    //Snipets
    loop: function (limit, stepTime, fn) {
      var i = -1,
        inter = setInterval(function () {
          i++;
          if (i >= limit) {
            clearInterval(inter);
          } else {
            fn(i);
          }
        }, stepTime);
    },
    //Optimization
    now: Date.now || function () {
      return new Date().getTime();
    },
    throttle: function (func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function () {
        previous = options.leading === false ? 0 : lib.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function () {
        var now = lib.now();
        if (!previous && options.leading === false) previous = now;
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
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },
    debounce: function (func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function () {
        var last = lib.now() - timestamp;

        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function () {
        context = this;
        args = arguments;
        timestamp = lib.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    },
    //Ready
    ready: function (fn) {
      if (d.addEventListener) {
        d.addEventListener("DOMContentLoaded", fn);
      } else {
        d.attachEvent("onreadystatechange", function () {
          if (d.readyState === "interactive" || d.readyState === "complete") {
            fn();
          }
        });
      }
    }
  };

var data = {};
var controller = {};
var view = {
  init: function () {
    lib.addEvent(w, 'scroll', function () {
      lib.updateData('scrollTop', lib.getWindowScrollY());
    });
  }
};
lib.ready(view.init);