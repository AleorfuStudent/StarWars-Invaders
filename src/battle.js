let battleLoaded = false

let player
const playerSpeed = 2

function loadBattle() {
    if (!battleLoaded) {
        battleLoaded = true

        // Añado al jugador
        player = game.add.sprite(50, game.world.height - 10, 'player')

        console.log('battle loaded')
    }
}

function updateBattle() {
    if (cursor.right.isDown) {
        if (player.x + playerSpeed < game.world.width - player.width) {
            player.x += playerSpeed
        }
    }
    if (cursor.left.isDown) {
        if (player.x - playerSpeed > 0) {
            player.x -= playerSpeed
        }
    }
}