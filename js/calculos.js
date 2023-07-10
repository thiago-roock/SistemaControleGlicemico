    function calcularQtdInsulinaAposRefeicao(ValorAtualGlicemia) {
    var bolusCorrecao = 0;
    bolusCorrecao = calcularCorrecaoAposRefeicao(ValorAtualGlicemia);
    var texto = "Aplicar <mark>" + bolusCorrecao + "</mark>  Unidades de Insulina!";
    console.log("bolusCorreção: " + bolusCorrecao + " U");
    var typed = new Typed('#resultado', {
        strings: [texto],
        stringsElement: '.typed-strings2',
        typeSpeed: 40,
        backSpeed: 0,
        fadeOut: true,
        cursorChar: '',
        cursorShow: true,
        loop: false,
    });
}

function calcularCorrecaoAntesRefeicao(ValorAtualGlicemia) {
    if (ValorAtualGlicemia < 130) {
        return 0
    }
    else if (ValorAtualGlicemia >= 130 && ValorAtualGlicemia <= 170) {
        return 1
    }
    else if (ValorAtualGlicemia >= 171 && ValorAtualGlicemia <= 210) {
        return 2
    }
    else if (ValorAtualGlicemia >= 211 && ValorAtualGlicemia <= 250) {
        return 3
    }
    else if (ValorAtualGlicemia >= 251 && ValorAtualGlicemia <= 290) {
        return 4
    }
    else if (ValorAtualGlicemia > 290) {
        return 5
    }
}

function calcularCorrecaoAposRefeicao(ValorAtualGlicemia) {
    if (ValorAtualGlicemia < 160) {
        return 0
    }
    else if (ValorAtualGlicemia >= 160 && ValorAtualGlicemia <= 200) {
        return 1
    }
    else if (ValorAtualGlicemia >= 201 && ValorAtualGlicemia <= 240) {
        return 2
    }
    else if (ValorAtualGlicemia >= 241 && ValorAtualGlicemia <= 280) {
        return 3
    }
    else if (ValorAtualGlicemia >= 281 && ValorAtualGlicemia <= 320) {
        return 4
    }
    else if (ValorAtualGlicemia > 320) {
        return 6
    }
}

function ArredondamentoDosCalculos(ValorDosagem) {

    console.log("Dosagem sem arrendodamento: " + ValorDosagem);

    var ValorArredondado = 0;

    var casasDecimais = ValorDosagem.toFixed(1).split(".")[1] / 10;
    console.log("casas decimais:" + casasDecimais);
    if(casasDecimais == 0){
        ValorArredondado = ValorDosagem;
    }
    else if (casasDecimais >= 0.1 && casasDecimais <= 0.4) {
        ValorArredondado = Math.floor(ValorDosagem);
    }
    else if (casasDecimais == 0.5) {
        ValorArredondado = Math.floor(ValorDosagem);
    }
    else if (casasDecimais >= 0.6 && casasDecimais <= 0.9) {
        ValorArredondado = Math.ceil(ValorDosagem);
    }

    console.log("Dosagem com arrendodamento: " + ValorArredondado);

    return ValorArredondado;
}
