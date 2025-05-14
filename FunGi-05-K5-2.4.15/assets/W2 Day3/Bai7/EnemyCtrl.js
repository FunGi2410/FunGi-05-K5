cc.Class({
    extends: cc.Component,

    start () {
        const A = cc.v2(0, 0);
        const B = cc.v2(300, 0);

        this.node.setPosition(A); 

        const enemy = new Enemy(this.node);
        for (let index = 0; index < 3; index++) {
            enemy
                .moveTo(B, 2)             
                .rotateTo(180, 1)        
                .moveTo(A, 2)
                .rotateTo(0, 1)          
                .start();
        }
        
    },
});

// class Enemy {
//     constructor(node) {
//         this.node = node;
//         this.queue = [];
//         setTimeout(() => this.next(), 0);
//     }

//     moveTo(targetPos, duration) {
//         this.queue.push(() => {
//             const action = cc.moveTo(duration, targetPos);
//             this.node.runAction(
//                 cc.sequence(
//                     action,
//                     cc.callFunc(() => this.next())
//                 )
//             );
//         });
//         return this;
//     }

//     rotateTo(angle, duration) {
//         this.queue.push(() => {
//             const action = cc.rotateTo(duration, angle);
//             this.node.runAction(
//                 cc.sequence(
//                     action,
//                     cc.callFunc(() => this.next())
//                 )
//             );
//         });
//         return this;
//     }

//     next() {
//         if (this.queue.length > 0) {
//             const action = this.queue.shift();
//             action && action();
//         }
//     }
// }

class Enemy {
    constructor(node) {
        this.node = node;
        this.tween = cc.tween(node); 
    }

    moveTo(position, duration) {
        this.tween = this.tween.to(duration, { position: position });
        return this;
    }

    rotateTo(angle, duration) {
        this.tween = this.tween.to(duration, { angle: angle });
        return this;
    }

    start() {
        this.tween.start(); 
    }
}
