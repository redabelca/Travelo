if (!Array.prototype.indexOf) {
  // Array.prototype.indexOf
  Array.prototype.indexOf = function indexOf(searchElement) {
    for (var array = this, index = 0, length = array.length; index < length; ++index) {
      if (array[index] === searchElement) {
        return index;
      }
    }

    return -1;
  };

}

var d = document,
  w = window;
var lib = {
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
  }, //this data in DATA object in ur MVC code must be in form of 2obj containing two form of data 1 is a domtokenlist from class list and the other is a string from className
  //and make sure to update clasname in data whenever a el class changed
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
      if (el.className.indexOf(css) != -1) {
        el.className += ' ' + css;
      } else {
        el.className = el.className.replace(' ' + css, '');
      }
    }
  },

  getWindowScrollY: function () {
    return w.scrollY || w.pageYOffset || d.body.scrollTop;
  },
  getOffsetHeight: function (el) {
    return el.offsetHeight || el.getBoundingClientRect().height || lib.CSSPropertyNumber(el, 'height');
  },
  CSSPropertyNumber: function (el, CSSProperty) {
    return Number(w.getComputedStyle(el)[CSSProperty].replace('px', ''));
  },
  distanceToWatchOnScroll: function (distanceNameUchoose, topOfElInData, hisHeight, percentageOfHeight) {
    data[distanceNameUchoose] = data[topOfElInData] + (data[hisHeight] / percentageOfHeight) - data.windowHeight;
  },
  isItAppears: function (el, distanceNameUchosen) {
    if (data[distanceNameUchosen]) {
      return data.scrollTop >= data[distanceNameUchosen];
    } else {
      alert('there isn\'t any data called ' + distanceNameUchoose + ' in data object, call distanceToWatchOnScroll() function to the element with Tag : ' + el.tagName + 'and with Class : ' + el.className);
    }
  },
  isHisTopAppears: function (topOfElInData) {
    return data.scrollTop >= data[topOfElInData] - data.windowHeight;
  },

  updateData: function (nameOfData, value) {
    data[nameOfData] = value;
  },
  top: function (el, nameOfVarInData) {
    data[nameOfVarInData] = el.getBoundingClientRect().top + lib.getWindowScrollY();
  },

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

//Every El u want to apply animation to it must give in data his height/distanceTotriggeranimation/hisScrollTop.

//Make a function that take one el and one name and make three obj in data about it's geometry top/height/distance by adding these words into the name

//top must return the scrolltop of el not setting it , wa hakada top ghnkhddemha f update.

//Intro Animation
/*function doAnimateIntro(el) {
  if (window.sessionStorage) {
    if (sessionStorage.animated == 1) {
      return;
    } else {
      //I found that the best solution is loading inlined style with html by js when this condition is passed
      fadeOutWhenDone(el);
      sessionStorage.animated = 1;
    }
  } else {
    return;
  }
}
function fadeOutWhenDone(el) {
  lib.addEvent(window, 'DOMContentLoaded', function () {
    el.className = el.className.replace('none', 'block');
    setTimeout(function () {
      el.className += ' ' + 'fade-out';
    }, 4000);
    setTimeout(function () {
      el.parentElement.removeChild(el);
    }, 6000);
  });
}
doAnimateIntro(document.querySelector('#intro'));*/

var data = {
  //initial
  windowWidth: 0,
  windowHeight: 0,
  scrollTop: 0,
  //Menu
  isMenuSlidedDown: 0,
  menuHeight: 0,
  bk: 1024,
  menutop: 0,
  iFixedThemenu: 0,
  previousElementMarginBottom: 0,
  //client
  topClient: 0,
  clientDistance: 0,
  clientTxtDistance: 0,
  clientTxtHeight: 0,
  clientTxtTop: 0
};
var controller = {
  //initial & general
  updateData: function (dataName, value) {
    data[dataName] = value;
  },
  top: function (el, nameOfVarInData) {
    data[nameOfVarInData] = el.getBoundingClientRect().top + lib.getWindowScrollY();
  },
  distanceToWatchOnScroll: function (distanceNameUchoose, topOfElInData, hisHeight, percentageOfHeight) {
    data[distanceNameUchoose] = data[topOfElInData] + (data[hisHeight] / percentageOfHeight) - data.windowHeight;
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
  menuLinksHeightFx: function (el) {
    if (data.windowWidth > data.bk) {
      el.style.height = 'auto';
      data.isMenuSlidedDown = 1;
    } else {
      data.isMenuSlidedDown = 0;
    }
  },
  fixedMenu: function (el, clas, elementClassName) {
    if (data.scrollTop >= data.menutop &&
      elementClassName.indexOf(clas) === -1 &&
      data.iFixedThemenu === 0) {
      controller.giveSpaceToMenuAfterFix(el);
      el.className += ' ' + clas;
      data.iFixedThemenu = 1;
    } else if (data.scrollTop < data.menutop &&
      el.className.indexOf(clas) > -1 &&
      data.iFixedThemenu === 1) {
      controller.removeSpaceToMenuAfterFix(el);
      el.className = el.className.replace(clas, '');
      data.iFixedThemenu = 0;
    }
  },
  giveSpaceToMenuAfterFix: function (el) {
    data.previousElementMarginBottom = lib.CSSPropertyNumber(el.previousElementSibling, 'margin-bottom');
    var menuPlaceSize = data.previousElementMarginBottom +
      el.getBoundingClientRect().height +
      lib.CSSPropertyNumber(el, 'margin-bottom');
    el.previousElementSibling.style.marginBottom = menuPlaceSize + 'px';
  },
  removeSpaceToMenuAfterFix: function (el) {
    el.previousElementSibling.style.marginBottom = data.previousElementMarginBottom + 'px';
  },
  //client
  showClientTxt: function (el, topEl, css) {
    if (lib.isHisTopAppears(topEl)) {
      if (lib.isItAppears(el, 'clientTxtDistance') && !lib.hasClass(el, css)) {
        el.className += ' ' + css;
      }
    }
  }
};
var view = {
  init: function () {
    view.nav = lib.getId('menu');
    view.client = lib.getId('client');
    view.clientTxt = lib.getId('client-txt');
    controller.updateData('windowWidth', w.innerWidth);
    controller.updateData('windowHeight', w.innerHeight);
    controller.updateData('clientTxtHeight', lib.getOffsetHeight(view.clientTxt));
    controller.top(view.nav, 'menutop');
    controller.top(view.client, 'topClient');
    controller.top(view.clientTxt, 'clientTxtTop');

    controller.distanceToWatchOnScroll('clientTxtDistance', 'clientTxtTop', 'clientTxtHeight', 0.5);
    lib.addEvent(w, 'scroll', function () {
      controller.updateData('scrollTop', lib.getWindowScrollY());

      controller.showClientTxt(view.clientTxt, 'topClient', 'client-fade');

      controller.fixedMenu(view.nav, 'menu-fix', view.nav.className);
    });
    lib.addEvent(w, 'resize', function () {
      controller.top(view.nav, 'menutop');
      controller.top(view.client, 'topClient');
      controller.top(view.clientTxt, 'clientTxtTop');
      controller.updateData('windowWidth', w.innerWidth);
      controller.updateData('windowHeight', w.innerHeight);
    });
    view.responsiveMenu();
  },
  //Menu
  responsiveMenu: function () {
    var humb = lib.getId("humb"),
      links = lib.getId("right-links");
    lib.addEvent(w, "resize", function () {
      controller.menuLinksHeightFx(links);
    });
    lib.addEvent(humb, "click", function () {
      controller.slideToggle(links);
    });
  }
};
lib.ready(view.init);
