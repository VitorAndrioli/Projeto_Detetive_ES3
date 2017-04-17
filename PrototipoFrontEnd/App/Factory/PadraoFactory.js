detetiveApp.factory('PartidaFactory',function(){
    var app = {};
    
    app.corDaBorda = '#d6bebe';

    app.imagemDoFundo = 'Imagens/padrao/fundo.jpg';

     app.personagens = [
        {
            nome:'Dona Branca',
            src:'Imagens/padrao/personagens/Dona_Branca.png'
        },
        {
            nome:'Dona Violeta',
            src:'Imagens/padrao/personagens/Dona_Violeta.png'
        },
        {
            nome:'Mordomo James',
            src:'Imagens/padrao/personagens/Mordomo_James.png'
        },
        {
            nome:'Sargento Bigode',
            src:'Imagens/padrao/personagens/Sargento_Bigode.png'
        },
        {
            nome:'Senhor Marinho',
            src:'Imagens/padrao/personagens/Senhor_Marinho.png'
        },
        {
            nome:'Senhorita Rosa',
            src:'Imagens/padrao/personagens/Senhorita_Rosa.png'
        },
        {
            nome:'Sergio Soturno',
            src:'Imagens/padrao/personagens/Sergio_Soturno.png'
        },
        {
            nome:'Tony Gourmet',
            src:'Imagens/padrao/personagens/Tony_Gourmet.png'
        }
    ]

    app.armas = [
        {
            nome:'Arma química',
            src:'Imagens/padrao/armas/arma_quimica.png' 
        }
        ,{
            nome:'Espingarda',
            src:'Imagens/padrao/armas/espingarda.png' 
        }
        ,{
            nome:'Faca',
            src:'Imagens/padrao/armas/faca.png' 
        }
        ,{
            nome:'Pá',
            src:'Imagens/padrao/armas/pa.png' 
        }
        ,{
            nome:'Pé de Cabra',
            src:'Imagens/padrao/armas/pe_de_cabra.png' 
        }
        ,{
            nome:'Soco Inglês',
            src:'Imagens/padrao/armas/soco_ingles.png' 
        }
        ,{
            nome:'Tesoura',
            src:'Imagens/padrao/armas/tesoura.png' 
        }
        ,{
            nome:'veneno',
            src:'Imagens/padrao/armas/veneno.png' 
        }
    ]

    app.locais = [
        {
            nome:'Restaurante',
            src:'Imagens/padrao/locais/restaurante.png' 
        },
        {
            nome:'Prefeitura',
            src:'Imagens/padrao/locais/prefeitura.png' 
        },
        {
            nome:'Banco',
            src:'Imagens/padrao/locais/banco.png' 
        },
        {
            nome:'Hospital',
            src:'Imagens/padrao/locais/hospital.png' 
        },
        {
            nome:'Praça',
            src:'Imagens/padrao/locais/praca.png' 
        },
        {
            nome:'Mansão',
            src:'Imagens/padrao/locais/mansao.png' 
        },
        {
            nome:'Floricultura',
            src:'Imagens/padrao/locais/floricultura.png' 
        },
        {
            nome:'Hotel',
            src:'Imagens/padrao/locais/hotel.png    ' 
        },
        {
            nome:'Cemitério',
            src:'Imagens/padrao/locais/cemiterio.png' 
        },
        {
            nome:'Estação de Trem',
            src:'Imagens/padrao/locais/estacao_trem.png' 
        },
        {
            nome:'Boate',
            src:'Imagens/padrao/locais/boate.png' 
        }
    ];

    return app;
});