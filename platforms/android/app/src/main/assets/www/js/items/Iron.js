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

        emitter.on('touch', touch => {
            if (touch.key === this.getChildren()[0].name) {
                this.actionTouch(touch.position)
            }
        })
    }

    // Retorna la key del objeto
    collisionKey() {
        const key = this.getChildren()[0].name
        
        return key
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
            text: 'Un buen herrero podria\nhacer maravillas con esto.',
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

    actionTouch(position) {
        const hitArea = {
            top: this.getChildren()[0].body.top,
            bottom: this.getChildren()[0].body.bottom,
            left: this.getChildren()[0].body.left,
            right: this.getChildren()[0].body.right
        }

        if(
            position.x >= hitArea.left &&
            position.x <= hitArea.right &&
            position.y >= hitArea.top &&
            position.y <= hitArea.bottom
        ) {
            emitter.emit('action')
        }
    }
}