import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");

// const vnode = h("ul", [
//   h("li", { key: "A" }, "A"),
//   h("li", { key: "B" }, "B"),
//   h("li", { key: "C" }, "C"),
//   h("li", { key: "D" }, "D"),
// ]);
// patch(container, vnode);
// console.log(vnode);
// const newVnode = h("ul", [
//   h("li", { key: "A" }, "A"),
//   h("li", { key: "B" }, "B"),
//   h("li", { key: "C" }, "C"),
//   h("li", { key: "D" }, "D"),
//   h("li", { key: "E" }, "E"),
// ]);

// patch(vnode, newVnode);

const obj = { a: { b: { c: 9 } }, e: 4, arr: [1, 2, 3] };
import { observe } from "./reactive/index";
import Watcher from "./reactive/watch";
observe(obj);

new Watcher(obj, "e", (val) => {
  console.log("#####", val);
});
obj.e = 10;
// console.log(obj);
// console.log(obj.e);
// obj.arr.push(4);
