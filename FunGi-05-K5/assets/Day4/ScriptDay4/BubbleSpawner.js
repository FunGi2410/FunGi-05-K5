
cc.Class({
    extends: cc.Component,

    properties: {
        bubblePref: cc.Prefab,

        gameManagerNode: cc.Node,
    },

    onLoad () {
        // enable physic 
        cc.director.getPhysicsManager().enabled = true;

        this.gameManager = this.gameManagerNode.getComponent('GameManager');

        // get win size
        this.widthWinSize = cc.winSize.width;
        this.heightWinSize = cc.winSize.height;
        this.halfW = this.widthWinSize / 2;
        this.halfH = this.heightWinSize / 2;

        let bubbleSize = this._getBubbleSize();
        this.halfW = this.halfW - bubbleSize.width / 2;
        this.halfH = this.halfH - bubbleSize.height / 2;
        //this.halfH = this.halfH + bubbleSize.height;

        this.node.on("BUBBLE_CLICK", this.onBubbleClicked, this);
    },

    onDestroy(){
        this.node.off("BUBBLE_CLICK", this.onBubbleClicked, this);
    },

    start () {
        this.spawn();
    },

    onBubbleClicked(event) {
        let score = event.detail.score;
        this.gameManager.sumScore(score);

        this.spawn();
    },

    _getBubbleSize() {
        let temp = cc.instantiate(this.bubblePref); 
        let size = temp.getContentSize();         
        temp.destroy();                           
        return size;
    },

    spawn(){
        if(this.gameManager.isGameOverFunc()) {
            this.node.off("BUBBLE_CLICK", this.onBubbleClicked, this);
            return;
        }
        let newBubble = cc.instantiate(this.bubblePref);

        this._randomWinSize();

        newBubble.setPosition(this.x, this.y);
        newBubble.parent = this.node;
    },

    _randomWinSize(){
        this.x = this._randomFloat(-this.halfW, this.halfW);
        //this.y = this._randomFloat(-this.halfH, this.halfH);
        this.y = -this.halfH;
    },

    _randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    // update (dt) {},
});
