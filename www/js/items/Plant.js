export default class Plant extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.plant = config.children[0]

        this.scene.physics.world.enable(this.plant, 1)
        
        this.add(this.plant)
    }
}