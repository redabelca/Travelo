//Ready
export function ready(fn: any) {
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
      }
    });
  }
}