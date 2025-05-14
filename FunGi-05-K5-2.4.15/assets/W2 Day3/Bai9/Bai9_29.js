cc.Class({
    extends: cc.Component,

    properties: {
        logLabel: cc.Label
    },

    async onLoad() {
        this.logLabel.string = "";
        this.getTimeLimited = await this.circuitBreaker(this.getServerTime, 2000);

        setTimeout(async () => {
            const result = await this.getTimeLimited();
            this.appendLog(`Gọi sau 300ms: ${result}`);
        }, 300);

        setTimeout(async () => {
            const result = await this.getTimeLimited();
            this.appendLog(`Gọi sau 2100ms: ${result}`);
        }, 2100);
    },

    async circuitBreaker(fn, timeThreshold) {
        let isOpen = true;
        setTimeout(() => { 
            isOpen = true; 
        }, timeThreshold);

        return async function () {
            if (!isOpen) {
                return "service closed";
            } 
            else {
                return await fn();
            }
        };
    },

    async getServerTime() {
        try {
            const response = await fetch(window.location.href, { 
                method: 'HEAD' 
            });
            const serverDate = response.headers.get("Date");
            return new Date(serverDate).getTime();
        } catch (err) {
            return Date.now(); 
        }
    },

    appendLog(text) {
        this.logLabel.string += text + "\n";
    }
});