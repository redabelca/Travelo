//Partials/js
import { updateData } from "./partials/js/data";
import { getWindowScrollY } from "./partials/js/_layout";
import { addEvent } from "./partials/js/_DOM";
import { ready } from "./partials/js/_ready";
import { throttle } from "./partials/js/_optimization";

//Components
import { menu } from "./comps/menu/_travelo-side-nav";
import { menu2 } from "./comps/menu/_travelo-menu2";
import { header } from "./comps/header/_travelo-header";
import { comment } from "./comps/comment/_travelo-comment";
import { presentation } from "./comps/presentation/_travelo-presentation";
import { triggerAnimationMonitor } from "./partials/js/_animation";

((w) => {
  function init() {
    let t=setTimeout;
    //General
    updateData('scrollTop', getWindowScrollY());
    addEvent(w, 'scroll', throttle(()=>{
      updateData('scrollTop', getWindowScrollY());
    },200));
    // Menu
    menu();
    menu2();
    //Header
    header();
    //Comment
    comment();
    //Presentation
    t(()=>{
      presentation();
      t(()=>{triggerAnimationMonitor();},200);
    },200);
  }
  ready(init);
})(window);