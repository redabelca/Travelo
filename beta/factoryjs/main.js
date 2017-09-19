var l = console.log,
  al = alert;
var data = {
  //initial
  windowWidth: 0,
  windowHeight: 0,
  scrollTop: 0,
  bk: 1024,
};
var controller = {};
var view = {
  init: function () {}
};
lib.ready(view.init);

window.addEventListener('mousemove',lib.debounce(function(){
  l(1);
},1000));