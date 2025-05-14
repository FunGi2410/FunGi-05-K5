
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        const store1 = new Store('store_1');
        const store2 = new Store('store_2');
        const store3 = new Store('store_3');
        const store4 = new Store('store_4');
        const store5 = new Store('store_5');

        store1.wait(store3);
        store3.wait(store2);
        store2.wait(store5);
        store5.wait(store4);

        this.contribute(3, store1, store2, store3, store4, store5);
    },

    start() {

    },

    async contribute(stepTime, ...stores) {
        for (let store of stores) {
            if (!store.isComplete) {
            await store.run(stepTime); 
            }
        }
    },
});

class Store {
  constructor(name) {
    this.name = name;
    this.depends = []; 
    this.isComplete = false;
  }

  wait(store) {
    this.depends.push(store);
  }

  async run(stepTime) {
    for (let dependency of this.depends) {
      if (!dependency.isComplete) {
        await dependency.run(stepTime);
      }
    }

    console.log(this.name);
    await new Promise(resolve => setTimeout(resolve, stepTime * 1000));
    this.isComplete = true;
  }
}

