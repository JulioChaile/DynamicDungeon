import emitter from "../events/EventsCenter.js"

export default class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'})

        this.items = []
    }

    create() {
        this.inventary = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 48, 'inventary')
        this.inventarytxt = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 45, 'inventarytxt')
        this.show = this.add.image(this.sys.game.config.width -16, this.sys.game.config.height - 16, 'eye').setInteractive()

        this.show.on('pointerup', () => {
            this.showInventary()
            this.show.removeListener('pointerup')
        })
        
        emitter.on('addItem', (item) => {
            this.addItem(item)
        })

        emitter.on('debug', () => {
            this.modoDebug()
        })
    }

    addItem(item) {
        if(item) {
            this.items.unshift(item)
        }

        console.log(this.items)

        this.item1 = this.items[0]
        this.item2 = this.items[1]

        console.log(this.items.length)
        
        if(this.items.length === 1) {
            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key).setInteractive()
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style).setOrigin(0, 0.5)
        }

        if (this.items.length > 1) {
            if(this.itemSpace1 && this.textSpace1) {
                this.itemSpace1.destroy()
                this.textSpace1.destroy()
            }

            if(this.itemSpace2 && this.textSpace2) {
                this.itemSpace2.destroy()
                this.textSpace2.destroy()
            }

            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key).setInteractive()
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style).setOrigin(0, 0.5)
            this.itemSpace2 = this.add.image(24, this.sys.game.config.height - 24, this.item2.key).setInteractive()
            this.textSpace2 = this.add.text(36, this.sys.game.config.height - 24, this.item2.name, this.item2.style).setOrigin(0, 0.5)
        }
    }

    modoDebug(){
        const text = this.add.text(0, 0, 'Modo Debug\nActivado').setOrigin(0)
        const items = this.cache.json.get('items')

        this.items = items
        this.addItem(false)
    }

    showInventary() {
        this.scene.pause('Principal')

        this.fullInventary = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'fullInventary')
        this.fullInventarytxt = this.add.image(this.sys.game.config.width/2, 51, 'inventarytxt')

        let coordY = 56
        let items = []
        let texts = []

        if(this.items.length) {
            this.items.forEach((it, i) => {
                items[i] = this.add.image(24, coordY, it.key).setInteractive()
                texts[i] = this.add.text(36, coordY, it.name, it.style).setOrigin(0, 0.5)

                coordY += 16
            })
        }
    }
}