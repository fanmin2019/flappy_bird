class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        // this.label = Min_label.new(game, "Hello Min")
        // this.addElement(this.label  )

        //bg
        var bg = MinImage.new(game, 'background')
        bg.w = 400
        bg.h = 600
        this.addElement(bg)
        log("bg.w", bg.w)

        //bird
        var b = MinAnimation.new(game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(this.bird)

        //ground loop
        //应该把这些draw的动作都写到ground类里面，而不是在title里
        //scenetitle里只负责做addElement
        //抽象，继承，复用
        this.grounds = []
        for (let i = 0; i < 300; i++) {
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
        this.offset = -5
        if(this.skipCount == 0) {
            this.skipCount = 5
            this.offset = 30
        }
        //ground loop
        for (let i = 0; i < 300; i++) {
            var g = this.grounds[i]
            g.x -= this.offset
        }
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