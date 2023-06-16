$(window).on("load", function () {

    $('#valorGlicemia').focus();
    $("#qtdCarbo").prop("disabled", true);

    var typed = new Typed('#resultado', {
        strings: ['Seja bem-vindo ;)', 'Preencha o formulário ao lado!'],
        typeSpeed: 50,
        backSpeed: 0,
        fadeOut: true,
        cursorChar: '',
        autoInsertCss: true,
        cursorShow: true,
        loop: false,
    });

    function calcularQtdInsulinaAntesRefeicao(QtdCarbos, CarboReferencia, ValorAtualGlicemia) {
        var bolusAlimentar = 0;
        bolusAlimentar = (QtdCarbos / CarboReferencia) + calcularCorrecaoAntesRefeicao(ValorAtualGlicemia);
        var quantidadeInsulina = ArredondamentoDosCalculos(bolusAlimentar);
        var texto = "Aplicar <mark>" + quantidadeInsulina + "</mark> Unidades de Insulina!";
        console.log("quantidadeInsulina: " + quantidadeInsulina + " U");
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
        else if (ValorAtualGlicemia >= 130 && ValorAtualGlicemia <= 160) {
            return 1
        }
        else if (ValorAtualGlicemia >= 161 && ValorAtualGlicemia <= 190) {
            return 2
        }
        else if (ValorAtualGlicemia >= 191 && ValorAtualGlicemia <= 220) {
            return 3
        }
        else if (ValorAtualGlicemia >= 221 && ValorAtualGlicemia <= 250) {
            return 4
        }
        else if (ValorAtualGlicemia >= 251 && ValorAtualGlicemia <= 280) {
            return 5
        }
        else if (ValorAtualGlicemia > 280) {
            return 6
        }
    }

    function calcularCorrecaoAposRefeicao(ValorAtualGlicemia) {
        if (ValorAtualGlicemia < 160) {
            return 0
        }
        else if (ValorAtualGlicemia >= 160 && ValorAtualGlicemia <= 190) {
            return 1
        }
        else if (ValorAtualGlicemia >= 191 && ValorAtualGlicemia <= 220) {
            return 2
        }
        else if (ValorAtualGlicemia >= 221 && ValorAtualGlicemia <= 250) {
            return 3
        }
        else if (ValorAtualGlicemia >= 251 && ValorAtualGlicemia <= 280) {
            return 4
        }
        else if (ValorAtualGlicemia >= 281 && ValorAtualGlicemia <= 310) {
            return 5
        }
        else if (ValorAtualGlicemia > 310) {
            return 6
        }
    }

    function ArredondamentoDosCalculos(ValorDosagem) {

        console.log("Dosagem sem arrendodamento: " + ValorDosagem);

        var ValorArredondado = 0;

        var casasDecimais = ValorDosagem.toFixed(1).split(".")[1];
        console.log("casas decimais:" + casasDecimais);
        if (casasDecimais >= 1 && casasDecimais <= 4) {
            ValorArredondado = Math.floor(ValorDosagem);
        }
        else if (casasDecimais == 5) {
            ValorArredondado = Math.ceil(ValorDosagem);
        }
        else if (casasDecimais >= 6 && casasDecimais <= 9) {
            ValorArredondado = Math.ceil(ValorDosagem);
        }

        console.log("Dosagem com arrendodamento: " + ValorArredondado);

        return ValorArredondado;
    }


    $('#BotaoCalcular').click(function () {

        var OpcaoEscolhida = 0;

        $("input:checked").each(function () {
            OpcaoEscolhida = $(this).val();
            console.log($(this).attr("id"));
        });

        var QtdCarbos = $('#qtdCarbo').val();
        var CarboReferencia = 10;//$('#carboReferencia').val();
        var ValorAtualGlicemia = $('#valorGlicemia').val();

        if (OpcaoEscolhida == 1) {
            calcularQtdInsulinaAntesRefeicao(QtdCarbos, CarboReferencia, ValorAtualGlicemia);
        }
        else {
            calcularQtdInsulinaAposRefeicao(ValorAtualGlicemia);
        }
    });

    $('#BotaoLimpar').click(function () {
        limparCampos();
    });

    function limparCampos() {
        $('#qtdCarbo').val("");
        $('#carboReferencia').val("");
        $('#unidadeReferencia').val("");
        $('#valorGlicemia').val("");
        $('#resultado').text("");
        $('input:radio[name="member"]').prop('checked', false);
        $('#valorGlicemia').focus();
        console.log("limpado com sucesso");
        var typed = new Typed('#resultado', {
            strings: ['Formulário limpado com sucesso!'],
            stringsElement: '.typed-strings2',
            typeSpeed: 20,
            backSpeed: 0,
            fadeOut: true,
            cursorChar: '',
            cursorShow: true,
            loop: false,
        });
    }

    $("#radioAntesComer").click(function () {
        $("#qtdCarbo").prop("disabled", false);
        $('#qtdCarbo').focus();
    });

    $("#radioAposComer").click(function () {
        $("#qtdCarbo").prop("disabled", true);
        $('#qtdCarbo').val("");
        $('#BotaoCalcular').focus();
    });
});













