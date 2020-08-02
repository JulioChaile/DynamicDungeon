import emitter from "../events/EventsCenter.js"

export default class Potion extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.potion = config.children[0]

        this.scene.physics.world.enable(this.potion, 1)
        
        this.add(this.potion)
    }

    erased() {
        this.scene.physics.world.disable(this.potion)
        this.potion.setScale(0)
    }

    dialog() {
        const txt = {
            text: 'Una extraña pocion.\n¿Que efectos tendra?',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        return txt
    }

    addItem() {
        const txt = {
            text: 'La pocion ha sido\nagregada a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const item = {
            key: 'potion',
            name: '- Pocion misteriosa',
            detail: 'La unica forma de saber\nque hace es bebiendola',
            event: 'crack',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'left', 
                //fontStyle: 'bold'
            }
        }

        emitter.emit('addItem', item)

        return txt
    }
}