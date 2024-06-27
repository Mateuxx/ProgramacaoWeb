class Circulo {
    constructor(
       public raio: number,
       public area: number = Math.PI * (raio*raio),
       public circunferencia: number = 2 * Math.PI * raio 
    ) {}
    
    getArea() {
        return this.area
    }

    getCircun() {
        return this.circunferencia
    }
}

const calcularBtn = document.getElementById('calcularBtn')

    if(calcularBtn) {
        
        calcularBtn.onclick = () => {
            const raioInput = (document.getElementById("raioInput") as HTMLInputElement).value
            const raio  =  parseFloat(raioInput)
            console.log(raio)
            
            if (!isNaN(raio)) {
                let circle = new Circulo(raio);
                let calculoArea = circle.getArea().toFixed(2);
                let circunferencia = circle.getCircun().toFixed(2);
    
                (document.getElementById("area") as HTMLInputElement).value = calculoArea;
                (document.getElementById("circunferencia") as HTMLInputElement).value = circunferencia;
                
            } else {
                console.error("Por favor, insira um valor válido para o raio.");
            }
        }
    }