let introLoaded = false
let startIntroAnim = false
let introTheme

let firstText
let title1
let title2
let textLines = []
let textString = [
    'It is a period of civil war.',
    'Rebel spaceships, striking',
    'from a hidden base, have won',
    'their first victory against',
    'the evil Galactic Empire.',
    '',
    'During the battle, Rebel',
    'spies managed to steal secret',
    'plans to the Empire\'s',
    'ultimate weapon, the DEATH',
    'STAR, an armored space',
    'station with enough power to',
    'destroy an entire planet.',
    '',
    'Pursued by the Empire\'s',
    'sinister agents, Princes',
    'Leia races home aboard her',
    'starship, custodian of the',
    'stolen plans that can save',
    'her people and restore',
    'freedom to the galaxy....'
]
const textSpeed = 0.3

function loadIntro() {
    if (!introLoaded) {
        introLoaded = true

        introTheme = game.add.audio('theme')
        introTheme.play()

        // Añado el texto del inicio
        const textstyle = {font: '10px verdana', fill: '#075DC4FF'}
        firstText = game.add.text(15, 105, 'A long time ago, in a galaxy far, far away....', textstyle)   

        const titlestyle = {font: '20px verdana', fill: '#908301FF'}
        title1 = game.add.text(105, game.height, 'Star', titlestyle)
        title2 = game.add.text(100, game.height + 20, 'Wars', titlestyle)
        const historystyle = {font: '10px verdana', fill: '#908301FF'}
        for (let i = 0; i < textString.length; i++) {
            textLines.push(game.add.text(55, game.height + (i * 10) + 60, textString[i], historystyle))
        }

        setTimeout(function() {
            firstText.destroy()
            startIntroAnim = true
        }, 5000)

        console.log('intro loaded')
    }
}

function updateIntro() {
    if (startIntroAnim) {
        title1.y -= textSpeed
        title2.y -= textSpeed
        for (let i = 0; i < textLines.length; i++) {
            textLines[i].y -= textSpeed
        }
        if (title1.y < -270 || game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown) {
            stage = 'menu'
            firstText.destroy()
            title1.destroy()
            title2.destroy()
            for (let i = 0; i < textLines.length; i++) {
                textLines[i].destroy()
            }
            introTheme.stop()
        }
    }
}