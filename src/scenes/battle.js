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
        this.enemysX = 45;
        this.enemysY = 10;
        this.enemysSpeed = 1;
        this.bullet = null;
        this.enemyBullet = null;
        this.score = 0;
        this.scoreText;
        this.lives = 3;
        this.livesText;
        this.playerShoot;
        this.enemyShootSound;
        this.explosionSound;
        this.enemysRight = true;

        this.start();
    }
    
    start() {
        this.game.music.play(this.theme, true);
        this.playerShoot = this.game.phaser.add.audio('shoot');
        this.enemyShootSound = this.game.phaser.add.audio('enemyShoot');
        this.explosionSound = this.game.phaser.add.audio('explosion');

        this.game.phaser.physics.startSystem(Phaser.Physics.ARCADE);

        this.generateEnemys();

        this.player = this.game.phaser.add.sprite(150, this.game.phaser.height - 10, 'player');
        this.game.phaser.physics.arcade.enable(this.player);

        const textStyle = {font: '10px verdana', fill: '#ffffff'};
        this.scoreText = this.game.phaser.add.text(5, 5, 'Score: 0', textStyle);
        this.livesText = this.game.phaser.add.text(this.game.phaser.width - 50, 5, 'Lives: 3', textStyle);
    }

    update() {
        this.game.phaser.physics.arcade.overlap(this.bullet, this.enemys, this.bulletCollision, null, this);
        this.game.phaser.physics.arcade.overlap(this.enemyBullet, this.player, this.enemyBulletCollision, null, this);
        this.movePlayer();
        this.moveEnemys();
        this.moveBullet();
        this.enemyShoot();
        this.moveEnemyBullet();

        let nextRound = true;
        for (const enemy in this.enemys) {
            if (this.enemys[enemy].alive) {
                nextRound = false;
            }
        }

        if (nextRound) {
            this.generateEnemys();
        }

        this.scoreText.text = 'Score: ' + this.score;
        this.livesText.text = 'lives: ' + this.lives;
    }

    bulletCollision(bullet, enemy) {
        bullet.kill();
        this.score += 100;
        this.explosionSound.stop();
        this.explosionSound.play();
        
        enemy.loadTexture('smallExplosion');
        const timer = this.game.phaser.time.create(false);
        timer.add(100, () => {
            enemy.loadTexture('enemy');
            enemy.kill();
        }, this);
        timer.start();
    }

    enemyBulletCollision(bullet, player) {
        bullet.kill();
        this.lives -= 1;
        this.explosionSound.stop();
        this.explosionSound.play();

        if (this.lives > 0) {
            player.loadTexture('smallExplosion');
            const timer = this.game.phaser.time.create(false);
            timer.add(100, () => {
                player.loadTexture('player');
            }, this);
            timer.start();
        } else {
            this.scoreText.destroy();
            this.livesText.destroy();
            this.player.destroy();
            for (const enemy in this.enemys) {
                this.enemys[enemy].destroy();
            }
            this.bullet.destroy();
            this.enemyBullet.destroy();
            this.game.scene = new Final(this.game);
        }
    }

    moveEnemys() {
        if (this.enemys.length > 0) {
            let y = false;
            if (this.enemysRight) {
                if (this.enemysX < this.game.phaser.width - 180) {
                    this.enemysX += this.enemysSpeed;
                } else {
                    this.enemysY += this.enemysSpeed * 2;
                    this.enemysRight = false;
                    y = true;
                }
            } else {
                if (this.enemysX > 10) {
                    this.enemysX -= this.enemysSpeed;
                } else {
                    this.enemysY += this.enemysSpeed;
                    this.enemysRight = true;
                    y = true;
                }
            }
        
            for (const enemy in this.enemys) {
                if (this.enemysRight) {
                    this.enemys[enemy].x += this.enemysSpeed;
                } else {
                    this.enemys[enemy].x -= this.enemysSpeed;
                }
                if (y) {
                    this.enemys[enemy].y += this.enemysSpeed;
                }
            };  
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
        if (this.bullet != null) {
            if (this.bullet.alive) {
                this.bullet.y -= 5;
                if (this.bullet.y <= 0) {
                    this.bullet.kill();
                    this.score -= 50;
                }
            }
        }
    }

    moveEnemyBullet() {
        if (this.enemyBullet != null) {
            if (this.enemyBullet.alive) {
                this.enemyBullet.y += 5;
                if (this.enemyBullet.y >= this.game.phaser.height) {
                    this.enemyBullet.kill();
                }
            }
        }
    }

    enemyShoot() {
        if (this.enemyBullet === null) {
            const enemy = this.enemys[Math.floor(Math.random() * (this.enemys.length - 1))];
            if (enemy.alive) {
                this.enemyBullet = this.game.phaser.add.sprite(enemy.x, enemy.y, 'enemyBullet');
                this.game.phaser.physics.arcade.enable(this.enemyBullet);
                this.enemyShootSound.stop();
                this.enemyShootSound.play();
            }
        } else if (!this.enemyBullet.alive) {
            const enemy = this.enemys[Math.floor(Math.random() * (this.enemys.length - 1))];
            if (enemy.alive) {
                this.enemyBullet.x = enemy.x + 3;
                this.enemyBullet.y = enemy.y;
                this.enemyBullet.revive();
                this.enemyShootSound.stop();
                this.enemyShootSound.play();
            }
        }
    }

    shoot() {
        if (this.bullet === null) {
            this.bullet = this.game.phaser.add.sprite(this.player.x, this.player.y, 'playerBullet');
            this.game.phaser.physics.arcade.enable(this.bullet);
            this.playerShoot.stop();
            this.playerShoot.play();
        } else if (!this.bullet.alive) {
            this.bullet.x = this.player.x + 3;
            this.bullet.y = this.player.y;
            this.bullet.revive();
            this.playerShoot.stop();
            this.playerShoot.play();
        }
    }

    generateEnemys() {
        this.enemysX = 45;
        this.enemysY = 10;
        const initialPos = 45;
        let pointerX = initialPos;
        let pointerY = 10;
        if (this.enemys.length === 0) {
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
            let pos = 0;
            for (let i = 0; i < this.enemyRows; i++) {
                for (let j = 0; j < this.enemyCols; j++) {
                    this.enemys[pos].revive();
                    this.enemys[pos].x = pointerX;
                    this.enemys[pos].y = pointerY;
                    pointerX += this.enemyGap;
                    pos++;
                }
                pointerX = initialPos;
                pointerY += this.enemyGap;
            }
        }
    }
}