
  //Data
  updateData: function (nameOfData, value) {
    data[nameOfData] = value;
  },
  top: function (el) {
    return el.getBoundingClientRect().top + lib.getWindowScrollY();
  },
