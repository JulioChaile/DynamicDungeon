import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Planta
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Plant extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.plant = config.children[0]

        // Se le da cuerpo al objeto
        this.scene.physics.world.enable(this.plant, 1)
        
        // Se agrega el objeto al grupo
        this.add(this.plant)

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
        this.scene.physics.world.disable(this.plant)
        this.plant.setScale(0)
    }

    // Devuelve un objeto con un texto y un style
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

    // Emite el evento "addItem" que agrega el item al inventario
    // Devuelve un objeto de texto y style
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
            text: 'Este tipo de planta\nnormalmentese usa en\nhechizos y pociones',
            event: 'wizard',
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