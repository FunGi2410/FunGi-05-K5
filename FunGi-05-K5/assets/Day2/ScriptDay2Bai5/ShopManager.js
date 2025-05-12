
cc.Class({
    extends: cc.Component,
    
    properties: {
        nameItemLabel: cc.Label,
        priceLabel: cc.Label,
        spriteItem: cc.Sprite,
        coinsLabel: cc.Label,

        scrollView: cc.ScrollView,

        infoPanel: cc.Node,

        itemPrefabs: {
            default: [],
            type: [cc.Prefab] 
        },

        layoutItems: cc.Node,
    },

    onLoad () {
        this.coins = 200;
        this.itemNode = cc.Node;
        this.itemsData = [
            {
                prefabIndex: 0,
                name: "Kiếm",
                price: 1,
            },
            {
                prefabIndex: 1,
                name: "Khiên",
                price: 5,
            },
            {
                prefabIndex: 3,
                name: "Bình máu",
                price: 1,
            },
            {
                prefabIndex: 4,
                name: "Bình mana",
                price: 20,
            },
            {
                prefabIndex: 1,
                name: "Khiên",
                price: 5,
            },
            {
                prefabIndex: 3,
                name: "Bình máu",
                price: 1,
            },
            {
                prefabIndex: 4,
                name: "Bình mana",
                price: 20,
            },

        ];
    },

    start () {
        this.infoPanel.active = false;
        this.coinsLabel.stirng = this.coins;

        this.loadItems();
    },

    // update (dt) {},

    buyItem(){
        let item = this.itemNode.getComponent("Item25");
        if(this.coins >= item.price){
            this.coins -= item.price;
            this.removeItem();

            this.updateUI(item.nameItem, item.price);
        }
    },

    removeItem(){
        this.itemNode.destroy();
        this.infoPanel.active = false;
    },

    loadItems() {
        this.itemsData.forEach((item) => { 
            let itemPrefab = this.itemPrefabs[item.prefabIndex];
            let newItem = cc.instantiate(itemPrefab);
            newItem.parent = this.layoutItems;
    
            let itemScript = newItem.getComponent("Item25");
            if (itemScript) {
                itemScript.initItem(item.name, item.price); 
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

    updateUI(name, price){
        this.nameItemLabel.string = name;
        this.priceLabel.string = price + "$";
        this.coinsLabel.string = this.coins;
    },
    

    showInfoItem(name, price, itemNode){
        this.updateUI(name, price);

        this.infoPanel.active = true;

        this.itemNode = itemNode;

        let spriteItem = this.itemNode.getComponent(cc.Sprite);
        this.spriteItem.spriteFrame = spriteItem.spriteFrame;
    },

    activeScroll(state){
        let sv = this.scrollView.getComponent(cc.ScrollView);
        sv.enabled = state;
    }
});
