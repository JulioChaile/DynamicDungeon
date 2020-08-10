import emitter from '../events/EventsCenter.js'

// Objeto en el mapa: Herrero
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Smith extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.smith = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('smi', this.smith)

        this.scene.physics.world.enable(this.smith, 1)
        
        this.add(this.smith)

        emitter.on('smith', it => {
            this.check = true

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
            key: 'smi',
            frames: config.scene.anims.generateFrameNumbers('smith', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }

    // Dialogo del npc
    dialog() {
        if(this.check) {
            let txt = {
                text: '- Herrero\nYa tienes lo que querias.',
                style: {
                    fontFamily: 'ArialBlack', 
                    fontSize: '10px', 
                    align: 'center', 
                    //fontStyle: 'bold'
                }
            }
    
            this.scene.scene.launch('Dialog', {text: txt})

            return
        }

        let txt = {
            text: '- Herrero\nOye aventurero, ven.\nTe ayudare con la\nbestia.',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        this.scene.scene.launch('Dialog', {text: txt})
        
        emitter.on('finish', () => {
            this.scene.scene.pause('Principal')

            txt = {
                text: 'Traeme algo de hierro\ny vere que puedo\nhacer.',
                style: {
                    fontFamily: 'ArialBlack', 
                    fontSize: '10px', 
                    align: 'center', 
                    //fontStyle: 'bold'
                }
            }

            this.scene.scene.launch('Dialog', {text: txt})

            emitter.removeListener('finish')
        })
    }

    action(it) {
        let txt = {
            text: '- Herrero\n¡Perfecto!\nEsto servira.\nToma, es mi mejor trabajo',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        // Emite el evento "erase" y envia el item a ser eliminado
        emitter.emit('erase', it)

        const txtItem = this.scene.scene.get('Principal').sword.addItem()

        this.scene.scene.launch('Dialog', {
            text: txt,
            item: txtItem
        })
    }
}
