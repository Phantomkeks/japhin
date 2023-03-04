var oGame = new Phaser.Game(462, 189, Phaser.AUTO, 'gameDiv');

// Adding game states / views
oGame.state.add('boot', bootState);
oGame.state.add('load', loadState);
oGame.state.add('menu', menuState);
oGame.state.add('levels', levelsState);
oGame.state.add('highscore', highscoreState);
oGame.state.add('options', optionsState);
oGame.state.add('play', playState);
oGame.state.add('win', winState);
oGame.state.add('lose', loseState);

oGame.state.start('boot');
