  //Animation
  animationMonitor: function (distancesArrayName) {
    data[distancesArrayName].sort(function (a, b) {
      return a.distance - b.distance;
    });
    lib.addEvent(w, 'scroll', function () {
      if (data[distancesArrayName][0] && lib.isItAppears(data[distancesArrayName][0].basename)) {
        data[distancesArrayName][0].fn();
        data[distancesArrayName].shift();
        //if it doesn't work make a var that hold the index
        //and i++ when .fn() done
      }
    });
  },
  registerForMonitor: function (distancesArrayName /*optional*/ , baseName, fn) {
    if (typeof data[distancesArrayName] !== "object") {
      data[distancesArrayName] = [];
    }
    data[distancesArrayName].push({
      basename: baseName,
      distance: data[baseName + 'Distance'],
      fn: fn
    });
  }, //el must be prepaired for anim
  prepareElForAnimation: function (el: HTMLElement, baseName, percentOfHeight /*optional*/ ) {
    lib.updateData(baseName + 'Top', lib.top(el));
    lib.updateData(baseName + 'Height', lib.getOffsetHeight(el));
    lib.updateData(baseName + 'Distance', data[baseName + 'Top'] + (data[baseName + 'Height'] * (percentOfHeight || 0)) - (window.innerHeight + data.scrollTop));
  },
  whichActionEvent: function (action /*either animation or transition*/ ) {
    var t, el = document.body,
      transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      },
      animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
      };

    if (action === 'animation') {
      for (t in animations) {
        if (el.style[t] !== undefined) {
          data[action + 'Event'] = animations[t];
          return animations[t];
        }
      }
    } else {
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          data[action + 'Event'] = transitions[t];
          return transitions[t];
        }
      }
    }
  },
  onActionEnd: function (elem: HTMLElement, action, fn, cb) {
    var actionEvent = data[action + 'Event'] || lib.whichActionEvent();
    lib.addEvent(elem, actionEvent, fn(elem));
    cb(elem);
  },