var highscoreState = {
    create: function () {
        oGame.add.image(0, 0, 'menuBackground');
        oGame.add.button(0, 0, 'backButton', this.menu);

        // Back to menu after clicking escape
        var escapeKey = oGame.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escapeKey.onDown.addOnce(this.menu, this);
    },

    menu: function () {
        oGame.state.start('menu');
    }
}