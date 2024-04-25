$(window).on("load", function () 
{
    $('#ano').text(new Date().getFullYear());
    $('#valorInsulinaUltralenta').focus();

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

    $('#BotaoCalcularFatorSensibilidade').click(function () 
    {
        var valorInsulinaUltralenta = $('#valorInsulinaUltralenta').val();
        console.log("valorInsulinaUltralenta: " + valorInsulinaUltralenta);

        var valorInsulinaUltraRapida = $('#valorInsulinaUltraRapida').val();
        console.log("valorInsulinaUltraRapida: " + valorInsulinaUltraRapida);

        var FatorDeSensibilidade = calcularFatorDeSensibilidade(22, 15); 

        var texto = "Seu fator de sensibilidade é de <mark>" + FatorDeSensibilidade + "</mark>.";
        console.log("FatorDeSensibilidade: " + FatorDeSensibilidade);

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

        var textoHelp = "Base do cálculo utilizando <i>Regra 1800<i>. (Ref <i>Pag 46<i>. Manual Contagem de Carboidratos)";
        var typed = new Typed('#helpFatorSensibilidade', {
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


    $('#BotaoLimparFatorSensibilidade').click(function () 
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
        $('#valorInsulinaUltralenta').focus();
        console.log("limpado com sucesso");
    });

    function limparCampos() 
    {
        $('#valorInsulinaUltralenta').val("");
        $('#valorInsulinaUltraRapida').val("");
    }

});













