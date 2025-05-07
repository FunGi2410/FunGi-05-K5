// 10. Tạo hệ thống kiểm tra cấp độ nhân vật:
//     - Tạo biến `level` với giá trị từ 1–10.
//     - Khi nhấn nút "Check Level", hiển thị thông báo:
//       - Level 1–3: "Beginner".
//       - Level 4–7: "Intermediate".
//       - Level 8–10: "Expert".
cc.Class({
    extends: cc.Component,

    properties: {
        level: 1,
        levelText: cc.Label,
        levelInput: cc.EditBox,
    },


    onLoad () {},

    start () {

    },

    // update (dt) {},

    onCheckLevel(){
        this.level = this.levelInput.string * 1;
        if(this.level >= 1 && this.level <= 3) this.levelText.string = "Beginner";
        else if(this.level >= 4 && this.level <= 7) this.levelText.string = "Intermediate";
        else if(this.level >= 8 && this.level <= 10) this.levelText.string = "Expert";
        else this.levelText.string = "Wrong!";
    }
});
