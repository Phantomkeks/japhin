var oMap;
var oGroundLayer;
var aItems;
var aLocks;
var aWaters;
var aSharps;
var aDoors;
var aCoinBlocks;
var oPlayer;
var sLevelMap;

var playState = {
    init: function (sParameter) {
        sLevelMap = sParameter;
    },

    preload: function() {
        oGame.add.image(0, 0, 'levelBackground');
        oGame.load.tilemap('tilemap', sLevelMap, null, Phaser.Tilemap.TILED_JSON);
    },

    render: function () {
        // Init coin counter
        oGame.debug.text('Lifes: ' + oPlayer.getSprite().lifes, 15, 15);
        oGame.debug.text('Coins: ' + oPlayer.getSprite().coins, 115, 15);
        oGame.debug.text('Keys: ' + oPlayer.getSprite().keys, 215, 15);
        
        // Display all info to player
        // oGame.debug.bodyInfo(player, 16, 24);
    },

    create: function() {
        // ##### Game settings #####
        // Start the Arcade Physics systems
        oGame.physics.startSystem(Phaser.Physics.ARCADE);
        oGame.plugins.add(Phaser.Plugin.ArcadeSlopes);

        // Back to menu after clicking escape
        var escapeKey = oGame.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escapeKey.onDown.addOnce(this.menu, this);

        // Create cursors for key control
        this.cursors = oGame.input.keyboard.createCursorKeys();
        // ##### Game settings ##### 

        // ##### Map settings #####
        oMap = new Map(oGame);
        oGroundLayer = oMap.getGroundLayer();
        // ##### Map settings #####

        // ##### Init Player ####
        oPlayer = new Player(oGame, [5, 0, 0], [50, 152], [0, 1000], 350, "player", "goLeft" , "goRight");
        // var text1 = oGame.add.text(15, 15, 'Lifes: ' + oPlayer.getSprite().lifes, {font: '15px Ariel', fill: '#000000'}).fixedToCamera = true;
        // var text2 = oGame.add.text(115, 15, 'Coins: ' + oPlayer.getSprite().coins, {font: '15px Ariel', fill: '#000000'}).fixedToCamera = true;
        // var text3 = oGame.add.text(215, 15, 'Keys: ' + oPlayer.getSprite().keys, {font: '15px Ariel', fill: '#000000'}).fixedToCamera = true;
        // ##### Player settings #####

        // ##### Item settings #####
        var objects = new Objects(oMap.getMap());
        aItems = objects.createItems('coin', aItems);
        aItems = objects.createItems('key', aItems);
        aWaters = objects.createItems('water', aWaters);
        aSharps = objects.createItems('sharp', aSharps);
        aDoors = objects.createItems('door', aDoors);
        aLocks = objects.createItems('lock', aLocks);
        aCoinBlocks = objects.createItemsWithAnimations('jumpPlatform', aCoinBlocks, ["firstHit", "secondHit"]);
        aCoinBlocks = objects.createItemsWithAnimations('coinBlock', aCoinBlocks, ["firstHit", "secondHit"]);
        // ##### Item settings #####
    },    

    update: function() {
        // Make the player sprite collide with the ground layer
        oGame.physics.arcade.collide(oPlayer.getSprite(), oGroundLayer, function(oPlayer){           
            // Player on the ground -> player can jump
            if (oPlayer.body.blocked.down) {    
                oPlayer.canJump = true;
            }

             // Player NOT on the ground and touching a wall on the right or left
             if ((oPlayer.body.blocked.right || oPlayer.body.blocked.left) && !oPlayer.body.blocked.down){
                oPlayer.onWall = true;
            }
        }, null, this); 
        
        oGame.physics.arcade.collide(oPlayer.getSprite(), aLocks, oPlayer.interactWithLocks, null, this);
        oGame.physics.arcade.collide(oPlayer.getSprite(), aWaters, oPlayer.die, null, this);
        oGame.physics.arcade.collide(oPlayer.getSprite(), aSharps, oPlayer.die, null, this);
        oGame.physics.arcade.collide(oPlayer.getSprite(), aDoors, oPlayer.win, null, this);
        oGame.physics.arcade.collide(oPlayer.getSprite(), aCoinBlocks, oPlayer.hitBlock, null, this);
        oGame.physics.arcade.overlap(oPlayer.getSprite(), aItems, oPlayer.collect, null, this);    

        // React to keyboard arrows
        switch (true) {
            case (this.cursors.up.isDown):
                oPlayer.handleJump();
                break;
            case (this.cursors.left.isDown):
                oPlayer.moveLeft();
                break;
            case (this.cursors.right.isDown):
                oPlayer.moveRight();
                break;
            default:
                // Prevent player to slide
                oPlayer.getSprite().body.velocity.x = 0;
        }        
    },

    menu: function () {
        oGame.state.start('menu');
    }
}