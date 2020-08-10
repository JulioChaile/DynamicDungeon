import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Cofre
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Chest extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.chest = config.children[0]

        this.createAnim(config)

        this.scene.physics.world.enable(this.chest, 1)
        
        this.add(this.chest)
    }

    // Retorna la key del objeto
    collisionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    createAnim(config) {
        config.scene.anims.create({
            key: 'chs',
            frames: config.scene.anims.generateFrameNumbers('chest', { frames: [0, 1, 2]}),
            frameRate: 10,
            repeat: 0
        });
    }

    dialog() {
        if(this.check) {
            let txt = {
                text: 'El cofre esta vacio.',
                style: {
                    fontFamily: 'ArialBlack', 
                    fontSize: '10px', 
                    align: 'center', 
                    //fontStyle: 'bold'
                }
            }

            let txtItem = false

            this.scene.scene.launch('Dialog', {
                text: txt,
                item: txtItem
            })
        } else {
            let txt = {
                text: 'Dentro del cofre\nencuentras una llave.',
                style: {
                    fontFamily: 'ArialBlack', 
                    fontSize: '10px', 
                    align: 'center', 
                    //fontStyle: 'bold'
                }
            }

            let txtItem = this.scene.scene.get('Principal').keyExit.addItem()

            this.scene.scene.launch('Dialog', {
                text: txt,
                item: txtItem
            })
        }
    }
}