import { animationElement } from "../partials/_animation";
import { getEl } from "../partials/_DOM";
import { removeCss, addCss } from "../partials/_css";

export function presentation (){
    new animationElement('.featuredPosts',()=>{
      let ftdPstsAnim=getEl('.featuredPosts-item_anim',true);
      removeCss(ftdPstsAnim[1] ,'featuredPosts-item_anim');
      setTimeout(()=>{
        ftdPstsAnim.forEach(el => {
          removeCss(el,'featuredPosts-item_anim');
        });
      },600);
    },0.3);
    new animationElement('.features',()=>{
      getEl('.features-item',true).forEach(el=>{
        addCss(el,'features_anim_bubble');
      });
    },0.6);
    new animationElement('.rwd',()=>{
      removeCss(getEl('.rwd_anim'),'rwd_anim');
    },0.6);
    new animationElement('.mbl',()=>{
      getEl('.mbl_anim',true).forEach(el=>{
        removeCss(el,'mbl_anim');
      });
    },0.6);
    new animationElement('.c2a',()=>{
      addCss(getEl('.c2a_anim'),'c2a_anim_bubble');
    },2.2);
}