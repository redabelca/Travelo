//get and Event
  getEl: function (el: string) {
    return d.querySelector(el);
  },
  addEvent: function (el: HTMLElement, eventWithoutOn: string, fn: any) {
    if (el.addEventListener) {
      el.addEventListener(eventWithoutOn, fn, false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + eventWithoutOn, fn);
    }
  },