export default class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'})
    }

    create() {
        this.inventary = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 48, 'inventary')
        this.inventarytxt = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 48, 'inventarytxt').setScale(0.4)

    }
}