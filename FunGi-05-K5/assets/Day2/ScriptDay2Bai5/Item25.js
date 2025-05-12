cc.Class({
    extends: cc.Component,

    properties: {
        nameItem: " ", 
        price: 0, 

        shopManager: cc.Component,
    },

    onLoad () {
        this.dragNode = cc.Node;

        let shopManagerNode = cc.find("ShopManager");
        if (shopManagerNode) {
            this.shopManager = shopManagerNode.getComponent("ShopManager");
        }

        // add event click item
        this.node.on(cc.Node.EventType.TOUCH_END, this.showInfo, this);

        // this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     this.shopManager.showInfoItem(this.nameItem, this.price, this.node);
        // }, this);
    },

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.showInfo, this);
    },

    showInfo(){
        this.shopManager.showInfoItem(this.nameItem, this.price, this.node);
    },

    initItem(name, price){
        this.nameItem = name;
        this.price = price;
    },

    start () {
    },

    // update (dt) {},

});

