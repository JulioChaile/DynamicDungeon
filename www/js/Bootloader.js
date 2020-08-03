export default class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader')
    }

    preload() {
        this.load.image('floor', 'assets/dungeon.png');
        this.load.image('wall', 'assets/dungeon.png');

        // font
        this.load.image('font', 'assets/font/font.png');
        this.load.json('fontConfig', 'assets/font/font.json');

        // map tiles
        this.load.image('tiles', 'assets/map/dungeon.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map1.json');
        
        // our character
        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 16, frameHeight: 27 });

        // objects
        this.load.spritesheet('chest', 'assets/object/chest.png', {frameWidth: 16, frameHeight: 16})

        // obstacles
        this.load.spritesheet('monster', 'assets/obstacle/monster.png', {frameWidth: 32, frameHeight: 32})

        // npc
        this.load.spritesheet('smith', 'assets/npc/smith.png', {frameWidth: 16, frameHeight: 18})
        this.load.spritesheet('wizard', 'assets/npc/wizard.png', {frameWidth: 16, frameHeight: 32})

        // items
        this.load.image('keyExit', 'assets/item/keyExit.png')
        this.load.image('iron', 'assets/item/iron.png')
        this.load.image('plant', 'assets/item/plant.png')
        this.load.image('sword', 'assets/item/sword.png')
        this.load.image('potion', 'assets/item/potion.png')
        this.load.json('items', 'json/items.json')

        // dialogue
        this.load.image('dialog', 'assets/dialog/dialog.png')

        // inventory
        this.load.image('inventory', 'assets/inventory/inventory.png')
        this.load.image('fullInventory', 'assets/inventory/fullInventory.png')
        this.load.image('inventorytxt', 'assets/inventory/tittle.png')
        this.load.image('eye', 'assets/inventory/eye.png')
        this.load.image('closed', 'assets/inventory/closed.png')
        this.load.image('showItem', 'assets/inventory/showItem.png')

        this.load.on('complete', () => {
            const fontConfig = this.cache.json.get('fontConfig');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontConfig));
            this.scene.start('Principal');
        });
    }
}