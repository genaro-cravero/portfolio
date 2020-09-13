
class Scene7 extends Phaser.Scene {
    constructor() {
      super('juego2');
    }

    create(){
        ////  FONDO Y PARALLAX
            
        background=this.add.image(0, 0, 'sky2').setScale(3);
        background.setOrigin(0,0);
        background.setScrollFactor(1);
        

        ////  PISO
        platformescu = this.physics.add.staticGroup();
        platformescu.create(0, 830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(6904,830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(13807,830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(20711,830, 'ground2').setScale(4).setAlpha(0.01);

        //!Player
        if(seleccion === 'nene'){
            player = this.physics.add.sprite(300, 700, 'dude').setScale(1.5);
            player.anims.play('rightn', true);
            player.setCollideWorldBounds(false);
        }else if (seleccion === 'nena'){
            player = this.physics.add.sprite(300, 700, 'nena').setScale(1.5);
            player.anims.play('rightf', true);
            player.setCollideWorldBounds(false);
        };

        ////PUERTA

        this.add.image(20611, 729, 'puerta').setScale(3);
        escuela = this.physics.add.image(20611, 300, 'puerta').setScale(1,5).setAlpha(0.01);

        //+ POWERUPS

        powerup = this.physics.add.staticGroup({
            key: 'alcohol',
            repeat: 20,
        setXY: {x: 1100, y: 750, stepX: 1200, stepY:-5},
        });
        powerup.children.iterate(function (child){
            child.setScale(1).refreshBody();
            child.extratime = 1;
        
        });
    
        ////  Input Events

        cursor_spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        cursor_escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        ////tiempos
        initialTime = 1;
        initialTime2 = 1;
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timedEvent2 = this.time.addEvent({ delay: 1150, callback: this.onSecond2, callbackScope: this, loop: true });
        timedEvent3 = this.time.addEvent({ delay: 1150, callback: this.onSecond3, callbackScope: this, loop: true });
        

        //+ MOCHILA

        mochila = this.physics.add.group({
            key: 'mochila',
            repeat: 32,
            setXY: {x: 850, y:760, stepX:600}
        });
        mochila.children.iterate(function (child) { 
            child.setScale(0.2);
            child.setSize(200,250).setOffset(10,70);
            child.body.allowGravity = false;
            child.body.immovable = true;
            child.extratime = 1;

        });

        //+ ventana

        ventana = this.add.group({
            key: 'ventana',
            repeat: 20,
            setXY: {x: 850, y:380, stepX:1000}
        });
        ventana.children.iterate(function (child) { 
            child.setScale(0.5); 
            
            child.setInteractive().on('pointerdown', () => {if (pausacont === 0 ){
                child.anims.play('ventana2', true);
                child.disableInteractive();
                initialTime2 = 1; viruspower = 1;}
            });
                       
        });
        
        
        
        
        //! VIRUS

        virusc = new Virusclass ({scene: this});
        
        
        
        ////madera
        this.add.image(160,0, 'madera').setOrigin(0,0).setScrollFactor(0);


        //// SCORE
        scoreText = this.add.bitmapText(320, -2, 'pixel','PUNTAJE: 0', 50).setTint(0x000000);
        scoreText.setScrollFactor(0);
       

        ////Inicializacion de variables.
        score = 0;
        gameOver = false;

        ////Sonido y musica
        this.jump=this.sound.add('jump');
        this.musicbackground=this.sound.add('music2');
        this.musicbackground.loop = true;
        this.selecsound = this.sound.add('gameover');

        ////Cámara
        this.cameras.main.setBounds(0,0,background.displayWidth,background.displayHeight);
        this.cameras.main.startFollow(player);
        

        ////COLLIDERS y OVERLAPS

        this.physics.add.collider(player, platformescu);
        this.physics.add.collider(player, virus, this.hitplatforms2, null, this);
        this.physics.add.collider(player, basurero);
        this.physics.add.overlap(player, powerup, this.powerup, null, this);
        this.physics.add.overlap(player, mochila, this.mochilacaida, null, this);
        this.physics.add.collider(platformescu, mochila);
        this.physics.add.collider(escuela, platformescu);
        this.physics.add.collider(escuela, player, this.scene3, null, this);

        //// instrucciones
        this.physics.pause();
       pausacont = 1;
        instrucciones = this.add.image(0,0, 'instrucciones2').setOrigin(0,0).setScale(1.12,0.9)
        .setInteractive().on('pointerdown', ()=>{this.physics.resume(); pausacont = 0; instrucciones.destroy();
           this.musicbackground.play();}
        );
    
    }
   
    
    update (){
        
       

        if(initialTime > 0){
            timedEvent.paused = false;
        };
        if(initialTime2 > 0){
            timedEvent2.paused = false;
        };

        //// velocidades
        player.setVelocityX(velociplayer);  
        virus.setVelocityX(velocivirus);

        if (contpower === 0){
            player.setVelocityX(velociplayer);

        }else if (contpower === 1){
            player.setVelocityX(velociplayer - 30);
        }

        if (viruspower === 0){
            virus.setVelocityX(velocivirus);
        }else if (viruspower === 1){
            virus.setVelocityX(velocivirus - 25);
        };



        //// salto
        if (Phaser.Input.Keyboard.JustDown(cursor_spacebar)&& player.body.touching.down && perdiste ===0){
            player.setVelocityY(-500);
            this.jump.play();
            if(seleccion === 'nene'){
                player.anims.play('playerjumpn',true).on('animationcomplete', () => {player.anims.play('rightn', true);});
            }else if(seleccion === 'nena') {
             player.anims.play('saltonena',true).on('animationcomplete', () => {player.anims.play('rightf', true);});
            }
        };

        //// pausa
        if(Phaser.Input.Keyboard.JustDown(cursor_escape) && pausacont === 0){
            pausacont = 1;
            this.pausa();
        };

       
 
        
       
    }

    ////mochila caida
     mochilacaida (player, mochila){
        mochila.anims.play('mochila2', true);
        mochila.y = 790;
        initialTime = mochila.extratime;
        contpower = 1;
        
    }

    powerup (player, powerup){
        powerup.disableBody(true, true);
        puntos = puntos+100;
        scoreText.setText('PUNTAJE: ' + puntos);
        
    }

  

    onSecond() {
        initialTime = initialTime - 1; //// mochila
        if(initialTime == 0){
            timedEvent.paused = true;
            contpower = 0;
           
        }
    } 

    onSecond2() {
        initialTime2 = initialTime2 - 1; ////virus
        if(initialTime2 == 0){
            timedEvent2.paused = true;
            viruspower= 0;

        }
    } 
    
    onSecond3() {   ////velocidades p y v
        if(pausacont === 0){
            velociplayer = velociplayer + 2;
            velocivirus = velocivirus + 2.05;
        }
        
    } 



    hitplatforms2 (player, platforms2)
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
     
        this.add.image(player.x,500, 'pausafondo').setScale(1.5).setAlpha(0.8);
        this.add.bitmapText(player.x-150,300, 'pixel', 'PERDISTE', 70).setTint(0xd10d06);
        var gameOverButton = this.add.bitmapText(player.x+200,500, 'pixel', 'Continuar', 50).setTint(0xffffff)
        .setInteractive()
        .on('pointerdown', () =>  {pausacont = 0;this.scene.start('puntos')});
        
        
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(player.x+200,500));
         
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

    //+FINAL DEL NIVEL 2 
     scene3 (player, escuela){
        victoria = 2;
        pausacont = 0;
        plevel2 = puntos;
        this.scene.start('puntos');
        this.musicbackground.stop();
    }
    
    reiniciar() {
        pausacont = 0;
        this.musicbackground.stop();
        puntos = 0;
        mochilacaida = 0;
        perdiste = 0;
        this.scene.start('juego2');
        velociplayer = 159.99999;
        velocivirus = 165;
        
    }

    menu() {
        pausacont = 0;
        perdiste = 0;
        reiniciarcont = 0;
        victoria = 0;
        velociplayer = 159.99999;
        velocivirus = 165;
        this.musicbackground.stop();
        puntos = 0;
        this.scene.start('inicio');
    }
} 