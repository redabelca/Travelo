import { data, updateData, top } from "./data";
import { addEvent } from "./_DOM";
import { isItAppears, getOffsetHeight } from "./_layout";
import { throttle } from "../partials/_optimization";

//Animation
export function prepareElForAnimation(el: Element, baseName, percentOfHeight?: number) {
  updateData(baseName + 'Top', top(el));
  updateData(baseName + 'Height', getOffsetHeight(el));
  updateData(baseName + 'Distance', data[baseName + 'Top'] + (data[baseName + 'Height'] * (percentOfHeight || 0)) - (window.innerHeight + data.scrollTop));
}

export function registerForMonitor(baseName, fn) {
  if (typeof data['distancesArray'] !== "object") {
    data['distancesArray'] = [];
  }
  data['distancesArray'].push({
    basename: baseName,
    distance: data[baseName + 'Distance'],
    fn: fn
  });
} //el must be prepaired for anim

export function triggerAnimationMonitor() {
  data['distancesArray'].sort((a, b)=>{
    return a.distance - b.distance;
  });
  addEvent(window, 'scroll', throttle(() => {
    if (data['distancesArray'][0] && isItAppears(data['distancesArray'][0].basename)) {
      data['distancesArray'][0].fn();
      data['distancesArray'].shift();
    }
  }, 300));
}

export function whichActionEvent(action: string /*either animation or transition*/) {
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

export function onActionEnd(elem: Element, action, fn, cb?) {
  var actionEvent = data[action + 'Event'] || whichActionEvent(action);
  addEvent(elem, actionEvent, fn(elem));
  cb(elem);
}