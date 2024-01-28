class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload() {
        // assets
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('rocket2', './assets/rocket2.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('speedship', './assets/speedShip.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30

        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, "Use <-> arrows to move & (F) to fire", menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
    
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                twoPlayer: false
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                twoPlayer: false
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene') 
        }

    }
}