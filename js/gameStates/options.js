var music;

var optionsState = {
    init: function(oMusic) {
        music = oMusic;
    },

    create: function () {
        oGame.add.image(0, 0, 'menuBackground');

        oGame.add.button(0, 0, 'backButton', this.menu);

        oGame.add.text(90, 0, 'Music:', {font: '15px Ariel', fill: '#000000'});
        oGame.add.button(180, 0, 'musicOnButton', this.startMusic);
        oGame.add.button(270, 0, 'musicOffButton', this.stopMusic);

        oGame.add.text(90, 50, 'Color:', {font: '25px Ariel', fill: '#000000'});
        oGame.add.button(180, 50, 'level6Button', this.startLevel);
        oGame.add.sprite(270, 50, 'player');
        oGame.add.button(360, 50, 'level6Button', this.startLevel);

        oGame.add.text(90, 110, 'Background:', {font: '25px Ariel', fill: '#000000'});
        oGame.add.button(90, 135, 'level5Button', this.startLevel);
        oGame.add.button(140, 135, 'level6Button', this.startLevel);
        oGame.add.button(190, 135, 'level5Button', this.startLevel);
        oGame.add.button(240, 135, 'level6Button', this.startLevel);

        // Back to menu after clicking escape
        var escapeKey = oGame.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escapeKey.onDown.addOnce(this.menu, this);
    },

    startMusic: function() {
        console.log("Start Music");
        // music.resume();
    },

    stopMusic: function() {
        console.log("Stop Music");
        // music.pause();
    },

    menu: function () {
        oGame.state.start('menu');
    }
}