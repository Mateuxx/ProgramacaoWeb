class Circulo {
    constructor(raio) {
        this.raio = raio
        this.area = Math.PI * (raio*raio)
        this.circunferencia  =   2 * Math.PI * raio;
    }
    
    getArea() {
        return this.area
    }

    getCircun() {
        return this.circunferencia
    }
}


const calcularBtn = document.getElementById('calcularBtn')

calcularBtn.onclick = function(e) {
    let raioInput = document.getElementById("raioInput").value

    
    let circulo = new Circulo(raioInput)
    let calculoArea = circulo.getArea().toFixed(2)
    let circunferencia = circulo.getCircun().toFixed(2)

    document.getElementById("area").value = calculoArea
    document.getElementById("circunferencia").value = circunferencia
}