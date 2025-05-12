
cc.Class({
    extends: cc.Component,

    properties: {
        nameQuestLabel: cc.Label,
        stateToggle: cc.Toggle,
    },

    onLoad () {
        this.ORIGIN_COLOR = new cc.Color(0, 0, 0);
        this.SELECT_COLOR = new cc.Color(76, 147, 202);

        this.nameQuest = "";
        this.state = false;
        this.index = 0;

        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    },

    start () {

    },

    onClick(){
        let event = new cc.Event.EventCustom("QUEST_CLICK", true);
        event.detail = { 
            index: this.index,
            questNode: this.node,
        };
        this.node.dispatchEvent(event);
    },

    setSelected(isSelected) {
        this.nameQuestLabel.node.color = isSelected ? this.SELECT_COLOR : this.ORIGIN_COLOR;
    },

    initQuest(name, state, index){
        this.nameQuest = name;
        this.state = state;
        this.index = index;

        this.updateUI();
    },

    setState(state){
        this.state = state;

        this.updateUI();
    },

    updateUI(){
        this.nameQuestLabel.string = this.nameQuest;
        this.stateToggle.isChecked = this.state;
    },

});
