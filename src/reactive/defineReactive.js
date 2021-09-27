import { observe } from ".";
import Dep from "./dep";
export default function defineReactive(obj, key, val) {
  const dep = new Dep();
  if (arguments.length === 2) {
    val = obj[key];
  }
  //如果val不是对象，会直接返回
  observe(val);
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      // console.log("试图访问" + key, "值为" + val);
      console.log(Dep.target, 777);
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      // console.log("试图设置" + key, "值为" + newVal);
      if (newVal === val) {
        return;
      }
      val = newVal;
      //设置的新值也要被监听
      observe(newVal);
      dep.notify();
    },
  });
}
