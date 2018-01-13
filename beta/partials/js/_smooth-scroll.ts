import { data } from "../../partials/js/data";
function easingPattern (easing, time) {
  let pattern;

  // Default Easing Patterns
  if (easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
  if (easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
  if (easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
  if (easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
  if (easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
  if (easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
  if (easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
  if (easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
  if (easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
  if (easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
  if (easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
  if (easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
  return pattern || time; // no easing, no acceleration
};
let start:number,timeLapsed,percentage,position;

//duration,distance how to inculde it in this function ?

export function loopAnimateScroll (timestamp:number,distance:number,duration:number,easing:string,startLocation?:number/*,condition?:Function*/) {
  if (!start) { start = timestamp; }
  timeLapsed = parseInt(String(timestamp - start));
  percentage = timeLapsed / duration;
  percentage = (percentage > 1) ? 1 : percentage;
  position = distance * easingPattern(easing, percentage);
  window.scrollTo(0, startLocation-Math.floor(position));
if (/*!condition()*/position<distance) {
    window.requestAnimationFrame(t=>{loopAnimateScroll(t,distance,duration,easing,startLocation/*,condition*/)});
  }else{
    timeLapsed=percentage=start=position=0;
  }
};

//need polyfills in the same github repo nit ghat telgahom