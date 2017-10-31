var d = document,
  w = window;
var lib = {
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
      return d.getElementsByClassName(clas)[0];
    } else {
      return d.querySelector('.' + clas);
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
  //Menu
  giveSpaceToMenuAfterFix: function (el) {
    if (!data.menuPlaceSize) {
      data.menuPlaceSize = lib.CSSPropertyNumber(el.previousElementSibling, 'margin-bottom') + lib.getOffsetHeight(el) + lib.CSSPropertyNumber(el, 'margin-bottom');
    }
    el.previousElementSibling.style.marginBottom = data.menuPlaceSize + 'px';
  },
  removeSpaceToMenuAfterFix: function (el) {
    el.previousElementSibling.style.marginBottom = 0;
  },
  //these both last functions can be merged
  //actually alot of funcs here can b mrgd
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
      el.className.replace(css, '');
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
      alert('error in lib.toggle2Css');
    }
  },
  toggleCss: function (el, css) {
    if (el.classList) {
      el.classList.toggle(css);
    } else {
      if (el.className.indexOf(css) === -1) {
        el.className += ' ' + css;
      } else {
        el.className = el.className.replace(css, '');
      }
    }
  },
  //Layout
  getWindowScrollY: function () {
    return w.scrollY || w.pageYOffset || d.body.scrollTop;
  },
  getOffsetHeight: function (el) {
    return el.offsetHeight || el.scrollHeight || el.getBoundingClientRect().height;
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
  prepareElForAnimation: function (el, baseName, percentOfHeight /*optional*/ ) {
    lib.updateData(baseName + 'Top', lib.top(el));
    lib.updateData(baseName + 'Height', lib.getOffsetHeight(el));
    lib.updateData(baseName + 'Distance', data[baseName + 'Top'] + (data[baseName + 'Height'] * (percentOfHeight || 0)) - (window.innerHeight + data.scrollTop));
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

  //Data
  updateData: function (nameOfData, value) {
    data[nameOfData] = value;
  },
  top: function (el) {
    return el.getBoundingClientRect().top + lib.getWindowScrollY();
  },
  //Snipets
  circleInCSS: function (step, startAngle, r) {
    var percentageStep = 100 / step,
      i = percentageStep,
      j = startAngle,
      angleStep = 360 / step,
      rStep = (r / step),
      x, y;
    for (; i <= 100; i += percentageStep) {
      j += angleStep;
      r -= rStep;
      x = Math.cos((j * Math.PI) / 180) * r;
      y = Math.sin((j * Math.PI) / 180) * r;
      console.log(i + '%{transform:translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px);}');
    }
  },
  startCount: function (number, el, time) {
    var toAdd = time / 0.05,
      start = ((number - toAdd) >= 0) ? (number - toAdd) : 0,
      i = 0;
    el.innerHTML = start + '%';
    lib.loop(toAdd, 50, function () {
      i++;
      el.innerHTML = (start + i) + '%';
    });
  },
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
  asyncScript: function (src, cb) {
    var s,
      r,
      t;
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
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "interactive" || document.readyState === "complete") {
          fn();
        }
      });
    }
  }
};