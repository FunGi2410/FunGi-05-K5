
cc.Class({
    extends: cc.Component,

    properties: {
        bubblePref: cc.Prefab,
    },

    onLoad () {
        // get win size
        this.widthWinSize = cc.winSize.width;
        this.heightWinSize = cc.winSize.height;
        this.halfW = this.widthWinSize / 2;
        this.halfH = this.heightWinSize / 2;

        console.log("w: " + this.widthWinSize);
        console.log("h: " + this.heightWinSize);
        console.log("hw: " + this.halfW);
        console.log("hh: " + this.halfH);

        this.node.on("bubble-clicked", this.onBubbleClicked, this);
    },

    start () {
        this.spawn();
    },

    onBubbleClicked(event) {
        this.spawn();
    },

    spawn(){
        let newBubble = cc.instantiate(this.bubblePref);

        this._randomWinSize();

        newBubble.setPosition(this.x, this.y);
        newBubble.parent = this.node;
    },

    _randomWinSize(){
        this.x = (Math.random() * this.widthWinSize) - this.halfW;
        this.y = (Math.random() * this.heightWinSize) - this.halfH;
    },

    // update (dt) {},
});
