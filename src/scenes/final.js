class Final {
    constructor(game) {
        this.game = game;
        this.deathStar = null;
        this.laser = null;
        this.planet = null;
        this.text1 = null;
        this.text2 = null;
        this.canSkip = false;
        this.laserSound = null
        this.timer;

        this.start();
    }
    
    // No veo necesario su explicación, es una animación lineal controlada con diversos eventos en temporizadores
    start() {
        this.game.music.play('anim');

        this.laserSound = this.game.phaser.add.audio('laserSound');

        this.deathStar = this.game.phaser.add.sprite(100, 80, 'deathStar');

        this.timer = this.game.phaser.time.create(false);
        this.timer.add(1000, () => this.canSkip = true, this);
        this.timer.add(5000, () => {
            this.laser = this.game.phaser.add.sprite(160, 105, 'laser');
            this.laserSound.play();
        }, this);
        this.timer.add(10000, () => {
            this.deathStar.kill();
            this.laser.x = 0;
            this.laser.kill();
            this.planet = this.game.phaser.add.sprite(100, 80, 'planet');
        }, this);
        this.timer.add(15000, () => {
            this.laser.revive();
            this.laserSound.stop();
            this.laserSound.play();
            this.planet.loadTexture('bigExplosion');
        }, this);
        this.timer.add(20000, () => {
            this.planet.destroy();
            this.planet = null;
            this.laser.destroy();
            this.laser = null;
            this.deathStar.revive();
            const titleStyle = {font: '20px verdana', fill: '#ffffff'};
            this.text1 = this.game.phaser.add.text(75, 70, 'Game Over', titleStyle);
            const textStyle = {font: '10px verdana', fill: '#ffffff'};
            this.text2 = this.game.phaser.add.text(65, 120, 'Press Space to play again', textStyle);
        }, this);
        this.timer.start();
    }

    // Al pulsar la tecla espacio pasa de escena a la introducción, empezando así de nuevo
    update() {
        if (this.game.keys['space'].isDown && this.canSkip) {
            this.timer.stop()
            if (this.deathStar != null) {
                this.deathStar.destroy();
            }
            if (this.laser != null) {
                this.laser.destroy();
            }
            if (this.planet != null) {
                this.planet.destroy();
            }
            if (this.text1 != null) {
                this.text1.destroy();
            }
            if (this.text2 != null) {
                this.text2.destroy();
            }
            this.laserSound.destroy();
            this.game.scene = new Intro(this.game);
        }
    }
}