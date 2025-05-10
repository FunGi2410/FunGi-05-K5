
cc.Class({
    extends: cc.Component,

    properties: {
        // Label
        scoreLabel: cc.Label,
    },

    onLoad () {
        this.isClicked = false;
        this.score = 1;
        this.rigid = this.node.getComponent(cc.RigidBody);
        // add event click
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    start () {
        this.score = this._randomInt(1, 10);
        this.scoreLabel.string = this.score;

        let timeLife = this._randomFloat(1, 2);
        this.scheduleOnce(() => {
            this.onMiss();
        }, timeLife);

        // push up when spawn
        let force = this._randomInt(6, 8);
        this.pushUp(force * 100);
    },

    // update (dt) {},

    pushUp(force){
        if(!this.rigid) return;
        this.rigid.linearVelocity = cc.v2(0, force); 
    },

    onMiss(){
        if(this.isClicked) return;
        let event = new cc.Event.EventCustom("BUBBLE_CLICK", true);
        event.detail = { score: 0 };
        this.node.dispatchEvent(event); 

        this.node.destroy(); 
    },

    onClick(){
        this.isClicked = true;
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
        cc.tween(this.node)
            .to(0.5, { opacity: 0 }) // mờ dần trong 0.5 giây
            .call(() => {
                this.node.destroy(); // xoá node sau khi mờ
            })
            .start();

        // call spawn func
        let event = new cc.Event.EventCustom("BUBBLE_CLICK", true);
        event.detail = { score: this.score };
        this.node.dispatchEvent(event); 

        //this.node.destroy(); 
    },

    _randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    _randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
});
