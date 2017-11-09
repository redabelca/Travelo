import { data } from "./data";
//Css
export function itContainsCSS(el: HTMLElement, clasParentObjName:string, css) {
  if (el.classList) {
    return data[clasParentObjName].classlist.contains(css);
  } else {
    if (data[clasParentObjName].classname.indexOf(css) === -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function addCss(el: HTMLElement, css, storeClasInDataOrNot, clasParentObjName) {
  if (el.classList) {
    el.classList.add(css);
  } else {
    el.className += ' ' + css;
  }
  if (storeClasInDataOrNot) {
    updateCss(el, clasParentObjName);
  }
}

export function removeCss(el: HTMLElement, css, storeClasInDataOrNot, clasParentObjName) {
  if (el.classList) {
    el.classList.remove(css);
  } else {
    el.className.replace(css, '');
  }
  if (storeClasInDataOrNot) {
    updateCss(el, clasParentObjName);
  }
}

export function updateCss(el: HTMLElement, clasParentObjName) {
  if (!data[clasParentObjName]) {
    data[clasParentObjName] = {
      classname: el.className,
      classlist: el.classList
    };
  } else {
    data[clasParentObjName].classlist = el.classList;
    data[clasParentObjName].classname = el.className;
  }
}

export function hasClass(el: HTMLElement, css) {
  if (el.classList) {
    return el.classList.contains(css);
  } else {
    if (el.className.indexOf(css) === -1) {
      return false;
    } else {
      return true;
    }
  }
}

export function toggle2Css(el: any, css1, css2) {
  if (hasClass(el, css1)) {
    el.className = el.className.replace(css1, css2);
  } else if (hasClass(el, css2)) {
    el.className = el.className.replace(css2, css1);
  } else {
    alert('error in toggle2Css');
  }
}

export function toggleCss(el: any, css) {
  if (el.classList) {
    el.classList.toggle(css);
  } else {
    if (el.className.indexOf(css) === -1) {
      el.className += ' ' + css;
    } else {
      el.className = el.className.replace(css, '');
    }
  }
}