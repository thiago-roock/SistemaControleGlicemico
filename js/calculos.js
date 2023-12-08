    function calcularQtdInsulinaAposRefeicao(GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade) {
    var bolusCorrecao = 0;
    bolusCorrecao = calcularBolusDeCorrecao(GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade);
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

function calcularBolusDeCorrecao(GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade)
 {
    if(GlicemiaAtual <= GlicemiaMeta)
    {
        console.log("Glicemia a ser corrigida: 0");
        return 0;
    }
    console.log("Glicemia a ser corrigida: " + (GlicemiaAtual - GlicemiaMeta));

    var BolusCorrecao = (GlicemiaAtual - GlicemiaMeta) / FatorDeSensibilidade;

    console.log("Bolus de Correção sem arrendodamento: " + BolusCorrecao);
    
    var BolusCorrecaoArredondado = ArredondamentoDosCalculos(BolusCorrecao);

    console.log("Bolus de Correção com arrendodamento: " + BolusCorrecaoArredondado);

    return BolusCorrecaoArredondado;
}


function calcularFatorDeSensibilidade(UnidadesInsulinaUltralenta, UnidadesInsulinaUltraRapida)
 {
    var quantidadeInsulinaDiaria = UnidadesInsulinaUltralenta + UnidadesInsulinaUltraRapida;
    console.log("Quantidade de Insulina Diaria: " + quantidadeInsulinaDiaria);

    var FatorDeSensibilidade = 1800 / quantidadeInsulinaDiaria;
    console.log("Fator de Sensibilidade sem arrendodamento: : " + FatorDeSensibilidade);

    var FatorDeSensibilidadeArredondado = ArredondamentoDosCalculos(FatorDeSensibilidade);
    console.log("Fator de Sensibilidade com arrendodamento: " + FatorDeSensibilidadeArredondado);

    return FatorDeSensibilidadeArredondado;
}


function ArredondamentoDosCalculos(ValorDosagem) 
{
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
    else {
        ValorArredondado = Math.ceil(ValorDosagem);
    }

    return ValorArredondado;
}

function CalcularCorrecaoHipoglicemia(ValorGlicemia) 
{
    var resultado = 0;
    
    if(ValorGlicemia == 0){
        resultado = 0;
    }
    else if (ValorGlicemia < 50) 
    {
        resultado = 30;
    }
    else if (ValorGlicemia >= 50 && ValorGlicemia <= 70) {
        resultado = 15;
    }

    return resultado;
}

function CalcularChoAlimentos(pesoAlimento,valorPorcaoAlimento,valorTotalGordura,valorTotalCarboidratos,valorTotalFibras) 
{
    var resultado = 0;
    
    resultado = (pesoAlimento * valorTotalCarboidratos) / valorPorcaoAlimento;

    return resultado;
}

