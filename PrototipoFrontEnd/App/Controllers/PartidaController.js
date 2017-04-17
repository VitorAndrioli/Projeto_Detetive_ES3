detetiveApp.controller('PartidaController',['$scope','PartidaFactory',function($scope,PartidaFactory){

    $scope.corBordas = PartidaFactory.corDaBorda;

    $scope.personagens = PartidaFactory.personagens;

    $scope.imagemDoFundo= PartidaFactory.imagemDoFundo;

    $scope.armas = PartidaFactory.armas;

    $scope.locais = PartidaFactory.locais;

    $scope.meuPersonagem = $scope.personagens[4];

    $scope.indicePersonagemAtual = 4;

    $scope.mostrarBarraLateral = true;

    $scope.switcheryOptions = {
        color: 'green', 
        secondaryColor: '#a52323', 
        size: 'small' 
    };

    $scope.Init = function(){

        var conteudo = new Array();
        conteudo.push('#divTabuleiro {');
        conteudo.push('background-image: url("'+$scope.imagemDoFundo+'");');
        conteudo.push('background-repeat: no-repeat;');
        conteudo.push('background-size: 100%;}');
        
        conteudo.push(" .item_tab {border: 1px solid "+$scope.corBordas+";}");

        for(var i = 1; i <= $scope.locais.length;i++){
            conteudo.push(' .local'+i+' { background-image: url("'+$scope.locais[i-1].src+'"); } ');
        }

        $('#styleDynamic').html(conteudo.join(''));
    }

    $scope.Init();
}]);