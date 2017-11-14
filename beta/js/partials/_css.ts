import { data } from "./data";
//Css
export function itContainsCSS(el: any, clasParentObjName:string, css) {
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

export function addCss(el: any, css:string) {
  if (el.classList) {
    el.classList.add(css);
  } else {
    el.className += ' ' + css;
  }
}

export function removeCss(el: any, css:string) {
  if (el.classList) {
    el.classList.remove(css);
  } else {
    el.className.replace(css, '');
  }
}

export function hasClass(el: any, css) {
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