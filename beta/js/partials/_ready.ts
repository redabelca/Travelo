//Ready
export function ready(fn: any) {
  if (document.addEventListener) {
    document.addEventListener("readystatechange", ()=>{
      if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
      }
    });
  } else {
    (<any>document).attachEvent("onreadystatechange", function () {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
      }
    });
  }
}