// 11. Tạo hệ thống quản lý vật phẩm đơn giản:
//     - Tạo một mảng chứa các vật phẩm (ví dụ: `["Sword", "Shield", "Potion"]`).
//     - Khi nhấn nút "Add Item", thêm một vật phẩm mới vào mảng.
//     - Khi nhấn nút "Show Items", hiển thị danh sách vật phẩm hiện tại trong console.
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    

    onLoad () {
        this.items = ["Sword", "Shield", "Potion"];
    },

    start () {

    },

    // update (dt) {},

    onAddItem(){
        this.items.push("New Item");
    },

    onShowItems(){
        console.log(this.items);
    }
});
