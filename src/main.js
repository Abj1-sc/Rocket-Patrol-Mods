// Ayush Bandopadhyay
// Rocket Patrol: Freed
// Time to Complete: 7 hrs
// Mods:
// - (5 Point) New Spaceship Type
// - (5 Point) New Timer Mechanic + 2 for hit and - 3 for miss
// - (5 Point) Mouse Control
// - (3 Point) Display Clock
// - (1 Point) Speed Increase after 30 seconds
// - (1 Point) Allow rocket control after fired
// References: Stack Overflow

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config)

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// keyboard
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
