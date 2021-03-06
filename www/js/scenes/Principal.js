import Knight from '../players/Knight.js'
import Wizard from '../npc/Wizard.js'
import Smith from '../npc/Smith.js'
import Chest from '../objects/Chest.js'
import Plant from '../items/Plant.js'
import Iron from '../items/Iron.js'
import Potion from '../items/Potion.js'
import Monster from '../obstacles/Monster.js'
import Crack from '../obstacles/Crack.js'
import KeyExit from '../items/KeyExit.js'
import Sword from '../items/Sword.js'
import Exit from '../exit/Exit.js'
import emitter from "../events/EventsCenter.js"

// Escena principal, se carga el mapa con todo en el
class Principal extends Phaser.Scene {
    constructor() {
        super({key: 'Principal'})
    }

    // Se llama a la interfaz de usuario a penas se inicia la escena
    init() {
        this.scene.launch('UI')
    }

    create() {
        // Modo Debug
        this.modoDebug()

        // Se crea el mapa desde el JSON cargado en preload
        this.map = this.make.tilemap({ key: 'map'});

        const coordPlayer = this.coordPlayer()

        // Se cargan los patrones del this.mapa
        this.tiles = this.map.addTilesetImage('dungeon', 'tiles');
        
        // Se crean las capas del piso y muros
        this.floor = this.map.createStaticLayer('floor', this.tiles, 0, 0);
        this.wall = this.map.createStaticLayer('wall', this.tiles, 0, 0);

        // Se crean los objetos del juego
        this.monster = new Monster ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('obsta', 'monster', {key: 'monster'})
        })

        this.crack = new Crack ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('obsta', 'crack', {key: 'crack'})
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

        this.sword = new Sword ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('item', 'sword', {key: 'sword'})
        });

        this.potion = new Potion ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('item', 'potion', {key: 'potion'})
        });

        this.keyExit = new KeyExit ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('item', 'keyExit', {key: 'keyExit'})
        });

        this.exit = new Exit ({
            physicsWorld: this.physics.world,
            scene: this,
            children: this.map.createFromObjects('exit', 'exit', {key: 'exit'})
        });

        // Colisiones con la capa de muros
        this.wall.setCollisionByExclusion([-1]);

        // Jugador y fisicas
        this.player = new Knight({
            scene: this,
            x: coordPlayer.x,
            y: coordPlayer.y,
        })

        // Se delimitan los limites del mapa y se da la colision con lo mismos (medio al pedo porque hay muros en todos lados)
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

        // Colision del jugador con los muros
        this.collider = this.physics.add.collider(this.player, this.wall);

        // Colisiones con los diferentes objetos del mapa
        this.physics.add.collider(this.player, this.plant, () => {
            this.player.checkCollision(this.plant.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {
                    text: this.plant.dialog(), 
                    item: this.plant.addItem()
                })

                this.plant.erased()

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.wizard, () => {
            this.player.checkCollision(this.wizard.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                
                this.wizard.dialog()

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.crack, () => {
            this.player.checkCollision(this.crack.collisionKey())

            this.player.block()

            this.scene.pause()
            this.scene.launch('Dialog', {
                text: this.crack.dialog(), 
            })

            emitter.on('action', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {
                    text: this.crack.dialog(), 
                })

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.iron, () => {
            this.player.checkCollision(this.iron.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {
                    text: this.iron.dialog(), 
                    item: this.iron.addItem()
                })

                this.iron.erased()

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.smith, () => {
            this.player.checkCollision(this.smith.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                
                this.smith.dialog()

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.monster, () => {
            this.player.checkCollision(this.monster.collisionKey())

            this.player.block()

            this.scene.pause()
            this.scene.launch('Dialog', {
                text: this.monster.dialog(), 
            })

            emitter.on('action', () => {
                this.scene.pause()
                this.scene.launch('Dialog', {
                    text: this.monster.dialog(), 
                })

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.chest, () => {
            this.player.checkCollision(this.chest.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                this.chest.dialog(),

                emitter.removeListener('action')
            })
        });

        this.physics.add.collider(this.player, this.exit, () => {
            this.player.checkCollision(this.exit.collisionKey())
            emitter.on('action', () => {
                this.scene.pause()
                this.exit.dialog()

                emitter.removeListener('action')
            })
        }).name = 'exit';
        
        // Seguimiento de la camara y colision de la misma con los bordes del this.mapa
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player).setSize(160, 160)
        this.cameras.main.roundPixels = true;

        // Fin del juego
        this.physics.add.overlap(this.player, this.exit, () => {
            this.scene.start('GameOver')
        })
    }

    update() {
        this.player.update()
    }

    // Con el Modo Debug se desactivan las colisiones con los muros y se agregan todos los items al inventario
    modoDebug() {
        //  37 = LEFT
        //  38 = UP
        //  39 = RIGHT
        //  40 = DOWN

        // Arriba, Arriba, Abajo, Abajo, Izquierda, Derecha, Izquierda, Derecha
        const debug = this.input.keyboard.createCombo([ 38, 38, 40, 40, 37, 39, 37, 39], { resetOnMatch: true });

        this.input.keyboard.on('keycombomatch', () => {
            console.log('Konami Code entered!');
            this.physics.world.removeCollider(this.collider)
            emitter.emit('debug')
        });
    }

    coordPlayer() {
        return {
            x: this.map.getObjectLayer('player').objects[0].x,
            y: this.map.getObjectLayer('player').objects[0].y
        }
    }
};

export default Principal