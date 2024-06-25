class Circulo {
    constructor(
       public raio: number,
       public area: number = Math.PI * (raio*raio),
       public circunferencia = 2 * Math.PI * raio 
    ) {}
    
    getArea() {
        return this.area
    }

    getCircun() {
        return this.circunferencia
    }
}

//cotinuar daqui