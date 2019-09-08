//目的是为了如何把程序一步一步写成自己想要的样子
//追加新的功能很方便，该起来也很方便
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

        //角度
        this.rotation = 0
        this.alpha = 1;
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
        this.rotation = -45
    }

    update() {

        //update alpha
        if(this.alpha > 0) {
            this.alpha -= 0.05
        }

        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.02
        var h = 520
        if(this.y > h) {
            this.y = h
        }

        //更新角度
        if(this.rotation <= 45) {
            this.rotation += 1
        }

        this.frameCount--
        if(this.frameCount == 0) {
            this.frameCount = 3
            // log(this.frames(), this.animations, this.animationName)
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        // log("this.y", this.y)
        if(this.y == 520) {
            log("game over")
            var s_end = SceneEnd.new(this.game)
            this.game.replaceScene(s_end)
        }
    }

    draw() {
        var context = this.game.context
        context.save()

        //把画布移动到中心点
        var w2 = this.w / 2
        var h2 = this.h / 2

        context.globalAlpha = this.alpha

        // 这一步的操作是把角色的中心点放到原点上
        context.translate(this.x + w2, this.y + h2)

        if(this.flipX) {
            ////The scale will flip the whole canvas, and will move the image
            //to the left (by the image width size)
            //把画面往左边转
            context.scale(-1, 1)
        }

        //然后绕着中心点回去
        context.rotate(this.rotation * Math.PI / 180)

        //再反转回去
        context.translate(-w2, -h2)

        //然后画你
        context.drawImage(this.texture, 0, 0)

        //把画布返回过来
        context.restore()
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