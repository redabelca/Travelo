import {data ,updateData,top} from "./data";
import { addEvent } from "./_DOM";
import { isItAppears, getOffsetHeight } from "./_layout";

//Animation
function animationMonitor(distancesArrayName) {
  data[distancesArrayName].sort(function (a, b) {
    return a.distance - b.distance;
  });
  addEvent(window, 'scroll', function () {
    if (data[distancesArrayName][0] && isItAppears(data[distancesArrayName][0].basename)) {
      data[distancesArrayName][0].fn();
      data[distancesArrayName].shift();
      //if it doesn't work make a var that hold the index
      //and i++ when .fn() done
    }
  });
}

function registerForMonitor(distancesArrayName, baseName, fn) {
  if (typeof data[distancesArrayName] !== "object") {
    data[distancesArrayName] = [];
  }
  data[distancesArrayName].push({
    basename: baseName,
    distance: data[baseName + 'Distance'],
    fn: fn
  });
} //el must be prepaired for anim

function prepareElForAnimation(el: HTMLElement, baseName, percentOfHeight ? : number) {
  updateData(baseName + 'Top', top(el));
  updateData(baseName + 'Height', getOffsetHeight(el));
  updateData(baseName + 'Distance', data[baseName + 'Top'] + (data[baseName + 'Height'] * (percentOfHeight || 0)) - (window.innerHeight + data.scrollTop));
}

function whichActionEvent(action?:string /*either animation or transition*/ ) {
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
}

function onActionEnd(elem: HTMLElement, action, fn, cb) {
  var actionEvent = data[action + 'Event'] || whichActionEvent();
  addEvent(elem, actionEvent, fn(elem));
  cb(elem);
}
