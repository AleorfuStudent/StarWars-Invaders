let menuLoaded = false
let menuTheme

let title3
let title4
let text

let canSkip = false

function loadMenu() {
    if (!menuLoaded) {
        menuLoaded = true

        menuTheme = game.add.audio('menu')
        menuTheme.play()

        const titlestyle = {font: '20px verdana', fill: '#908301FF'}
        title3 = game.add.text(105, 60, 'Star', titlestyle)
        title4 = game.add.text(100, 80, 'Wars', titlestyle)
        const textstyle = {font: '10px verdana', fill: '#ffffff'}
        text = game.add.text(75, 120, 'Press Space to start', textstyle)

        setTimeout(function() {
            canSkip = true
        }, 1000)

        console.log('menu loaded')
    }
}

function updateMenu() {
    if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && canSkip) {
        stage = 'anim'
        title3.destroy()
        title4.destroy()
        text.destroy()
        menuTheme.stop()
    }
}