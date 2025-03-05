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

        var searchCarboRef = $("#sPeriodoDia").find('option:selected').val();
        console.log("searchCarboRef: " + searchCarboRef);

        //const url = `http://localhost:3000/carbosReferencia?opSelecionada_like=${searchCarboRef}`;
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((result) => obterResultados(result, searchCarboRef))
        //     .catch(error => console.log('Request failed: ' + error.message));
    
        //localhost
        // const urlbase = `/api-diabetics/carbosReferencias.json`;
            
        //produção
        const urlbase = `/SistemaControleGlicemico/api-diabetics/carbosReferencias.json`;
    
            $.ajax({
                url: urlbase,
                type: 'GET',
                dataType: 'json',
                async: false,
                success: function onSuccess(data) 
                {
                    CarboReferencia = obterResultados(data, searchCarboRef);
                }
              });
              return CarboReferencia;
    }

    function obterResultados(result, searchCarboRef) 
    {
        const filteredCarbosReferencias = result.carbosReferencias.filter(carboRef => carboRef.opSelecionada == searchCarboRef );
    
        var CarboReferenciaSelecionada = 0;

        filteredCarbosReferencias.forEach(result => 
        {  
            CarboReferenciaSelecionada = result.carboReferencia
        });

        return CarboReferenciaSelecionada;
    }


    $('#BotaoCalcular').click(function () 
    {
        var GlicemiaAtual = $('#valorGlicemia').val();
        console.log("Glicemia Atual: " + GlicemiaAtual);

        var GlicemiaMeta = 140;
        console.log("Glicemia Meta: " + GlicemiaMeta);

        var FatorDeSensibilidade = calcularFatorDeSensibilidade(18, 30); //UnidadesInsulinaUltralenta, UnidadesInsulinaUltraRapida manha foi 7, almoço foi 4, lanche da tarde 3, jantar 3, madrugada 5

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













