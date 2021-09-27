import Dep from "./dep";
var uid = 0;
export default class Watcher {
  constructor(data, expression, cb) {
    this.id = uid++;
    this.data = data;
    this.expression = expression;
    this.cb = cb;
    this.getter = parsePath(expression);
    this.value = this.get();
  }
  update() {
    this.run();
  }
  run() {
    this.getAndInvoke(this.cb);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value === "object") {
      const oldValue = value;
      this.value = value;
      cb.call(this.data, value, oldValue);
    }
  }
  get() {
    Dep.target = this;
    const obj = this.data;
    var value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }
}

function parsePath(expression) {
  const segments = expression.split(".");
  return (obj) => {
    for (let key of segments) {
      if (!obj) return;
      obj = obj[key];
    }
    return obj;
  };
}
function pushTarget(_target) {
  targetStack.push(Deps.target);
  Deps.target = _target;
}
function popTarget() {
  Deps.target = targetStack.pop();
}
