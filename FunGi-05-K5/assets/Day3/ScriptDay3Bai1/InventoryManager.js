
cc.Class({
    extends: cc.Component,
    
    properties: {
        nameItemLabel: cc.Label,
        quantityLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,
        itemEquipLabel: cc.Label,

        infoPanel: cc.Node,

        itemNode: cc.Node,

        itemPrefab: cc.Prefab,
        layoutItems: cc.Node,
    },

    onLoad () {
        this.itemsData = [
            {
                name: "Kiếm",
                quantity: 1,
                type: "equipment",
                effect: "A powerful sword."
            },
            {
                name: "Khiên",
                quantity: 5,
                type: "equipment",
                effect: "A strong shield."
            },
            {
                name: "Bình máu",
                quantity: 1,
                type: "consumable",
                effect: "Heals 50 HP."
            },
            {
                name: "Bình mana",
                quantity: 20,
                type: "consumable",
                effect: "Heals 50 HP."
            },
            {
                name: "Giày",
                quantity: 7,
                type: "equipment",
                effect: "Heals 50 HP."
            },

        ];
    },

    start () {
        this.infoPanel.active = false;

        this.loadItems();
    },

    // update (dt) {},

    loadItems() {
        this.itemsData.forEach((item) => { 
            let newItem = cc.instantiate(this.itemPrefab);
            newItem.parent = this.layoutItems;
    
            let itemScript = newItem.getComponent("Item");
            if (itemScript) {
                itemScript.initItem(item.name, item.quantity, item.type, item.effect); 
            }
        });
    },

    useItem(){
        let item = this.itemNode.getComponent("Item");
        if(item.type == "consumable"){
            item.quantity--;
            if(item.quantity <= 0)
                this.removeItem();
        }
        else if(item.type == "equipment"){
            this.removeItem();
            this.itemEquipLabel.string = "Đã trang bị " + item.nameItem;

            this.scheduleOnce(() => {
                this.itemEquipLabel.node.active = true;
            }, 0.2);

            this.scheduleOnce(() => {
                this.itemEquipLabel.node.active = false;
            }, 3);
        }

        this.updateUI(item.nameItem, item.quantity, item.type, item.effect);
    },

    updateUI(name, quantity, type, effect){
        this.nameItemLabel.string = name;
        this.quantityLabel.string = quantity;
        this.typeLabel.string = type;
        this.effectLabel.string = effect;
    },
    

    showInfoItem(name, quantity, type, effect, itemNode){
        this.updateUI(name, quantity, type, effect);

        this.infoPanel.active = true;

        this.itemNode = itemNode;
    },

    removeItem(){
        this.itemNode.destroy();
        this.infoPanel.active = false;
    },
});
