document.addEventListener('DOMContentLoaded', () => {
    let usdInput = document.getElementById('usdInput');
    let mxnInput = document.getElementById('mxnInput');

    let valorConversion = 140;

    let actualizarConversion = () => {
        let usdValue = parseFloat(usdInput.value);
        let mxnValue = usdValue * valorConversion;
        mxnInput.value = mxnValue.toFixed(2);
    };

    usdInput.addEventListener('input', actualizarConversion);

    actualizarConversion();
});
