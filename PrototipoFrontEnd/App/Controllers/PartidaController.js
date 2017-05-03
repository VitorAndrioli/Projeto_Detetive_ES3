detetiveApp.controller('PartidaController', ['$scope', 'DetetiveApi','$interval',function ($scope, DetetiveApi,$interval) {        

    $scope.numeroJogadas = 0;
    
    $scope.indiceJogadorAtual = 0;

    $scope.JogadorAtual = function(){
        return $scope.partida.jogadores[$scope.indiceJogadorAtual];
    }

    $scope.JogadorAnterior = function(){
        return $scope.partida.jogadores[$scope.partida.jogadores.length - 1];
    }

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

    $scope.DestacarJogadorAtual = function(){
         var jogadorAtual = $scope.JogadorAtual();
         $('div').removeClass('jogador_ativo');
         $('#peao_'+jogadorAtual.id).parent().addClass('jogador_ativo');
    }

    $scope.ProximaJogada = function(){
        $scope.MoverListaJogadores();
        $scope.DestacarJogadorAtual();       
        $scope.RemoverAcaoAndar();   
        $scope.AbrirModalLancarDados();
        $scope.IniciarTimer();
    }

    $scope.AbrirModalLancarDados = function(){
        $('.lancar_dados').show();        
    }

    $scope.FecharModalLancarDados = function(){
        $('.lancar_dados').hide();
    }

    $scope.RemoverAcaoAndar = function(){
        $('div.casaDispo').unbind( "click" );
        $('div.casaDispo').removeClass('casaDispo');
    }

    $scope.PegarNumeroDeJogadas = function(){
        var valor1 = Math.floor(Math.random() * 6) + 1;
        var valor2 = Math.floor(Math.random() * 6) + 1;
        return valor1 + valor2;
    }

    $scope.AbrirModalNumeroJogadas = function(){ 
        $('.resultado').show();
        setTimeout(function(){
            $('.resultado').hide();
        },2000);
    }

    $scope.PararDados = function(){
        $scope.FecharModalLancarDados();
        $scope.numeroJogadas = $scope.PegarNumeroDeJogadas();
        $scope.AbrirModalNumeroJogadas();
        $scope.mostrarCaminhosDisponiveis();
    }

    $scope.MostrarCasasDisponiveisParaAndar = function(posicao){
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
    }

    $scope.mostrarCaminhosDisponiveis = function(){
        var jogadorAtual = $scope.JogadorAtual();
        
        if(jogadorAtual.casasParaAndar == undefined){
            jogadorAtual._posicao = jogadorAtual.posicao;
        }       

        $scope.MostrarCasasDisponiveisParaAndar(jogadorAtual.posicao);
        $scope.HabilitarClickAndar();
    }

    $scope.caminho = [];
    $scope.HabilitarClickAndar = function(){
        $('.casaDispo').click(function(){
            $scope.RemoverAcaoAndar();

            var div = $(this);
            
            if($scope.PosicaoEhPorta(div)){
                return;
            }

            $scope.numeroJogadas -= 1;

            var id = div.attr('id').split('_');
            var jogadorAtual = $scope.JogadorAtual();
            jogadorAtual.posicao = [+id[0], +id[1]];

            $scope.DeslocarImg();

            if($scope.numeroJogadas > 0){
                $scope.mostrarCaminhosDisponiveis();
            }else{
                alert('Sua vez acabou');
                $scope.DesativarTimer();
            }
        });
    }

    $scope.DeslocarImg = function(){
        var jogadorAtual = $scope.JogadorAtual();
        var id = '#peao_'+jogadorAtual.id;
        
        var img = $(id);
        img.parent().empty();

        var novaPosicao = jogadorAtual.posicao.join('_');
        $('#'+novaPosicao).append(img);
    }

    $scope.DesativarTimer = function(){
        $interval.cancel(interval);
        $scope.mostrarTimer = false;
        $scope.ProximaJogada();
    }

    $scope.PegarLocalComodo = function(local){
        var qtdeImg = 0;
        var div;
        do{
            var random = Math.floor(Math.random()*10);
            div =  $("."+local).eq(random);
            qtdeImg = div.find('img');
        }while(qtdeImg == 0);
        return div;
    }

    $scope.PosicionarImgNoComodo = function(local){
        var div = $scope.PegarLocalComodo(local);
        var jogadorAtual = $scope.JogadorAtual();
        var img = $('#peao_'+jogadorAtual.id);
        img.parent().empty();
        div.append(img);
    }

    $scope.JogadorPodeFazerAcusacao = function(){
        
    }

    $scope.PosicaoEhPorta = function(div){
        if(div.hasClass('porta') && $scope.numeroJogadas > 1){
            var resultado = confirm('Deseja entrar?');
            if(resultado){
                $scope.RemoverAcaoAndar();
                $scope.numeroJogadas = 0;

                var local = div.attr('comodo');
                $scope.PosicionarImgNoComodo(local);
                

                return true;
            }
            return false;
        }
        return false;
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
        $scope.ProximaJogada();
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