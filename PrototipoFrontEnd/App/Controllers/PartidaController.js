detetiveApp.controller('PartidaController', ['$scope', 'DetetiveApi','$interval',function ($scope, DetetiveApi,$interval) {        

    $scope.numeroJogadas = 0;

    $scope.DefinirEstilo = function(imagemDoFundo, corBordas, locais){
        var conteudo = new Array();
        conteudo.push('#divTabuleiro {');
        conteudo.push('background-image: url("' + imagemDoFundo + '");');
        conteudo.push('background-repeat: no-repeat;');
        conteudo.push('background-size: 100%;}');

        conteudo.push(" .item_tab {border: 1px solid " + corBordas + ";}");

        for (var i = 1; i <= locais.length; i++) {
            conteudo.push(' .local' + i + ' { background-image: url("' + locais[i - 1].carta.src + '"); } ');
        }

        $('#styleDynamic').html(conteudo.join(''));
    }
    
    $scope.PosicionarJogadores = function(jogadores){
      for(var i = 0; i < jogadores.length; i++){
          var jogador = jogadores[i];
          if(jogador.posicao){

              var id = jogador.posicao.join('_');

              var img = document.createElement('img');
              img.src = jogador.src;
              img.className = 'peao';
              img.id = 'peao_'+jogador.id;
              $('#'+id).html(img);
          }
      }
    }

    $scope.MoverListaJogadores = function(){
        var jogador = $scope.partida.jogadores.shift();
        $scope.partida.jogadores.push(jogador);
    }

    $scope.VerCarta = function(id,tipo){
        var nomeObj = ['suspeitos','armas','locais'];

        var itensAnotacao = $scope.partida.barraAnotacao[nomeObj[tipo - 1]];
        
        var item = Enumerable.from(itensAnotacao).singleOrDefault(function(x){
            return x.carta.id == id;
        });

        item.selecionado = true;
        item.minhaCarta = true;
    }
    
      DetetiveApi.PegarDadosPartida(1,function(result){
        var partida = result;
        $scope.partida = partida;
        console.log(partida);
        $scope.DefinirEstilo(
            partida.imagemFundoPath,
            partida.corDaBorda,
            partida.barraAnotacao.locais
        );


        $scope.PosicionarJogadores(partida.jogadores);
    })

    $scope.switcheryOptions = {
        color: 'green',
        secondaryColor: '#a52323',
        size: 'small'
    };

    $scope.ProximaJogada = function(){
         $scope.MoverListaJogadores();

         var jogadorAnterior = $scope.partida.jogadores[3];

         var jogadorAtual = $scope.jogadorAtual = $scope.partida.jogadores[4];

         $('#peao_'+jogadorAnterior.id).parent().removeClass('jogador_ativo');
         $('#peao_'+jogadorAtual.id).parent().addClass('jogador_ativo');
        $scope.RemoverAcaoAndar();   
         $('.lancar_dados').show();
         $scope.IniciarTimer();
    }

    $scope.RemoverAcaoAndar = function(){
        $('div.casaDispo').unbind( "click" );
        $('div.casaDispo').removeClass('casaDispo');

    }

    $scope.PararDados = function(){
        $('.lancar_dados').hide();
        var valor1 = Math.floor(Math.random() * 6) + 1;
        var valor2 = Math.floor(Math.random() * 6) + 1;
        $scope.numeroJogadas = valor1 + valor2;
        $('.resultado').show();
        setTimeout(function(){
            $('.resultado').hide();
        },3000);
        $scope.mostrarCaminhosDisponiveis(false);
    }

    $scope.mostrarCaminhosDisponiveis = function(repetida){
        var posicao = $scope.partida.jogadores[4].posicao;
        if(!repetida){
            $scope.caminho = [];
            $scope.partida.jogadores[4].posicaoImutavel = posicao;
        }

        if($scope.caminho.length >= $scope.numeroJogadas)
            return;

        var disponibilidades = [
            {
                row: posicao[0] - 1,
                col: posicao[1]
            },
            {
                row: posicao[0] + 1,
                col: posicao[1]
            },
            {
                row: posicao[0] ,
                col: posicao[1] - 1
            },
            {
                row: posicao[0] ,
                col: posicao[1] + 1
            }
        ];

        for(var i = 0;i < disponibilidades.length;i++){
            var row = disponibilidades[i].row;
            var col = disponibilidades[i].col;
            var div = $('#'+row+'_'+col);
            
            if($scope.PossoAndarNaCasa(div))
                div.addClass('casaDispo');

        }
        $scope.HabilitarClickAndar();

    }

    $scope.caminho = [];
    $scope.HabilitarClickAndar = function(){
        $('.casaDispo').click(function(){

            if($(this).hasClass('porta'))
            {
                alert('deseja entrar?')
            }

            $scope.RemoverAcaoAndar();
            
            var id = $(this).attr('id').split('_');
            
            $scope.partida.jogadores[4].posicao = [+id[0], +id[1]];

            $scope.caminho.push(id);
            
            $scope.mostrarCaminhosDisponiveis(true);


        });
    }

    $scope.PossoAndarNaCasa = function(div){
        if(div.attr('id') == undefined)
            return false;
        
        var classes = div.attr('class').split(' ');

        for(var i = 0; i< classes.length;i++){
            if(classes[i].indexOf('local') != -1)
                return false;
        }

        if(div.find('img').length != 0)
             return false;

         return true;
    }

    

    $scope.PerdeuAVez = function(){
        $interval.cancel(interval);
        alert('perdeu a vez');
        $scope.mostrarTimer = false;
        $('.lancar_dados').hide();
        $('.resultado').hide();
    }

    var interval;
    $scope.IniciarTimer = function(){
        $scope.mostrarTimer = true;
        $scope.tempo = 180;
        interval = $interval(function(){
            $scope.tempo -= 1;
            if($scope.tempo < 0){
                $scope.PerdeuAVez();
            }
        },1000);
    }

}]);