var l = console.log,al = alert, d = document, w = window,
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

  //Css
  itContainsCSS: function (el, clasParentObjName, css) {
    if (el.classList) {
      return data[clasParentObjName].classlist.contains(css);
    } else {
      if (data[clasParentObjName].classname.indexOf(css) === -1) {
        return false;
      } else {
        return true;
      }
    }
  },
  addCss: function (el, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
      el.classList.add(css);
    } else {
      el.className += ' ' + css;
    }
    if (storeClasInDataOrNot) {
      controller.updateCss(el, clasParentObjName);
    }
  },
  removeCss: function (el, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
      el.classList.remove(css);
    } else {
      el.className.replace(' ' + css, '');
    }
    if (storeClasInDataOrNot) {
      controller.updateCss(el, clasParentObjName);
    }
  },
  updateCss: function (el, clasParentObjName) {
    if (!data[clasParentObjName]) {
      data[clasParentObjName] = {
        classname: el.className,
        classlist: el.classList
      };
    } else {
      data[clasParentObjName].classlist = el.classList;
      data[clasParentObjName].classname = el.className;
    }
  },
  hasClass: function (el, css) {
    if (el.classList) {
      return el.classList.contains(css);
    } else {
      if (el.className.indexOf(css) === -1) {
        return false;
      } else {
        return true;
      }
    }
  },
  toggle2Css: function (el, css1, css2) {
    if (lib.hasClass(el, css1)) {
      el.className = el.className.replace(css1, css2);
    } else if (lib.hasClass(el, css2)) {
      el.className = el.className.replace(css2, css1);
    } else {
      el.className += ' '+css1;
    }
  },
  toggleCss: function (el, css) {
    if (el.classList) {
      el.classList.toggle(css);
    } else {
      if (el.className.indexOf(css) === -1) {
        el.className += ' ' + css;
      } else {
        el.className = el.className.replace(' ' + css, '');
      }
    }
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
  init: function () {}
};
lib.ready(view.init);