import Knight from '../players/Knight.js'
import Wizard from '../npc/Wizard.js'
import Smith from '../npc/Smith.js'
import Chest from '../objects/Chest.js'
import Plant from '../items/Plant.js'
import Iron from '../items/Iron.js'
import Monster from '../obstacles/Monster.js'

// escena principal, se carga el this.mapa con todo en el
class Principal extends Phaser.Scene {
    constructor() {
        super('Principal')
    }

    create() {
        // se crea el this.mapa desde el JSON cargado en preload
        this.map = this.make.tilemap({ key: 'map' });

        // se cargan los patrones del this.mapa
        var tiles = this.map.addTilesetImage('dungeon', 'tiles');
        
        //se crean las capas del piso y muros
        var floor = this.map.createStaticLayer('floor', tiles, 0, 0);
        var wall = this.map.createStaticLayer('wall', tiles, 0, 0);

        this.monster = new Monster ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('obsta', 'monster', {key: 'monster'})
        })

        this.chest = new Chest ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('object', 'chest', {key: 'chest'})
        })
        
        this.wizard = new Wizard ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('npc', 'wizard', {key: 'wizard'})
        });

        this.smith = new Smith ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('npc', 'smith', {key:'smith', flipX: true})
        });

        this.iron = new Iron ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('item', 'iron', {key: 'iron'})
        });

        this.plant = new Plant ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('item', 'plant', {key: 'plant'})
        });
        
        // colisiones con la capa de muros
        wall.setCollisionByExclusion([-1]);

        // jugador y fisicas
        this.player = new Knight({
            scene: this,
            x: 120,
            y: 330,
        })

        // se delimitan los limites del this.mapa y se da la colision con lo mismos (medio al pedo porque hay muros en todos lados)
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

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

        // colision del jugador con los muros
        this.physics.add.collider(this.player, wall);

        this.physics.add.collider(this.wizard, this.player)
        this.physics.add.collider(this.player, this.chest);
        this.physics.add.collider(this.player, this.plant);
        this.physics.add.collider(this.player, this.iron);
        this.physics.add.collider(this.player, this.monster);
        this.physics.add.collider(this.player, this.smith);
        

        //this.physics.add.collider(this.player, group)
        
        // seguimiento de la camara y colision de la misma con los bordes del this.mapa
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    }

    update() {
        this.player.update()
    }
};

export default Principal