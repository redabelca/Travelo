import { data } from "./data";
//Layout
export function getWindowScrollY() {
  return window.scrollY || window.pageYOffset || document.body.scrollTop;
}

export function getOffsetHeight(el: any) {
  return el.offsetHeight || el.scrollHeight || el.getBoundingClientRect().height;
}

export function CSSPropertyNumber(el: Element, CSSProperty: string) {
  return Number(window.getComputedStyle(el)[CSSProperty].replace('px', ''));
}

export function isItAppears(distanceToWatch:number) {
  return data.scrollTop >= distanceToWatch ;
}
