class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 200 //柱子和柱子之间的距离
        this.pipeWidthSpace = 150 //每一根柱子和下面柱子的距离
        // this.pipeWidthSpace = config.pipe_space.value
        this.columnsOfPipe = 4
        for (let i = 0; i < this.columnsOfPipe; i++) {
            var p1 = MinImage.new(game, "pipe")
            p1.flipY = true
            p1.x = 500 + i * this.pipeSpace
            var p2 = MinImage.new(game, "pipe")
            p2.x = p1.x
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        return new this(game)
    }

    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        // log("wwa", config.pipeSpace.value)
        p2.y = p1.y + p1.h + this.pipeWidthSpace

    }

    debug() {
        this.pipeWidthSpace = config.pipeWidthSpace.value
        this.pipeSpace = config.pipeSpace.value
    }

    draw() {
        var context = this.game.context
        for(var p of this.pipes) {
            context.save()

            //把画布移动到中心点
            var w2 = p.w / 2
            var h2 = p.h / 2

            // context.globalAlpha = p.alpha

            // 这一步的操作是把角色的中心点放到原点上
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)


            //然后绕着中心点回去
            context.rotate(p.rotation * Math.PI / 180)

            //再反转回去
            context.translate(-w2, -h2)

            //然后画你
            context.drawImage(p.texture, 0, 0)

            //把画布返回过来
            context.restore()
        }

    }

    update() {
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5

            if(p1.x < -100) {
                p1.x += this.pipeSpace * this.columnsOfPipe
                // p2.x = p1.x
                // this.resetPipePosition(p1, p2)
            }

            if(p2.x < -100) {
                p2.x += this.pipeSpace * this.columnsOfPipe
                // p2.x = p1.x
                this.resetPipePosition(p1, p2)
            }

        }
    }

}

class SceneMain extends MinScene {
    constructor(game) {
        super(game)
        // this.label = Min_label.new(game, "Hello Min")
        // this.addElement(this.label  )

        //bg
        var bg = MinImage.new(game, 'background')
        bg.w = 400
        bg.h = 600
        this.addElement(bg)
        // log("bg.w", bg.w)

        //bird
        var b = MinAnimation.new(game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(this.bird)

        //加入水管
        //add pipe
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        //ground loop
        //TODO 应该把这些draw的动作都写到ground类里面，而不是在title里
        //scenetitle里只负责做addElement
        //抽象，继承，复用
        this.grounds = []
        for (let i = 0; i < 1000; i++) {
            var g = MinImage.new(game, 'ground')
            g.x = 7 * i
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }

        this.skipCount = 5
        this.setupInputs()
    }

    update() {
        super.update();
        this.skipCount--
        //往前走1步，往后退散步
        this.offset = -3
        if(this.skipCount == 0) {
            this.skipCount = 5
            this.offset = 9
        }
        //ground loop
        for (let i = 0; i < 1000; i++) {
            var g = this.grounds[i]
            g.x += this.offset
            // console.log("g.x", i, g.x)
        }
        // if(this.repeat == 0)
    }

    setupInputs() {
        var b = this.bird
        b.game.registerAction("a", function (keyStatus) {
            // log("status a", keyStatus)
            b.move(-2, keyStatus)
        })

        b.game.registerAction("d", function (keyStatus) {
            // log("status b", keyStatus)
            b.move(2, keyStatus)
        })

        b.game.registerAction("j", function (keyStatus) {
            // log("status b", keyStatus)
            b.jump()
        })
    }
}