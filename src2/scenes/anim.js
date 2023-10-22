class Animation {
    constructor(game) {
        this.game = game;
        this.theme = 'anim';

        this.start();
    }

    start() {
        this.game.music.play(this.theme);
    }

    update() {
        
    }
}