((l, al, d, w) => {
  var data = {};
  var controller = {};
  var view = {
    init: function () {
      lib.updateData('scrollTop', lib.getWindowScrollY());
      lib.addEvent(w, 'scroll', function () {
        lib.updateData('scrollTop', lib.getWindowScrollY());
      });
      lib.addEvent(d.body, 'click', function () {
        lib.addCss(lib.getClass('flipCard')[0], 'flipCard_flip');
        var current = lib.getClass('flipCard-img-current')[0];
        var imgs = lib.getClass('img');
        lib.addCss(current, 'flipCard-img-away');
        lib.addCss(current.nextElementSibling, 'flipCard-img-current');
        lib.removeCss(current, 'flipCard-img-current');
      });
    }
  };
  lib.ready(view.init);
})(console.log, alert, d, w)
