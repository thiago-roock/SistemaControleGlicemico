$(window).on("load", function () 
{
    $('#helpCarboRef').text("");
    $('#ano').text(new Date().getFullYear());
    $('#valorGlicemia').focus();
    $("#qtdCarbo").prop("disabled", true);
    $("#sPeriodoDia").prop("disabled", true);

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

    function SelecionarTipoCalculo() 
    {
        var OpEscolhida = 0;

        $("input:checked").each(function () {
            OpEscolhida = $(this).val();
            console.log($(this).attr("id"));
        });

        return OpEscolhida;
    }

    function SelecionarCarboReferenciaPorPeriodoDia() 
    {
        var CarboReferencia = 0;

        var OpSelecionada = $("#sPeriodoDia").find('option:selected').val();

        if(OpSelecionada == 1)
        {
            CarboReferencia = 8;
        }
        else if (OpSelecionada == 2)
        {
            CarboReferencia = 10;
        }
        else 
        {
            CarboReferencia = 15;
        }

        console.log("Carbo Ref: " + CarboReferencia);

        return CarboReferencia;
    }

    $('#BotaoCalcular').click(function () 
    {
        var ValorAtualGlicemia = $('#valorGlicemia').val();
        console.log("Glicemia Atual: " + ValorAtualGlicemia);

        if (SelecionarTipoCalculo() == 1) 
        {
            var QtdCarbos = $('#qtdCarbo').val();
            console.log("Carboidratos da refeição: " + QtdCarbos);

            var CarboReferencia = SelecionarCarboReferenciaPorPeriodoDia();
            $('#helpCarboRef').text("Carbo Ref: " + CarboReferencia);

            calcularQtdInsulinaAntesRefeicao(QtdCarbos, CarboReferencia, ValorAtualGlicemia);
        }
        else 
        {
            calcularQtdInsulinaAposRefeicao(ValorAtualGlicemia);
        }

        limparCampos();
        $('#resultado').focus();
    });


    $('#BotaoLimpar').click(function () 
    {
        limparCampos();
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
        $('#valorGlicemia').focus();
        console.log("limpado com sucesso");
    });

    $("#sPeriodoDia").change(function()
    {
        $('#helpCarboRef').text("Carbo Ref: " + SelecionarCarboReferenciaPorPeriodoDia());
    });

    function limparCampos() 
    {
        $('#qtdCarbo').val("");
        $("#qtdCarbo").prop("disabled", true);
        $('#carboReferencia').val("");
        $('#unidadeReferencia').val("");
        $('#valorGlicemia').val("");
        $('#resultado').text("");
        $('input:radio[name="member"]').prop('checked', false);
        $("#sPeriodoDia").find('option:contains("Manhã")').prop('selected', true);
        $("#sPeriodoDia").prop("disabled", true);
        $('#helpCarboRef').text("");
    }

    $("#radioAntesComer").click(function () 
    {
        $("#qtdCarbo").prop("disabled", false);
        $("#sPeriodoDia").prop("disabled", false);
        $('#sPeriodoDia').focus();
    });

    $("#radioAposComer").click(function () 
    {
        $("#qtdCarbo").prop("disabled", true);
        $("#sPeriodoDia").prop("disabled", true);
        $('#qtdCarbo').val("");
        $('#BotaoCalcular').focus();
    });
});













