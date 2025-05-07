// 8. Tạo hệ thống điểm thưởng:
//    - Khi nhấn nút "Add Score", tăng điểm của người chơi lên 10.
//    - Khi nhấn nút "Reset Score", đặt lại điểm về 0.
//    - Hiển thị điểm hiện tại trên Label.
cc.Class({
    extends: cc.Component,

    properties: {
        scoreText: cc.Label,
        
    },

    onLoad () {
        this.score = 0;
    },

    start () {

    },

    // update (dt) {},

    onAddScore(){
        this.score += 10;
        this.scoreText.string = this.score;
    },

    onResetScore(){
        this.score = 0;
        this.scoreText.string = this.score;
    },
});
