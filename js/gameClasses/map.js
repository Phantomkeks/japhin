function Map (oGame) {
     // Sets tilemap and loads images out of spritesheet
     this.map = oGame.add.tilemap('tilemap');
     this.map.addTilesetImage('mapElements', 'gameTiles');

     // Before you can use the collide function you need to set what tiles can collide
     this.map.setCollisionBetween(1, 100000, true, 'GroundLayer');
     
     // Creates ground layer
     this.groundLayer = this.map.createLayer('GroundLayer');

     // Draws all elements that should not collide and just be there (e.g. signs)
     this.transparentLayer = this.map.createLayer('TransparentLayer');

     // Change the world size to match the size of this layer
     this.groundLayer.resizeWorld();

     // Maps the digits of tiles (tiled: 0 = block; 127 = slope with corner left) to slope plugin digits / forms
     oGame.slopes.convertTilemapLayer(this.groundLayer, {
         // Standard digits and name of form (ninja-tiles.png for examples)
         // 2:  'FULL',
         // 3:  'HALF_BOTTOM_LEFT',
         // 4:  'HALF_BOTTOM_RIGHT',
         // 6:  'HALF_TOP_LEFT',
         // 5:  'HALF_TOP_RIGHT',
         // 15: 'QUARTER_BOTTOM_LEFT_LOW',
         // 16: 'QUARTER_BOTTOM_RIGHT_LOW',
         // 17: 'QUARTER_TOP_RIGHT_LOW',
         // 18: 'QUARTER_TOP_LEFT_LOW',
         // 19: 'QUARTER_BOTTOM_LEFT_HIGH',
         // 20: 'QUARTER_BOTTOM_RIGHT_HIGH',
         // 21: 'QUARTER_TOP_RIGHT_HIGH',
         // 22: 'QUARTER_TOP_LEFT_HIGH',
         // 23: 'QUARTER_LEFT_BOTTOM_HIGH',
         // 24: 'QUARTER_RIGHT_BOTTOM_HIGH',
         // 25: 'QUARTER_RIGHT_TOP_LOW',
         // 26: 'QUARTER_LEFT_TOP_LOW',
         // 27: 'QUARTER_LEFT_BOTTOM_LOW',
         // 28: 'QUARTER_RIGHT_BOTTOM_LOW',
         // 29: 'QUARTER_RIGHT_TOP_HIGH',
         // 30: 'QUARTER_LEFT_TOP_HIGH',
         // 31: 'HALF_BOTTOM',
         // 32: 'HALF_RIGHT',
         // 33: 'HALF_TOP',
         // 34: 'HALF_LEFT',
         127: 'HALF_BOTTOM_RIGHT',
         128: 'HALF_BOTTOM_LEFT'
     });
}

Map.prototype.getMap = function() {
    return this.map;
}

Map.prototype.getGroundLayer = function() {
    return this.groundLayer;
}