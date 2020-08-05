import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Pocion
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Sword extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.sword = config.children[0]

        // Se le da cuerpo al objeto
        this.scene.physics.world.enable(this.sword, 1)
        
        // Se agrega el objeto al grupo
        this.add(this.sword)
    }

    // Retorna la key del objeto
    colissionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    // Elimina el objeto del mapa
    erased() {
        this.scene.physics.world.disable(this.sword)
        this.sword.setScale(0)
    }

    // Devuelve un objeto con un texto y un style
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

    // Emite el evento "addItem" que agrega el item al inventario
    // Devuelve un objeto de texto y style
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
            text: 'El filo de esta espada\npodria partir en dos\na cualquier bestia',
            event: 'monster',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        // Emite el evento "addItem" y envia un objeto con texto (nombre del objeto y descripcion) y style
        emitter.emit('addItem', item)

        return txt
    }
}