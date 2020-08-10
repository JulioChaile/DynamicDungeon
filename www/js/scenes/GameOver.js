class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver')
    }

    init() {
        console.log('Se termino señores')
    }

    create() {
        const background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gameOverBackground')
            .setInteractive()

        const txt = {
            text: 'Gracias por jugar nuestra\nversion Demo. Pronto Dynamic\nDungeon tendra su\nversion final.\n\nEsperamos que se hayan\ndivertido.\n\nAtte: staff de\nDynamic Dungeon',
            style: {
                fontFamily: 'ArialBlack', 
                fontSize: '10px', 
                align: 'center', 
                //fontStyle: 'bold'
            }
        }

        const text = this.add.text(80, 0, txt.text, txt.style)
            .setOrigin(0.5, 0)
            .setInteractive()

        background.on('pointerup', () => {
            this.scene.start('Menu')
            this.scene.stop()
        })

        text.on('pointerup', () => {
            this.scene.start('Menu')
            this.scene.stop()
        })
    }
}

export default GameOver