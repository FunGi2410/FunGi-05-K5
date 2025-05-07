cc.Class({
    extends: cc.Component,

    properties: {
        gameStatusText: cc.Label,
    },


    onLoad () {

    },

    start () {

    },

    // update (dt) {},

    onStartClick(){
        this.gameStatusText.string = "Game is starting...";
    },

    onExitClick(){
        this.gameStatusText.string = "Good bye!";
    }
});
