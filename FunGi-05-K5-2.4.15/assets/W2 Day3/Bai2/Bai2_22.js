
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    start() {
        this.fetchWithAutoRetry(this.simulateAPICall, 3)
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
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

