$(window).on("load", function () 
{
    $('#helpCorrecaoGlicemia').text("");
    $('#ano').text(new Date().getFullYear());
    $('#valorGlicemia').focus();

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

    $('#BotaoCorrecaoHipoglicemia').click(function () 
    {
        $('#helpCorrecaoGlicemia').text("");

        var valorGlicemia = $('#valorGlicemia').val();
        console.log("valorGlicemia: " + valorGlicemia);

        var resultadoCorrecao = CalcularCorrecaoHipoglicemia(valorGlicemia); 
        var texto1 = "Ingerir <mark>" + resultadoCorrecao + "</mark> gramas de carboidratos.";
        var texto2 = "";
        if(resultadoCorrecao == 15)
        {
            texto2 = "<mark>15</mark> gramas de Cho = 150 ml de refrigerante comum ou 01 colher de sopa de açúcar ou 01 gel de glicose ou 03 balas.";
        }
        else if (resultadoCorrecao == 30) 
        {
            texto2 = "<mark>30</mark> gramas de Cho = 300 ml de refrigerante comum ou 02 colher de sopa de açúcar ou 02 gel de glicose ou 06 balas.";
        }

        console.log("resultadoCorrecao: " + resultadoCorrecao);

        var typed = new Typed('#resultado', {
            strings: [texto1, texto2],
            typeSpeed: 50,
            backSpeed: 0,
            fadeOut: true,
            cursorChar: '',
            autoInsertCss: true,
            cursorShow: true,
            loop: false,
        });

        var textoHelp = "Aguarde 15 minutos e meça novamente sua glicemia. Se ainda estiver em estado hipoglicêmico, repita a operação.";
        var typed = new Typed('#helpCorrecaoGlicemia', {
            strings: [textoHelp],
            stringsElement: '.typed-strings2',
            typeSpeed: 40,
            startDelay: 13000,
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
        $('#helpCorrecaoGlicemia').text("");
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

    function limparCampos() 
    {
        $('#valorGlicemia').val("");
    }

});













