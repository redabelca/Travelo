import { toggleCss } from "../../partials/_css";
import { addEvent } from "../../partials/_DOM";

export function dropDown(ulParent:any,css:string){
  addEvent(ulParent,'click',e=>{
    if(e.target.tagName.toLowerCase() == 'a' && e.target.nextElementSibling.tagName.toLowerCase()=='ul'){
      toggleCss(e.target.nextElementSibling,css);
    }
  });
}