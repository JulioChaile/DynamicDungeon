import emitter from '../events/EventsCenter.js'

// Objeto en el mapa: Mago
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Wizard extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.wizard = config.children[0]

        this.createAnim(config)

        // Coore la animacion
        this.scene.anims.play('wiz', this.wizard)

        // Se le dan cuerpo fisico
        this.scene.physics.world.enable(this.wizard, 1)

        // Se ajusta el cuerpo
        this.wizard.body.setSize(16, 18)
        this.wizard.body.setOffset(0, 14)
        
        // Se agrega el objeto al grupo
        this.add(this.wizard)

        emitter.on('wizard', it => {
            this.check = true

            this.action(it)
        })
    }

    // Retorna la key del objeto
    colissionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }

    // Crea la animacion
    createAnim(config) {
        config.scene.anims.create({
            key: 'wiz',
            frames: config.scene.anims.generateFrameNumbers('wizard', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }

    // Dialogo del npc
    dialog() {
        if(this.check) {
            let txt = {
                text: '- Mago\nVe a molestar\na otro, viajero.',
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
            text: '- Mago\nOtro aventurero perdido.\nPodria ayudarte\npor algo cambio.',
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
                text: 'Necesito una planta que\ncrece en estas cavernas.\nBuscala por mi.',
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
            text: '- Mago\nOh, volviste.\nGracias por la ayuda,\naqui tienes.',
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
                align: 'left', 
                //fontStyle: 'bold'
            }
        }

        const txtItem = ''

        this.scene.scene.launch('Dialog', {
            text: txt
        })

        // Emite el evento "erase" y envia el item a ser eliminado
        emitter.emit('erase', it)

        // Emite el evento "addItem" y envia un objeto con texto (nombre del objeto y descripcion) y style
        emitter.emit('addItem', item)
    }
}