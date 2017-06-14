detetiveApp.controller('PartidaController', ['$scope', 'DetetiveApi','$interval',function ($scope, DetetiveApi,$interval) {

    $scope.numeroJogadas = 0;
    $scope.palpite = {};
    $scope.indiceJogadorAtual = 0;

    $scope.JogadorAtual = function(){
        return $scope.partida.jogadores[$scope.indiceJogadorAtual];
    }

    $scope.JogadorAnterior = function(){
        return $scope.partida.jogadores[$scope.partida.jogadores.length - 1];
    }

    $scope.EnviarPalpite = function(){
        $scope.ProximaJogada();
        $('#palpiteModal').hide();
    }

    $scope.DefinirEstilo = function(imagemDoFundo, corBordas, locais){
        var conteudo = new Array();
        conteudo.push('#divTabuleiro {');
        conteudo.push('background-image: url("' + imagemDoFundo + '");');
        conteudo.push('background-repeat: repeat;');
        conteudo.push('background-size: 100%;}');

        conteudo.push(" .item_tab {border: 1px solid " + corBordas + ";}");

        for (var i = 1; i <= locais.length; i++) {
            conteudo.push(' .local' + i + ' { background-image: url("' + locais[i - 1].carta.src + '"); } ');
        }

        $('#styleDynamic').html(conteudo.join(''));
    }

    $scope.jogadores;
    $scope.PosicionarJogadores = function(jogadores){
        $scope.jogadores = jogadores;
      
        for(var i = 0; i < jogadores.length; i++){
          var jogador = jogadores[i];
          if(jogador.posicao){
            // $("#jogador" + i).css({top: jogador.posicao[0]*50, left: jogador.posicao[1]*50});

            // var id = jogador.posicao.join('_');

            // var img = document.createElement('img');
            // img.src = jogador.src;
            // img.className = 'peao';
            // img.id = 'peao_'+jogador.id;
            // $('#'+id).html(img);
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
        
        // $('div').removeClass('jogador_ativo');
        // var idImg = 'peao_'+jogadorAtual.id;
        // $('#'+idImg).parent().addClass('jogador_ativo');
        // var esquerda = document.getElementById(idImg).offsetLeft;
        // var top = document.getElementById(idImg).offsetTop;

        $('.jogador_ativo').removeClass('jogador_ativo');

        $('#jogador0').addClass('jogador_ativo');


        var esquerda = document.getElementById("jogador0").offsetLeft;
        var top = document.getElementById("jogador0").offsetTop;

        document.getElementById('divTabuleiro').scrollLeft = esquerda - 80;
        document.getElementById('divTabuleiro').scrollTop = top - 80;
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

    $scope.visitedNodes = [];
    $scope.disponibiliddes = [];


    $scope.MostrarCasasDisponiveisParaAndar = function(posicao){

        $scope.disponibilidades = [];
        $scope.visitedNodes = [];
        $scope.distancia = 0;
        $scope.checarAdjacentes(posicao);

        for(var i = 0;i < $scope.disponibilidades.length;i++){
            var row = $scope.disponibilidades[i].row;
            var col = $scope.disponibilidades[i].col;

            var div = $('#'+row+'_'+col);

            if($scope.PossoAndarNaCasa(div))
                div.addClass('casaDispo');

        }
    }

    $scope.eCaminho = function(posicao) {

        if ((posicao[0] < 0 || posicao[0] > 25) && (posicao[1] < 0 || posicao[1] > 25)) {
            return false;
        } else {
            return $("#" + posicao[0] + "_" + posicao[1]).hasClass("caminho") || $("#" + posicao[0] + "_" + posicao[1]).hasClass("porta");    
        }

    }

    function Node(id, posicao, dist) {
        this.id = id;
        this.posicao = posicao;
        this.dist = dist;
    }

    $scope.distancia;
    $scope.adjs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    $scope.checarAdjacentes = function(posicao) {
        if (!$scope.eCaminho(posicao)) return; // retorna se não for um camiho válido
        if ($scope.distancia > $scope.numeroJogadas) return; // retorna se já tiver excedido o número de jogadas

        var posicaoIndex = (posicao[0] - 1) * 25 + posicao[1];
        var node = new Node(posicaoIndex, posicao, $scope.distancia);
        
        var nodeInArray = $.grep($scope.visitedNodes, function(e) { return e.id == posicaoIndex; });

        if (nodeInArray.length > 0 && nodeInArray[0].dist <= $scope.distancia) {
            return;  
        } else if (nodeInArray.length > 0) {
            nodeInArray[0].dist = $scope.distancia;
            node = nodeInArray[0];
        } 
        
        $scope.visitedNodes.push(node);
        $scope.disponibilidades.push({row: node.posicao[0], col: node.posicao[1]});    

        $scope.distancia++;
                                   
        for (var i=0; i<$scope.adjs.length; i++) {
            var adjNode = [posicao[0] + $scope.adjs[i][0], posicao[1] + $scope.adjs[i][1]];
            if (node.dist < $scope.numeroJogadas) {
                $scope.checarAdjacentes(adjNode);
            }
        }
        $scope.distancia--;
    
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

            var id = div.attr('id').split('_');
            var jogadorAtual = $scope.JogadorAtual();
            jogadorAtual.posicao = [+id[0], +id[1]];

            $scope.DeslocarImg();

            // swal("Sua vez acabou!", "", "warning");
            $scope.DesativarTimer();
            
        });
    }

    $scope.board = [[0, 0, 1], [0, 2, 0], [1, 2, 3], [0, 0, 0]];

    $scope.list = [1, 2];
    $scope.list2 = [1, 2];

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

    $scope.AbrirModalPalpite = function(){
        $('#palpiteModal').show();
        $scope.palpite = {};
    }

    $scope.setPalpite = function(nome,carta){
        $scope.palpite[nome] = carta;
    }

    $scope.DesabilitarPalpite = function(){
        return (
            $scope.palpite.suspeito == undefined ||
            $scope.palpite.arma == undefined ||
            $scope.palpite.local == undefined
        );
    }

    $scope.PosicaoEhPorta = function(div){
        if(div.hasClass('porta') && $scope.numeroJogadas > 1){

          swal({
            title: "Deseja entrar?",
            //text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
            closeOnConfirm: true
          },
          function (isConfirm){
            if(isConfirm){
              $scope.RemoverAcaoAndar();
              $scope.numeroJogadas = 0;

              var local = div.attr('comodo');
              var posicao = div.attr('id').split('_');
              var jogadorAtual = $scope.JogadorAtual();
              jogadorAtual.posicao = [+posicao[0], +posicao[1]];
              $scope.PosicionarImgNoComodo(local);
              $scope.AbrirModalPalpite();

              return true;
          }}
        );

            // var resultado = confirm('Deseja entrar?');
            // //var resultado =
            //
            // if(resultado){
            //     $scope.RemoverAcaoAndar();
            //     $scope.numeroJogadas = 0;
            //
            //     var local = div.attr('comodo');
            //     var posicao = div.attr('id').split('_');
            //     var jogadorAtual = $scope.JogadorAtual();
            //     jogadorAtual.posicao = [+posicao[0], +posicao[1]];
            //     $scope.PosicionarImgNoComodo(local);
            //     $scope.AbrirModalPalpite();
            //
            //     return true;
            // }

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
        swal("Perdeu a vez...", "", "error");
        $scope.mostrarTimer = false;
        $('.lancar_dados').hide();
        $('.resultado').hide();
        $('#palpiteModal').hide();
        $scope.ProximaJogada();
    }

    var interval;
    $scope.IniciarTimer = function(){
        if(interval) {
            $interval.cancel(interval);
        }

        var tempo = 180;

        $scope.mostrarTimer = true;
        var minutos = Math.floor(tempo / 60);
        var segundos = tempo - minutos * 60;
        $scope.timer = ("0" + minutos).slice(-2) + ":" + ("0" + segundos).slice(-2);
            
        interval = $interval(function(){
            
            tempo -= 1;

            if(tempo == 0){
                $scope.PerdeuAVez();
            }
            
            var minutos = Math.floor(tempo / 60);
            var segundos = tempo - minutos * 60;
            $scope.timer = ("0" + minutos).slice(-2) + ":" + ("0" + segundos).slice(-2);
            
        }, 1000);
    }

}]);
