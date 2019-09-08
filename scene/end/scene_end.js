class SceneEnd extends MinScene {
    constructor(game) {
        super(game)

        //bg
        var bg = MinImage.new(game, 'background')
        bg.w = 400
        bg.h = 600
        this.addElement(bg)

        var game_over = MinImage.new(this.game, 'game_over')
        game_over.w = 400
        game_over.h = 300
        game_over.x = 0
        game_over.y = 200
        this.addElement(game_over)



        game.registerAction('r', function(){
            var st = SceneTitle.new(game)
            //時にはGAME、時にはG、ややこしい
            game.replaceScene(st)
        })



    }

    // update() {
    //     super.update();
    // }


    //override
    draw() {
        super.draw()

        //fill text
        // this.game.context.fillStyle = "black";
        this.game.context.fillText("Please press r to restart game", 100, 300);
    }

}