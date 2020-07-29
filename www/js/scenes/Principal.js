import Knight from '../players/Knight.js'
import Wizard from '../npc/Wizard.js'
import Smith from '../npc/Smith.js'
import Chest from '../objects/Chest.js'
import Plant from '../items/Plant.js'
import Iron from '../items/Iron.js'
import Monster from '../obstacles/Monster.js'
import Crack from '../obstacles/Crack.js'

// escena principal, se carga el this.mapa con todo en el
class Principal extends Phaser.Scene {
    constructor() {
        super({key: 'Principal'})
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

        this.crack = new Crack ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('obsta', 'crack')
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

        // se delimitan los limites del mapa y se da la colision con lo mismos (medio al pedo porque hay muros en todos lados)
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

        // colision del jugador con los muros
        this.physics.add.collider(this.player, wall);

        this.physics.add.collider(this.player, this.plant, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {text: this.plant.dialog(), checkItem: true, item: this.plant.addItem()})
                this.plant.erased()
                this.player.removeListener('action')
            })
            this.events.on('finish', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {text: this.plant.addItem()})
                this.player.removeListener('finish')
            })
        });

        this.physics.add.collider(this.player, this.wizard, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                console.log('wizard')
                this.player.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.crack, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                this.player.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.iron, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                console.log('iron')
                this.player.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.smith, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                console.log('smith')
                this.player.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.monster, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                console.log('monster')
                this.player.removeListener('action')
            })
            
        });

        this.physics.add.collider(this.player, this.chest, () => {
            this.player.checkCollision()
            this.player.on('action', () => {
                console.log('chest')
                this.player.removeListener('action')
            })
        });
        
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