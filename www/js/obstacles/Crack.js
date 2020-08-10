import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Grietas
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Crack extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.crack = config.children[0]

        this.scene.physics.world.enable(this.crack, 1)
        
        this.add(this.crack)

        emitter.on('crack', it => {
            this.action(it)
        })
    }

    // Retorna la key del objeto
    collisionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    // Devuelve un objeto con un texto y un style
    dialog() {
        const txt = {
            text: 'El piso esta lleno\n de grietas, es\npeligroso, no sigues\navanzando.',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        return txt
    }

    // Elimina el objeto del mapa
    erased() {
        this.scene.physics.world.disable(this.crack)
        this.crack.setScale(0)
    }

    action(it) {
        // Emite el evento "erase" y envia el item a ser eliminado
        emitter.emit('erase', it)

        let txt = {
            text: 'Te sientes mas ligero\ncomo si flotaras\nsobre el suelo',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        this.scene.scene.launch('Dialog', {
            text: txt
        })

        this.erased()
    }
}
