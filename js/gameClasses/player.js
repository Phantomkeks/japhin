function Player (oGame, aStartCounter, aStartPosition, aStartGravity, iPlayerJump, sPlayerSprite, sPlayerGoLeft, sPlayerGoRight) {
    // Adding the player sprite / apply arcade physics / enable slope moving / add camera focus
    this.sprite = oGame.add.sprite(aStartPosition[0], aStartPosition[1], sPlayerSprite);
    oGame.physics.arcade.enable(this.sprite);
    oGame.slopes.enable(this.sprite);
    oGame.camera.follow(this.sprite);

    // Set some physics of player sprite
    this.sprite.body.gravity.x = aStartGravity[0];
    this.sprite.body.gravity.y = aStartGravity[1];
    this.sprite.anchor.set(0.5);
    this.sprite.playerJump = iPlayerJump;

    // Add player animations
    this.sprite.idleFrame = 0;
    this.sprite.animations.add(sPlayerGoRight, [0]);
    this.sprite.animations.add(sPlayerGoLeft, [2]);        

    // Disable player to move outside the world
    this.sprite.body.collideWorldBounds = true;

    // Set start counters
    this.sprite.lifes = aStartCounter[0];
    this.sprite.coins = aStartCounter[1];
    this.sprite.keys = aStartCounter[2];

    // Set general settings
    this.sprite.startPosition = aStartPosition;
}

// Phaser representation of the drawn sprite / player
Player.prototype.getSprite = function() {
    return this.sprite;
}

// Moving of player
Player.prototype.handleJump = function() {
    // Player can jump when: canJump is true (the player is on the ground (blocked.down)) or next to a wall
    if (this.sprite.canJump || this.sprite.onWall) {
        // Applying jump force
        this.sprite.body.velocity.y = -this.sprite.playerJump;

        // Is the player on a wall?
        if (this.sprite.onWall) {
            // Change the horizontal velocity. This way the player will jump off the wall
            this.sprite.body.velocity.x = this.sprite.body.velocity * this.sprite.scale.x;
        }

        this.sprite.canJump = false;
        this.sprite.onWall = false;
    }
}

Player.prototype.moveLeft = function() {
    this.sprite.body.velocity.x = -100;
    this.sprite.animations.play("goLeft", 1, false);
    this.sprite.idleFrame = 1;
}

Player.prototype.moveRight = function() {
    this.sprite.body.velocity.x = +100;
    this.sprite.animations.play("goRight", 1, false);
    this.sprite.idleFrame = 0;
}

// Player collide / overlap other objects
Player.prototype.hitBlock = function (oPlayer, oCoinBlock) { 
    if (oCoinBlock.body.touching.down) {
        if (!oCoinBlock.hitCount) {
            oCoinBlock.hitCount = 3;
        }

        oPlayer.coins += 1;
        oCoinBlock.hitCount -= 1;

        switch(oCoinBlock.hitCount) {
            case 1:
                oCoinBlock.animations.play("secondHit", 2, false);
                break;
            case 2:
                oCoinBlock.animations.play("firstHit", 2, false);
                break;
        }

        if (oCoinBlock.hitCount === 0) {
            oCoinBlock.destroy();
        }
    }
}

Player.prototype.collect = function(oPlayer, oCollectable) {
    switch(oCollectable.type) {
        case 'coin':
            oPlayer.coins += 1;
            break;
        case 'key':
            oPlayer.keys += 1;
            break;
    }

    oCollectable.destroy();
}

Player.prototype.die = function(oPlayer, aItems) {
    oPlayer.lifes -= 1;
    
    if (oPlayer.lifes === 0) {
        oGame.state.start('lose');
    } else {
        oPlayer.body.x = oPlayer.startPosition[0];
        oPlayer.body.y = oPlayer.startPosition[1];
    }
}

Player.prototype.interactWithLocks = function(oPlayer, aLocks) {
    // Player on the object -> player can jump
    if (oPlayer.body.touching.down) {    
        oPlayer.canJump = true;
    }

    // Win criteria
    if (oPlayer.keys > 0) {
        aLocks.destroy();
        oPlayer.keys -= 1;
    }
}

Player.prototype.win = function(oPlayer, aDoors) {
    var iUserScore = (oPlayer.coins * 5) + (oPlayer.lifes * 10);
    oGame.state.start('win', false, false, iUserScore);
    oGame.world.removeAll();
}