class Music {
    constructor() {
        this.themesPlaying = {};
    }
    
    play(theme, loop) {
        if (theme in this.themesPlaying) {
            if (loop != null) {
                this.themesPlaying[theme].loop = loop;
            }
            this.themesPlaying[theme].play();
        } else {
            this.themesPlaying[theme] = game.add.audio(theme);
            if (loop != null) {
                this.themesPlaying[theme].loop = loop;
            }
            this.themesPlaying[theme].play();
        }
    }

    pause(theme) {
        if (theme in this.themesPlaying) {
            this.themesPlaying[theme].pause();
        }
    }

    stop(theme) {
        if (theme in this.themesPlaying) {
            this.themesPlaying[theme].stop();
            delete this.themesPlaying[theme];
        }
    }
}