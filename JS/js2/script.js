let count = 0

while (true) {
    
    let jogada = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"))

    let ar = [
        "Papel",
        "Pedra",
        "Tesoura"
    ]

    let jogadaPC = Math.floor(Math.random() * 3) + 1;
    alert("random number " + jogadaPC)
   
    alert(" O Computador jogou " + ar[jogadaPC -1])
   
    if (jogada === jogadaPC) {
        alert("A rodada Empatou")
    }
    else if(
        (jogada === 1 && jogadaPC === 2) || // Papel ganha de Pedra
        (jogada === 2 && jogadaPC === 3) || // Pedra ganha de Tesoura
        (jogada === 3 && jogadaPC === 1)    // Tesoura ganha de Papel
    ) {
        alert("Voce ganhou!")
        count++
    }
    else{
        alert("Voce Perdeu! A sua pontuação foi de " + count)
        break
    }
 
}

