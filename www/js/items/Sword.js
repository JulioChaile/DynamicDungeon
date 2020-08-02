import emitter from "../events/EventsCenter.js"

export default class Sword extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.sword = config.children[0]

        this.scene.physics.world.enable(this.sword, 1)
        
        this.add(this.sword)
    }

    erased() {
        this.scene.physics.world.disable(this.sword)
        this.sword.setScale(0)
    }

    dialog() {
        const txt = {
            text: 'Una fuerte espada\nSu fina hoja muestra denota\nun filo aterrador.',
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
            text: 'La espada ha sido\nagregada a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const item = {
            key: 'sword',
            name: '- Espada de hierro',
            detail: 'El filo de esta espada podria\npartir en dos\na cualquier bestia',
            event: 'monster',
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