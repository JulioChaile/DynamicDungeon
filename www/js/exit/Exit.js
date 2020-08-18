import emitter from "../events/EventsCenter.js"

// Objeto en el mapa: Llave de salida
// Parametros de la escena donde se crea el objeto:
//config = {
//        physicsWorld: this.physics.world,
//        scene: this,
//        children: this.map.createFromObjects(...)
//}
export default class Exit extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.exit = config.children[0]

        this.createAnim(config)

        this.scene.physics.world.enable(this.exit, 1)
        
        this.add(this.exit)

        emitter.on('exit', it => {
            this.check = true
            this.dialog(it)
        })

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

    createAnim(config) {
        config.scene.anims.create({
            key: 'ext',
            frames: config.scene.anims.generateFrameNumbers('exit', { frames: [0, 1]}),
            frameRate: 10,
            repeat: 0
        });
    }

    dialog(it) {
        if(this.check) {
            this.scene.anims.play('ext', this.exit)

            let txt = {
                text: 'La libertad se abre\nante tus ojos.',
                style: {
                    fontFamily: 'ArialBlack', 
                    fontSize: '10px', 
                    align: 'center', 
                    //fontStyle: 'bold'
                }
            }

            emitter.emit('erase', it)

            this.scene.scene.launch('Dialog', {
                text: txt
            })

            this.scene.physics.world.colliders.getActive().find(c => {
                return c.name === 'exit'
            }).destroy();

            this.exit.body.setSize(32, 24)
        } else {
            let txt = {
                text: 'Esta atorada, quizas\n necesite una llave',
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
        }
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