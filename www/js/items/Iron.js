export default class Iron extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.iron = config.children[0]

        this.scene.physics.world.enable(this.iron, 1)

        this.iron.body.setSize(4, 16)
        this.iron.body.setOffset(6, 0)
        
        this.add(this.iron)
    }

    erased() {
        this.scene.physics.world.disable(this.iron)
        this.iron.setScale(0)
    }

    dialog() {
        const txt = {
            text: 'Un trozo de hierro',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                fontStyle: 'bold'
            }
        }

        return txt
    }

    addItem() {
        const txt = {
            text: 'El hierro ha sido\nagregado a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                fontStyle: 'bold'
            }
        }

        return txt
    }
}