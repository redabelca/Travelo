//get and Event
export function getEl (el: string,all?: boolean):any {
  return all?document.querySelectorAll(el):document.querySelector(el);
}

export function addEvent(el: any, eventWithoutOn: string, fn: any) {
  if (el.addEventListener) {
    el.addEventListener(eventWithoutOn, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + eventWithoutOn, fn);
  }
}

export function rmvEvent(el: any,eventWithoutOn: string, fn: any){
    if (el.removeEventListener) {
        el.removeEventListener(eventWithoutOn, fn, false);
    } else if (el.detachEvent) {
        el.detachEvent("on" + eventWithoutOn, fn);
    } else {
        el["on" + eventWithoutOn] = null;
    }
}