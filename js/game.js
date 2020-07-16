var Principal = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
 
    function Principal () {
        Phaser.Scene.call(this, { key: 'Principal' });
    },

    preload: function () {
        this.load.image('floor', 'assets/dungeon.png');
        this.load.image('wall', 'assets/dungeon.png');

        // map tiles
        this.load.image('tiles', 'assets/map/dungeon.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map1.json');
        
        // our two characters
        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 16, frameHeight: 27 });
    },

    create: function() {
        var map = this.make.tilemap({ key: 'map' });

        var tiles = map.addTilesetImage('dungeon', 'tiles');
        
        var floor = map.createStaticLayer('floor', tiles, 0, 0);
        var wall = map.createStaticLayer('wall', tiles, 0, 0);
        wall.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(120, 330, 'player', 1);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7, 8]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7, 8] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, wall);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    },

    update: function() {
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
    }
});

var Dialog = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
 
    function Dialog () {
        Phaser.Scene.call(this, { key: 'Dialog' });
    },

    preload: function () {

    },

    create: function() {

    },

    update: function() {

    }
});

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
            debug: false
        }
    },
    scene: [
        Principal,
        Dialog
    ]
};
var game = new Phaser.Game(config);