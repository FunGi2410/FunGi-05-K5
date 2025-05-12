
cc.Class({
    extends: cc.Component,

    properties: {
        experienceBar: cc.ProgressBar,
        levelLabel: cc.Label,
    },

    onLoad () {
        this.experienceAmount = 0;
        this.experience = 0;
        this.level = 1;
    },

    start () {
        this.updateUI();
    },

    onCompleteQuest(){
        this.experienceAmount = this._random(10, 20);
        this.experience += this.experienceAmount;
        if(this.experience > 100){
            this.experience -= 100;
            this.level++;
        }
        this.updateUI();
    },

    updateUI(){
        this.experienceBar.progress = this.experience / 100;
        this.levelLabel.string = this.level;
    },

    _random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

});
