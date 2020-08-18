import emitter from "../events/EventsCenter.js";

export default class Knight extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player')
        
        this.scene = config.scene;
        this.scene.add.existing(this); //con esto le decimos a la escena que el objeto existe
        this.scene.physics.world.enable(this); //le damos cuerpo fisico

        this.createAnim()

        this.body.setSize(8, 8)
        this.body.setOffset(4, 19)

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.check = false

        this.collisionKey = ''

        this.pointer = this.scene.input.activePointer
        
        emitter.on('use',  item => {
                this.useItem(item)
        })
    }

    // Checkea que se esta colisionando con un objeto
    checkCollision(key) {
        this.check = true

        this.collisionKey = key
    }

    createAnim() {
        // Creacion de las animaciones de movimiento para el jugador
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7, 8]}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7, 8] }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }

    useItem(item) {
        const text = {
            text: 'No parece ser el\nmomento para usar esto.',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'left', 
                //fontStyle: 'bold'
            }
        }

        if(item.event === this.collisionKey) {
            emitter.emit(item.event, item)
        } else {
            this.scene.scene.launch('Dialog', {
                text: text
            })
        }
    }

    block() {
        this.cursors.left.isDown = false
        this.cursors.right.isDown = false
        this.cursors.up.isDown = false
        this.cursors.down.isDown = false

        this.pointer.isDown = false
        this.pointer.isUp = false
    }

    pointerPosition() {
        return this.pointer.camera.getWorldPoint(this.pointer.x, this.pointer.y)
    }

    update() {
        // Deja quieto al jugador
        this.body.setVelocity(0);

        let move

        if (this.pointer.isDown) {
            move = true
        } else {
            move = false
        }

        // Interacciones con objetos del mapa
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.check) {
            emitter.emit('action')
        }

        if(this.pointer.justDown && this.check) {
            emitter.emit('touch', {
                position: this.pointerPosition(),
                key: this.collisionKey
            })
        }

        // Horizontal movement
        if (this.cursors.left.isDown || this.pointer.x < 68 && this.pointer.y < 152 && move)
        {
            this.body.setVelocityX(-80);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown || this.pointer.x > 92 && this.pointer.y < 152 && move)
        {
            this.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown || this.pointer.y < 68 && move)
        {
            this.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown || 152 > this.pointer.y && this.pointer.y > 92 && move)
        {
            this.body.setVelocityY(80);
        }
        
        // Se llama a las animaciones segun donde se mueva
        if (this.cursors.left.isDown || this.pointer.x < 68 && this.pointer.y < 152 && move)
        {
            this.anims.play('left', true);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown || this.pointer.x > 92 && this.pointer.y < 152 && move)
        {
            this.anims.play('right', true);
            this.flipX = false;
        }
        else if (this.cursors.up.isDown || this.pointer.y < 68 && move)
        {
            this.anims.play('up', true);
        }
        else if (this.cursors.down.isDown || this.pointer.y < 152 && this.pointer.y > 92 && move)
        {
            this.anims.play('down', true);
        }
        else
        {
            this.anims.play('down', true); // esto es para que de saltitos en el lugar      
        }        
 
        if (
            this.cursors.up.isDown || 
            this.cursors.down.isDown || 
            this.cursors.left.isDown || 
            this.cursors.right.isDown || 
            this.pointer.isDown && !this.pointer.justDown
        ) {
            this.check = false

            emitter.removeListener('action')
        }
    }
}