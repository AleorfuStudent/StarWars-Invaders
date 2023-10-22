class Game {
    constructor() {
        this.phaser = new Phaser.Game(256, 224, Phaser.AUTO, null, {preload: this.preload, create: this.create, update: this.update});
        this.playing = true;
        this.scene = null;
        this.music;
    }

    preload = () => {
        this.phaser.load.image('player', 'resources/sprites/x-wings.png');
        this.phaser.load.image('enemy', 'resources/sprites/tie-fighter.png');
        this.phaser.load.image('deathStar', 'resources/sprites/death-star.png');
        this.phaser.load.image('bigExplosion', 'resources/sprites/big-explosion.png');
        this.phaser.load.image('planet', 'resources/sprites/planet.png');
        this.phaser.load.image('playerBullet', 'resources/sprites/player-bullet.png');
        this.phaser.load.image('enemyBullet', 'resources/sprites/enemy-bullet.png');
        this.phaser.load.image('smallExplosion', 'resources/sprites/small-explosion.png');

        this.phaser.load.audio('anim','resources/sounds/anim.mp3');
        this.phaser.load.audio('battle','resources/sounds/battle.mp3');
        this.phaser.load.audio('enemyFlying','resources/sounds/enemyFlying.wav');
        this.phaser.load.audio('enemyShoot','resources/sounds/enemyShoot.wav');
        this.phaser.load.audio('explosion','resources/sounds/explosion.wav');
        this.phaser.load.audio('menu','resources/sounds/menu.mp3');
        this.phaser.load.audio('shoot','resources/sounds/shoot.wav');
        this.phaser.load.audio('theme','resources/sounds/theme.mp3');
    }

    create = () => {
        this.phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.phaser.scale.setShowAll();
        this.phaser.scale.maxWidth = 700;
        this.phaser.scale.maxHeight = 700;
        this.phaser.scale.pageAlignHorizontally = true;
        this.phaser.scale.pageAlignVertically = true;
        window.addEventListener('resize', () => this.game.scale.refresh());

        this.music = new Music(this);
        this.scene = new Intro(this);
    }

    update = () => {
        if (this.playing && this.scene != null) {
            this.scene.update();
        }
    }
}

function startGame() {
    const game = new Game();
    window.removeEventListener('mousedown', startGame);
}

window.addEventListener('mousedown', startGame);