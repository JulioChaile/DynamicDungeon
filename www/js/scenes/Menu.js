class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }

    init() {
        console.log("Hola, soy un Easter Egg's")
        console.log(this.scene)
    }

    create() {
        this.background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'menuBackground')
            .setAlpha(0)
        this.boton = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'boton')
            .setAlpha(0)
        this.botonPlay = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'jugar')
            .setAlpha(0)
        this.tittle = this.add.image(this.sys.game.config.width/2, 64, 'tittle')
            .setAlpha(0)

        this.add.tween({
            targets: [this.background, this.boton, this.botonPlay, this.tittle],
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.boton.setInteractive()
                this.botonPlay.setInteractive()
            }
        })

        this.boton.on('pointerup', () =>{
            this.playGame()
        })

        this.botonPlay.on('pointerup', () =>{
            this.playGame()
        })
    }

    playGame() {
        this.boton.setInteractive().input.enabled = false
        this.botonPlay.setInteractive().input.enabled = false

        this.add.tween({
            targets: [this.background, this.boton, this.botonPlay, this.tittle],
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                this.scene.start('Principal')
                this.scene.stop()
            }
        })
    }
}

export default Menu
