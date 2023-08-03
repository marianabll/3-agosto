class Form {

  constructor() {
    this.caixinha = createInput("").attribute("placeholder", "Digite seu nome")
    this.botao = createButton("Jogar")
    this.imagem = createImg("assets/title.png")
    this.saudacao = createElement("h2")
  }

  setElementPosition() {
    this.caixinha.position(width/2 -110, height/2 -80)
    this.botao.position(width/2 -90, height/2 -20)
    this.imagem.position(120,100)
    this.saudacao.position(width/2 -300, height/2 -100)
  }

  setElementStyle() {
    this.caixinha.class("customInput")
    this.botao.class("customButton")
    this.imagem.class("gameTitle")
    this.saudacao.class("greeting")
  }

  hide() {
    this.caixinha.hide()
    this.botao.hide()
    this.saudacao.hide()
  }

  handleMousePressed() {
    
    this.botao.mousePressed( () => {
      this.caixinha.hide()
      this.botao.hide()

      var nome = this.caixinha.value()
      var mensagem = `Olá, ${nome}. </br> Espere o outro jogador entrar.`
      this.saudacao.html(mensagem)

      playerCount += 1
      player.updateCount(playerCount)

      player.name = nome
      player.number = playerCount
      player.addPlayer()
    } )
  }

  display() {
    this.setElementPosition()
    this.setElementStyle()
    this.handleMousePressed()
  }
}
