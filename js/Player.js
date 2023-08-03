class Player {
  constructor() {
    this.name = null
    this.number = null
    this.positionX = 0
    this.positionY = 0
    this.score = 0
    this.fuel = 185
    this.rank = 0
  }

  addPlayer() {
    if (this.number === 1) {
      this.positionX = width/2 -100
    } else {
      this.positionX = width/2 +100
    }

    database.ref('players/player' + this.number).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      fuel: this.fuel,
      rank: this.rank
    })
  }

  getCount(){
    database.ref('playerCount').on('value', (valor) => {
      playerCount = valor.val()
    })
  }
  
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    })
  }

  update() {
    database.ref('players/player' + this.number).update({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      fuel: this.fuel,
      rank: this.rank
    })
  }

  static getPlayersInfo() {
    database.ref('players').on('value', (dados)=>{
      allPlayers = dados.val()
    })
  }
  
}

