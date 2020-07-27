export default class Chest extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.chest = config.children[0]

        this.createAnim(config)

        this.scene.anims.play('chs', this.chest)

        this.scene.physics.world.enable(this.chest, 1)
        
        this.add(this.chest)
    }

    createAnim(config) {
        config.scene.anims.create({
            key: 'chs',
            frames: config.scene.anims.generateFrameNumbers('chest', { frames: [0, 1, 2]}),
            frameRate: 10,
            repeat: -1
        });
    }
}