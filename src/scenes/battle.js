class Battle {
    constructor(game) {
        this.game = game;
        this.theme = 'battle';

        this.start();
    }
    
    start() {
        this.game.music.play(this.theme);
        
    }

    update() {

    }
}