export default class Smith extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.smith = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('smi', this.smith)

        this.scene.physics.world.enable(this.smith, 1)
        
        this.add(this.smith)
    }

    createAnim(config) {
        config.scene.anims.create({
            key: 'smi',
            frames: config.scene.anims.generateFrameNumbers('smith', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }
}