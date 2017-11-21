import { addCss } from "../partials/_css";
import { getEl, addEvent,rmvEvent } from "../partials/_DOM";

const label = getEl('.comment-form-comment label'),
  textarea = getEl('.comment-form-comment textarea');

export function comment() {
  addEvent(textarea,'focus',add_focus);
}

function add_focus(){
  addCss(label, 'label_stable');
  setTimeout(()=>{label.innerHTML+=' :';},400);
  rmvEvent(textarea,'focus',add_focus);
}