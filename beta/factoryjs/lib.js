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

  //Menu
  slideToggle: function (affected) {
    data.menuHeight = affected.scrollHeight;
    if (!data.isMenuSlidedDown) {
      affected.style.height = data.menuHeight + 'px';
      data.isMenuSlidedDown = 1;
    } else {
      affected.style.height = 0;
      data.isMenuSlidedDown = 0;
    }
  },
  menuLinksHeightFx: function (menu) {
    if (data.windowWidth > data.bk) {
      menu.style.height = 'auto';
      data.isMenuSlidedDown = 1;
    } else {
      data.isMenuSlidedDown = 0;
    }
  },
  fixedMenu: function (el, clas, elementClassName) {
    if (data.scrollTop >= data.menutop && lib.hasClass(el, clas)) {
      controller.giveSpaceToMenuAfterFix(el);
      el.className += ' ' + clas;
    } else if (data.scrollTop < data.menutop && !lib.hasClass(el, clas)) {
      controller.removeSpaceToMenuAfterFix(el);
      el.className = el.className.replace(clas, '');
    }
  },
  giveSpaceToMenuAfterFix: function (el) {
    if (!data.menuPlaceSize) {
      data.menuPlaceSize = lib.CSSPropertyNumber(el.previousElementSibling, 'margin-bottom') + lib.getOffsetHeight(el) + lib.CSSPropertyNumber(el, 'margin-bottom');
    }
    el.previousElementSibling.style.marginBottom = data.menuPlaceSize + 'px';
  },
  removeSpaceToMenuAfterFix: function (el) {
    el.previousElementSibling.style.marginBottom = 0;
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
        el.className = el.className.replace(' ' + css, '');
      }
    }
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
  distanceToWatchOnScroll: function (baseName, percentageOfHeight/*optional*/) {
    var per = percentageOfHeight || 0.5;
    data[baseName + 'Distance'] = data[baseName + 'Top'] + (data[baseName + 'Height'] / per) - data.windowHeight;
  },
  isItAppears: function (baseName) {
    if (data[baseName + 'Distance']) {
      return data.scrollTop >= data[baseName + 'Distance'];
    } else {
      alert('error in isItAppears');
    }
  },
  isHisTopAppears: function (basename) {
    return data.scrollTop >= data[basename + 'Top'] - data.windowHeight;
  },
  prepareElForAnimation: function (el, baseName, percentageOfHeight/*optional*/) {
    var per = percentageOfHeight || 0.5;
    controller.updateData(baseName + 'Top', lib.top(el));
    controller.updateData(baseName + 'Height', lib.getOffsetHeight(el));
    controller.distanceToWatchOnScroll(baseName, per);
  },

  //Animation
  animationMonitor: function (distancesArrayName) {
    data[distancesArrayName].sort(function (a, b) {
      return a.distance - b.distance;
    });
    lib.addEvent(w, 'scroll', function () {
      if (lib.isItAppears(data[distancesArrayName][0].basename)) {
        data[distancesArrayName][0].fn();
        data[distancesArrayName].shift();
        //if it doesn't work make a var that hold the index
        //and i++ when .fn() done
      }
    });
  },
  registerForMonitor: function (distancesArrayName/*optional*/, baseName, fn) {
    if (typeof data[distancesArrayName] !== "object") {
      data[distancesArrayName] = [];
    }
    data[distancesArrayName].push({
      basename: baseName,
      distance: data[baseName + 'Distance'],
      fn: fn
    });
  },//el must be prepaired for anim

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
  },
};

//Intro Animation
/*setTimeout(function () {
  el.className += ' ' + 'fade-out';
}, 4000);
setTimeout(function () {
el.parentElement.removeChild(el);
}, 6000);*/
