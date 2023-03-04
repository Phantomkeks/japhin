var music;

var menuState = {
    create: function () {
        oGame.add.image(0, 0, 'menuBackground');
        oGame.add.text(170, 0, 'Japhin', {font: '40px Arial', fill: '#000000'});
        oGame.add.button(186, 50, 'levelsButton', this.openLevels);
        oGame.add.button(186, 96, 'highscoreButton', this.openHighscore);
        oGame.add.button(186, 142, 'optionsButton', this.openOptions);

        // Add music and wait till decoded of mp3 then start loop
        music = oGame.add.audio('musicBackground');
        oGame.sound.setDecodedCallback(music, this.startMusic, this);
    },

    startMusic: function() {
        // Testing purposes
        // music.loopFull();
    },

    openLevels: function () {
        oGame.state.start('levels');
    },

    openHighscore: function () {
        oGame.state.start('highscore');
    },

    openOptions: function () {
        oGame.state.start('options', false, false, music);
    }
}