cc.Class({
    extends: cc.Component,

    properties: {
        nameItem: " ", 
        quantity: 0, 
        type: " ",
        effect: " ",

        // inventoryManagerNode: cc.Node,
        inventoryManager: cc.Component,
    },

    onLoad () {
        let inventoryManagerNode = cc.find("InventoryManager");
        if (inventoryManagerNode) {
            this.inventoryManager = inventoryManagerNode.getComponent("InventoryManager");
        }

        // add event click item
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.inventoryManager.showInfoItem(this.nameItem, this.quantity, this.type, this.effect, this.node);
        }, this);
    },

    initItem(name, quantity, type, effect){
        this.nameItem = name;
        this.quantity = quantity;
        this.type = type;
        this.effect = effect;
    },

    start () {
    },

    // update (dt) {},
});

