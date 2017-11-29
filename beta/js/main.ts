//Partials
import { updateData, data } from "./partials/data";
import { getWindowScrollY } from "./partials/_layout";
import { addEvent } from "./partials/_DOM";
import { ready } from "./partials/_ready";
import { throttle } from "./partials/_optimization";

//Components
import { menu } from "./components/menu/_travelo-side-nav";
import { header } from "./components/_travelo-header";
import { comment } from "./components/_travelo-comment";

((w) => {
  function init() {
    updateData('scrollTop', getWindowScrollY());
    addEvent(w, 'scroll', throttle(()=>{
      updateData('scrollTop', getWindowScrollY());
      console.log(data);
    },300) );
    //Menu
    //menu();

    //Header
    //header();

    //Comment
    comment();
  }
  ready(init);
})(window);