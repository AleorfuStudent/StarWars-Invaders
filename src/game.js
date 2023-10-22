class Game {
    constructor() {
        // Inicializo la librería Phaser
        this.phaser = new Phaser.Game(256, 224, Phaser.AUTO, null, {preload: this.preload, create: this.create, update: this.update});
        this.scene = null;
        this.music;
        this.keys = {};
    }

    // Esta función precarga los recursos que utilizaremos más adelante
    preload = () => {
        // Precargo las imagenes
        this.phaser.load.image('player', 'resources/sprites/x-wings.png');
        this.phaser.load.image('enemy', 'resources/sprites/tie-fighter.png');
        this.phaser.load.image('deathStar', 'resources/sprites/death-star.png');
        this.phaser.load.image('bigExplosion', 'resources/sprites/big-explosion.png');
        this.phaser.load.image('planet', 'resources/sprites/planet.png');
        this.phaser.load.image('playerBullet', 'resources/sprites/player-bullet.png');
        this.phaser.load.image('enemyBullet', 'resources/sprites/enemy-bullet.png');
        this.phaser.load.image('smallExplosion', 'resources/sprites/small-explosion.png');
        this.phaser.load.image('laser', 'resources/sprites/laser.png')

        // Precargo los audios
        this.phaser.load.audio('anim','resources/sounds/anim.mp3');
        this.phaser.load.audio('battle','resources/sounds/battle.mp3');
        this.phaser.load.audio('enemyFlying','resources/sounds/enemyFlying.wav');
        this.phaser.load.audio('enemyShoot','resources/sounds/enemyShoot.wav');
        this.phaser.load.audio('explosion','resources/sounds/explosion.wav');
        this.phaser.load.audio('menu','resources/sounds/menu.mp3');
        this.phaser.load.audio('shoot','resources/sounds/shoot.wav');
        this.phaser.load.audio('theme','resources/sounds/theme.mp3');
        this.phaser.load.audio('laserSound', 'resources/sounds/laser.wav')
    }

    // Esta función se ejecuta una vez el juego haya cargado
    create = () => {
        // Configuro la ventana para que, aúnque manteniendo su baja resolución, escale el tamaño a un maximo de 700x700
        this.phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.phaser.scale.setShowAll();
        this.phaser.scale.maxWidth = 700;
        this.phaser.scale.maxHeight = 700;
        this.phaser.scale.pageAlignHorizontally = true;
        this.phaser.scale.pageAlignVertically = true;
        window.addEventListener('resize', () => this.phaser.scale.refresh());

        // Esta evento de dispara cuando la ventana gana o pierde el foco
        document.addEventListener('visibilitychange', this.focusLost);

        // Guardo los controles que utilizaremos más adelante en un diccionario
        this.keys['space'] = this.phaser.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keys['right'] = this.phaser.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.keys['left'] = this.phaser.input.keyboard.addKey(Phaser.Keyboard.LEFT);

        // Inicializo el gestor de música y la primera escena del juego
        this.music = new Music(this);
        this.scene = new Intro(this);
    }

    // Esta funcion se ejecuta, casi, en cada frame in es posible
    update = () => {
        // Si existe una escena
        if (this.scene != null) {
            // Llama a su función actualizable
            this.scene.update();
        }  
    }

    // Esta función se ejecuta cuando la ventana pierde el foco
    // Si pierde el foco pausa la música, si lo gana la vuelve a poner
    focusLost = () => {
        if (document.hidden) {
            if (this.music.playing()) {
                this.music.pause();
            }
        } else {
            if (!this.music.playing()) {
                this.music.resume();
            }
        }
    }
}

// Esta función se ejecuta cuando se pulsa la pantalla
// Así obligo al usuario a hacer focus a la página, permitiendo así poner los sonidos ya que
// hay una ley que prohibe el activar sonidos en ventanas inactivas.
function startGame() {
    // Instancio el juego
    const game = new Game();
    // Quito el event listener
    window.removeEventListener('mousedown', startGame);
}

// Añado un evento al pulsar la pantalla
window.addEventListener('mousedown', startGame);