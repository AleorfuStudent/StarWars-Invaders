class Music {
    constructor(game) {
        this.game = game;

        this.themePlaying = null;
    }
    
    play(theme, loop) {
        if (this.themePlaying != null) {
            this.themePlaying.destroy();
        }
        this.themePlaying = this.game.phaser.add.audio(theme);
        if (loop != null) {
            this.themePlaying.loop = loop;
        }
        this.themePlaying.play();
    }

    pause() {
        if (this.themePlaying != null) {
            this.themePlaying.pause();
        }
    }

    stop() {
        if (this.themePlaying != null) {
            this.themePlaying.destroy();
            this.themePlaying = null;
        }
    }

    playing() {
        if (this.themePlaying != null) {
            return this.themesPlaying[theme].isPlaying;
        }
    }
}