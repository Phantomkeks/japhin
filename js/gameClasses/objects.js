function Objects (oMap) {
    this.map = oMap;
}

Objects.prototype.createItems = function (sType, aItems) {
    // Only needed for first call of createItems 
    // !items.game is needed because after state change (e.g. after win restart) the game has to be initialized again
    if (!aItems || !aItems.game) {
        aItems = oGame.add.group();
        aItems.enableBody = true;
    }
    
    var aResult = this.findObjectsByType(sType, this.map, 'ObjectLayer');
    aResult.forEach(function(oElement) {
        this.createFromTiledObject(oElement, aItems, sType);
    }, this);

    return aItems;
}

Objects.prototype.createItemsWithAnimations = function (sType, aItems, aAnimations) {
    // Only needed for first call of createItems 
    // !items.game is needed because after state change (e.g. after win restart) the game has to be initialized again
    if (!aItems || !aItems.game) {
        aItems = oGame.add.group();
        aItems.enableBody = true;

    }
    
    var aResult = this.findObjectsByType(sType, this.map, 'ObjectLayer');
    aResult.forEach(function(oElement) {
        oElement = this.createFromTiledObject(oElement, aItems, sType);
        oElement.idleFrame = 0;
        oElement.animations.add(aAnimations[0], [1]);
        oElement.animations.add(aAnimations[1], [2]);
    }, this);

    return aItems;
}

// Find objects in a Tiled layer that contains a property called "type" equal to a certain value
Objects.prototype.findObjectsByType = function(sType, oMap, oLayer) {
    var aResult = new Array();
    oMap.objects[oLayer].forEach(function(oElement) {
        if (oElement.type === sType) {
            oElement.y -= oMap.tileHeight;
            aResult.push(oElement);
        }      
    });
    return aResult;
}

// Create a sprite from an object
Objects.prototype.createFromTiledObject = function(oElement, oGroup, sType) {
    var oItem = oGroup.create(oElement.x, oElement.y, sType);

    // Copy all properties to the sprite
    Object.keys(oElement).forEach(function(sKey){
        oItem[sKey] = oElement[sKey];
        // Prevents from moving then colliding
        oItem.body.immovable = true;
    });

    return oItem;
}