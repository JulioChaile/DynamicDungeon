// Emisor de eventos, importar y usar para emitir y escuchar eventos entre diferentes complementos
var emitter;
if (!window.global_emitter) {
    window.global_emitter =  new Phaser.EventEmitter()
} 
emitter = window.global_emitter

export default emitter
