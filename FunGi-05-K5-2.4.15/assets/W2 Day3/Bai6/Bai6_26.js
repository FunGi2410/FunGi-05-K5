

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // onLoad () {},

    start () {
        const URL = 'https://jsonplaceholder.typicode.com/posts/1'; 
        const TIMEOUT = 500;

        this.fetchDataWithTimeout(URL, TIMEOUT) 
            .then(data => { 
                console.log('Fetched data:', data); 
                console.log('Title:', data.title); 
                console.log('Body:', data.body); 
            }) 
            .catch(error => { 
                console.error('Error:', error.message); 
            });
    },

    fetchDataWithTimeout(url, timeout) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const signal = controller.signal;

            // set time to destroy
            const timer = setTimeout(() => {
                controller.abort();
            }, timeout);

            fetch(url, { signal })
                .then(response => {
                    clearTimeout(timer); // get data success
                    if (!response.ok) {
                        throw new Error('HTTP error: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(err => {
                    if (err.name === 'AbortError') {
                        reject(new Error('Request timed out'));
                    } else {
                        reject(err);
                    }
                });
        });
    }
});
