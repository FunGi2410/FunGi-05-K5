// 7. Tạo công cụ tính chỉ số sức mạnh nhân vật (power = máu × mana):
//    - Thêm 2 ô nhập (InputBox) cho máu và mana.
//    - Khi nhấn nút “Tính Power”, hiển thị kết quả ra Label.
//    - Commit lên Git với nội dung `add power calculator`.
cc.Class({
    extends: cc.Component,

    properties: {
        hpInput: cc.EditBox,
        manaInput: cc.EditBox,
        resultText: cc.Label,
    },


    onLoad () {
        this.powerNumber = 0;
    },

    start () {

    },

    // update (dt) {},

    onPowerCal(){
        this.powerNumber = this.hpInput.string * this.manaInput.string;
        this.resultText.string = "Power: " + this.powerNumber;
    }

});
