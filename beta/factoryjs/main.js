function lg(t){
  console.log(t);
}
function al(t){
  alert(t);
}

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