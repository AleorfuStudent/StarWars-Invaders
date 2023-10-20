let animLoaded = false
let animTheme

let flySound

let deathStar
let moveDS = false

let appearEnemys = false
const animEnemyCols = 14
const animEnemyRows = 4

function generateEnemysAnim1() {
    let pointerX = -enemysGap
    let pointerY = enemysGap
    let pointerZ = 0
    for (let i = 1; i <= animEnemyRows; i++) {
        for (let j = 1; j <= animEnemyCols; j++) {
            enemys.push(game.add.sprite(pointerX, pointerY - pointerZ, 'enemy'))
            pointerX += enemysGap
            pointerZ += 50
        }
        pointerX = enemysGap - 10
        pointerY -= enemysGap
    }
}

function generateEnemysAnim2() {
    let pointerX = enemysGap
    let pointerY = enemysGap
    for (let i = 1; i <= animEnemyRows; i++) {
        for (let j = 1; j <= animEnemyCols; j++) {
            enemys.push(game.add.sprite(pointerX, pointerY 'enemy'))
            pointerX += enemysGap
        }
        pointerX = enemysGap - 10
        pointerY += enemysGap
    }
}

function loadAnim() {
    if (!animLoaded) {
        animLoaded = true  

        animTheme = game.add.audio('anim')
        animTheme.play()

        flySound = game.add.audio('enemyFlying')

        deathStar = game.add.sprite(100, 80, 'deathStar')

        generateEnemysAnim1()

        setTimeout(function() {
            appearEnemys = true
            let times = 0
            setInterval(function() {
                if (times < animEnemyCols*animEnemyRows) {
                    flySound.stop()
                    flySound.play()
                    times++
                }
            }, 160)
            setTimeout(function() {
                moveDS = true
                for (let i = 0; i < enemys.length; i++) {
                    enemys[i].destroy()
                }
            }, (160 * animEnemyCols*animEnemyRows) + 5000)
        }, 5000)

        console.log('animation loaded')
    }
}

function updateAnim() {
    if (appearEnemys) {
        for (let i = 0; i < enemys.length; i++) {
            enemys[i].y += 5
        }
    }
    if (moveDS) {
        deathStar.y -= 3
    }
}