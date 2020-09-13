class Scene3 extends Phaser.Scene {
    constructor() {
      super("puntos");
    }

    preload ()
    {
      this.load.image('logo2D', 'assets/logo2D.png');   
    }
    
    create() {
      this.add.image(400, 568, 'ground').setScale(1000).setTint(0x018785);
      //this.add.image(500, 100, 'logo2D');
      this.add.bitmapText(20, 55, 'pixel', 'heroes de la gripe', 80).setTint(0xF00909)
      this.add.bitmapText(25, 50, 'pixel', 'heroes de la gripe', 80).setTint(0xE7BB09)
      this.add.bitmapText(100, -5, 'pixel', '.', 80).setTint(0xF00909)
      this.add.bitmapText(103, -8, 'pixel', '.', 80).setTint(0xE7BB09)
      
      
      perdiste = 0;
      velociplayer = 159.99999;
      velocivirus = 165;


      var puntajefinal = this.add.bitmapText(0, 0, 'pixel', 'PUNTAJE: ' + puntos,  60).setTint(0xe07707);
      
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(500, 350, 800, 600));

      if (victoria >= 1 ){
        this.finalsound = this.sound.add('scorewin');
        this.finalsound.play();
        victoriaText = this.add.bitmapText(150,200, 'pixel', 'NIVEL SUPERADO', 30).setTint(0x40d106);
        restartButton = this.add.bitmapText(400, 500, 'pixel','REINICIAR', 30).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.reiniciar() );
        menu = this.add.bitmapText(50, 500, 'pixel','MENU PRINCIPAL', 30).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.menu() );
        var level2 = this.add.bitmapText(760, 500, 'pixel','CONTINUAR', 30).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.level2() );
      }

      else {
        this.finalsound = this.sound.add('scoreloose');
        this.finalsound.play();
        victoriaText = this.add.bitmapText(300,200, 'pixel', 'PERDISTE', 30).setTint(0xd10d06);
        restartButton = this.add.bitmapText(750, 500, 'pixel','REINICIAR', 30).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.reiniciar() );
        menu = this.add.bitmapText(50, 500, 'pixel','MENU PRINCIPAL', 30).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.menu() );
      };

    }

    reiniciar() {
      puntos = 0;
      victoria = 0;
      mochilacaida = 0;
      if (reiniciarcont === 0){
        this.scene.start('juego');
      }else if (reiniciarcont === 1){
        
        this.scene.start('juego2');
      }else if(reiniciarcont ===2){
        
        this.scene.start('juego3');
      };
    }

    menu() {
      pausacont = 0;
      reiniciarcont = 0;
      perdiste = 0;
      victoria = 0;
      puntos = 0;
      this.scene.start('inicio');
    }

    level2(){
      puntos = 0;
      
      if(victoria === 3){
        victoria = 0;
        reiniciarcont = 0;
        this.scene.start('puntosfinal');
      }else if(victoria === 2){
        victoria = 0;
        reiniciarcont = 2;
        this.scene.start('juego3');
      }else{
        victoria = 0;
        reiniciarcont = 1;
        this.scene.start('juego2');
      }
    }
    
}
  