import { animationElement } from "../../partials/js/_animation";
import { getEl } from "../../partials/js/_DOM";
import { removeCss, addCss } from "../../partials/js/_css";

export function presentation (){
    getEl('.featuredPosts')&&new animationElement('.featuredPosts',()=>{
      let ftdPstsAnim=getEl('.featuredPosts-item_anim',true);
      removeCss(ftdPstsAnim[1] ,'featuredPosts-item_anim');
      setTimeout(()=>{
        ftdPstsAnim.forEach(el => {
          removeCss(el,'featuredPosts-item_anim');
        });
      },600);
    },0.7);
    getEl('.features')&&new animationElement('.features',()=>{
      getEl('.features-item',true).forEach(el=>{
        addCss(el,'features_anim_bubble');
      });
    },0.7);
    getEl('.rwd')&&new animationElement('.rwd',()=>{
      removeCss(getEl('.rwd_anim'),'rwd_anim');
    },0.7);
    getEl('.mbl')&&new animationElement('.mbl',()=>{
      getEl('.mbl_anim',true).forEach(el=>{
        removeCss(el,'mbl_anim');
      });
    },0.7);
    getEl('.c2a')&&new animationElement('.c2a',()=>{
      addCss(getEl('.c2a_anim'),'c2a_anim_bubble');
    },1.5);
}