//Ready
export function ready(fn: any) {
  if(document.readyState === "interactive" || document.readyState === "complete"){
    fn();
    return;
  }
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", ()=>{
      fn();
    });
  } else {
    (<any>document).attachEvent("onreadystatechange", function () {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
      }
    });
  }
}