class Min_label {
    constructor(game, text) {
        this.name = "label"
        this.game = game
        this.text = text
    }

    static new(game, text) {
        var i = new this(game, text)
        return i
    }

    draw() {
        // log("gua label")
        this.game.context.fillStyle = "black";
        // log("this.x", "this.y", this.x , this.y)
        this.game.context.fillText(this.text, 100, 100);
    }

    update() {

    }
}