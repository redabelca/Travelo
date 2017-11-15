//Partials
import { updateData } from "./partials/data";
import { getWindowScrollY } from "./partials/_layout";
import { addEvent } from "./partials/_DOM";
import { ready } from "./partials/_ready";
import { throttle } from "./partials/_optimization";
import { triggerAnimationMonitor } from "./partials/_animation";

//Components
import { menu } from "./components/menu/_travelo-side-nav";
import { header } from "./components/_travelo-header";

((w) => {
  function init() {
    updateData('scrollTop', getWindowScrollY());
    addEvent(w, 'scroll', throttle(()=>{
      updateData('scrollTop', getWindowScrollY());
    },300) );

    //Menu
    menu();

    //Header
    header();
  }
  ready(init);
})(window);