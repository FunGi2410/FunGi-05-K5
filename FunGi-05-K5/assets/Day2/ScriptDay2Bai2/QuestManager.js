// 3. Nhiệm Vụ
//    - Tạo danh sách nhiệm vụ (`questList`) với các nhiệm vụ có trạng thái `completed` hoặc `incomplete`.
//    - Viết hàm hoàn thành nhiệm vụ (`completeQuest(index)`) để cập nhật trạng thái nhiệm vụ.
//    - Hiển thị danh sách nhiệm vụ và trạng thái hiện tại.
cc.Class({
    extends: cc.Component,

    properties: {
        questPrefab: cc.Prefab,
        layoutQuests: cc.Node,
    },

    onLoad () {
        this.questSelectNode = null;
        this.questSelectIndex = false;
        this.questData = [
            {
                name: "Diệt 10 quái",
                state: false,
            },
            {
                name: "Gặp cô tiên",
                state: true,
            },
            {
                name: "Uống nước",
                state: false,
            },
            {
                name: "Thiền",
                state: true,
            },
            {
                name: "Đánh boss",
                state: false,
            },
            {
                name: "Thu thập cỏ",
                state: true,
            },
            {
                name: "Mua 10 bình máu",
                state: false,
            },
            {
                name: "Sử dụng bình máu",
                state: true,
            },
        ];
    },

    start () {
        this.loadQuests();
    },

    completeQuest(){
        let quest = this.questSelectNode.getComponent("Quest");
        quest.setState(true);
    },

    selectQuest(index) {
        this.questSelectIndex = index;
    
        this.layoutQuests.children.forEach((child, i) => {
            let questScript = child.getComponent("Quest");
            questScript.setSelected(i === index);
        });
    },

    loadQuests() {
        this.questData.forEach((quest, index) => { 
            let newQuest = cc.instantiate(this.questPrefab);
            newQuest.parent = this.layoutQuests;
    
            let questScript = newQuest.getComponent("Quest");
            if (questScript) {
                questScript.initQuest(quest.name, quest.state, index); 
            }

            newQuest.on("QUEST_CLICK", (event) => {
                let clickedIndex = event.detail.index;
                this.questSelectNode = event.detail.questNode;
                this.selectQuest(clickedIndex);
            });
        });
    },

});
