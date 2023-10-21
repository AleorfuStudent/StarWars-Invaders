const game = new Phaser.Game(256, 224, Phaser.AUTO, null, {preload: preload, create: create, update: update})
let playing = false
let stage = 'intro'

function preload() {
    game.load.image('player', 'resources/sprites/x-wings.png')
    game.load.image('enemy', 'resources/sprites/tie-fighter.png')
    game.load.image('deathStar', 'resources/sprites/death-star.png')
    game.load.image('bigExplosion', 'resources/sprites/big-explosion.png')
    game.load.image('planet', 'resources/sprites/planet.png')
    game.load.image('playerBullet', 'resources/sprites/player-bullet.png')
    game.load.image('enemyBullet', 'resources/sprites/enemy-bullet.png')
    game.load.image('smallExplosion', 'resources/sprites/small-explosion.png')

    game.load.audio('anim','resources/sounds/anim.mp3')
    game.load.audio('battle','resources/sounds/battle.mp3')
    game.load.audio('enemyFlying','resources/sounds/enemyFlying.wav')
    game.load.audio('enemyShoot','resources/sounds/enemyShoot.wav')
    game.load.audio('explosion','resources/sounds/explosion.wav')
    game.load.audio('menu','resources/sounds/menu.mp3')
    game.load.audio('shoot','resources/sounds/shoot.wav')
    game.load.audio('theme','resources/sounds/theme.mp3')

    console.log('game preloaded')
}

function create() {
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
            updateMenu()
        } else if (stage === 'anim') {
            loadAnim()
            updateAnim()
        } else if (stage === 'battle') {
            loadBattle()
            updateBattle()
        }
    }
}

window.addEventListener('mousedown', function() {
    playing = true
    this.window.removeEventListener('mousedown')
})
