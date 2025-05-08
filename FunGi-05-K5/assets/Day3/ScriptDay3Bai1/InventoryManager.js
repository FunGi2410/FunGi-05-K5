
cc.Class({
    extends: cc.Component,
    
    properties: {
        nameItemLabel: cc.Label,
        quantityLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,

        infoPanel: cc.Node,

        itemNode: cc.Node,

        itemPrefab: cc.Prefab,
        layoutItems: cc.Node,
    },

    onLoad () {
        this.itemsData = [
            {
                name: "Item 1",
                quantity: 10,
                type: "Weapon",
                effect: "A powerful sword."
            },
            {
                name: "Item 2",
                quantity: 5,
                type: "Armor",
                effect: "A strong shield."
            },
            {
                name: "Item 3",
                quantity: 20,
                type: "Potion",
                effect: "Heals 50 HP."
            },
            {
                name: "Item 3",
                quantity: 20,
                type: "Potion",
                effect: "Heals 50 HP."
            },
            {
                name: "Item 3",
                quantity: 20,
                type: "Potion",
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
    

    showInfoItem(name, quantity, type, effect, itemNode){
        this.nameItemLabel.string = name;
        this.quantityLabel.string = quantity;
        this.typeLabel.string = type;
        this.effectLabel.string = effect;

        this.infoPanel.active = true;

        this.itemNode = itemNode;
    },

    removeItem(){
        this.itemNode.destroy();
        this.infoPanel.active = false;
    },
});
