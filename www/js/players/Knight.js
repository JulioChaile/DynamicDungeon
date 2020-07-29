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
        
    }

    // cheackea que se esta colisionando con un objeto
    checkCollision() {
        this.check = true
    }

    createAnim() {
        // creacion de las animaciones de movimiento para el jugador
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

    update() {
        // deja quieto al jugador
        this.body.setVelocity(0);

        // interacciones con objetos del mapa
        if (this.cursors.space.isDown && this.check) {
            this.emit('action')
        }

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-80);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.body.setVelocityY(80);
        }
        
        // se llama a las animaciones segun donde se mueva
        if (this.cursors.left.isDown)
        {
            this.anims.play('left', true);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.anims.play('right', true);
            this.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.anims.play('down', true);
        }
        else
        {
            this.anims.play('down', true); // esto es para que de saltitos en el lugar      
        }        
 
        if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown) {
            this.check = false
        }
    }
}