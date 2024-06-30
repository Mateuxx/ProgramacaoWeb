(function () {
  let FPS = 10
  const SIZE = 40

  let board;
  let snake;
  let placar
  let alimento
  let comecarJogo = false
  let jogoPausado = false
  let gameOver = false

  let cor

  
  let countInicioDoGame =  1000 / FPS

  //Pressionar S para começar o jogo
  function pressS(callback) {
    window.addEventListener("keydown", function(event) {
      if (event.key === "s" && !comecarJogo) {
        console.log("s -> começar jogo");
        gameStarted = true;
        callback();
      }
    });
  }

  function fimDeJogo() {
    gameOver = true
    console.log("GAME OVER")
    clearInterval(cobrinhaStuff)
  }


//Pressionar S para começar o jogo
function pausar() {
  window.addEventListener("keydown", function(event) {
    if (event.key === "p") {
      console.log("Tecla 'p' pressionada");
      if (jogoPausado) {
        // Retoma o jogo
        jogoPausado = false;
        console.log("Jogo retomado");
      } else {
        // Pausa o jogo
        jogoPausado = true;
        console.log("Jogo pausado");
        clearInterval(cobrinhaStuff);
      }
    }
  });
}


  function init() {
    placar = new Placar(); // Inicializa o placar
    gameOver = new EsreverFimDeJogo()
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    alimento = new Alimento(snake)
    
    pressS(() => {
      setInterval(cobrinhaStuff,countInicioDoGame)
      console.log(countInicioDoGame)
      pausar()
    })


  }

  //Controla o moviemnto da cobrinha
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0)
        console.log("Cima")
        break;
      case "ArrowRight":
        snake.changeDirection(1)
        console.log("direita")
        break;
      case "ArrowDown":
        snake.changeDirection(2)
        console.log("baixo")
        break;
      case "ArrowLeft":
        snake.changeDirection(3)
        console.log("esquerda")
        break;
      default:
        break;
    }
  })

  //Classe para tratar as coisas relacionadas ao placar
  class Placar {
    constructor() {
      this.element = document.createElement("div");
      this.element.setAttribute("id", "pontos");
      this.element.style.color = this.color = "black";
      this.element.style.top = "10px";
      this.element.style.left = "50%";
      this.element.style.fontSize = "44px";
      this.element.style.fontWeight = "bold";
      this.element.style.zIndex = "10";
      this.pontos = 0; //pontuação inicial
      this.atualizaPontos();
  
      // Adiciona o elemento ao body
      document.body.appendChild(this.element);
    }
    // metodo para somar os pntos
    somaPontos(points) {
      this.pontos += points;
      this.atualizaPontos();
    }
    atualizaPontos() {
      this.element.innerText = ` ${this.pontos.toString().padStart(4, '0')}`;
    }
  
  }

  class EsreverFimDeJogo{
    constructor(){
      this.element = document.createElement("div");
      this.texto = "Fim de Jogo!"
      this.element.style.top = "40px";
      this.element.style.left = "100%";
      this.element.style.fontSize = "44px";
      this.element.style.fontWeight = "bold";
      this.element.style.zIndex = "10";
      this.mostraTexto()

      // Adiciona o elemento ao body
      document.body.appendChild(this.element);
    }
    mostraTexto(){ 
      this.element.innerText = this.texto
    }
    
  }

  class Alimento {
    constructor(snake) {
      this.colorBlack = "#222"; // cor do alimento
      this.colorRed = "red"
      this.snake = snake;
      this.color = this.qualCor
      this.food = this.generateNewPosition();
      this.show();
    }
  
    generateNewPosition() {
      let newPosition;
      do {
        newPosition = [
          Math.floor(Math.random() * SIZE) + 1,
          Math.floor(Math.random() * SIZE) + 1
        ];
      } while (this.snake.body.some(segment => segment[0] === newPosition[0] && segment[1] === newPosition[1]));
      console.log("Posicao comida: "+ newPosition)
      return newPosition;
    }

    gerarCor() {
      let aleatorio = Math.random();
      
      if (aleatorio < 2/3) {
        return "preto"; 
      } else {
        return "vermelho"; 
      }
    }
    
  
    show() {
      const comida = document.querySelector(`#board tr:nth-child(${this.food[0]}) td:nth-child(${this.food[1]})`);
      const qualCor = this.gerarCor()
      if (comida) {
        cor = qualCor
        if(qualCor == "preto") {
        comida.style.backgroundColor = this.colorBlack;
        console.log("Comida Preta criada")
        }
        else {
          comida.style.backgroundColor = this.colorRed;
          console.log("Comida Vermelha criada")
        }
        
      }
    }
  }
  

  //criaçao do board only ??
  class Board {
    constructor(size) {
      this.element = document.createElement("table")
      this.element.setAttribute("id", "board")
      this.color = "#ccc";
      document.body.appendChild(this.element)
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr")
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field)
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.grow = false; // Indica se a cobra deve crescer
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
      this.showSnake()
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      } 
      // Se  bater na parede nao continua andando e dar game over
      if (
        newHead[0] < 1 ||
        newHead[0] > SIZE ||
        newHead[1] < 1 ||
        newHead[1] > SIZE
      ) {
        console.log("Cobrinha bateu na parede");
        jogoPausado = true;
        fimDeJogo()
        //gameOver.show(); // Mostra mensagem de fim de jogo - FAZER O GAME OVER DEPOIS 
        return; // Retorna sem atualizar a posição da cobrinha
      }

      this.body.push(newHead);
      const oldTail = this.grow ? null : this.body.shift(); // Não remove a cauda se a cobra deve crescer
      if (oldTail) {
        document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color;
      }
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color;
      
      this.grow = false; // reseta pra falso pra ela n fica crescebndo, somente quando comer
    }

    changeDirection(direction) {
      this.direction = direction;
    }

    showSnake() {
      console.log("Como ta a cobrinha:" + this.body)
    }

  }
      
  //a cobrinha encosta nela mesa
  function cobrinhaBateuNelaMesma() {
    const head = snake.body[snake.body.length -1]
    for (let i = 0; i < snake.body.length - 1; i++) {
      const segment = snake.body[i];
      //console.log("Corpo da parada" + segment)
      if (head[0] === segment[0] && head[1] === segment[1]) {
          return true; 
      }
  }
  return false; 
  }

  //Comportamentos relacionados a cobrinha
  function cobrinhaStuff() {
    if((!jogoPausado) || (!gameOver)){ //Se jogo pausado nao for true


      //Comportamentos da cobrinha
      snake.walk()// faz a cobrinha andar
      const head = snake.body[snake.body.length -1] 
      //console.log("Cabeça" + head)
      
      //Se a cobrinha comer um alimento
       // Se a cobrinha comer um alimento
    if (head[0] === alimento.food[0] && head[1] === alimento.food[1]) {
      const pontos = cor === "preto" ? 1 : 2;
      placar.somaPontos(pontos); // adiciona os pontos de acordo com a cor do alimento
      snake.grow = true; // muda para a cobra crescer
      alimento = new Alimento(snake); // cria novo alimento
    }
      
      //Se a cobrinha bateu nela mesmo
      if(cobrinhaBateuNelaMesma()){
        console.log("Perdeu pai")
        jogoPausado = true // so pra parar por enquando 
        fimDeJogo()
      }
  }
}

  init()
})()