$( document ).ready(function() {

    $("#wrapper-game .nav-game .nivel-button").on('click', function(event) {
        event.preventDefault();
        $('#wrapper-game .nivel-content').hide();
        $('#wrapper-game .nivel-button').removeClass('active');
        $(this).addClass('active');
        var click = $(this).index();
        $('.nivel-content').eq(click).fadeIn();
        $("#wrapper-game .nivel-button").find("i").removeAttr('style');
        $("#wrapper-game .nivel-button.icon-open").removeClass("icon-open");
    });

    $("#play-button").on('click', function(event) {
        $("#pause-button").removeClass('active');
        $(this).addClass('active');
    });

    $(".gancho").on('click', function(event) {
        $(this).toggleClass('active');
        $(".nivel").toggleClass('active-gancho');
        $(".gancho").html("Gancho desativado para calcular");
        $(".gancho.active").html("Gancho ativado. Cuidado!");

    });

    $("#pause-button").on('click', function(event) {
        $("#play-button").removeClass('active');
        $(this).addClass('active');
    });

    $(".wrapper-mapa").on('click', function(event) {
        event.preventDefault();
        $(this).find(".nivel-button i").removeAttr('style');
        $("#wrapper-game .nivel-button").find(".icon-open").removeClass();
    });

    $('.navigation li.next').click(function(){
        var nivel_atual = $(this).parent().parent().attr('id');
        $("#"+nivel_atual).parent().hide();
        $("#"+nivel_atual).parent().next().show();
        $("#wrapper-game .nivel-button.icon-open").removeClass("icon-open");
        $("#wrapper-game .nivel-button").find("i").removeAttr('style');
    });

    $('.navigation li.prev').click(function(){
        var nivel_atual = $(this).parent().parent().attr('id');
        $("#"+nivel_atual).parent().hide();
        $("#"+nivel_atual).parent().prev().show();
        $("#wrapper-game .nivel-button.icon-open").removeClass("icon-open");
        $("#wrapper-game .nivel-button").find("i").removeAttr('style');
    });

    $('.proximo-nivel').click(function(){
        var nivel_atual = $(this).parent().parent().attr('id');
        $("#"+nivel_atual).parent().hide();
        $("#"+nivel_atual).parent().next().show();
        $("#wrapper-game .nivel-button").find("i").removeAttr('style');
    });

    function AddRow() {
        tableRow += '<input type="text" name="nome[]">';
    }

    $('#start_nome').click(function() {

        if ($('[id^=nome]:last').val().length == 0) {
            $('.wrapper-start .label-name').addClass('msg');
            $('.wrapper-start input[type=text]').addClass('error');
            $('.wrapper-start input[type=text]').focus().find('.msg').removeClass();
        }

        if ($('[id^=nome]:last').val().length >= 1) {
            $(".item-start").addClass('show');
            var nome_jogador = $('[id^=nome]:last').val();
            $(".wrapper-mapa .item-start").html("Olá, <i class='value'>"+nome_jogador+"</i>.<br>Boa aventura!");
            $(".start-nivel").remove();
        }


    });


    $('.limpar').on('click', function(e){
        var nivel = $(this).parent().parent().attr("id");
        var reset = Number($(this).attr("data-reset"));
        var mov = Number($(this).attr("data-mov"));
        $("#"+nivel).attr("data-start", reset);
        $("#"+nivel).attr("data-movimentos", mov);
        $("#"+nivel+"").find(".operadores li.number").removeClass("disabled");
        $("#"+nivel+" .start").html("<i class='value'>"+reset+"</i>");
        $("#"+nivel+" .jogadas-restantes").html("Jogada: <i class='value'>"+mov+"</i>");
        $("#"+nivel).find(".resultado-nivel").text("Ok, vamos de novo :)")
        $("#"+nivel).parent().parent().find('.msg').remove().text();
        $("#"+nivel).parent().parent().find('.jogadas').remove().text();
        $("#"+nivel).removeClass("lose");
        $("#"+nivel).removeClass("win");
    });

    $('.operadores li').on('click', function(e){
        var operador = $(this).attr("data-operador");
        var valor = Number($(this).attr("data-valor"));
        var nivel = $(this).parent().parent().parent().attr("id");
        var movimentos = Number($("#"+nivel).attr("data-movimentos"));
        var start = Number($("#"+nivel).attr("data-start"));
        var meta = Number($("#"+nivel).attr("data-meta"));
        var resultado = $("#"+nivel).find('.start .value').html();

        switch(operador) {
            case "soma":
                start = start+valor;
            break;
            case "multiplicacao":
                start = start*valor;
            break;
            case "subtracao":
                start = start-valor;
            break;
            case "divisao":
                start = start/valor;
            break;
        }

        var resultado = eval(start);
        $("#"+nivel).attr("data-start", start);
        novomovimento = movimentos-1;
        $("#"+nivel).attr("data-movimentos", novomovimento);

        function estado_jogo() {
            $("#"+nivel+"").find('.resultado-nivel').html("Acertou");
            $("#"+nivel+"").find('.operadores li.number').addClass("disabled");
            $("#"+nivel+"").parent().next().children().addClass('active');
            $("#"+nivel+"").addClass('win');
            progress = Number($("#progress").val());
            novoprogress = progress+2;
            Number($("#progress").val(novoprogress));
        }

        function resultado_jogo() {
            $("#"+nivel+"").find(".resultado-nivel").html("Errou");
            $("#"+nivel+"").find(".jogadas").html("Sem jogadas");
            $("#"+nivel+"").find(".operadores li .value").addClass("disabled");
            $("#"+nivel+"").addClass('lose');
        }

        function status() {
            $("#"+nivel+" .start").html("<i class='value'>"+start+"</i>");
            $("#"+nivel+" .jogadas-restantes").html("Jogada: <i class='value'>"+novomovimento+"</i>");
        }

        switch(nivel) {

            case "nivel-1":
                status();
                if(resultado == meta) {
                    estado_jogo();
                    $(this).parent().parent().parent().find('.smile').addClass("smile1");
                    if ( $("#"+nivel+"").hasClass('win') ) {
                        $(".nav-game li:first-child").addClass("msg-progress icon-open");
                        $(".nav-game li:first-child.msg-progress i").delay(1000).show(500);
                    }
                    $(this).parent().parent().parent().find('.msg').text("Mensagem 1 aqui");
                } else if (resultado != meta && novomovimento === 0) {
                    resultado_jogo();
                }
            break;

            case "nivel-2":
                status();
                if(resultado == meta) {
                    estado_jogo();
                    if ( $("#"+nivel+"").hasClass('win') ) {
                        $(".nav-game li:nth-of-type(2)").addClass("msg-progress icon-open");
                        $(".nav-game li:nth-of-type(2).msg-progress i").delay(1000).show(500);
                    }
                    $(this).parent().parent().parent().find('.msg').text("Mensagem 2 aqui");
                } else if (resultado != meta && novomovimento === 0) {
                    resultado_jogo();
                    $(this).parent().parent().parent().find('.smile').addClass("smile1-loose");
                }
            break;

            case "nivel-3":
                status();
                if(resultado == meta) {
                    estado_jogo();
                    if ( $("#"+nivel+"").hasClass('win') ) {
                        $(".nav-game li:nth-of-type(3)").addClass("msg-progress icon-open");
                        $(".nav-game li:nth-of-type(3).msg-progress i").delay(1000).show(500);
                    }
                    $(this).parent().parent().parent().find('.msg').text("Mensagem 3 aqui");
                } else if (resultado != meta && novomovimento === 0) {
                    resultado_jogo();
                }
            break;

            case "nivel-4":
                status();
                if(resultado == meta) {
                    estado_jogo();
                    if ( $("#"+nivel+"").hasClass('win') ) {
                        $(".nav-game li:nth-of-type(4)").addClass("msg-progress icon-open");
                        $(".nav-game li:nth-of-type(4).msg-progress i").delay(1000).show(500);
                    }
                    $(this).parent().parent().parent().find('.msg').text("Mensagem 4 aqui");
                } else if (resultado != meta && novomovimento === 0) {
                    resultado_jogo();
                }
            break;

            case "nivel-5":
                status();
                if(resultado == meta) {
                    estado_jogo();
                    if ( $("#"+nivel+"").hasClass('win') ) {
                        $(".nav-game li:nth-of-type(5)").addClass("msg-progress icon-open");
                        $(".nav-game li:nth-of-type(5).msg-progress i").delay(1000).show(500);
                    }
                    $(this).parent().parent().parent().find('.msg').text("Mensagem 5 aqui");
                } else if (resultado != meta && novomovimento === 0) {
                    resultado_jogo();
                }
            break;

        }
    });

});