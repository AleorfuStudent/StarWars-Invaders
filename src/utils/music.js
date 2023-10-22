class Music {
    constructor(game) {
        this.game = game;

        this.themePlaying = null;
    }
    
    // Destruyo la canción antigua (de haberla) y añado la nueva
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

    // De estar pausada a canción la reanudo
    resume() {
        if (this.themePlaying != null) {
            if (!this.playing()) {
                this.themePlaying.resume();
            }
        }
    }

    // De estar sonando la pauso
    pause() {
        if (this.themePlaying != null) {
            if (this.playing()) {
                this.themePlaying.pause();
            }
        }
    }

    // Elimino la canción
    stop() {
        if (this.themePlaying != null) {
            this.themePlaying.destroy();
            this.themePlaying = null;
        }
    }

    // Devuelvo si la canción está sonando
    playing() {
        if (this.themePlaying != null) {
            return this.themePlaying.isPlaying;
        }
    }
}