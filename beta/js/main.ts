//Partials
import { updateData } from "./partials/data";
import { getWindowScrollY } from "./partials/_layout";
import { addEvent } from "./partials/_DOM";
import { ready } from "./partials/_ready";
import { throttle } from "./partials/_optimization";

//Components
import { menu } from "./components/menu/_travelo-side-nav";
import { menu2 } from "./components/_travelo-menu2";
import { header } from "./components/_travelo-header";
import { comment } from "./components/_travelo-comment";
import { presentation } from "./components/_travelo-presentation";
import { triggerAnimationMonitor } from "./partials/_animation";

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