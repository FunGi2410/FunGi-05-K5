
cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,
        dame: 0,
        defense: 0,
        mana: 50,

        playerSpriteNode: cc.Node,
        
        playerNode: cc.Node,
        gameManagerNode: cc.Node,

        // ui
        hpLabel: cc.Label,
        manaLabel: cc.Label,
        dameLabel: cc.Label,
        defLabel: cc.Label,
    },

    onLoad () {
        this.player = this.playerNode.getComponent('Player21');
        this.gameManager = this.gameManagerNode.getComponent('GameManager21');

        this.hp = 100;
        this.mana = 50;
    },

    start () {
        this.dame = this._random(10, 20);
        this.defense = this._random(5, 15);

        this.updateUI();
    },

    // update (dt) {},

    onTurn(){
        this.state = this._random(1, 3);
        switch (this.state) {
            case 1:
                this.onAttack();
                break;
            case 2:
                this.onSkill();
                break;
            case 3:
                this.onMana();
                break;
        
            default:
                break;
        }

        this.gameManager.gameOverCheck();
    },

    move(dis) {
        let playerPos = this.playerSpriteNode.position.clone();
        playerPos.x += dis;  // Đẩy lùi Enemy sang phải 50 đơn vị

        // Cập nhật lại vị trí mới của Enemy
        this.playerSpriteNode.setPosition(playerPos);
    },

    onAttack(){
        this.player.dameReceiver(this.dame);

        this.move(-50);
        this.scheduleOnce(() => {
            this.move(50);
        }, 0.2);

        this.gameManager.activeBnt(true);
    },

    onSkill(){
        if(this.mana >= 30){
            this.mana -= 30;
            this.player.dameReceiver(this.dame * 2);

            this.updateUI();

            this.move(-50);
            this.scheduleOnce(() => {
                this.move(50);
            }, 0.2);
        }

        this.gameManager.activeBnt(true);
    },

    onMana(){
        if(this.mana < 100){
            this.mana += 20;
            if(this.mana >= 100) this.mana = 100;
            this.updateUI();
        }

        this.gameManager.activeBnt(true);
    },

    dameReceiver(dame){
        dame = dame - this.defense;
        if(dame <= 0) dame = 0;
        this.hp -= dame;
        if(this.hp <= 0) this.hp = 0;
        this.hpLabel.string = "Hp: " + this.hp;
    },

    isDead(){
        return this.hp <= 0;
    },

    updateUI(){
        this.hpLabel.string = "Hp: " + this.hp;
        this.manaLabel.string = "Mana: " + this.mana;
        this.dameLabel.string = "Dame: " + this.dame;
        this.defLabel.string = "Defense: " + this.defense;

        this.player.updateUI();
    },

    _random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
