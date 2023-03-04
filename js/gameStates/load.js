var loadState = {
    preload: function() {
        // Setting general settings
        oGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        oGame.scale.pageAlignHorizontally = true;
        oGame.scale.pageAlignVertically = true;
        oGame.stage.disableVisibilityChange = true;

        // Loading music
        oGame.load.audio('musicBackground', 'audio/enchanted.mp3');

        // Loading background and map elements
        oGame.load.image('gameTiles', 'assets/Spritesheet/mapElements.png');
        oGame.load.image('levelBackground', 'assets/Background/levelBackground.png');
        oGame.load.image('menuBackground', 'assets/Background/menuBackground.png');

        // Loading player
        oGame.load.spritesheet('player', 'assets/Player/player.png', 16, 16);

        // Loading single items 
        oGame.load.image('coin', 'assets/Items/coin.png');
        oGame.load.image('key', 'assets/Items/key.png');
        oGame.load.image('lock', 'assets/Items/lock.png');
        oGame.load.image('sharp', 'assets/Items/sharp.png');
        oGame.load.image('water', 'assets/Items/water.png');
        oGame.load.image('door', 'assets/Items/door.png');
        oGame.load.spritesheet('jumpPlatform', 'assets/Items/jumpPlatform.png', 21, 21);
        oGame.load.spritesheet('coinBlock', 'assets/Items/coinBlock.png', 21, 21);

        // Loading buttons
        oGame.load.image('levelsButton', 'assets/Buttons/levelsButton.png');
        oGame.load.image('highscoreButton', 'assets/Buttons/highscoreButton.png');
        oGame.load.image('optionsButton', 'assets/Buttons/optionsButton.png');
        oGame.load.image('backButton', 'assets/Buttons/backButton.png');
        oGame.load.image('musicOnButton', 'assets/Buttons/musicOnButton.png');
        oGame.load.image('musicOffButton', 'assets/Buttons/musicOffButton.png');
        oGame.load.image('level1Button', 'assets/Buttons/level1Button.png');
        oGame.load.image('level2Button', 'assets/Buttons/level2Button.png');
        oGame.load.image('level3Button', 'assets/Buttons/level3Button.png');
        oGame.load.image('level4Button', 'assets/Buttons/level4Button.png');
        oGame.load.image('level5Button', 'assets/Buttons/level5Button.png');
        oGame.load.image('level6Button', 'assets/Buttons/level6Button.png');
    },

    create: function () {
        oGame.add.image(0, 0, 'menuBackground');
        oGame.state.start('menu');
    }
}