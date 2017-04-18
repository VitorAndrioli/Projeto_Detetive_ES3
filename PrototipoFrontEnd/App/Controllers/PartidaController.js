detetiveApp.controller('PartidaController', ['$scope', 'PartidaFactory', function ($scope, PartidaFactory) {

    $scope.corBordas = PartidaFactory.corDaBorda;

    $scope.personagens = PartidaFactory.personagens;

    $scope.imagemDoFundo = PartidaFactory.imagemDoFundo;

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

    $scope.jogadorParaBanir = null;

    $scope.SelecBanir = function (jogador) {
        $scope.jogadorParaBanir = jogador;
    }

    $scope.Init = function () {

        var conteudo = new Array();
        conteudo.push('#divTabuleiro {');
        conteudo.push('background-image: url("' + $scope.imagemDoFundo + '");');
        conteudo.push('background-repeat: no-repeat;');
        conteudo.push('background-size: 100%;}');

        conteudo.push(" .item_tab {border: 1px solid " + $scope.corBordas + ";}");

        for (var i = 1; i <= $scope.locais.length; i++) {
            conteudo.push(' .local' + i + ' { background-image: url("' + $scope.locais[i - 1].src + '"); } ');
        }

        $('#styleDynamic').html(conteudo.join(''));
    }

    $scope.mensagens = [
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        },
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        },
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        },
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        },
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        },
        {
            class: "jogador1",
            nome: $scope.personagens[0].nome,
            mensagem: 'Vou ganhar'
        },
        {
            class: "jogador2",
            nome: $scope.personagens[4].nome,
            mensagem: "Eu é que vou"
        }
    ]

    $scope.jogadores = [
        {
            nome: 'Jogador 1',
            personagem: $scope.personagens[3].src
        },
        {
            nome: 'Jogador 2',
            personagem: $scope.personagens[4].src
        }
    ];

    function ChatScrollDescer() {
        var objDiv = document.getElementById("chat_corpo");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    $('#txtConteudo').keypress(function (e) {
        if (e.keyCode == 13) {
            $scope.mensagens.push({
                class: "eu",
                nome: 'Eu',
                mensagem: $('#txtConteudo').val()
            })
            $('#txtConteudo').val('');
            $scope.$apply();
            ChatScrollDescer();
            return false;
        }
        
    })

    $scope.BanirJogador = function () {
        $('#banirModal').modal('hide');
        swal({
            title: "Deseja banir o jogador?",
            text: $scope.jogadorParaBanir.nome + ": <img  style='width:50px' src='" + $scope.jogadorParaBanir.personagem + "'/>",
            html: true,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            confirmButtonText: "Banir",
            cancelButtonText: "Não Banir",

            closeOnConfirm: true,
            closeOnCancel: true
        }, function (isConfirm) {
            $scope.jogadorParaBanir = null;
        });
    }

    $scope.Init();
}]);