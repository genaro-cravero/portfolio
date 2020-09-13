class Scene8 extends Phaser.Scene{
    constructor(){
        super('juego3');
    }

    create(){

        ////  FONDO Y PARALLAX
        
        nube=this.add.image(0, 0, 'cielo3').setScale(3);
        nube.setOrigin(0,0);
        nube.setScrollFactor(0);

        paralax3=this.add.image(0, 0, 'paralax3').setScale(3);
        paralax3.setOrigin(0,0);
        paralax3.setScrollFactor(0.18);

     

        background=this.add.image(0, 0, 'fondo3').setScale(3);
        background.setOrigin(0,0);
        background.setScrollFactor(1);

        

        ////  PISO
        platformescu = this.physics.add.staticGroup();
        platformescu.create(0, 830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(6904,830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(13807,830, 'ground2').setScale(4).setAlpha(0.01);
        platformescu.create(20711,830, 'ground2').setScale(4).setAlpha(0.01);

        ////HOSPITAL y VACUNA

        this.add.image(17190, 355, 'hospital').setScale(3);
        escuela = this.physics.add.sprite(17500, 710, 'jeringa').setScale(0.5);
        escuela.anims.play('jeringa', true);
        escuela.body.allowGravity = false;
        escuela.body.immovable = true;

        //+ AGUA

        mochila = this.physics.add.group({
            key: 'agua',
            repeat: 27,
            setXY: {x: 850, y:760, stepX:600}
        });
        mochila.children.iterate(function (child) { 
            child.setScale(0.1);
            child.setSize(1100,300).setOffset(350,1200);
            child.body.allowGravity = false;
            child.body.immovable = true;
            child.anims.play('agua', true);
            child.extratime = 1;
        });
        
        

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

        //+ POWERUPS

        powerup = this.physics.add.staticGroup({
            key: 'alcohol',
            repeat: 13,
        setXY: {x: 1100, y: 750, stepX: 1200, stepY:-10},
        });
        powerup.children.iterate(function (child){
            child.setScale(1).refreshBody();
            child.extratime = 1;
        
        });

        ////  Input Events

        cursor_spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        cursor_escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        ////tiempo de powerup
        initialTime = 1;
        initialTime2 = 1;
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timedEvent2 = this.time.addEvent({ delay: 1150, callback: this.onSecond2, callbackScope: this, loop: true });
        timedEvent3 = this.time.addEvent({ delay: 800, callback: this.onSecond3, callbackScope: this, loop: true });

        

        //! Virus Volador
        virusvolador = this.physics.add.group();
        
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

        ////Sonido, musica
        this.jump=this.sound.add('jump');
        this.musicbackground=this.sound.add('music3');
        this.musicbackground.loop = true;
        this.selecsound = this.sound.add('gameover');
        this.mv = this.sound.add('aplastar');       
        

        ////Cámara
        this.cameras.main.setBounds(0,0,background.displayWidth,background.displayHeight);
        this.cameras.main.startFollow(player);
        

        ////COLLIDERS y OVERLAPS

        this.physics.add.collider(player, platformescu);
        this.physics.add.collider(player, virusc, this.hitplatforms2, null, this);
        this.physics.add.collider(player, basurero);
        this.physics.add.overlap(player, powerup, this.powerup, null, this);
        this.physics.add.overlap(player, mochila, this.agualenta, null, this);
        this.physics.add.collider(platformescu, mochila);
        this.physics.add.collider(player, virusvolador);
        this.physics.add.collider(player, escuela, this.videostart,null,this);

        //// instrucciones
        this.physics.pause();
        pausacont = 1;
        instrucciones = this.add.image(0,0, 'instrucciones3').setOrigin(0,0).setScale(1.12,0.9)
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
        
        //+ Velocidades

        player.setVelocityX(velociplayer); 
        virus.setVelocityX(velocivirus);
        
        if(contpower === 0){
            player.setVelocityX(velociplayer);
        }else if(contpower === 1){
            player.setVelocityX(velociplayer + 75);
        };

        if (mochilacaida === 0 && contpower === 0){
            player.setVelocityX(velociplayer);
        }else if (mochilacaida === 1){
            player.setVelocityX(velociplayer - 50);
        };
        if(contpower === 1 && mochilacaida ===1){
            player.setVelocityX(velociplayer + 50)
        }

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

        ////Virus volador
        if(Phaser.Math.Between(1,100)<2 && pausacont===0){
           this.vuelavirus();
        };

        //// pausa
        if(Phaser.Input.Keyboard.JustDown(cursor_escape) && pausacont === 0){
            pausacont = 1;
            this.pausa();
        };

    

   
    }

    ////mochila caida
    agualenta (player, mochila){
        mochilacaida = 1;
        initialTime2 = mochila.extratime;
    };

    powerup(player, powerup){
    powerup.disableBody(true, true);
    puntos = puntos+100;
    scoreText.setText('PUNTAJE: ' + puntos);
    initialTime += powerup.extratime;
    contpower = 1;
    }
    onSecond() {
        initialTime = initialTime - 1; //// alcohol
        if(initialTime == 0){
            timedEvent.paused = true;
            contpower = 0;
        }
    } 

    onSecond2() {
        initialTime2 = initialTime2 - 1; ////bocas de agua
        if(initialTime2 == 0){
            timedEvent2.paused = true;
            mochilacaida= 0;
        }
    } 

    onSecond3() {   ////velocidades p y v
        if(pausacont === 0){
            velociplayer = velociplayer + 2;
            velocivirus = velocivirus + 2.05;
        }
        
    } 

    vuelavirus(){
        this.mv.play();
        virusvolador.create(player.x+700, Phaser.Math.Between(600,800), 'v1').anims.play('v1', true).setScale(-1,1);
        virusvolador.children.iterate(function (child) {
            child.body.allowGravity = false;
            child.body.immovable = true;
            child.setSize(85,75).setOffset(85,0)
            child.setVelocityX(-160);
            child.setInteractive().on('pointerdown', () => {child.setSize(0,0); child.anims.play('vx',true)
            .on('animationcomplete',() => {child.destroy();})});
        });


    }
    
    hitplatforms2 (player, platforms2)
    {
        this.gameOver()
        this.selecsound.play();
        pausacont = 1;
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
    reiniciar() {
        pausacont = 0;
        this.musicbackground.stop();
        puntos = 0;
        mochilacaida = 0;
        perdiste = 0;
        this.scene.start('juego3');
        velociplayer = 159.99999;
        velocivirus = 165;
        
    }

    menu() {
        pausacont = 0;
        reiniciarcont = 0;
        perdiste = 0;
        victoria = 0;
        velociplayer = 159.99999;
        velocivirus = 165;
        this.musicbackground.stop();
        puntos = 0;
        this.scene.start('inicio');
    }

    videostart(){
                                //* Video final
        this.physics.pause();
        luz=this.add.sprite(player.x,player.y-60,'luz').anims.play('luz',true).setScale(20.25).on('animationcomplete',()=>{luz.destroy();luzcont=1;if(luzcont===1){
           if(seleccion=== 'nene'){
            videofinal = this.add.sprite(player.x-1000, 0, 'final').setOrigin(0,0).setScale(3);
            videofinal.anims.play('final',true).on('animationcomplete',()=> {videofinal.anims.play('final2', true)
            .on('animationcomplete', ()=> { //+FINAL DEL NIVEL 3 
                victoria = 3;
                pausacont = 0;
                plevel3 = puntos;
                this.musicbackground.stop();
                this.scene.start('puntos');} )});
            };
            if(seleccion=== 'nena'){
                videofinal = this.add.sprite(player.x-1000, 0, 'finaln').setOrigin(0,0).setScale(3);
                videofinal.anims.play('finaln',true).on('animationcomplete',()=> {videofinal.anims.play('finaln2', true)
                .on('animationcomplete', ()=> { //+FINAL DEL NIVEL 3 
                    victoria = 3;
                    pausacont = 0;
                    plevel3 = puntos;
                    this.musicbackground.stop();
                    this.scene.start('puntos');} )});
                }
            this.add.image(0,0, 'madera').setOrigin(0,0).setScrollFactor(0);
        }});                       
        
        
        
    }

    

}

