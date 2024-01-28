class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
  
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI box
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)

        // white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        //rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        
        // keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        //smaller, faster, new ships, worth 50 points
        this.nShip01 = new Spaceship(this, game.config.width, borderUISize*7 + borderPadding * 6, 'speedship', 0, 50).setOrigin(0, 0).setScale(0.75)
        this.nShip02 = new Spaceship(this, game.config.width + borderUISize*10, borderUISize*7 + borderPadding * 6, 'speedship', 0, 50).setOrigin(0, 0).setScale(0.75)
        this.nShip01.small()
        this.nShip02.small()

        //score
        this.p1Score = 0

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, this.scoreConfig)

        // GAME OVER flag
        this.gameOver = false

        this.scoreConfig.fixedWidth = 0
        //Mod
        //clock display
        this.tracker = game.settings.gameTimer / 1000

        this.timer = this.add.text(game.config.width/2, borderUISize + borderPadding * 2, this.tracker + 's',this.scoreConfig)
        
        //mod speed up
        this.speedUp = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed += 3
            this.ship02.moveSpeed += 3
            this.ship03.moveSpeed += 3
            this.nShip01.moveSpeed += 3
            this.nShip02.moveSpeed += 3

            this.speed = this.add.text(game.config.width/2, game.config.height / 2, 'SPEED UP',this.scoreConfig)
            setTimeout(() =>  {
                this.speed.destroy()
            }, 1000);
        }, null, this)

        this.CLOCK = this.time.addEvent({
            callback: this.clockM,
            callbackScope: this,
            delay: 1000, // 1000 = 1 second
            loop: true
        })

    }

    update() {

        // if (!this.p1Rocket.isFiring && this.input.x <= game.config.width - borderUISize - this.p1Rocket.width && this.input.x >= borderUISize + this.p1Rocket.width){
        //     this.p1Rocket.x = this.input.x
        // }

        //Mod
        if (this.input.x <= game.config.width - borderUISize - this.p1Rocket.width && this.input.x >= borderUISize + this.p1Rocket.width){
            this.p1Rocket.x = this.input.x
        }

        this.timer.setText(this.tracker + 's')

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4
        
        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.p1Rocket.fire();
            }
        }, this);

        if(!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.nShip01.update()
            this.nShip02.update()
        }

        if(this.p1Rocket.y <= borderUISize * 3 + borderPadding + 1) {
            this.tracker -= 3
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.tracker += 2
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)   
            this.tracker += 2
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.tracker += 2
        }
        if(this.checkCollision(this.p1Rocket, this.nShip01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.nShip01)   
            this.tracker += 2
        }
        if(this.checkCollision(this.p1Rocket, this.nShip02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.nShip02)  
            this.tracker += 2 
        }   
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        ship.alpha = 0
        
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })

        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
    }
    
    //clock mod
    clockM() {
        if(this.tracker > 0) {
            this.tracker -= 1
            this.timer.setText(this.tracker + 's')
        } else {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', this.scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }
    }

    
}


