scene.onOverlapTile(SpriteKind.Player, assets.tile`coinT`, function (sprite, location) {
    music.play(music.createSong(assets.song`collect`), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    bounce += 1
    if (bounce < 2) {
        music.play(music.createSong(assets.song`bounce`), music.PlaybackMode.InBackground)
        mySprite.setBounceOnWall(true)
        animation.runImageAnimation(
        mySprite,
        assets.animation`bounce`,
        50,
        true
        )
    } else {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        mySprite.setBounceOnWall(false)
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setImage(assets.image`myImage`)
        bounce = 0
        pause(100)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        music.play(music.createSong(assets.song`jump`), music.PlaybackMode.InBackground)
        mySprite.vy = -200
    }
    if (bounce > 0) {
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        mySprite.setBounceOnWall(false)
        animation.runImageAnimation(
        mySprite,
        assets.animation`fly`,
        50,
        true
        )
        mySprite.vy = -170
        for (let index = 0; index < 16; index++) {
            mySprite.vx += 22
        }
        pause(1000)
        animation.stopAnimation(animation.AnimationTypes.All, mySprite)
        mySprite.setImage(assets.image`myImage`)
        bounce = 0
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bounce == 0) {
        mySprite.setImage(assets.image`myImage0`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`flag`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`gameover0`), music.PlaybackMode.InBackground)
    game.showLongText("YOU WIN", DialogLayout.Bottom)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    music.play(music.createSong(assets.song`level2music`), music.PlaybackMode.LoopingInBackground)
    tiles.setCurrentTilemap(tilemap`level0`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (bounce == 0) {
        mySprite.setImage(assets.image`myImage`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`gameover`), music.PlaybackMode.InBackground)
    gamestart = 0
    mySprite.setImage(assets.image`died`)
    mySprite.setBounceOnWall(true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    pause(2000)
    game.showLongText("And with that, Donald died.", DialogLayout.Bottom)
    game.showLongText("He never returned again.", DialogLayout.Bottom)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
})
let mySprite3: Sprite = null
let mySprite: Sprite = null
let bounce = 0
let gamestart = 0
info.setScore(0)
gamestart = 0
game.splash("Donald was a guy", "who loved walking on grass")
game.splash("Until one day", "all grass was taken away.")
game.splash("When he saw no grass and just red.", "Donald was furious.")
gamestart = 1
bounce = 0
scene.setBackgroundImage(assets.image`background`)
tiles.setCurrentTilemap(tilemap`level`)
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
if (gamestart == 1) {
    controller.moveSprite(mySprite, 200, 0)
    scene.cameraFollowSprite(mySprite)
}
mySprite.ay = 400
music.play(music.createSong(assets.song`levelmusic`), music.PlaybackMode.LoopingInBackground)
for (let index = 0; index < 120; index++) {
    pause(randint(1000, 7000))
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    mySprite3 = sprites.create(assets.image`shootbullet`, SpriteKind.Projectile)
    tiles.placeOnRandomTile(mySprite3, assets.tile`grassshooterpawner`)
    mySprite3.follow(mySprite)
}
