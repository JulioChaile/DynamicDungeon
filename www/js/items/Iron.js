import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Hierro
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Iron extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.iron = config.children[0]

        // Se le da cuerpo al objeto
        this.scene.physics.world.enable(this.iron, 1)

        // Se ajusta el cuerpo del objeto
        this.iron.body.setSize(4, 16)
        this.iron.body.setOffset(6, 0)
        
        // Se agrega el objeto al grupo
        this.add(this.iron)
    }

    // Elimina el objeto del mapa
    erased() {
        this.scene.physics.world.disable(this.iron)
        this.iron.setScale(0)
    }

    // Devuelve un objeto con un texto y un style
    dialog() {
        const txt = {
            text: 'Un trozo de hierro',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        return txt
    }

    // Emite el evento "addItem" que agrega el item al inventario
    // Devuelve un objeto de texto y style
    addItem() {
        const txt = {
            text: 'El hierro ha sido\nagregado a tu inventario',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const item = {
            key: 'iron',
            name: '- Trozo de hierro',
            text: 'Un buen herroro podria\nhacer maravillas con esto.',
            event: 'smith',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'left', 
                //fontStyle: 'bold'
            }
        }

        // Emite el evento "addItem" y envia un objeto con texto (nombre del objeto y descripcion) y style
        emitter.emit('addItem', item)

        return txt
    }
}