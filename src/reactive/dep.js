var uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    //用数组存储自己的订阅者
    //数组里面放的是watcher的实例
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
    console.log(this.subs);
  }
  notify() {
    console.log("我是notify--派发跟新");
    const subs = this.subs.slice();
    console.log(subs, 2222);
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
