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

    function calcularQtdInsulinaAntesRefeicao(QtdCarbos, CarboReferencia, GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade) {
        var bolusAlimentar = 0;
        bolusAlimentar = (QtdCarbos / CarboReferencia) + calcularBolusDeCorrecao(GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade);
        
        console.log("Dosagem sem arrendodamento: " + bolusAlimentar);

        var quantidadeInsulina = ArredondamentoDosCalculos(bolusAlimentar);

        console.log("Dosagem com arrendodamento: " + quantidadeInsulina);

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
            CarboReferencia = 12;
        }
        else 
        {
            CarboReferencia = 18;
        }

        return CarboReferencia;
    }

    $('#BotaoCalcular').click(function () 
    {
        var GlicemiaAtual = $('#valorGlicemia').val();
        console.log("Glicemia Atual: " + GlicemiaAtual);

        var GlicemiaMeta = 140;
        console.log("Glicemia Meta: " + GlicemiaMeta);

        var FatorDeSensibilidade = calcularFatorDeSensibilidade(22, 15); //UnidadesInsulinaUltralenta, UnidadesInsulinaUltraRapida manha foi 3, almoço foi 3, lanche da tarde 0, jantar 3, madrugada 4

        if (SelecionarTipoCalculo() == 1) 
        {
            var QtdCarbos = $('#qtdCarbo').val();
            console.log("Carboidratos da refeição: " + QtdCarbos);

            var CarboReferencia = SelecionarCarboReferenciaPorPeriodoDia();
            $('#helpCarboRef').text("Carbo Ref: " + CarboReferencia);
            console.log("Carbo Ref: " + CarboReferencia);

            calcularQtdInsulinaAntesRefeicao(QtdCarbos, CarboReferencia, GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade);
        }
        else 
        {
            calcularQtdInsulinaAposRefeicao(GlicemiaAtual, GlicemiaMeta, FatorDeSensibilidade);
        }

        var textoHelp = "Aguarde 2 horas e meça novamente sua glicemia.";
        var typed = new Typed('#helpSCG', {
            strings: [textoHelp],
            stringsElement: '.typed-strings2',
            typeSpeed: 40,
            startDelay: 3000,
            backSpeed: 0,
            fadeOut: true,
            cursorChar: '',
            cursorShow: true,
            loop: false,
        });

        limparCampos();
        $('#resultado').focus();
    });


    $('#BotaoLimpar').click(function () 
    {
        limparCampos();
        $('#helpSCG').text("");
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













