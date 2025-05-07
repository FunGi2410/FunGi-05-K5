// 9. Tạo hệ thống đổi trạng thái nhân vật:
//    - Tạo một nút "Change State".
//    - Khi nhấn nút, trạng thái của nhân vật chuyển đổi giữa "Idle" và "Running".
//    - Hiển thị trạng thái hiện tại trên Label.
cc.Class({
    extends: cc.Component,

    properties: {
        stateText: cc.Label,
    },

    onLoad () {
        this.stateText.string = "Idle";
    },

    start () {

    },

    // update (dt) {},

    onStateChange(){
        this.stateText.string = this.stateText.string === "Idle" ? "Running" : "Idle";
    }

});

