export default class Iron extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.iron = config.children[0]

        this.scene.physics.world.enable(this.iron, 1)

        this.iron.body.setSize(4, 16)
        this.iron.body.setOffset(6, 0)
        
        this.add(this.iron)
    }
}