import Principal from './scenes/Principal.js'
import Bootloader from './Bootloader.js'

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 160,
    height: 160,
    zoom: 10,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Bootloader,
        Principal
    ]
};

const game = new Phaser.Game(config);
