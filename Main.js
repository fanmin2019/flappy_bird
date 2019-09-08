var enableDebugMode = function (game, enabled, ball) {
    if(!enabled) {
        return
    }
    var range = document.getElementById("id-input-speed")
    range.addEventListener("input", function (event) {
        // log(event.target.value, event)
        window.fps = Number(event.target.value)
    })

    window.addEventListener('keyup', function (event) {
        var k = event.key
        log("key is ", k)
        if(k == 'p') {
            //一時停止
            window.paused = !window.paused
        }else if ('1234567'.includes(k)) {
            //デバッグのため
            // blocks = loadLevel(game, Number(k))
        }
    })

    window.addEventListener('click', function (event) {
        log(event.target)
    })
}

var __main = function() {
    // オブジェクトのインスタンスを作る
    var images = {
        //bird
        'bird1': 'img/bird/b1.png',
        'bird2': 'img/bird/b2.png',
        'bird3': 'img/bird/b3.png',
        'background': 'img/bird/bg.png',
        'ground': 'img/bird/ground.png',
        'pipe': 'img/bird/pipe.png',
        'game_over': 'img/bird/game_over.png',
        'title': 'img/bird/title.png',
    }


    window.bullets_enemy = []

    var game =  MinGame.instance(30, images, function (g) {
        // log("game22", g)
        // var s = SceneTitle.new(g)
        var s = SceneTitle.new(g)
        game.runWithScene(s)
        window.paused = false
    })

    enableDebugMode(game,true)
}


__main()