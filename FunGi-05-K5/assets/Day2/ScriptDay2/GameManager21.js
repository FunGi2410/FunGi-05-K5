// - Tạo hai đối tượng `player` và `enemy` với các thuộc tính:
//   - `health`: 100.
//   - `attack`: Ngẫu nhiên từ 10 đến 20.
//   - `defense`: Ngẫu nhiên từ 5 đến 15.
//   - `energy`: 50.

// - Lượt Tấn Công:
//   - Người chơi chọn một trong ba hành động:
//     - Attack: Gây sát thương = `attack - defense`.
//     - Skill: Nếu `energy >= 30`, gây sát thương gấp đôi và trừ 30 năng lượng.
//     - Recover energy: +20 năng lượng (tối đa 100).
//   - Sau đó, đối phương tự động tấn công.

// - Kết Thúc Trò Chơi:
//   - Trò chơi kết thúc khi máu của `player` hoặc `enemy` cạn.
//   - Hiển thị người chiến thắng.

cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
        enemyMode: cc.Node,

        isPlayerTurn: true,

        gameOverViewNode: cc.Node,
        winnerLabel: cc.Label,
        // Button
        attackBnt: cc.Button,
        skillBnt: cc.Button,
        manaBnt: cc.Button,
    },

    onLoad () {
        this.player = this.playerNode.getComponent('Player21');
        this.enemy = this.enemyMode.getComponent('Enemy21');
    },

    start () {
    },

    update (dt) {

    },

    gameOverCheck(){
        if(this.player.isDead()){
            // Enemy win
            this.gameOverView("Enemy");
        }
        else if(this.enemy.isDead()){
            // Player win
            this.gameOverView("Player");
        }
    },

    gameOverView(name){
        this.winnerLabel.string = name + " win!!!";
        this.gameOverViewNode.active = true;

        this.activeBnt(false);
    },

    activeBnt(state){
        this.attackBnt.interactable = state;
        this.skillBnt.interactable = state;
        this.manaBnt.interactable = state;
    },

    setPlayerTurn(isTurn){
        this.isPlayerTurn = isTurn;
    }

    
});
