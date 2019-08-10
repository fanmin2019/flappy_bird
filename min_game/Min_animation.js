//应该作为基类来处理
class MinAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            bird:[],
            // run:[],
        }
        //hard coding
        // this.frames = []
        for (var i = 1 ; i < 4; i++) {
            var name = `bird${i}`

            var t = game.textureByName(name)
            this.animations['bird'].push(t)
        }

        // for (var i = 1 ; i < 10; i++) {
        //     var name = `idle${i}`
        //
        //     var t = game.textureByName(name)
        //     this.animations['idle'].push(t)
        // }
        //
        this.animationName = 'bird'
        this.texture = this.frames()[0]
        // log("this.frames()", this.frames())
        this.frameIndex = 0
        this.frameCount = 3
        this.flipX = false
        this.w = this.texture.width
        this.h = this.texture.height

        //重力和加速度
        this.gy = 10
        this.vy = 0
    }


    static new(game) {
        return new this(game)
    }

    frames(){
        // log(this.animations,this.animationName,"this.animationName")
        return this.animations[this.animationName]
    }

    jump() {
        this.vy = -5
    }

    update() {
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.02
        var h = 520
        if(this.y > h) {
            this.y = h
        }

        this.frameCount--
        if(this.frameCount == 0) {
            this.frameCount = 3
            // log(this.frames(), this.animations, this.animationName)
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        if(this.flipX) {
        context.save()

        //把画布移动到中心点
        var x = this.x + this.w / 2

        //y不翻转
        //画往右边移动了x，也就是对称的点
        context.translate(x, 0)

        ////The scale will flip the whole canvas, and will move the image
        //to the left (by the image width size)
        //把画面往左边转
        context.scale(-1, 1)

        //再向左平移x
        context.translate(-x, 0)

        //然后画你
        context.drawImage(this.texture, this.x, this.y)

        //把画布返回过来
        context.restore()

        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }

    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        var animationNames = {
            'down': 'bird',
            'up': 'bird',
        }
        var name = animationNames[keyStatus]
        this.changeAnimationName(name)
        // log("move", keyStatus)
        // if(keyStatus == 'down') {
        //     // log("move changeAnimationName")
        //     this.changeAnimationName('run')
        // } else if(keyStatus == 'up') {
        //     this.changeAnimationName('idle')
        // }
    }

    changeAnimationName(name) {
        this.animationName = name
    }
 }