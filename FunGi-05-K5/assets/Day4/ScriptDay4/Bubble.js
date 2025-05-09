
cc.Class({
    extends: cc.Component,

    properties: {
        score: 1,
    },

    onLoad () {
        // add event click
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    start () {
        this.score = _randomInt(1, 10)
        let timeLife = this._randomFloat(1, 3);
        this.scheduleOnce(() => {
            this.onClick();
        }, timeLife);
    },

    // update (dt) {},

    onClick(){
        // call spawn func
        let event = new cc.Event.EventCustom("bubble-clicked", true);
        this.node.dispatchEvent(event); 

        this.node.destroy(); 
    },

    _randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    _randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
});
