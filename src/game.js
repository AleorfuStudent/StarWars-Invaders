const game = new Phaser.Game(256, 224, Phaser.AUTO, null, {preload: preload, create: create, update: update})
let playing = true
let cursor = game.input.keyboard.createCursorKeys()
let stage = 'intro'

function preload() {
    game.load.image('player', 'resources/sprites/x-wings.png')

    console.log('game preloaded')
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

    console.log('game created')
}

function update() {
    if (playing) {
        if (stage === 'intro') {
            loadIntro()
            updateIntro()
        } else if (stage === 'menu') {
            loadMenu()
        } else if (stage === 'battle') {
            loadBattle()
            updateBattle()
        }
    }
}

window.onload = function() {
    playing = true;
}
