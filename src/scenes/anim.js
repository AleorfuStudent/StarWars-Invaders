class Animation {
    constructor(game) {
        this.game = game;
        this.theme = 'anim';
        this.deathStar;
        this.enemys = [];
        this.enemySFX;
        this.enemySFXsPlayed = [false, false, false];
        this.moveScreen = false;
        this.screenSpeed = 0.5;
        this.enemyGap = 18;
        this.enemyCols = 10;
        this.enemyRows = 5;
        this.canSkip = false;
        this.timer;

        this.start();
    }

    start() {
        this.game.music.play(this.theme);
        this.enemySFX = this.game.phaser.add.audio('enemyFlying');

        this.deathStar = this.game.phaser.add.sprite(100, 80, 'deathStar');
        
        this.timer = this.game.phaser.time.create(false);
        this.timer.add(5000, () => this.generateEnemys(), this);
        this.timer.start();
        const timer2 = this.game.phaser.time.create(false);
        timer2.add(1000, () => this.canSkip = true, this);
        timer2.start();
    }

    update() {
        if (this.enemys.length > 0 && !this.moveScreen) {
            for (const enemy in this.enemys) {
                this.enemys[enemy].y += 5;
            }
            for (let i = 0; i < 3; i++) {
                if (this.enemys[i].y >= 0 && !this.enemySFXsPlayed[i]) {
                    this.enemySFXsPlayed[i] = true;
                    this.enemySFX.stop();
                    this.enemySFX.play();
                }
            }
            if (this.enemys[0].y >= this.game.phaser.height + 400) {
                for (const enemy in this.enemys) {
                    this.enemys[enemy].destroy();
                }
                this.enemySFX.destroy();
                this.generateEnemys2();
                this.moveScreen = true;
            }
        }
        if (this.moveScreen) {
            this.deathStar.y -= this.screenSpeed;
            for (const enemy in this.enemys) {
                this.enemys[enemy].y -= this.screenSpeed;
            }
            if (this.enemys[0].y <= 10) {
                this.skip();
            }
        }
        if (this.game.keys['space'].isDown && this.canSkip) {
            this.skip();
        }
    }

    skip() {
        this.deathStar.destroy();
        for (const enemy in this.enemys) {
            this.enemys[enemy].destroy();
        }
        this.game.scene = new Battle(this.game);
        this.timer.stop();
    }

    generateEnemys() {
        this.enemys.push(this.game.phaser.add.sprite(25, -100, 'enemy'));
        this.enemys.push(this.game.phaser.add.sprite(75, -50, 'enemy'));
        this.enemys.push(this.game.phaser.add.sprite(125, 0, 'enemy'));
        this.enemys.push(this.game.phaser.add.sprite(175, -50, 'enemy'));
        this.enemys.push(this.game.phaser.add.sprite(225, -100, 'enemy'));
    }

    generateEnemys2() {
        this.enemys = [];
        const initialPos = 45;
        let pointerX = initialPos;
        let pointerY = this.game.phaser.height + 200;
        for (let i = 0; i < this.enemyRows; i++) {
            for (let j = 0; j < this.enemyCols; j++) {
                this.enemys.push(this.game.phaser.add.sprite(pointerX, pointerY, 'enemy'));
                pointerX += this.enemyGap;
            }
            pointerX = initialPos;
            pointerY += this.enemyGap;
        }
    }
}