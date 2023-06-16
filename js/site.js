$(window).on("load", function () {

    $('#valorGlicemia').focus();
    $("#qtdCarbo").prop("disabled", true);

    var typed = new Typed('#resultado', {
        strings: ['Seja bem-vindo ;)', 'Preencha o formulário!'],
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
        $("#qtdCarbo").prop("disabled", true);
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













