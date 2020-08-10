import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Pocion
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Potion extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.potion = config.children[0]

        // Se le da cuerpo al objeto
        this.scene.physics.world.enable(this.potion, 1)
        
        // Se agrega el objeto al grupo
        this.add(this.potion)
    }

    // Retorna la key del objeto
    colissionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    // Elimina el objeto del mapa
    erased() {
        this.scene.physics.world.disable(this.potion)
        this.potion.setScale(0)
    }

    // Devuelve un objeto con un texto y un style
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

    // Emite el evento "addItem" que agrega el item al inventario
    // Devuelve un objeto de texto y style
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
            text: 'La unica forma de saber\nque hace es bebiendola',
            event: 'crack',
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