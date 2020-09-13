var basurero;
var nube;
class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }
 ////NIVEL 1
    create ()
    {

        ////  FONDO Y PARALLAX
        

        background=this.add.image(0, 0, 'sky').setScale(3);
        background.setOrigin(0,0);
        background.setScrollFactor(1);
        this.add.image(751, 120, 'sol').setScale(1).setScrollFactor(0.005);
        nube = this.physics.add.staticGroup({
         key: 'nube',
         repeat: 40,
         setXY: {x: 750, y:210, stepX:600}
        });
        nube.children.iterate(function (child) { 
            child.setScale(3).refreshBody();
            child.setAlpha(0.8); 
            child.setScrollFactor(0.5)   
        });
        
 
        ////  PISO
        platforms = this.physics.add.staticGroup();
        platforms.create(0, 830, 'ground');
        platforms.create(14792,830, 'ground');
       
        //// ESCUELA
        
        this.add.image(16000, 260, 'escuela').setScale(4);
        escuela = this.physics.add.image(16200, 100, 'escuela').setAlpha(0.001);  
        
        ////perro
        velociplayer = this.add.sprite(3700, 740, 'perro').setScale(0.2);
        velociplayer.anims.play('perro', true)
        
        ////Carteles
        this.add.image(1050, 696, 'cartel1,4').setScale(0.5);
        this.add.image(4050, 696, 'cartel1,1').setScale(0.5);
        this.add.image(7540, 696, 'cartel800').setScale(0.5);
        this.add.image(10700, 696, 'cartel500').setScale(0.5);
        this.add.image(13500, 696, 'cartel200').setScale(0.5);


        
     
        
        // !PLAYER
       
        if(seleccion === 'nene'){
            player = this.physics.add.sprite(300, 700, 'dude').setScale(1.5);
            player.anims.play('rightn', true);
            player.setCollideWorldBounds(false);
        }else if (seleccion === 'nena'){
            player = this.physics.add.sprite(300, 700, 'nena').setScale(1.5);
            player.anims.play('rightf', true);
            player.setCollideWorldBounds(false);
        };

        
        //+ OBSTÁCULOS
        basurero = this.physics.add.group({
         key: 'basura',
         repeat: 42,
         setXY: {x: 850, y:750, stepX:600}
        });
        basurero.children.iterate(function (child) { 
            child.setScale(0.2);
            child.body.allowGravity = false;
            child.body.immovable = true;
            
        });
        basurero.setVelocityX (-100);
       
        //+Alcohol
        powerup = this.physics.add.group();
        powerup.create(800, 700, 'alcohol');
        powerup.create(1600, 700, 'alcohol');
        powerup.create(2600, 450, 'alcohol');
        powerup.create(3200, 700, 'alcohol');
        powerup.create(6400, 700, 'alcohol');
        powerup.create(8120, 450, 'alcohol');
        powerup.create(11885, 450, 'alcohol');
        powerup.create(11915, 480, 'alcohol');
        powerup.create(11945, 510, 'alcohol');
        powerup.create(15020, 650, 'alcohol');
        powerup.children.iterate(function (child){
            child.body.allowGravity = false;
        });
            
        
        ////  Input Events

        cursor_spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        cursor_escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            

        //! VIRUS
        
        virusc = new Virusclass ({scene: this});
        /*var tween = this.tweens.add({
        targets: virusc,
        x: 400,
        ease: 'Power1',
        duration: 1000,
        yoyo: true,
        repeat: -1,
        });*/
        
        ////PAUSA
        this.add.image(155, 70, 'pausa').setOrigin(0,0).setScrollFactor(0).setScale(-0.35)
        .setInteractive().on('pointerdown', ()=> {if (pausacont=== 0){pausacont = 1; this.pausa();}});


        ////SALTO
        this.add.image(50, 600, 'botsalto').setOrigin(0,0).setScrollFactor(0).setScale(0.5)
        .setInteractive().on('pointerdown',()=> {this.saltar()});
        
        ////madera
        this.add.image(160,20 , 'madera').setOrigin(0,0).setScrollFactor(0);


        //// SCORE
        scoreText = this.add.bitmapText(320, 21, 'pixel', 'PUNTAJE: 0',50).setTint(0x000000);
        scoreText.setScrollFactor(0);
        

        ////Inicializacion de variables.
        score = 0;
        gameOver = false;


        ////Cámara
        this.cameras.main.setBounds(0,0,background.displayWidth,background.displayHeight);
        this.cameras.main.startFollow(player);
        

        ////Sounds and music.

        this.jump=this.sound.add('jump');
        this.musicbackground=this.sound.add('music');
        this.musicbackground.loop = true;
        this.selecsound = this.sound.add('gameover');



        ////COLLIDERS y OVERLAPS

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, virus, this.hitplatforms2, null, this);
        this.physics.add.collider(player, basurero);
        this.physics.add.collider(escuela, platforms);
        this.physics.add.collider(escuela, player, this.scene3, null, this);
        this.physics.add.overlap(player, powerup, this.powerup, null, this);


        //// instrucciones
       this.physics.pause();
       pausacont = 1;
       instrucciones = this.add.image(0,0, 'instrucciones1').setOrigin(0,0).setScale(1.12,0.9)
        .setInteractive().on('pointerdown', ()=>{this.physics.resume(); pausacont = 0; instrucciones.destroy();
           this.musicbackground.play();}
       );

        
    }


        

 
        
    
    update ()
    { 
      
        player.setVelocityX(159.999999);  
        

        ////salto

        if (Phaser.Input.Keyboard.JustDown(cursor_spacebar)&& player.body.touching.down && perdiste == 0){
           this.saltar();
        };

        ////pausa 

        if(Phaser.Input.Keyboard.JustDown(cursor_escape) && pausacont === 0){
            pausacont = 1;
            this.pausa();
        };
    
       
    }
  

    pausa(){

        //*pausa animaciones y fisicas
        this.physics.pause();

        //* Fondo y texto de pausa
        pausa = this.add.image(player.x,500, 'pausafondo').setScale(1.5).setAlpha(0.8);
        pausa2 = this.add.image(player.x, 500, 'pausamadera');
        reanudartext = this.add.bitmapText(player.x-170,300, 'pixel', 'Reanudar', 60).setTint(0x21911d)
        .setInteractive().on('pointerdown', ()=> {this.physics.resume(); reanudartext.destroy(); pausa.destroy(); pausa2.destroy();
            pausacont = 0; restartButton.destroy(); menu.destroy();})
        restartButton = this.add.bitmapText(player.x-190, 470, 'pixel','Reiniciar', 60).setTint(0x63370a)
        .setInteractive().on('pointerdown', () => this.reiniciar());
        menu = this.add.bitmapText(player.x-115, 620, 'pixel','Salir', 60).setTint(0xecd313)
        .setInteractive().on('pointerdown', () => this.menu() );

    
    };

    scene3 (player, escuela){
        victoria = 1;
        pausacont = 0;
        plevel1 = puntos;
        this.scene.start('puntos');
        this.musicbackground.stop();
    }
    
    powerup (player, powerup){
        powerup.disableBody(true, true);
        puntos = puntos+100;
        scoreText.setText('PUNTAJE: ' + puntos);
        
    }
    hitplatforms2 ()
    {
        this.gameOver()
        this.selecsound.play();
        pausacont = 1;
        perdiste = 1;
    }

    gameOver() {    
        if (gameOver)
        {       
            return
        }  

        gameOver = true;
        this.physics.pause();
        this.musicbackground.stop();

        player.setTint(0x659b1a);
     
        this.add.image(player.x,550, 'pausafondo').setScale(2).setAlpha(0.7);
        this.add.bitmapText(player.x-180,400, 'pixel', 'PERDISTE', 70).setTint(0xd10d06);
        var gameOverButton = this.add.bitmapText(player.x-280,500, 'pixel', 'Continuar', 50).setTint(0xffffff)
        .setInteractive()
        .on('pointerdown', () =>  {pausacont = 0;this.scene.start('puntos')});
        
        
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(player.x+25,550));
        
    }
    reiniciar() {
        pausacont = 0;
        this.musicbackground.stop();
        puntos = 0;
        this.scene.start('juego');
        perdiste = 0;
    }

    menu() {
        pausacont = 0;
        this.musicbackground.stop();
        puntos = 0;
        this.scene.start('inicio');
        perdiste = 0;
    }
    saltar(){
        if(player.body.touching.down && perdiste === 0){
            player.setVelocityY(-500);
            this.jump.play();
            if(seleccion === 'nene'){
                 player.anims.play('playerjumpn',true).on('animationcomplete', () => {player.anims.play('rightn', true);});
                }else if(seleccion === 'nena') {
                player.anims.play('saltonena',true).on('animationcomplete', () => {player.anims.play('rightf', true);});
        }   }
    }
}   
    