import { addCss } from "../../partials/js/_css";
import { getEl, addEvent,rmvEvent } from "../../partials/js/_DOM";

const label = getEl('.comment-form-comment label'),
  textarea = getEl('.comment-form-comment textarea');

export function comment() {
  if(textarea){
    addEvent(textarea,'focus',add_focus);
  }
}

function add_focus(){
  addCss(label, 'label_stable');
  setTimeout(()=>{label.innerHTML+=' :';},400);
  rmvEvent(textarea,'focus',add_focus);
}