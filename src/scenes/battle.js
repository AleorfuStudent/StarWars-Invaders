class Battle {
    constructor(game) {
        this.game = game;
        this.theme = 'battle';
        this.enemys = [];
        this.player;
        this.playerSpeed = 2;
        this.enemyGap = 18;
        this.enemyCols = 10;
        this.enemyRows = 5;
        this.bullet = null;

        this.start();
    }
    
    start() {
        this.game.music.play(this.theme, true);

        this.generateEnemys();

        this.player = this.game.phaser.add.sprite(100, this.game.phaser.height - 10, 'player');
    }

    update() {
        this.movePlayer();
        if (this.bullet != null) {
            if (this.bullet.alive) {
                this.moveBullet();
            }
        }
    }

    movePlayer() {
        if (this.game.keys['right'].isDown) {
            this.player.x += this.playerSpeed;
        }
        if (this.game.keys['left'].isDown) {
            this.player.x -= this.playerSpeed;
        }
        if (this.game.keys['space'].isDown) {
            this.shoot();
        }
    }

    moveBullet() {
        this.bullet.y -= 5;
        if (this.bullet.y <= 0) {
            this.bullet.kill();
        }
    }

    shoot() {
        if (this.bullet === null) {
            this.bullet = this.game.phaser.add.sprite(this.player.x, this.player.y, 'playerBullet');
        } else if (!this.bullet.alive) {
            this.bullet.revive();
            this.bullet.x = this.player.x;
            this.bullet.y = this.player.y;
        }
    }

    generateEnemys() {
        if (this.enemys.length === 0) {
            const initialPos = 45;
            let pointerX = initialPos;
            let pointerY = 10;
            for (let i = 0; i < this.enemyRows; i++) {
                for (let j = 0; j < this.enemyCols; j++) {
                    this.enemys.push(this.game.phaser.add.sprite(pointerX, pointerY, 'enemy'));
                    pointerX += this.enemyGap;
                }
                pointerX = initialPos;
                pointerY += this.enemyGap;
            }
        } else {

        }
    }
}