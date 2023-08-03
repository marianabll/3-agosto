class Game {
  constructor() {
    this.botaoReset = createButton("")
    this.textoReset = createElement('h2')

    this.tituloPlacar = createElement('h2')
    this.primeiraLinha = createElement('h2')
    this.segundaLinha = createElement('h2')
  }

  start() { //executada no começo do programa (ainda no gameState = 0)
    player = new Player()
    player.getCount()

    form = new Form()
    form.display()

    car1 = createSprite(width/2 -100, height-100)
    car1.addImage(car1_img)
    car1.scale = 0.07

    car2 = createSprite(width/2 +100, height-100)
    car2.addImage(car2_img)
    car2.scale = 0.07

    cars = [car1, car2]

    moedas = new Group()
    tanques = new Group()

    this.criarRecompensas(18, moeda_img, 0.09, moedas)
    this.criarRecompensas(6, tanque_img, 0.02, tanques)
  }

  getState() {
    database.ref('gameState').on('value', (valor) => {
      gameState = valor.val()
    })
  }

  update(num) {
    database.ref('/').update({
      gameState: num
    })
  }

  handleElements() {
    form.hide()
    form.imagem.position(40,50)
    form.imagem.class('gameTitleAfterEffects')

    this.botaoReset.position(width/2 + 230, 100)
    this.botaoReset.class('resetButton')

    this.textoReset.position(width/2 + 200, 40)
    this.textoReset.class('resetText')
    this.textoReset.html('Reiniciar o jogo')

    this.tituloPlacar.position(width/3 -60, 40)
    this.tituloPlacar.class('resetText')
    this.tituloPlacar.html('Placar')

    this.primeiraLinha.position(width/3 -50, 80) //leader1
    this.primeiraLinha.class('leadersText')

    this.segundaLinha.position(width/3 -50, 130) //leader2
    this.segundaLinha.class('leadersText')
    
  }

  
  gerenciarPlacar() {
    var primeiro, segundo;

    var players = Object.values(allPlayers)
    
    if (players[0].rank === 1 || players[0].rank === 0 && players[1].rank === 0) {
      primeiro = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
      segundo = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
    }

    if (players[1].rank === 1) {
      primeiro = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
      segundo = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
    }

    this.primeiraLinha.html(primeiro)
    this.segundaLinha.html(segundo)
    
  }


  gerenciarBotao() {
    this.botaoReset.mousePressed( () => {
      database.ref('/').set({
        playerCount: 0,
        gameState: 0,
        players: {}
      })
      window.location.reload()
    } )
  }

  criarRecompensas(numeroSprites, imagemSprite, escala, grupoSprites) {

    for (var i=0; i < numeroSprites; i++) {
      
      var x = random(width/2 - 150, width/2 + 150)
      var y = random(-height * 4.5, height - 400)

      var sprite = createSprite(x, y)

      sprite.addImage(imagemSprite)
      sprite.scale = escala
      
      grupoSprites.add(sprite)
    }
  }

  gerenciarMoedas(indice) {
    cars[indice-1].overlap(moedas, function(carro, moeda) {   //callback
      moeda.remove()
      player.score += 21
    })
  }

  gerenciarCombustivel(indice) {
    cars[indice-1].overlap(tanques, function(carro, tanque) {
      tanque.remove()
      player.fuel = 185
    })
  }

  play() { //executada no começo da corrida (quando gameState = 1)
    this.handleElements()
    this.gerenciarBotao()
    
    if (allPlayers !== undefined) {
    image(track, 0, -height*5, width, height*6)
    this.gerenciarPlacar()

    Player.getPlayersInfo()

    var indice = 0;

    for (var jogador in allPlayers) {

      indice += 1

      var x = allPlayers[jogador].positionX
      var y = height - allPlayers[jogador].positionY

      cars[indice-1].position.x = x
      cars[indice-1].position.y = y

      if (indice === player.number) {
        fill('yellow')
        ellipse(x, y, 60, 60)

        camera.position.y = cars[indice-1].position.y

        this.gerenciarCombustivel(indice)
        this.gerenciarMoedas(indice)
      }
    
    }

    this.gerenciarControleJogador()

    drawSprites()
  }
  }


  gerenciarControleJogador() {
    
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10
      player.update()
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 5
      player.update()
    }

    if (keyIsDown(LEFT_ARROW)) {
      player.positionX -= 5
      player.update()
    }

  }

}





//PARA LER:
//ref() e on() e val()

//PARA ESCREVER/ATUALIZAR
//ref() e set() ou update()


//bounceOff() e bounce() e collide() e displace() --> define tipos de colisão



//isTouching() --> identifica se um objeto está tocando em outro

//overlap() --> isTouching PLUS!!!
