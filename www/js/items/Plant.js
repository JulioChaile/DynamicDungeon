import emitter from "../events/EventsCenter.js"

export default class Plant extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.plant = config.children[0]

        this.scene.physics.world.enable(this.plant, 1)
        
        this.add(this.plant)
    }

    erased() {
        this.scene.physics.world.disable(this.plant)
        this.plant.setScale(0)
    }

    dialog() {
        const txt = {
            text: 'Es una planta extraña.\nNormalmente es usada\nen pociones y hechizos.',
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
            text: 'La planta ha sido\nagregada a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const item = {
            key: 'plant',
            name: '- Planta misteriosa',
            detail: 'Este tipo de planta normalmente\nse usa en hechizos y pociones',
            event: 'wizard',
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