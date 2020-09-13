var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        },
     
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false,
        }

    },
    
    ////la importante es la primera, que es la que arranca
    scene: [cargapan, Scene1, Scene3, Scene2, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9]
};

var game = new Phaser.Game(config);


var score;
var gameOver;
var player;
var background;
var platforms;
var platformescu;
var virus;
var scoreText;
var jump;
var musicbackground;
var powerup;
var initialTime;
var initialTime2;
var timedEvent;
var timedEvent2;
var timedEvent3;
var timeText;
var contpower = 0;
var escuela;
var puntos = 0;
var victoria = 0;
var victoriaText;
var restartButton;
var creditosText;
var menu;
var seleccion = '';
var selecnene;
var selecnena;
var pixel;
var selecsound;
var finalsound;
var cursor_spacebar;
var cursor_escape;
var pausacont = 0;
var reanudartext;
var pausa;
var pausa2;
var perdiste = 0;
var victoria = 0;
var mochila;
var reiniciarcont = 0;
var mochilacaida = 0;
var ventana;
var viruspower = 0;
var velociplayer = 159.999999;
var velocivirus = 165;
var plevel1 = 0;
var plevel2 = 0;
var plevel3 = 0;
var instrucciones;
var virusvolador;
var paralax3;
var mv;
var videofinal;
var luz;
var luzcont = 0;
var virusc;
var español = 0;
var ingles = 0;
