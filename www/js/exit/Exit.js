export default class Exit extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.phisicsWorld, config.scene)

        this.scene = config.scene
        this.exit = config.children[0]

        this.scene.physics.world.enable(this.exit, 1)
        
        this.add(this.exit)
    }

    // Retorna la key del objeto
    collisionKey() {
        const key = this.getChildren()[0].name
        
        return key
    }
}