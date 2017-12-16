import { loopAnimateScroll } from "../partials/_smooth-scroll";
import { data,top } from "../partials/data";
import { addEvent,getEl } from "../partials/_DOM";
import { addCss,removeCss } from "../partials/_css";
import { throttle } from "../partials/_optimization";
import { getOffsetHeight } from "../partials/_layout";

let tp=getEl('#top'),
menu=getEl('#header-nav-humb');

export function header() {
  if (tp) {
    addEvent(tp, 'click', () => {
      window.requestAnimationFrame(t => {
        loopAnimateScroll(t, data.scrollTop, 1500, 'easeInOutQuad', data.scrollTop);
      });
    });
  }
  if (menu) {
    let distanceToHeaderBtm = top(getEl('.header-nav').parentElement) + getOffsetHeight(getEl('.header-nav').parentElement), cssAdded = 0;
    addEvent(window, 'scroll', throttle(() => {
      if (data.scrollTop > distanceToHeaderBtm && !cssAdded) {
        addCss(menu, 'humb_afterScroll');
        addCss(tp, 'top_show');
        setTimeout(() => {
          addCss(menu, 'humb_show');
          cssAdded = 1;
        }, 300);
      } else if (data.scrollTop < distanceToHeaderBtm && cssAdded) {
        removeCss(menu, 'humb_afterScroll');
        removeCss(tp, 'top_show');
        setTimeout(() => {
          removeCss(menu, 'humb_show');
          cssAdded = 0;
        }, 300);
      }
    }, 600));
  }
}