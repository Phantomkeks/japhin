var iUserScore;

var winState = {
    init: function (sParameter) {
        iUserScore = sParameter;
    },

    create: function () {
        oGame.add.image(0, 0, 'menuBackground');
        oGame.add.text(0, 0, 'You finished this level!', {font: '35px Ariel', fill: '#000000'});
        oGame.add.text(0, 80, 'Your score: ' + iUserScore, {font: '35px Ariel', fill: '#000000'});
        oGame.add.text(0, oGame.world.height-30, 'Press space key to get back to menu', {font: '25px Ariel', fill: '#000000'});

        var spaceKey = oGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.addOnce(this.restart, this);
    },

    restart: function () {
        oGame.state.start('levels');
    }
}