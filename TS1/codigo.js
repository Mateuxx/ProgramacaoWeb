"use strict";
class Circulo {
    constructor(raio, area = Math.PI * (raio * raio), circunferencia = 2 * Math.PI * raio) {
        this.raio = raio;
        this.area = area;
        this.circunferencia = circunferencia;
    }
    getArea() {
        return this.area;
    }
    getCircun() {
        return this.circunferencia;
    }
}
const calcularBtn = document.getElementById('calcularBtn');
if (calcularBtn) {
    calcularBtn.onclick = () => {
        const raioInput = document.getElementById("raioInput").value;
        const raio = parseFloat(raioInput);
        console.log(raio);
        if (!isNaN(raio)) {
            let circle = new Circulo(raio);
            let calculoArea = circle.getArea().toFixed(2);
            let circunferencia = circle.getCircun().toFixed(2);
            document.getElementById("area").value = calculoArea;
            document.getElementById("circunferencia").value = circunferencia;
        }
        else {
            console.error("Por favor, insira um valor válido para o raio.");
        }
    };
}
