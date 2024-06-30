(function () {
  let FPS = 10
  const SIZE = 40

  let board;
  let snake;
  let placar
  let alimento
  let comecarJogo = false

  //
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

  function init() {
    placar = new Placar(); // Inicializa o placar
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    alimento = new Alimento(snake)

    pressS(() => {
      setInterval(run,countInicioDoGame)
      console.log(countInicioDoGame)
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
  
    
    atualizaPontos() {
      this.element.innerText = ` ${this.pontos.toString().padStart(4, '0')}`;
    }
  
    // metodo para somar os pntos
    increment(points) {
      this.score += points;
      this.atualizaPontos();
    }
  }

  class Alimento {
    constructor(snake) {
      this.color = "#222"; // cor do alimento
      this.snake = snake;
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
  
    show() {
      const comida = document.querySelector(`#board tr:nth-child(${this.food[0]}) td:nth-child(${this.food[1]})`);
      if (comida) {
        comida.style.backgroundColor = this.color;
        console.log("Comida criada")
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
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]]
          break;
        case 1:
          newHead = [head[0], head[1] + 1]
          break;
        case 2:
          newHead = [head[0] + 1, head[1]]
          break;
        case 3:
          newHead = [head[0], head[1] - 1]
          break;
        default:
          break;
      }
      this.body.push(newHead)
      const oldTail = this.body.shift()
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
      document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color
    }
    changeDirection(direction) {
      this.direction = direction
    }
  }
  
  //Comportamentos relacionados a cobrinha
  function cobrinhaStuff() {
    snake.walk()// faz a cobrinha andar
    const head = snake.body[snake.body.length -1] 
    console.log("Cabeça" + head)
    
  }
  init()
})()