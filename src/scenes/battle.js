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
        this.score = 0;
        this.scoreText;
        this.lives = 3;
        this.livesText;
        this.playerShoot;
        this.enemyShoot;
        this.explosionSound;

        this.start();
    }
    
    start() {
        this.game.music.play(this.theme, true);
        this.playerShoot = this.game.phaser.add.audio('shoot');
        this.enemyShoot = this.game.phaser.add.audio('enemyShoot');
        this.explosionSound = this.game.phaser.add.audio('explosion');

        this.game.phaser.physics.startSystem(Phaser.Physics.ARCADE);

        this.generateEnemys();

        this.player = this.game.phaser.add.sprite(100, this.game.phaser.height - 10, 'player');

        const textStyle = {font: '10px verdana', fill: '#ffffff'};
        this.scoreText = this.game.phaser.add.text(5, 5, 'Score: 0', textStyle);
        this.livesText = this.game.phaser.add.text(this.game.phaser.width - 50, 5, 'Lives: 3', textStyle);
    }

    update() {
        this.movePlayer();
        this.moveEnemys();

        this.game.phaser.physics.arcade.overlap(this.bullet, this.enemys, this.bulletCollision, null, this);
        this.scoreText.text = 'Score: ' + this.score;
        this.livesText.text = 'lives: ' + this.lives;

        if (this.bullet != null) {
            if (this.bullet.alive) {
                this.moveBullet();
            }
        }
    }

    bulletCollision(bullet, enemy) {
        bullet.kill();
        enemy.kill();
        this.score += 100;
        this.explosionSound.stop();
        this.explosionSound.play();
        
        const explosion = this.game.phaser.add.sprite(enemy.x, enemy.y, 'smallExplosion');
        const timer = this.game.phaser.time.create(false);
        timer.add(500, () => {
            explosion.destroy();
        }, this);
        timer.start();
    }

    moveEnemys() {
        if (this.enemys.length > 0) {
            
        } 
    }

    movePlayer() {
        if (this.game.keys['right'].isDown && this.player.x < this.game.phaser.width - this.player.width - 3) {
            this.player.x += this.playerSpeed;
        }
        if (this.game.keys['left'].isDown && this.player.x > 3) {
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
            this.score -= 50;
        }
    }

    shoot() {
        if (this.bullet === null) {
            this.bullet = this.game.phaser.add.sprite(this.player.x, this.player.y, 'playerBullet');
            this.game.phaser.physics.arcade.enable(this.bullet);
            this.playerShoot.stop();
            this.playerShoot.play();
        } else if (!this.bullet.alive) {
            this.bullet.x = this.player.x;
            this.bullet.y = this.player.y;
            this.bullet.revive();
            this.playerShoot.stop();
            this.playerShoot.play();
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
            this.game.phaser.physics.arcade.enable(this.enemys);
        } else {

        }
    }
}