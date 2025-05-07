
cc.Class({
    extends: cc.Component,

    properties: {
        scoreText: cc.Label,
        hpText: cc.Label
    },

    onLoad () {
        this._score = 0;
        this._hp = 0;
    },

    start () {
        this.scoreText.string = "Score: " + this._score;
        this.hpText.string = "HP: " + this._hp;
    },

    update (dt) {},

    onScore(){
        this._score += 1;
        this.scoreText.string = "Score: " + this._score;
        if(this._score % 10 == 0)
            this._hp++;
        this.hpText.string = "HP: " + this._hp;
    }
});
