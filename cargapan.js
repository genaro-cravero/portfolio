class cargapan extends Phaser.Scene{
    constructor(){
        super("cargapan");
	}
    
    preload() {
		
		
		this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var bBar = new Phaser.Geom.Circle(640, 360, 200, 50);
		var loadingBar = new Phaser.Geom.Circle(640, 360, 190, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillCircleShape(bBar);

		this.newGraphics.fillStyle(0x1de027, 1);
		this.newGraphics.fillCircleShape(loadingBar);

		var loadingText = this.add.text(615,560,"Cargando: ", { fontSize: '32px', fill: '#FFF' });


      this.load.image('logo', 'assets/logo.png');
      this.load.image('pausa', 'assets/stop.png' )
      this.load.image('botsalto', 'assets/jump.png' )
      this.load.image('arbusto', 'assets/arbusto.png')
      this.load.spritesheet('perro', 'assets/perro.png',{ frameWidth: 398, frameHeight:378 })
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 39, frameHeight:68 });
      this.load.audio('jump', 'SFX/Jump.wav');
      this.load.audio('music', 'SFX/music.wav');
      this.load.audio('musicmenu', 'SFX/MenuPrincipal.wav');
      this.load.audio('character','SFX/character.wav');
      this.load.audio('gameover', 'SFX/GameOver.wav');
      this.load.audio('scorewin', 'SFX/ScoreWin.wav');
      this.load.audio('scoreloose', 'SFX/ScoreGameOver.wav');
      this.load.audio('music2', 'SFX/music2.wav');
      this.load.audio('music3', 'SFX/music3.wav');
      this.load.audio('aplastar', 'SFX/aplastar.wav');
      this.load.image('basura', 'assets/basura.png');
      this.load.image('salto', 'assets/salto.png');
      this.load.image('alcohol', 'assets/alcohol.png');
      this.load.image('infovirus', 'assets/info.png');
      this.load.image('madera', 'assets/madera.png');
      this.load.image('escuela', 'assets/escuela.png');
      this.load.image('creditos', 'assets/creditos.png');
      this.load.image('frase', 'assets/frase.png');
      this.load.spritesheet('nena', 'assets/nenarun.png',{frameWidth: 50, frameHeight: 68});
      this.load.image('saltonena', 'assets/saltonena.png');
      this.load.image('sol', 'assets/sol.png');
      this.load.image('nube', 'assets/nube.png');
      this.load.bitmapFont('pixel', 'assets/pixelfont.png', 'assets/pixelfont.fnt');
      this.load.image('pausafondo', 'assets/pausa.png');
      this.load.image('pausamadera', 'assets/madera2.png');
      this.load.image('sky2', 'assets/escenarioescuela.png');
      this.load.image('ground2', 'assets/pisoescuela.png');
      this.load.image('mochila', 'assets/mochila.png');
      this.load.image('mochila2', 'assets/mochila2.png');
      this.load.image('ventana', 'assets/ventana.png');
      this.load.image('ventana2', 'assets/ventana2.png');
      this.load.image('puerta', 'assets/puertaescuela.png');
      this.load.image('instrucciones1', 'assets/instrucciones1.png');
      this.load.image('instrucciones2', 'assets/instrucciones2.png');
      this.load.image('instrucciones3', 'assets/instrucciones3.png');
      this.load.image('cartel1,4' , 'assets/cartel1,4.png');
      this.load.image('cartel1,1' , 'assets/cartel1,1.png');
      this.load.image('cartel800' , 'assets/cartel800.png');
      this.load.image('cartel500' , 'assets/cartel500.png');
      this.load.image('cartel200' , 'assets/cartel200.png');
      this.load.spritesheet('v1', 'assets/virus1.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('v2', 'assets/virus2.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('v3', 'assets/virus3.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('v4', 'assets/virus4.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('v5', 'assets/virus5.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('v6', 'assets/virus6.png',{frameWidth:107 ,frameHeight:115});
      this.load.spritesheet('humovirus', 'assets/humovirus.png',{frameWidth:197 ,frameHeight:145});
      this.load.image('fondo3', 'assets/fondo3.png');
      this.load.image('cielo3', 'assets/cielo3.png');
      this.load.image('paralax3', 'assets/paralax3.png');
      this.load.image('hospital', 'assets/hospital.png');
      this.load.spritesheet('jeringa', 'assets/jeringa.png',{frameWidth:108 ,frameHeight:406});
      this.load.spritesheet('agua', 'assets/agua.png',{frameWidth:1800, frameHeight:1800});
      this.load.spritesheet('vx', 'assets/vxplode.png',{frameWidth:84, frameHeight: 93,});
      this.load.spritesheet('final', 'assets/final.png',{frameWidth:551, frameHeight: 300,});
      this.load.spritesheet('final2', 'assets/final2.png',{frameWidth:551, frameHeight: 300,});
      this.load.spritesheet('finaln', 'assets/finalnena.png',{frameWidth:551, frameHeight: 300,});
      this.load.spritesheet('finaln2', 'assets/finalnena2.png',{frameWidth:551, frameHeight: 300,});
      this.load.spritesheet('luz', 'assets/luz.png',{frameHeight:64, frameWidth:64});
		
		

		this.load.on('progress', this.cargando, {newGraphics:this.newGraphics,loadingText:loadingText});
		this.load.on('complete', this.completo, {scene:this.scene});
	}
    

	cargando(percentage) {
		this.newGraphics.clear();
		this.newGraphics.fillStyle(0x1de027, 1);
		this.newGraphics.fillCircleShape(new Phaser.Geom.Circle(640, 360, percentage*190, 40));

		percentage = Math.round(percentage * 100);
		this.loadingText.setText(percentage + "%");


	}

	completo() {
		
		this.scene.start("inicio");
	}





}