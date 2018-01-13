import { toggleCss } from "../../partials/js/_css";
import { addEvent } from "../../partials/js/_DOM";

export function dropDown(ulParent:any,css:string){
  addEvent(ulParent,'click',e=>{
    if(e.target.tagName.toLowerCase() == 'a' && e.target.nextElementSibling.tagName.toLowerCase()=='ul'){
      toggleCss(e.target.nextElementSibling,css);
    }
  });
}