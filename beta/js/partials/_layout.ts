import { data } from "./data";
//Layout
export function getWindowScrollY() {
  return window.scrollY || window.pageYOffset || document.body.scrollTop;
}

export function getOffsetHeight(el: HTMLElement) {
  return el.offsetHeight || el.scrollHeight || el.getBoundingClientRect().height;
}

export function CSSPropertyNumber(el: HTMLElement, CSSProperty: string) {
  return Number(window.getComputedStyle(el)[CSSProperty].replace('px', ''));
}

export function isItAppears(baseName: string) {
  return data.scrollTop >= data[baseName + 'Distance'];
}
