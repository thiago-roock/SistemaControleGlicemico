$(window).on("load", function () 
{
    limparCampos();
    $('#helpChoAlimentos1').text("");
    $('#helpChoAlimentos2').text("");
    $('#ano').text(new Date().getFullYear());
    $('#pesoAlimento').focus();

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

    $('#BotaoCalcularChoAlimentos').click(function () 
    {
        $('#helpChoAlimentos1').text("");
        $('#helpChoAlimentos2').text("");

        var pesoAlimento = $('#pesoAlimento').val();
        console.log("pesoAlimento: " + pesoAlimento);

        var valorPorcaoAlimento = $('#valorPorcaoAlimento').val();
        console.log("valorPorcaoAlimento: " + valorPorcaoAlimento);

        var valorTotalGordura = $('#valorTotalGordura').val();
        console.log("valorTotalGordura: " + valorTotalGordura);

        var valorTotalCarboidratos = $('#valorTotalCarboidratos').val();
        console.log("valorTotalCarboidratos: " + valorTotalCarboidratos);

        var valorTotalFibras = $('#valorTotalFibras').val();
        console.log("valorTotalFibras: " + valorTotalFibras);

        var resultadoChoAlimento = CalcularChoAlimentos(pesoAlimento,valorPorcaoAlimento,valorTotalGordura,valorTotalCarboidratos,valorTotalFibras); 
        var texto = "O alimento tem <mark>" + resultadoChoAlimento + "g</mark> de CHO.";

        console.log("resultadoChoAlimento: " + resultadoChoAlimento);

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

        var textoHelp1 = "";
        var textoHelp2 = "";
        if(valorTotalGordura <= 5)
        {
            textoHelp1 = "<i>Obs1:</i> Possui <mark>" + valorTotalGordura + "g</mark> de gordura, e até <mark>5</mark> gramas de gordura por porção é <strong>saudável</strong>.";
        }
        else  
        {
            textoHelp1 = "<i>Obs1:</i> Possui <mark>" + valorTotalGordura + "g</mark> de gordura, e acima de <mark>5</mark> gramas de gordura por porção é considerado <strong>não saudável</strong>.";
        }

        if (valorTotalFibras == 2.5) 
        {
            textoHelp2 = "<i>Obs2:</i> Possui <mark>" + valorTotalFibras + "g</mark> de fibras, e acima de <mark>2,5</mark> gramas por porção é considerado <strong>rico em fibras</strong>.";
        }
        else  
        {
            textoHelp2 = "<i>Obs2:</i> Possui <mark>" + valorTotalFibras + "g</mark> de fibras, e abaixo de <mark>2,5</mark> gramas por porção é considerado <strong>pobre em fibras</strong>.";
        }
        
        var typed = new Typed('#helpChoAlimentos1', {
            strings: [textoHelp1],
            stringsElement: '.typed-strings2',
            typeSpeed: 40,
            startDelay: 3000,
            backSpeed: 0,
            fadeOut: true,
            cursorChar: '',
            cursorShow: true,
            loop: false,
        });

        var typed = new Typed('#helpChoAlimentos2', {
            strings: [textoHelp2],
            stringsElement: '.typed-strings2',
            typeSpeed: 40,
            startDelay: 6000,
            backSpeed: 0,
            fadeOut: true,
            cursorChar: '',
            cursorShow: true,
            loop: false,
        });

        limparCampos();
        $('#resultado').focus();
    });


    $('#BotaoLimparCorrecaoHipoglicemia').click(function () 
    {
        limparCampos();
        $('#helpChoAlimentos1').text("");
        $('#helpChoAlimentos2').text("");
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
        $('#pesoAlimento').focus();
        console.log("limpado com sucesso");
    });

    function limparCampos() 
    {
        $('#valorPorcaoAlimento').val("");
        $('#valorTotalGordura').val("");
        $('#valorTotalCarboidratos').val("");
        $('#valorTotalFibras').val("");
        $('#pesoAlimento').val("");
    }

});













