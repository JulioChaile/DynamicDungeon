// escena principal, se carga el mapa con todo en el
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
        this.load.spritesheet('potions', 'assets/item/potions.png', {frameWidth: 16, frameHeight: 16})

    },

    create: function() {
        // se crea el mapa desde el JSON cargado en preload
        var map = this.make.tilemap({ key: 'map' });

        // se cargan los patrones del mapa
        var tiles = map.addTilesetImage('dungeon', 'tiles');
        
        //se crean las capas del piso y muros
        var floor = map.createStaticLayer('floor', tiles, 0, 0);
        var wall = map.createStaticLayer('wall', tiles, 0, 0);

        var monster = map.createFromObjects('obsta', 'monster')

        var chest = map.createFromObjects('object', 'chest', {key: 'chest'})
        
        var wizard = map.createFromObjects('npc', 'wizard')
        var smith = map.createFromObjects('npc', 'smith', {flipX: true})

        var iron = map.createFromObjects('item', 'iron', {key: 'iron'})
        var plant = map.createFromObjects('item', 'plant', {key: 'plant'})
        console.log(plant)

        var npc = this.add.group()
        var obstacles = this.add.group()
        var items = this.add.group()
        var objects = this.add.group()

        console.log(items)

        // colisiones con la capa de muros
        wall.setCollisionByExclusion([-1]);

        // jugador y fisicas
        this.player = this.physics.add.sprite(120, 330, 'player', 1);

        // se delimitan los limites del mapa y se da la colision con lo mismos (medio al pedo porque no hay muros en todos lados)
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        // con esto se aceptan las entradas del teclado de las flechas
        this.cursors = this.input.keyboard.createCursorKeys();

        // creacion de las animaciones de movimiento para el jugador
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

        this.anims.create({
            key: 'mons',
            frames: this.anims.generateFrameNumbers('monster', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'wiz',
            frames: this.anims.generateFrameNumbers('wizard', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'smi',
            frames: this.anims.generateFrameNumbers('smith', { frames: [0, 1, 2, 3, 4]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'chs',
            frames: this.anims.generateFrameNumbers('chest', { frames: [0, 1, 2]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.play('mons', monster)
        this.anims.play('wiz', wizard)
        this.anims.play('smi', smith)
        this.anims.play('chs', chest)

        // colision del jugador con los muros
        this.physics.add.collider(this.player, wall);

        this.physics.add.collider(this.player, npc);
        this.physics.add.collider(this.player, obstacles);
        this.physics.add.collider(this.player, items);
        this.physics.add.collider(this.player, objects);

        // seguimiento de la camara y colision de la misma con los bordes del mapa
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    },

    update: function() {
        // deja quieto al jugador
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

        // se llama a las animaciones segun donde se mueva
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
            this.player.anims.play('down', true); // esto es para que de saltitos en el lugar      
        }
    }
});

// esta escena es para programar los dialogos con los npc y las alertas cuando se toman objectos, se realizan acciones, etc
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
