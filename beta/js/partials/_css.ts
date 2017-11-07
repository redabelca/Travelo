  //Css
  itContainsCSS: function (el: HTMLElement, clasParentObjName, css) {
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
  addCss: function (el: HTMLElement, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
      el.classList.add(css);
    } else {
      el.className += ' ' + css;
    }
    if (storeClasInDataOrNot) {
      controller.updateCss(el, clasParentObjName);
    }
  },
  removeCss: function (el: HTMLElement, css, storeClasInDataOrNot, clasParentObjName) {
    if (el.classList) {
      el.classList.remove(css);
    } else {
      el.className.replace(css, '');
    }
    if (storeClasInDataOrNot) {
      controller.updateCss(el, clasParentObjName);
    }
  },
  updateCss: function (el: HTMLElement, clasParentObjName) {
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
  hasClass: function (el: HTMLElement, css) {
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
  toggle2Css: function (el: HTMLElement, css1, css2) {
    if (lib.hasClass(el, css1)) {
      el.className = el.className.replace(css1, css2);
    } else if (lib.hasClass(el, css2)) {
      el.className = el.className.replace(css2, css1);
    } else {
      alert('error in lib.toggle2Css');
    }
  },
  toggleCss: function (el: HTMLElement, css) {
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
