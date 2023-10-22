class Intro {
    constructor(game) {
        this.game = game;
        this.firstText;
        this.movingText = {};
        this.textSpeed = 0.3;
        this.textReady = false;
        this.theme = 'theme';

        this.start();
    }

    start() {
        this.game.music.play(this.theme);

        this.showFirstText();

        const timer = this.game.phaser.time.create(false);
        timer.add(5000, this.showMovingText, this);
        timer.start();
    }

    update() {
        if (this.textReady) {
            for (const clave in this.movingText) {
                this.movingText[clave].y -= this.textSpeed;
            }
            const keys = Object.keys(this.movingText);
            const lastKey = keys[keys.length - 1];
            if (this.movingText[lastKey].y <= 0 || this.game.keys['space'].isDown) {
                for (const clave in this.movingText) {
                    this.movingText[clave].destroy();
                }
                this.game.scene = new Menu(this.game);
            }
        }
    }

    showFirstText() {
        const textStyle = {font: '10px verdana', fill: '#075DC4FF'};
        this.firstText = this.game.phaser.add.text(15, 105, 'A long time ago, in a galaxy far, far away....', textStyle)
    }

    showMovingText() {
        this.firstText.destroy();

        const textList = [
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
        ];

        const titleStyle = {font: '20px verdana', fill: '#908301FF'};
        this.movingText['title1'] = this.game.phaser.add.text(105, this.game.phaser.height, 'Star', titleStyle);
        this.movingText['title2'] = this.game.phaser.add.text(100, this.game.phaser.height + 20, 'Wars', titleStyle);

        const textStyle = {font: '10px verdana', fill: '#908301FF'};
        for (let i = 0; i < textList.length; i++) {
            this.movingText['text' + i] = this.game.phaser.add.text(55, this.game.phaser.height + 60 + (i * 10), textList[i], textStyle);
        }
        this.textReady = true;
    }
}