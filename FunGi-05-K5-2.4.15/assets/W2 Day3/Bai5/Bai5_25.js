
cc.Class({
    extends: cc.Component,

    properties: {
        //timeLabel: cc.Label,
    },

    start () {
        logLatency();
    },

});


async function logLatency() {
    let startTime = await getServerTime();

    for (let i = 0; i < 10; i++) {
        const currentTime = await getServerTime();
        const latency = currentTime - startTime;
        startTime = currentTime;
        console.log('Độ trễ: ' + latency + ' ms');
    }
}

async function getServerTime() {
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
}

