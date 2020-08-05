import emitter from "../events/EventsCenter.js"

// Interfaz de usuario
export default class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'})

        // Array con los items que el jugador recoge
        this.items = []
    }

    create() {
        // Caja de inventario inferior y texto de titulo
        this.inventoryimage = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 48, 'inventory')
            .setInteractive()
        this.inventorytxt = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height - 45, 'inventorytxt')
            .setInteractive()

        // Boton para mostrar el inventario completo
        this.show = this.add.image(this.sys.game.config.width -16, this.sys.game.config.height - 16, 'eye')
            .setInteractive()
            .setDepth(0)

        // Escuchador del boton "show"
        this.show.on('pointerup', () => {
            this.showInventory()
        })
        
        // Escuchador del evento "addItem"
        emitter.on('addItem', (item) => {
            this.addItem(item)
        })

        // Escuchador del Modo Debug
        emitter.on('debug', () => {
            this.modoDebug()
            emitter.removeListener()
        })

        // Escuchador para borrar items del inventario
        emitter.on('erase', item => {
            this.eraseItem(item)
        })
    }

    update() {
        // Interaccion con los items en la caja de inventario inferior
        if(this.itemSpace1) {
            this.itemSpace1.on('pointerup', pointer => {
                if (this.checkShow) {
                    this.scene.pause('Principal')
                    this.showItem(pointer, this.items[0])
                    this.checkShow = false
                }
            })
        }
        if(this.itemSpace2) {
            this.itemSpace2.on('pointerup', pointer => {
                if (this.checkShow) {
                    this.scene.pause('Principal')
                    this.showItem(pointer, this.items[1])
                    this.checkShow = false
                }
            })
        }

        // Checkea si esta abierto el inventario completo y pausa la escena Principal si es asi
        if (this.checkShowInventary) {
            this.scene.pause('Principal')

            if(this.itemSpace1) {
                this.itemSpace1.input.enabled = false
            }

            if(this.itemSpace2) {
                this.itemSpace2.input.enabled = false
            }

            this.show.input.enabled = false
        } else {
            if(this.itemSpace1) {
                this.itemSpace1.setInteractive()
            }

            if(this.itemSpace2) {
                this.itemSpace2.setInteractive()
            }

            this.show.setInteractive()
        }
    }

    // Agrega un item al inventario
    addItem(item) {
        if(item) {
            this.items.unshift(item)
        }

        this.inventory()
    }

    // Crea los items en el inventario
    inventory() {
        // Permite que se pueda interactuar con los items
        this.checkShow = true

        this.item1 = this.items[0]
        this.item2 = this.items[1]

        console.log(this.item1)

        if(this.items.length === 0) {
            if(this.itemSpace1 && this.textSpace1) {
                this.itemSpace1.destroy()
                this.textSpace1.destroy()
            }
        }

        if(this.items.length === 1) {
            if(this.itemSpace1 && this.textSpace1) {
                this.itemSpace1.destroy()
                this.textSpace1.destroy()
            }

            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key)
                .setInteractive()
                .setDepth(0)
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style)
                .setOrigin(0, 0.5)
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

            this.itemSpace1 = this.add.image(24, this.sys.game.config.height - 40, this.item1.key)
                .setInteractive()
                .setDepth(0)
            this.textSpace1 = this.add.text(36, this.sys.game.config.height - 40, this.item1.name, this.item1.style)
                .setOrigin(0, 0.5)

            this.itemSpace2 = this.add.image(24, this.sys.game.config.height - 24, this.item2.key)
                .setInteractive()
                .setDepth(0)
            this.textSpace2 = this.add.text(36, this.sys.game.config.height - 24, this.item2.name, this.item2.style)
                .setOrigin(0, 0.5)
        }

        
    }

    // Agrega todos los items al inventario
    modoDebug(){
        const text = this.add.text(0, 0, 'Modo Debug\nActivado')
            .setOrigin(0)

        const items = this.cache.json.get('items')

        console.log(items)

        this.items = items
        this.addItem(false)
    }

    // Muestra el inventario completo
    showInventory() {
        this.checkShowInventary = true

        // Permite que se pueda interactuar con los items
        this.checkShow = true

        // Crea la caja del inventario completo
        this.fullInventory = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'fullInventory')
            .setDepth(1)
        this.fullInventorytxt = this.add.image(this.sys.game.config.width/2, 51, 'inventorytxt')
            .setDepth(1)

        // Crea el boton para cerra el inventario completo
        this.closed = this.add.image(this.sys.game.config.width - 16, this.sys.game.config.height -32, 'closed')
            .setInteractive()
            .setDepth(1)

        let coordY = 56
        let items = []
        let texts = []

        // Crea los items en el inventario completo si los tuviera
        if(this.items.length) {
            this.items.forEach((it, i) => {
                items[i] = this.add.image(24, coordY, it.key)
                    .setInteractive()
                    .setDepth(1)
                texts[i] = this.add.text(36, coordY, it.name, it.style)
                    .setOrigin(0, 0.5)
                    .setDepth(1)

                coordY += 16
            })
        }

        // Crea los escuchadores de cada item para interactuar con ellos
        items.forEach((it, i) => {
            it.on('pointerup', pointer => {
                if (this.checkShow) {
                    this.showItem(pointer, this.items[i], items, texts)
                    this.checkShow = false
                }
            })
        })

        // Crea el escuchador para cerrar el inventario completo
        this.closed.on('pointerup', () => {
            this.closedInventory(items, texts)
        })
    }

    // Muestra las opciones de un item (Usar, Detalles)
    showItem(pointer, item, items, texts) {
        this.scene.pause('Principal')

        // Al ser false evita que se puedan abrir mas ventanas de otros items
        let checkModal = false

        // Crea la ventana de opciones
        this.modalItem = this.add.image(pointer.x, pointer.y, 'showItem')
            .setOrigin(0,1)
            .setInteractive()
            .setScale(0)
            .setDepth(2)

        // Efecto al crearse la ventana de opciones
        this.add.tween({
            targets: this.modalItem,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Bounce'
        })

        // Obtengo el centro de la ventana de opciones
        const centerY = this.modalItem.getCenter().y -16

        // Escuchador de la ventana de opciones, detecta en que parte se toco
        this.modalItem.on('pointerup', () => {
            checkModal = true
            this.add.tween({
                targets: this.modalItem,
                scaleX: 0,
                scaleY: 0,
                duration: 500,
                ease: 'Bounce',
                onComplete: () => {
                    this.modalItem.destroy()

                    if(pointer.y < centerY) {
                        if(this.checkShowInventary) {
                            this.closedInventory(items, texts)
                            this.scene.pause('Principal')
                        }

                        emitter.emit('use', item)
                    } else {
                        this.scene.launch('Dialog', {
                            text: item
                        })
                    }
                }
            })
        })

        // Si se toco fuera de la ventana de opciones, esta vuelve a encogerse
        this.input.on('pointerup', () => {
            this.add.tween({
                targets: this.modalItem,
                scaleX: 0,
                scaleY: 0,
                duration: 500,
                ease: 'Bounce',
                onComplete: () => {
                    this.modalItem.destroy()
                    if(!checkModal) {
                        this.checkShow = true
                        this.scene.resume('Principal')
                    }
                    this.input.removeListener('pointerup')
                }
            })
        })
        
        // Escuchador del evento "finish" emitido desde la escena Dialog al terminar
        emitter.on('finish', () => {
            this.checkShow = true
            emitter.removeListener('finish')
        })
    }

    // Cierra el inventario completo
    closedInventory(items, texts) {
        this.fullInventory.destroy()
        this.fullInventorytxt.destroy()

        items.forEach(it => {
            it.destroy()
        })

        texts.forEach(it => {
            it.destroy()
        })

        this.closed.destroy()

        if(this.modalItem) {
            this.modalItem.destroy()
        }

        this.checkShowInventary = false

        this.scene.resume('Principal')
    }

    // Borrar items del inventario
    eraseItem(item) {
        const index = this.items.findIndex(it => 
            it.key === item.key
        )

        this.items.splice(index, 1)

        console.log(this.items)

        this.inventory()
    }
}