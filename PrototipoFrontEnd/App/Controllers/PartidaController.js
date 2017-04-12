detetiveApp.controller('PartidaController',['$scope',function($scope){

    $scope.personagens = [
        {
            nome:'Chewbacca',
            src:'Imagens/starwars/personagens/chewbacca.png'
        },
        {
            nome:'R2-D2',
            src:'Imagens/starwars/personagens/r2d2.png'
        },
        {
            nome:'Yoda',
            src:'Imagens/starwars/personagens/yoda.png'
        },
        {
            nome:'Obi-Wan Kenobi',
            src:'Imagens/starwars/personagens/obiwan.png'
        },
        {
            nome:'Storm Trooper',
            src:'Imagens/starwars/personagens/stormtrooper.png'
        },
        {
            nome:'Darth Vader',
            src:'Imagens/starwars/personagens/darthvader.png'
        },
        {
            nome:'Luke Skywalker',
            src:'Imagens/starwars/personagens/luke.png'
        },
        {
            nome:'Darth Maul',
            src:'Imagens/starwars/personagens/darthmaul.png'
        },
        {
            nome:'Han Solo',
            src:'Imagens/starwars/personagens/hansolo.png'
        },
        {
            nome:'Princesa Leia',
            src:'Imagens/starwars/personagens/princesaleia.png'
        }
    ]

    $scope.armas = [
        {
            nome:'Blaster 10',
            src:'Imagens/starwars/armas/blasterde10.jpg' 
        }
        ,{
            nome:'Blaster 11',
            src:'Imagens/starwars/armas/blastere11.jpg' 
        }
        ,{
            nome:'Bowcaster',
            src:'Imagens/starwars/armas/bowcaster.jpg' 
        }
        ,{
            nome:'DC 15 S',
            src:'Imagens/starwars/armas/dc15s.jpg' 
        }
        ,{
            nome:'Mina de plasma',
            src:'Imagens/starwars/armas/minaplasma.jpg' 
        }
        ,{
            nome:'Machado Mythossauro',
            src:'Imagens/starwars/armas/mythossauro.jpg' 
        }
        ,{
            nome:'Rifle Blaster',
            src:'Imagens/starwars/armas/rifleblaster.jpg' 
        }
        ,{
            nome:'Sabre de Luz',
            src:'Imagens/starwars/armas/sabreluz.png' 
        }
    ]

    $scope.locais = [
        {
            nome:'Alderaan',
            src:'Imagens/starwars/locais/alderaan.jpg' 
        },
        {
            nome:'Bespin',
            src:'Imagens/starwars/locais/bespin.jpg' 
        },
        {
            nome:'Coruscant',
            src:'Imagens/starwars/locais/coruscant.jpg' 
        },
        {
            nome:'Dagobah',
            src:'Imagens/starwars/locais/dagobah.jpg' 
        },
        {
            nome:'Endor',
            src:'Imagens/starwars/locais/endor.jpg' 
        },
        {
            nome:'Estrela da morte',
            src:'Imagens/starwars/locais/estreladamorte.jpg' 
        },
        {
            nome:'Geonosis',
            src:'Imagens/starwars/locais/geonosis.jpg' 
        },
        {
            nome:'Kamino',
            src:'Imagens/starwars/locais/kamino.jpeg' 
        },
        {
            nome:'Kashyyyk',
            src:'Imagens/starwars/locais/kashyyyk.jpg' 
        },
        {
            nome:'Naboo',
            src:'Imagens/starwars/locais/naboo.jpeg' 
        },
        {
            nome:'Yavin 4',
            src:'Imagens/starwars/locais/yavin_4.jpeg' 
        }
    ];

    $scope.meuPersonagem = $scope.personagens[3];

    $scope.mostrarBarraLateral = true;

    $scope.switcheryOptions = {
        color: 'green', 
        secondaryColor: '#a52323', 
        size: 'small' 
    };
}]);