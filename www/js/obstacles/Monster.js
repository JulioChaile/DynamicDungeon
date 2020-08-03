export default class Monster extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.monster = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('mons', this.monster)

        this.scene.physics.world.enable(this.monster, 1)
        
        this.add(this.monster)
    }

    // Retorna la key del objeto
    colissionKey() {
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
}