const game = new Phaser.Game(256, 224, Phaser.AUTO, null, {preload: preload, create: create, update: update})

let player = {
    width: 32,
    height: 32,
    x: 0,
    y: 0
}

function preload() {
    game.load.image('player', 'resources/sprites/x-wings.png')
}

function create() {
    // Escalo la pantalla manteniendo la resolución retro
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.setShowAll()
    game.scale.maxWidth = 700
    game.scale.maxHeight = 700
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    window.addEventListener('resize', () => game.scale.refresh())

    // Añado al jugador
    player.instance = game.add.sprite(player.width, player.height, 'player')
}

function update() {

}
