import { getWindowScrollY } from "./_layout";

export let data: any = {};

export function updateData(nameOfData, value) {
  data[nameOfData] = value;
}

export function top(el) {
  return el.getBoundingClientRect().top + getWindowScrollY();
}