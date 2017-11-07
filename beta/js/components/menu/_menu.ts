//Menu
giveSpaceToMenuAfterFix: function (el: HTMLElement) {
    if (!data.menuPlaceSize) {
      data.menuPlaceSize = lib.CSSPropertyNumber(el.previousElementSibling, 'margin-bottom') + lib.getOffsetHeight(el) + lib.CSSPropertyNumber(el, 'margin-bottom');
    }
    el.previousElementSibling.style.marginBottom = data.menuPlaceSize + 'px';
  },
  removeSpaceToMenuAfterFix: function (el: HTMLElement) {
    el.previousElementSibling.style.marginBottom = 0;
  },
//these both last functions can be merged
//actually aklot of funcs here can b mrgd