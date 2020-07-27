export default class Knight extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player')
        
        this.scene = config.scene;
        this.scene.add.existing(this); //con esto le decimos a la escena que el objeto existe
        this.scene.physics.world.enable(this); //le damos cuerpo fisico

        this.body.setSize(8, 8)
        this.body.setOffset(4, 19)

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
    }

    update() {
        // deja quieto al jugador
        this.body.setVelocity(0);


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
    }
}