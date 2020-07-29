import Principal from './scenes/Principal.js'
import Bootloader from './Bootloader.js'
import Dialog from "./scenes/Dialog.js";

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
        Principal,
        Dialog
    ]
};

const game = new Phaser.Game(config);
