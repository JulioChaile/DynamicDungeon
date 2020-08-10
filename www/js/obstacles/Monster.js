import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Monstruo
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Monster extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.monster = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('mons', this.monster)

        this.scene.physics.world.enable(this.monster, 1)
        
        this.add(this.monster)

        emitter.on('monster', it => {
            this.action(it)
        })
    }

    // Retorna la key del objeto
    collisionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    createAnim(config) {
        config.scene.anims.create({
            key: 'mons',
            frames: config.scene.anims.generateFrameNumbers('monster', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }
    // Devuelve un objeto con un texto y un style
    dialog() {
        const txt = {
            text: 'Una gran bestia\nimpide el paso, con\ntemor retrocedes.',
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
        this.scene.physics.world.disable(this.monster)
        this.monster.setScale(0)
    }

    action(it) {
        // Emite el evento "erase" y envia el item a ser eliminado
        emitter.emit('erase', it)

        let txt = {
            text: 'De un solo corte\nde tu espada la\nbestia cae a tus\npies',
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