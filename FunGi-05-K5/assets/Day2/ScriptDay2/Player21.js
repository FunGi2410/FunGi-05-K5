//   - `health`: 100.
//   - `attack`: Ngẫu nhiên từ 10 đến 20.
//   - `defense`: Ngẫu nhiên từ 5 đến 15.
//   - `energy`: 50.

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,
        dame: 0,
        defense: 0,
        mana: 50,

        enemyMode: cc.Node,
        gameManagerNode: cc.Node,

        // ui
        hpLabel: cc.Label,
        manaLabel: cc.Label,
        dameLabel: cc.Label,
        defLabel: cc.Label,
    },

    onLoad () {
        this.enemy = this.enemyMode.getComponent('Enemy21');
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

    onAttack(){
        
        this.enemy.dameReceiver(this.dame);
        this.gameManager.activeBnt(false);

        // Enemy attack
        this.enemy.onTurn();

        this.gameManager.gameOverCheck();
    },

    onSkill(){
        if(this.mana >= 30){
            this.mana -= 30;
            this.enemy.dameReceiver(this.dame * 2);

            this.updateUI();

            // Enemy attack
            this.enemy.onTurn();

            this.gameManager.gameOverCheck();
        }
    },

    onMana(){
        if(this.mana < 100){
            this.mana += 20;
            if(this.mana >= 100) this.mana = 100;
            this.updateUI();

            // Enemy attack
            this.enemy.onTurn();

            this.gameManager.gameOverCheck();
        }
    },

    dameReceiver(dame){
        
        dame = dame - this.defense;
        if(dame <= 0) dame = 0;
        this.hp -= dame;
        if(this.hp <= 0) this.hp = 0;
        this.hpLabel.string = "Hp: " + this.hp;
    },

    updateUI(){
        this.hpLabel.string = "Hp: " + this.hp;
        this.manaLabel.string = "Mana: " + this.mana;
        this.dameLabel.string = "Dame: " + this.dame;
        this.defLabel.string = "Defense: " + this.defense;
    },

    isDead(){
        return this.hp <= 0;
    },

    _random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
});
