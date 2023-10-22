class Menu {
    constructor(game) {
        this.game = game;
        this.theme = 'menu';
        this.texts = [];
        this.canSkip = false;

        this.start();
    }

    start() {
        this.game.music.play(this.theme, true);

        this.loadTexts();
        const timer = this.game.phaser.time.create(false);
        timer.add(1000, () => this.canSkip = true, this);
        timer.start();
    }

    update() { 
        if (this.game.keys['space'].isDown && this.canSkip) {
            for (const text in this.texts) {
                this.texts[text].destroy();
            }
            this.game.scene = new Animation(this.game);
        }
    }

    loadTexts() {
        const titleStyle = {font: '20px verdana', fill: '#908301FF'};
        this.texts.push(this.game.phaser.add.text(105, 60, 'Star', titleStyle));
        this.texts.push(this.game.phaser.add.text(100, 80, 'Wars', titleStyle));
        const textStyle = {font: '10px verdana', fill: '#ffffff'};
        this.texts.push(this.game.phaser.add.text(75, 120, 'Press Space to start', textStyle));
    }
}