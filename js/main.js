document.getElementById('imcForm').addEventListener('submit', (event) => {
    event.preventDefault();

    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value) / 100;
    if (peso > 0 && altura > 0) {
        let imc = peso / (altura * altura);


        document.getElementById('resultadoIMC').value = imc.toFixed(2);


        document.getElementById('resultado').textContent = evaluarIMC(imc);
    } else {

        document.getElementById('resultadoIMC').value = '';
        document.getElementById('resultado').textContent = '';
    }
});

function evaluarIMC(imc) {
    if (imc < 18.5) {
        return 'Peso bajo';
    } else if (imc < 25) {
        return 'Peso normal';
    } else if (imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidad';
    }
}

