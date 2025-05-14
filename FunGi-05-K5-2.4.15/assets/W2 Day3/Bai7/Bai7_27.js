/*
    1. Quản lý hành vi nhân vật (Character Behavior)
    2. Hành vi của AI
    3. Xây dựng UI động (UI Builder)
    4. Cutscene hoặc hoạt cảnh (Cutscene Scripting)
    5. Xử lý animation sequence
    6. Tạo các lệnh test/gameplay script dễ đọc
    7. Xây dựng hệ thống cấu hình/setting
*/


cc.Class({
    extends: cc.Component,

    properties: {
        stateLabel: cc.Label,
    },

    onLoad () {
        this.stateLabel.string = "";
    },

    start () {
        const lazyMan = new LazyMan('jack', this.stateLabel);
        
        lazyMan.eat('apple').sleep(5000).eat('hamburger').sleep(3000).eat('pear');
    },
});

class LazyMan {
    constructor(name, label) {
        this.queue = [];
        this.label = label; 

        this.queue.push(() => {
            this.setStateLabel(`My name is ${name}`);
            this.next();
        });

        setTimeout(() => this.next(), 0);
    }

    eat(food) {
        this.queue.push(() => {
            this.setStateLabel(`I am eating ${food}`);
            this.next();
        });
        return this;
    }

    sleep(time) {
        this.queue.push(() => {
            this.setStateLabel('I am sleeping...');
            setTimeout(() => {
                this.setStateLabel(`After ${time / 1000} seconds`);
                this.next();
            }, time);
        });
        return this;
    }

    next() {
        const fn = this.queue.shift();
        fn && fn();
    }

    setStateLabel(message) {
        console.log(message);
        if (this.label) {
            this.label.string += message + '\n';
        }
    }
}


