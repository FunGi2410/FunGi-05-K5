
cc.Class({
    extends: cc.Component,

    properties: {
        totalScoreLabel: cc.Label,
        timerLabel: cc.Label,
        resultPanel: cc.Node,
        finalScoreLabel: cc.Label,
    },

    onLoad () {
        this.resultPanel.active = false;

        this.totalScore = 0;
        this.timer = 5;
        this.isGameOver = false;
    },

    start () {
        this.timerLabel.string = this.timer;
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
            if(this.timer <= 0){
                this.isGameOver = true;
                this.updateGameOverUI();
                return;
            }
            this.timer--;
            this.timerLabel.string = this.timer;
            this.counterTime();
        }, 1);
    },

    updateGameOverUI(){
        this.totalScoreLabel.node.active = false;
        this.timerLabel.node.active = false;
        this.resultPanel.active = true;
        this.finalScoreLabel.string = this.totalScoreLabel.string;
    },
});
