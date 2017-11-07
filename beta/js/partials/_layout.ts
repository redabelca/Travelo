
  //Layout
  getWindowScrollY: function () {
    return w.scrollY || w.pageYOffset || d.body.scrollTop;
  },
  getOffsetHeight: function (el: HTMLElement) {
    return el.offsetHeight || el.scrollHeight || el.getBoundingClientRect().height;
  },
  CSSPropertyNumber: function (el: HTMLElement, CSSProperty) {
    return Number(w.getComputedStyle(el)[CSSProperty].replace('px', ''));
  },
  isItAppears: function (baseName) {
    return data.scrollTop >= data[baseName + 'Distance'];
  },