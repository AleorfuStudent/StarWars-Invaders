let battleLoaded = false
let battleTheme 
let bulletSound

let player
const playerSpeed = 2

let enemys
const enemyCols = 10
const enemyRows = 5
const enemysGap = 18
let enemysX
let enemysY
let enemysRight

let bullet = null

function generateEnemys() {
    let pointerX = enemysGap
    let pointerY = enemysGap
    for (let i = 1; i <= enemyRows; i++) {
        for (let j = 1; j <= enemyCols; j++) {
            enemys.add(game.add.sprite(pointerX, pointerY, 'enemy'))
            pointerX += enemysGap
        }
        pointerX = enemysGap
        pointerY += enemysGap
    }
}

function shoot() {
    if (bullet === null) {
        bulletSound.stop()
        bulletSound.play()
        bullet = game.add.sprite(player.x, player.y, 'playerBullet')
        game.physics.arcade.enable(bullet);
        bullet.enableBody = true
    }
}

function enemyKill(bullet, enemy) {
    bullet.destroy()
    bullet = null
    enemy.destroy()
}

function loadBattle() {
    if (!battleLoaded) {
        battleLoaded = true
        game.physics.startSystem(Phaser.Physics.ARCADE)

        battleTheme = game.add.audio('battle')
        bulletSound = game.add.audio('shoot')

        // Añado al jugador
        player = game.add.sprite(50, game.world.height - 10, 'player')

        enemys = game.add.group()
        generateEnemys()
        enemys.enableBody = true
        enemys.physicsBodyType = Phaser.Physics.ARCADE

        console.log('battle loaded')
    }
}

function movePlayer() {
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown || game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
        if (player.x + playerSpeed < game.world.width - player.width) {
            player.x += playerSpeed
        }
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown || game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
        if (player.x - playerSpeed > 0) {
            player.x -= playerSpeed
        }
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) {
        shoot()
    }
}

function moveBullet() {
    if (bullet != null) {
        bullet.y -= 5
        game.physics.arcade.overlap(bullet, enemys, enemyKill)
        if (bullet.y <= 0) {
            bullet.destroy()
            bullet = null
        }
    }
}

function updateBattle() {
    if (!battleTheme.isPlaying) {
        battleTheme.play()
    }
    movePlayer()
    moveBullet()
}