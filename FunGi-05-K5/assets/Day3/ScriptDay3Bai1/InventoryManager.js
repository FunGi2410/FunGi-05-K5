
cc.Class({
    extends: cc.Component,
    
    properties: {
        nameItemLabel: cc.Label,
        quantityLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,
        itemEquipLabel: cc.Label,
        spriteItem: cc.Sprite,
        scrollView: cc.ScrollView,

        infoPanel: cc.Node,

        itemNode: cc.Node,

        itemPrefabs: {
            default: [],
            type: [cc.Prefab] 
        },

        layoutItems: cc.Node,

        // add item
        addItemPanel: cc.Node,

        inputName: cc.EditBox,
        inputQuantity: cc.EditBox,
        inputType: cc.EditBox,
        inputEffect: cc.EditBox,

        inputSearch: cc.EditBox,
    },

    onLoad () {
        this.itemsData = [
            {
                prefabIndex: 0,
                name: "Kiếm",
                quantity: 1,
                type: "equipment",
                effect: "A powerful sword."
            },
            {
                prefabIndex: 1,
                name: "Khiên",
                quantity: 5,
                type: "equipment",
                effect: "A strong shield."
            },
            {
                prefabIndex: 3,
                name: "Bình máu",
                quantity: 1,
                type: "consumable",
                effect: "Heals 50 HP."
            },
            {
                prefabIndex: 4,
                name: "Bình mana",
                quantity: 20,
                type: "consumable",
                effect: "Heals 50 HP."
            },
            {
                prefabIndex: 1,
                name: "Khiên",
                quantity: 5,
                type: "equipment",
                effect: "A strong shield."
            },
            {
                prefabIndex: 3,
                name: "Bình máu",
                quantity: 1,
                type: "consumable",
                effect: "Heals 50 HP."
            },
            {
                prefabIndex: 4,
                name: "Bình mana",
                quantity: 20,
                type: "consumable",
                effect: "Heals 50 HP."
            },

        ];
    },

    start () {
        this.infoPanel.active = false;
        this.addItemPanel.active  = false;

        this.loadItems();
    },

    // update (dt) {},

    searchItems() {
        let key = this.inputSearch.string.trim().toLowerCase();

        this.layoutItems.removeAllChildren();

        let searchedItems = this.itemsData.filter(item =>
            item.name.toLowerCase().includes(key)
        );

        searchedItems.forEach((item) => {
            let itemPrefab = this.itemPrefabs[item.prefabIndex];
            if (!itemPrefab) return;

            let newItem = cc.instantiate(itemPrefab);
            newItem.parent = this.layoutItems;

            let itemScript = newItem.getComponent("Item");
            if (itemScript) {
                itemScript.initItem(item.name, item.quantity, item.type, item.effect);
            }
        });
    },


    activeAddItemForm(){
        this.addItemPanel.active  = true;
    },

    addNewItem() {
        let name = this.inputName.string.trim();
        let quantity = parseInt(this.inputQuantity.string);
        let type = this.inputType.string.trim().toLowerCase();
        let effect = this.inputEffect.string.trim();

        if (!name || isNaN(quantity) || !type || !effect) {
            cc.log("Error input");
            return;
        }

        let newItemData = {
            prefabIndex: 0,
            name: name,
            quantity: quantity,
            type: type,
            effect: effect
        };

        this.itemsData.push(newItemData);

        let itemPrefab = this.itemPrefabs[newItemData.prefabIndex];

        let newItem = cc.instantiate(itemPrefab);
        newItem.parent = this.layoutItems;

        let itemScript = newItem.getComponent("Item");
        if (itemScript) {
            itemScript.initItem(name, quantity, type, effect);
        }

        this.addItemPanel.active = false; 
    },

    loadItems() {
        this.itemsData.forEach((item) => { 
            let itemPrefab = this.itemPrefabs[item.prefabIndex];
            let newItem = cc.instantiate(itemPrefab);
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

        let spriteItem = this.itemNode.getComponent(cc.Sprite);
        this.spriteItem.spriteFrame = spriteItem.spriteFrame;
    },

    removeItem(){
        this.itemNode.destroy();
        this.infoPanel.active = false;
    },

    activeScroll(state){
        let sv = this.scrollView.getComponent(cc.ScrollView);
        sv.enabled = state;
    }

});
