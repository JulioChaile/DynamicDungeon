import emitter from "../events/EventsCenter.js"

//Escena usada para las ventanas de dialogo
//data = {
//    text: {
//        text = 'texto a msotrar',
//        style = {
//            fontFamily: 'ArialBlack', 
//            fontSize: '10px', 
//            align: 'left', 
//            fontStyle: 'bold'
//        }
//    },
//    item: { (opcional)
//        text = 'texto a msotrar',
//        style = {
//            fontFamily: 'ArialBlack', 
//            fontSize: '10px', 
//            align: 'left', 
//            fontStyle: 'bold'
//        }
//    }
//}
export default class Dialog extends Phaser.Scene {
    constructor() {
        super({key: 'Dialog'})
    }

    init() {
        console.log('la escena se cargo piola')
        this.scene.pause('UI')
        this.scene.pause('Principal')
    }

    create(data) {
        // Checkea si se le envio un item a la escena para msotrar
        if (data.item) {
            this.checkItem = true 
        } else {
            this.checkItem = false
        }

        // Crea la ventan de dialogo
        var dialog = this.add.image(80, 120, 'dialog').setScale(0)

        // Crea el texto dentro de la ventana
        var text = this.add.text(80, 120, data.text.text, data.text.style).setOrigin(0.5).setScale(0)

        // Efecto
        this.add.tween({
            targets: dialog,
            scaleX: 0.2,
            scaleY: 0.2,
            duration: 500,
            ease: 'Bounce'
        })
        this.add.tween({
            targets: text,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Bounce'
        })

        // Se elimina la ventana de dialogo luego de hacer click en algun punto
        this.input.on('pointerup', () => {
            this.add.tween({
                targets: [dialog, text],
                scaleX: 0,
                scaleY: 0,
                duration: 500,
                ease: 'Bounce',
                onComplete: () => {
                    if (this.checkItem === true) {
                        this.addItem(data) // En caso de que se le haya enviado un item
                    } else {
                        this.scene.resume('Principal');
                        this.scene.resume('UI');
                        this.scene.sleep()
                        this.input.removeListener('pointerup')
                        emitter.emit('finish')
                    }
                }
            });
        });
    }

    // Ventana de dialogo de item añadido al inventario
    addItem(data) {
        var dialog = this.add.image(80, 120, 'dialog').setScale(0)

        var text = this.add.text(80, 120, data.item.text, data.item.style).setOrigin(0.5).setScale(0)

        this.add.tween({
            targets: dialog,
            scaleX: 0.2,
            scaleY: 0.2,
            duration: 500,
            ease: 'Bounce'
        })

        this.add.tween({
            targets: text,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: 'Bounce'
        })

        this.input.on('pointerup', () => {
            this.input.removeListener('pointerup')
            this.checkItem = false
            this.add.tween({
                targets: [dialog, text],
                scaleX: 0,
                scaleY: 0,
                duration: 500,
                ease: 'Bounce',
                onComplete: () => {
                    this.scene.resume('Principal');
                    this.scene.resume('UI');
                    this.scene.sleep()
                    emitter.emit('finish')
                }
            });
        });
    }
}