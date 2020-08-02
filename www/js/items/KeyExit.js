import emitter from "../events/EventsCenter.js"

export default class KeyExit extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.keyExit = config.children[0]

        this.scene.physics.world.enable(this.keyExit, 1)
        
        this.add(this.keyExit)
    }

    erased() {
        this.scene.physics.world.disable(this.keyExit)
        this.keyExit.setScale(0)
    }

    dialog() {
        const txt = {
            text: "Una llave dorada.\nTiene una inscripsion:\n'Libertad'",
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
            text: 'La llave dorada ha sido\nagregada a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const item = {
            key: 'keyExit',
            name: '- Llave dorada',
            detail: "A un costado se puede\nleer una inscripcion:\n'Libertad'",
            event: 'exit',
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