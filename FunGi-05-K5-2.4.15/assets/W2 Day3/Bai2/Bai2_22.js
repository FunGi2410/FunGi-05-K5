
cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
    },

    start() {
        this.label.string = "";

        this.fetchWithAutoRetry(this.simulateAPICall, 3)
            .then(result => {
                this.label.string += "Success" + result + '\n';
                console.log('Success:', result);
            })
            .catch(error => {
                this.label.string += "All retries failed:" + error.message + '\n';
                console.error('All retries failed:', error.message)
            });
    },

    // Iterative approach
    async fetchWithAutoRetry(fetcher, maximumRetryCount = 5) {
        let lastError;

        for (let attempt = 1; attempt <= maximumRetryCount; attempt++) {
            try {
                const result = await fetcher();
                return result; 
            } catch (error) {
                this.label.string += "Attempt " + attempt + " failed " + error.message + '\n';
                console.warn(`Attempt ${attempt} failed: ${error.message}`);
                lastError = error;
            }
        }

        throw lastError;
    },

    // Usage example
    simulateAPICall() {
        return new Promise((resolve, reject) => {
            // Simulate a 50% chance of failure
            if (Math.random() < 0.5) {
                reject(new Error('API call failed'));
            } else {
                resolve('API call succeeded');
            }
        });
    },
});

