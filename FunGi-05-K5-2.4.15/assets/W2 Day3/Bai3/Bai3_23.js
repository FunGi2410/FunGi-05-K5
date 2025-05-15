cc.Class({
    extends: cc.Component,

    properties: {
        spriteNode: cc.Sprite,
    },

    start() {
        this.downImgs([
            'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
            'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
            'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
            'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g',
        ]);
    },

    async downImgs(urls) {
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            try {
                // fetch img
                console.log(`Downloading image ${i + 1}: ${url}`);
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch ${url}`);
                
                // convert blop to texture
                const blob = await response.blob();
                const imageBitmap = await createImageBitmap(blob);

                const texture = new cc.Texture2D();
                texture.initWithElement(imageBitmap);
                texture.handleLoadedTexture();

                // set sprite
                const spriteFrame = new cc.SpriteFrame(texture);
                this.spriteNode.spriteFrame = spriteFrame;
                console.log(`Image ${i + 1} downloaded (${(blob.size / 1024).toFixed(2)} KB)`);

                await this.delay(2000);
            } catch (err) {
                console.error(`Failed to download image ${i + 1}:`, err.message);
            }
        }

        console.log("All images processed.");
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
});
