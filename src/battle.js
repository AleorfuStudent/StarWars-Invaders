let battleLoaded = false

let player
const playerSpeed = 2

const enemys = []
const enemyCols = 14
const enemyRows = 7
const enemysGap = 18
let enemysX;
let enemysY;
let enemysRight;

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