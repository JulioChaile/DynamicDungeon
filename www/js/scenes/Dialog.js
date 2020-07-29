export default class Dialog extends Phaser.Scene {
    constructor() {
        super({key: 'Dialog'})
    }

    init() {
        console.log('la escena se cargo piola')
    }

    create(data) {
        var dialog = this.add.image(80, 120, 'dialog').setScale(0)

        var text = this.add.text(80, 120, data.text.text, data.text.style).setOrigin(0.5).setScale(0)

        this.add.tween({
            targets: dialog,
            scaleX: 0.2,
            scaleY: 0.2,
            duration: 1000,
            ease: 'Bounce'
        })

        this.add.tween({
            targets: text,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: 'Bounce'
        })

        this.input.on('pointerup', () => {
            this.add.tween({
                targets: [dialog, text],
                scaleX: 0,
                scaleY: 0,
                duration: 1000,
                ease: 'Bounce',
                onComplete: () => {
                    if (data.checkItem === true) {
                        this.addItem(data)
                    } else {
                        this.scene.resume('Principal');
                    }
                }
            });
        });
    }

    addItem(data) {

        var dialog = this.add.image(80, 120, 'dialog').setScale(0)

        var text = this.add.text(80, 120, data.item.text, data.item.style).setOrigin(0.5).setScale(0)

        this.add.tween({
            targets: dialog,
            scaleX: 0.2,
            scaleY: 0.2,
            duration: 1000,
            ease: 'Bounce'
        })

        this.add.tween({
            targets: text,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: 'Bounce'
        })

        this.input.on('pointerup', () => {
            data.checkItem = false
            this.add.tween({
                targets: [dialog, text],
                scaleX: 0,
                scaleY: 0,
                duration: 1000,
                ease: 'Bounce',
                onComplete: () => {
                        this.scene.resume('Principal');
                }
            });
        });
    }
}