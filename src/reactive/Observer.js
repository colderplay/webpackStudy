import defineReactive from "./defineReactive";
import Dep from "./dep";
//obj有对个属性
export default class Observer {
  constructor(val) {
    this.dep = new Dep();
    //构造函数中的this指向实例  new Observer()
    this.walk(val);
  }

  walk(val) {
    Object.keys(val).forEach((key) => defineReactive(val, key));
  }
  obseveArray() {}
}
