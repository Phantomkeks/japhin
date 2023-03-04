var levelsState = {
    create: function () {
        oGame.add.image(0, 0, 'menuBackground');

        oGame.add.button(0, 0, 'backButton', this.menu);
        oGame.add.button(90.5, 50, 'level1Button', this.startLevel).level = 1;
        oGame.add.button(206, 50, 'level2Button', this.startLevel).level = 2;
        oGame.add.button(321.5, 50, 'level3Button', this.startLevel).level = 3;
        oGame.add.button(90.5, 120, 'level4Button', this.startLevel).level = 4;
        oGame.add.button(206, 120, 'level5Button', this.startLevel).level = 5;
        oGame.add.button(321.5, 120, 'level6Button', this.startLevel).level = 6;

        // Back to menu after clicking escape
        var escapeKey = oGame.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escapeKey.onDown.addOnce(this.menu, this);
    },

    startLevel: function(oButton) {
        var sParameter;
        switch(oButton.level) {
            case 1:
                sParameter = 'levels/firstLevel.json';
                oGame.state.start('play', false, false, sParameter);
                // Removes the level buttons, otherwise they will appear in the level
                oGame.world.removeAll();
                break;
            case 2:
                sParameter = 'levels/secondLevel.json';
                oGame.state.start('play', false, false, sParameter);
                // Removes the level buttons, otherwise they will appear in the level
                oGame.world.removeAll();
                break;
            case 3:
                sParameter = 'levels/thirdLevel.json';
                oGame.state.start('play', false, false, sParameter);
                // Removes the level buttons, otherwise they will appear in the level
                oGame.world.removeAll();
                break;
            default:
                alert("This level is under construction: " + oButton.level);
        }
    },

    menu: function () {
        oGame.state.start('menu');
    }
}