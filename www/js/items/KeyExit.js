import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Llave de salida
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class KeyExit extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.keyExit = config.children[0]

        // Se le da cuerpo al objeto
        this.scene.physics.world.enable(this.keyExit, 1)
        
        // Se agrega el objeto al grupo
        this.add(this.keyExit)
    }

    // Elimina el objeto del mapa
    erased() {
        this.scene.physics.world.disable(this.keyExit)
        this.keyExit.setScale(0)
    }

    // Devuelve un objeto con un texto y un style
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

    // Emite el evento "addItem" que agrega el item al inventario
    // Devuelve un objeto de texto y style
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
            text: "A un costado se puede\nleer una inscripcion:\n'Libertad'",
            event: 'exit',
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