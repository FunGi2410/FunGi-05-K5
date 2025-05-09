
cc.Class({
    extends: cc.Component,

    properties: {
        bubblePref: cc.Prefab,

        gameManagerNode: cc.Node,
    },

    onLoad () {
        this.gameManager = this.gameManagerNode.getComponent('GameManager');

        // get win size
        this.widthWinSize = cc.winSize.width;
        this.heightWinSize = cc.winSize.height;
        this.halfW = this.widthWinSize / 2;
        this.halfH = this.heightWinSize / 2;

        this.node.on("bubble-clicked", this.onBubbleClicked, this);
    },

    onDestroy(){
        this.node.off("bubble-clicked", this.onBubbleClicked, this);
    },

    start () {
        this.spawn();
    },

    onBubbleClicked(event) {
        let score = event.detail.score;
        this.gameManager.sumScore(score);

        this.spawn();
    },

    spawn(){
        console.log(this.gameManager.isGameOverFunc());
        if(this.gameManager.isGameOverFunc()) 
            this.node.off("bubble-clicked", this.onBubbleClicked, this);

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
