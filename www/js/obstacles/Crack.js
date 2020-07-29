export default class crack extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.crack = config.children[0]

        this.scene.physics.world.enable(this.crack, 1)
        
        this.add(this.crack)
    }
}