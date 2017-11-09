//Partials
import { updateData } from "./partials/data";
import { getWindowScrollY } from "./partials/_layout";
import { addEvent } from "./partials/_DOM";
import { ready } from "./partials/_ready";

//Components
import { menu } from "./components/menu/_travelo-side-nav";

((w) => {
  function init() {
    updateData('scrollTop', getWindowScrollY());
    addEvent(w, 'scroll', () => {
      updateData('scrollTop', getWindowScrollY());
    });

    //Menu
    menu();
    
  }
  ready(init);
})(window);