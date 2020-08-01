import emitter from "../events/EventsCenter.js"

export default class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'})

        this.items = []
    }

    create() {
        this.inventary = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 48, 'inventary')
        this.inventarytxt = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 45, 'inventarytxt')    
        
        emitter.on('addItem', (item) => {
            this.addItem(item)
        })
    }

    addItem(item) {
        this.items.unshift(item)

        console.log(this.items)

        this.item1 = this.items[0]
        this.item2 = this.items[1]

        console.log(this.items.length)
        
        if(this.items.length === 1) {
            console.log('entro aca1')
            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key).setInteractive()
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style).setOrigin(0, 0.5)
        }

        if (this.items.length === 2) {
            console.log(this.itemSpace1)
            this.itemSpace1.destroy()
            this.textSpace1.destroy()
            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key).setInteractive()
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style).setOrigin(0, 0.5)
            this.itemSpace2 = this.add.image(24, this.sys.game.config.height - 24, this.item2.key).setInteractive()
            this.textSpace2 = this.add.text(36, this.sys.game.config.height - 24, this.item2.name, this.item2.style).setOrigin(0, 0.5)
        }
    }
}