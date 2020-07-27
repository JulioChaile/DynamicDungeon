export default class Wizard extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.wizard = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('wiz', this.wizard)

        this.scene.physics.world.enable(this.wizard, 1)

        this.wizard.body.setSize(16, 18)
        this.wizard.body.setOffset(0, 14)
        
        this.add(this.wizard)
    }

    createAnim(config) {
        config.scene.anims.create({
            key: 'wiz',
            frames: config.scene.anims.generateFrameNumbers('wizard', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
    }
}