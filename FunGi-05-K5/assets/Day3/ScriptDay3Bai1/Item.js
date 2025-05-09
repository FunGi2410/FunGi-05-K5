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
        this.dragNode = cc.Node;

        // event drag and drop
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        let inventoryManagerNode = cc.find("InventoryManager");
        if (inventoryManagerNode) {
            this.inventoryManager = inventoryManagerNode.getComponent("InventoryManager");
        }

        // add event click item
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.inventoryManager.showInfoItem(this.nameItem, this.quantity, this.type, this.effect, this.node);
        }, this);
    },

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
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

    onTouchStart(event) {
        this.inventoryManager.showInfoItem(this.nameItem, this.quantity, this.type, this.effect, this.node);
        this.startPos = this.node.getPosition();
       
        this.dragNode = cc.instantiate(this.node);
        this.dragNode.parent = cc.director.getScene(); // kéo ra khỏi scrollview

        let worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let localPos = this.dragNode.parent.convertToNodeSpaceAR(worldPos);
        this.dragNode.setPosition(localPos);

        
        this.dragNode.opacity = 180;
        let bnt = this.dragNode.getComponent(cc.Button);
        bnt.interactable = false;
        this.inventoryManager.activeScroll(false);
    },
    
    onTouchMove(event) {
        if (!this.dragNode) return;

        let delta = event.getDelta();
        this.dragNode.x += delta.x;
        this.dragNode.y += delta.y;
    },
    
    onTouchEnd(event) {
        if (!this.dragNode) return;

        // destroy when collide slot
        let slotZone = cc.find("Canvas/EquipZone");
        let slotBox = slotZone.getBoundingBoxToWorld();
        let itemBox = this.dragNode.getBoundingBoxToWorld();

        if (slotBox.intersects(itemBox)) {
            if(this.type == "equipment")
                this.inventoryManager.useItem();

            this.dragNode.destroy();
            this.dragNode = null;
        } 
        else {
            this.dragNode.destroy();
            this.dragNode = null;
        }
        
        this.inventoryManager.activeScroll(true);
    },
});

