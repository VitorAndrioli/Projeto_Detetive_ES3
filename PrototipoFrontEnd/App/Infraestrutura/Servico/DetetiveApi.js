detetiveApp.factory('DetetiveApi',[function(){
    var app  = {};

 function MinhasCartas(array, indice){
        var retorno = new Array();
        for(var i = 0; i< array.length; i++){
            var item = {
                carta: array[i],
                minhaCarta: false,
                selecionado: false
            };
            if(i < indice){
                item.minhaCarta = true;
                item.selecionado = true;
            }
            retorno.push(item);
        }
        return retorno;
    }

    function Jogadores(){
        var jogadores = [
         {
             id:1,
            nome:'Dona Branca',
            src:'Imagens/padrao/personagens/Dona_Branca.png',
            posicao:[1,8]
        },
        {
            id:2,
            nome:'Dona Violeta',
            src:'Imagens/padrao/personagens/Dona_Violeta.png',
            posicao:[1,9]
        },
        {
            id:3,
            nome:'Mordomo James',
            src:'Imagens/padrao/personagens/Mordomo_James.png',
            posicao:[1,10]
        },
        {
            id:4,
            nome:'Sargento Bigode',
            src:'Imagens/padrao/personagens/Sargento_Bigode.png',
            posicao:[1,17]
        },
        {
            id:5,
            nome:'Senhor Marinho',
            src:'Imagens/padrao/personagens/Senhor_Marinho.png',
            posicao:[1,18]
        },
        {
            id:6,
            nome:'Senhorita Rosa',
            src:'Imagens/padrao/personagens/Senhorita_Rosa.png'
            ,
            posicao:[1,19]
        },
        {
            id:7,
            nome:'Sergio Soturno',
            src:'Imagens/padrao/personagens/Sergio_Soturno.png'
        },
        {
            id:8,
            nome:'Tony Gourmet',
            src:'Imagens/padrao/personagens/Tony_Gourmet.png'
        }];

        return jogadores;
    }

    function BarraAnotacao(){
        return {
            suspeitos: MinhasCartas(suspeitos,3),
            armas: MinhasCartas(armas,3),
            locais: MinhasCartas(locais,5)
        };

    }

   var suspeitos = [
        {
            id:1,
            nome:'Dona Branca',
            src:'Imagens/padrao/personagens/Dona_Branca.png'
        },
        {
            id:2,
            nome:'Dona Violeta',
            src:'Imagens/padrao/personagens/Dona_Violeta.png'
        },
        {
            id:3,
            nome:'Mordomo James',
            src:'Imagens/padrao/personagens/Mordomo_James.png'
        },
        {
            id:4,
            nome:'Sargento Bigode',
            src:'Imagens/padrao/personagens/Sargento_Bigode.png'
        },
        {
            id:5,
            nome:'Senhor Marinho',
            src:'Imagens/padrao/personagens/Senhor_Marinho.png'
        },
        {
            id:6,
            nome:'Senhorita Rosa',
            src:'Imagens/padrao/personagens/Senhorita_Rosa.png'
        },
        {
            id:7,
            nome:'Sergio Soturno',
            src:'Imagens/padrao/personagens/Sergio_Soturno.png'
        },
        {
            id:8,
            nome:'Tony Gourmet',
            src:'Imagens/padrao/personagens/Tony_Gourmet.png'
        }
    ];

    
    var armas = [
        {
            id:9,
            nome:'Arma química',
            src:'Imagens/padrao/armas/arma_quimica.png' 
        }
        ,{
            id:10,
            nome:'Espingarda',
            src:'Imagens/padrao/armas/espingarda.png' 
        }
        ,{
            id:11,
            nome:'Faca',
            src:'Imagens/padrao/armas/faca.png' 
        }
        ,{
            id:12,
            nome:'Pá',
            src:'Imagens/padrao/armas/pa.png' 
        }
        ,{
            id:13,
            nome:'Pé de Cabra',
            src:'Imagens/padrao/armas/pe_de_cabra.png' 
        }
        ,{
            id:14,
            nome:'Soco Inglês',
            src:'Imagens/padrao/armas/soco_ingles.png' 
        }
        ,{
            id:15,
            nome:'Tesoura',
            src:'Imagens/padrao/armas/tesoura.png' 
        }
        ,{
            id:16,
            nome:'veneno',
            src:'Imagens/padrao/armas/veneno.png' 
        }
    ];

    var locais = [
        {
            id:17,
            nome:'Restaurante',
            src:'Imagens/padrao/locais/restaurante.png' 
        },
        {
            id:18,
            nome:'Prefeitura',
            src:'Imagens/padrao/locais/prefeitura.png' 
        },
        {
            id:19,
            nome:'Banco',
            src:'Imagens/padrao/locais/banco.png' 
        },
        {
            id:20,
            nome:'Hospital',
            src:'Imagens/padrao/locais/hospital.png' 
        },
        {
            id:21,
            nome:'Praça',
            src:'Imagens/padrao/locais/praca.png' 
        },
        {
            id:22,
            nome:'Mansão',
            src:'Imagens/padrao/locais/mansao.png' 
        },
        {
            id:23,
            nome:'Floricultura',
            src:'Imagens/padrao/locais/floricultura.png' 
        },
        {
            id:24,
            nome:'Hotel',
            src:'Imagens/padrao/locais/hotel.png    ' 
        },
        {
            id:25,
            nome:'Cemitério',
            src:'Imagens/padrao/locais/cemiterio.png' 
        },
        {
            id:26,
            nome:'Estação de Trem',
            src:'Imagens/padrao/locais/estacao_trem.png' 
        },
        {
            id:27,
            nome:'Boate',
            src:'Imagens/padrao/locais/boate.png' 
        }
    ];;

   

        app.PegarDadosPartida = function(id, callbackSucesso, callbackErro){

        var partida = {};

        partida.meuJogador = {
           src: 'Imagens/padrao/personagens/Senhor_Marinho.png',
           nome: 'Senhor Marinho'
        };

        partida.jogadores = Jogadores();

        partida.imagemFundoPath = 'Imagens/padrao/fundo.jpg';

        partida.corDaBorda = '#d6bebe';

        partida.barraAnotacao = BarraAnotacao();

        callbackSucesso(partida);

    }

    return app;

}])