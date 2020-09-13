class Scene9 extends Phaser.Scene{
    constructor(){
        super("puntosfinal");
    }

    create() {
        this.add.image(400, 568, 'ground').setScale(1000).setTint(0x018785);
        this.add.image(500, 100, 'logo2D');


       
        this.add.bitmapText(200, 170, 'pixel', 'PUNTAJES: ',  60).setTint(0xe07707);
        this.add.bitmapText(210, 300, 'pixel', 'Nivel 1.   ' + plevel1, 40).setTint(0xd6d604);
        this.add.bitmapText(210, 360, 'pixel', 'Nivel 2.   ' + plevel2, 40).setTint(0xe32914);
        this.add.bitmapText(210, 420, 'pixel', 'Nivel 3.   ' + plevel3, 40).setTint(0x3238a8);
        plevel1 = plevel1 + plevel2 + plevel3;
        this.add.bitmapText(200, 520, 'pixel', 'Total.  ' + plevel1, 50 ).setTint(0x039e08);
        
        if(plevel1 === 4100){
            this.add.bitmapText(600, 350, 'pixel', 'PUNTAJE', 65).setTint(0x8f05ff);
            this.add.bitmapText(600, 420, 'pixel', 'PERFECTO', 65).setTint(0x8f05ff);
        };

        
        this.finalsound = this.sound.add('scorewin');
        this.finalsound.play();
        this.add.image(500, 720, 'frase'); 

        menu = this.add.bitmapText(700, 530, 'pixel','MENU PRINCIPAL', 25).setTint(0x000000)
        .setInteractive()
        .on('pointerdown', () => this.menu() );




    }


    menu() {
        pausacont = 0;
      reiniciarcont = 0;
      perdiste = 0;
      victoria = 0;
      velociplayer = 159.99999;
      velocivirus = 165;
      puntos = 0;
      this.scene.start('inicio');
    }




}


