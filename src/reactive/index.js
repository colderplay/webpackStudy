import Observer from "./Observer";

//obj内有嵌套属性
export function observe(value) {
  if (typeof value !== "object") return;
  new Observer(value);
}
