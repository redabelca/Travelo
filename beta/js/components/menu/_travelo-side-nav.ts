import { getEl,addEvent,rmvEvent } from "../../partials/_DOM";
import { toggleCss,toggle2Css } from "../../partials/_css";
import { loop } from "../../partials/_snippets";

let bg = getEl('.bg-black-screen'),
  sdNv = getEl('.sideNav'),
  sideNavLis=getEl('.sideNav-items-li', true),
  closeBtn=getEl('.sideNav-close-btn'),
  Eassigned = 0;
function slideInAndOut() {
  toggleCss(bg, 'bg-black-screen_show');
  toggleCss(sdNv, 'translate-0');
  loop(sideNavLis.length, 100, i => {
    toggleCss(sideNavLis[i], 'translate-0');
    toggle2Css(sideNavLis[i], 'op0','op1');
  });
}

export function menu() {
  addEvent(getEl('.header-nav-humb'), 'click', e => {
    slideInAndOut();
    if (!Eassigned) {
      addEvent(closeBtn, 'click',slideInAndOut);
      addEvent(bg, 'click', slideInAndOut);
      addEvent(sdNv,'click',e=>{
        if(e.target.tagName.toLowerCase()=='a' && e.target.nextElementSibling){
          toggleCss(e.target.nextElementSibling,'block');
        }else if(e.target.tagName.toLowerCase()=='li' && e.target.querySelector('ul')){
          toggleCss(e.target.querySelector('ul'),'block');
        }
      });
      Eassigned = 1;
    }
  });
}
//bind click event into the humberger menu