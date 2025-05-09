
cc.Class({
    extends: cc.Component,

    properties: {
        totalScoreLabel: cc.Label,
        timerLabel: cc.Label,
        resultPanel: cc.Node,
        finalScoreLabel: cc.Label,
        pausePanel: cc.Node,
        pauseBntNode: cc.Node,

        timeBar: cc.ProgressBar,
    },

    onLoad () {
        this.resultPanel.active = false;
        this.pausePanel.active = false;

        this.totalScore = 0;
        this.timer = 60;
        this.isGameOver = false;
        this.isPauseGame = false;
    },

    start () {
        this.timerLabel.string = this.timer;
        this.timeBar.progress = this.timer / 60;

        this.counterTime();
    },

    update (dt) {
        
    },

    isGameOverFunc(){
        return this.isGameOver;
    },

    sumScore(score){
        this.totalScore += score;

        this.totalScoreLabel.string = this.totalScore;
    },

    counterTime(){
        this.scheduleOnce(() => {
            if(this.timer <= 1){
                this.timer--;
                this.timerLabel.string = this.timer;
                this.isGameOver = true;
                this.updateGameOverUI();
                return;
            }
            this.timer--;
            this.timerLabel.string = this.timer;
            this.timeBar.progress = this.timer / 60;
            this.counterTime();
        }, 1);
    },

    updateGameOverUI(){
        this.totalScoreLabel.node.active = false;
        this.timerLabel.node.active = false;
        this.resultPanel.active = true;
        this.finalScoreLabel.string = this.totalScoreLabel.string;
        this.pauseBntNode.active = false;
        this.timeBar.node.active = false;
    },

    onRestartGame(){
        // cc.director.loadScene(cc.director.getScene().name);
        cc.director.loadScene("D4");
        this.onResumeGame();
    },

    onPauseGame(){
        this.isPauseGame = !this.isPauseGame;
        this.pausePanel.active = this.isPauseGame;
        if(this.isPauseGame)
            cc.director.pause();
        else this.onResumeGame();
    },

    onResumeGame(){
        cc.director.resume();
    },
});
