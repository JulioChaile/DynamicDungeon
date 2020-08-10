import Principal from './scenes/Principal.js'
import Bootloader from './Bootloader.js'
import Dialog from "./scenes/Dialog.js";
import UI from "./scenes/UI.js";
import Menu from "./scenes/Menu.js";
import GameOver from "./scenes/GameOver.js";

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 160,
    height: 240,
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
        Menu,
        Principal,
        GameOver,        
        UI,
        Dialog
    ]
};

const game = new Phaser.Game(config);
