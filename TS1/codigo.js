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
//cotinuar daqui
