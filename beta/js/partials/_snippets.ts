  //Snipets
  circleInCSS: function (step, startAngle, r) {
    var percentageStep = 100 / step,
      i = percentageStep,
      j = startAngle,
      angleStep = 360 / step,
      rStep = (r / step),
      x, y;
    for (; i <= 100; i += percentageStep) {
      j += angleStep;
      r -= rStep;
      x = Math.cos((j * Math.PI) / 180) * r;
      y = Math.sin((j * Math.PI) / 180) * r;
      console.log(i + '%{transform:translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px);}');
    }
  },
  startCount: function (number, el: HTMLElement, time) {
    var toAdd = time / 0.05,
      start = ((number - toAdd) >= 0) ? (number - toAdd) : 0,
      i = 0;
    el.innerHTML = start + '%';
    lib.loop(toAdd, 50, function () {
      i++;
      el.innerHTML = (start + i) + '%';
    });
  },
  loop: function (limit, stepTime, fn) {
    var i = -1,
      inter = setInterval(function () {
        i++;
        if (i >= limit) {
          clearInterval(inter);
        } else {
          fn(i);
        }
      }, stepTime);
  },
  asyncScript: function (src, cb) {
    var s,
      r,
      t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        cb && cb();
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  },