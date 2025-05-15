
cc.Class({
    extends: cc.Component,

    properties: {
    },

    async start () {
        
        const serverTime = await this.promisify(this.getServerTime)();
        console.log("Độ trễ server: " + serverTime + " ms");

        const localTime = await this.promisify(this.getLocalTime)();
        console.log("Độ trễ local: " + localTime + " ms");
        
        const latency = serverTime - localTime;
        console.log("Độ trễ : " + latency + " ms");
    },

    promisify(fn) {
        return function (...args) {
            try {
                const result = fn(...args);
                // Nếu đã là Promise thì trả luôn
                if (result instanceof Promise) {
                    return result;
                } else {
                    // Nếu chưa thì chuyển sang promise
                    return Promise.resolve(result);
                }
            } catch (error) {
                // Nếu hàm bị lỗi khi chạy, reject Promise
                return Promise.reject(error);
            }
        };
    },

    getLocalTime() {
        return Date.now();
    },

    async getServerTime() {
        let xmlHttp;
        try {
            // Firefox, Chrome, Safari, Opera
            xmlHttp = new XMLHttpRequest();
        } catch (err1) {
            try {
                // IE (cũ)
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err2) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (err3) {
                    alert("AJAX not supported");
                    return Date.now(); // fallback: dùng thời gian client
                }
            }
        }

        // Mở request HEAD bất đồng bộ
        return new Promise((resolve, reject) => {
            xmlHttp.open('HEAD', window.location.href.toString(), true);
            xmlHttp.setRequestHeader("Content-Type", "text/html");

            // Đợi phản hồi từ server
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    const serverTime = xmlHttp.getResponseHeader("Date");
                    if (serverTime) {
                        resolve(new Date(serverTime).getTime());
                    } else {
                        resolve(Date.now()); // fallback: thời gian client
                    }
                }
            };

            // Gửi request
            xmlHttp.send(null);
        });
    },
});
