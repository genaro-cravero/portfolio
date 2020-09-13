class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    create() {

      ////musica principal
     
      this.musicbackground=this.sound.add('musicmenu');
      this.musicbackground.loop = true;
      this.musicbackground.play();

      ////animaciones
      this.anims.create({
        key: 'rightn',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate:5,
        repeat: -1
      });
      this.anims.create({
        key:'playerjumpn',
        frames: [ { key: 'salto', frame: 0 } ],
        frameRate:1,
        
      });

      this.anims.create({
        key:'mochila2',
        frames: [ { key: 'mochila2', frame: 0 } ],
        frameRate:1,

      });

      this.anims.create({
        key:'ventana2',
        frames: [ { key: 'ventana2', frame: 0 } ],
        frameRate:1,
        
      });

      this.anims.create({
        key:'saltonena',
        frames: [ { key: 'saltonena', frame: 0 } ],
        frameRate:1,
        
      });
      this.anims.create({
        key: 'selecnene',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate:1,
      });
      this.anims.create({
        key: 'rightf',
        frames: this.anims.generateFrameNumbers('nena', { start: 0, end: 3 }),
        frameRate:5,
        repeat: -1
      });
      this.anims.create({
        key: 'selecnena',
        frames: [ { key: 'nena', frame: 1 } ],
        frameRate:1,
      });
      this.anims.create({
        key: 'v1',
        frames: this.anims.generateFrameNumbers('v1', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'v2',
        frames: this.anims.generateFrameNumbers('v2', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'v3',
        frames: this.anims.generateFrameNumbers('v3', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'v4',
        frames: this.anims.generateFrameNumbers('v4', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'v5',
        frames: this.anims.generateFrameNumbers('v5', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'v6',
        frames: this.anims.generateFrameNumbers('v6', { start: 0, end:3 }),
        frameRate: 6,
        repeat: -1,
      });
      this.anims.create({
        key: 'humovirus',
        frames: this.anims.generateFrameNumbers('humovirus', { start: 0, end:4 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'jeringa',
        frames: this.anims.generateFrameNumbers('jeringa', { start: 0, end:4 }),
        frameRate: 10,
        repeat: -1,
      });
      this.anims.create({
        key: 'agua',
        frames: this.anims.generateFrameNumbers('agua',{start: 0, end: 5}),
        frameRate: 15,
        repeat: -1,
      });
      this.anims.create({
        key: 'vx',
        frames: this.anims.generateFrameNumbers('vx',{start: 0, end: 6}),
        frameRate: 17,
      });
      this.anims.create({
        key: 'final',
        frames: this.anims.generateFrameNumbers('final',{start: 0, end: 28}),
        frameRate: 10,
      });
      this.anims.create({
        key: 'final2',
        frames: this.anims.generateFrameNumbers('final2',{start: 0, end: 28}),
        frameRate: 10,
      });
      this.anims.create({
        key: 'finaln',
        frames: this.anims.generateFrameNumbers('finaln',{start: 0, end: 28}),
        frameRate: 10,
      });
      this.anims.create({
        key: 'finaln2',
        frames: this.anims.generateFrameNumbers('finaln2',{start: 0, end: 28}),
        frameRate: 10,
      });
      this.anims.create({
        key: 'luz',
        frames: this.anims.generateFrameNumbers('luz',{start: 0, end: 16}),
        frameRate: 8,
      });
      this.anims.create({
        key: 'perro',
        frames: this.anims.generateFrameNumbers('perro',{start: 0, end: 1}),
        frameRate:3,
        repeat: -1,
      });
      


      this.add.image(400, 568, 'ground').setScale(1000).setTint(0x001a19);
     

      ////COMENZAR, CONOCER MÁS y CRÉDITOS 

      var logo = this.add.image(640, 250, 'logo').setScale(0.25)
      //timeText = this.add.bitmapText(580,560,'pixel', 'Comenzar', 32);
      español = 1;
      timeText = new Texto({
        scene:this,x:640, y:560, int:[0] , int2:32, color:0xffffff    
      })
      scoreText = new Texto({
        scene:this,x:640, y:610, int:[1] , int2:32, color:0x3fad3b    
      })
      creditosText = scoreText = new Texto({
        scene:this,x:640, y:660, int:[2] , int2:32, color:0xecd313  
      })
      
      //// Interacciones con escenas
      this.add.image(timeText.x,timeText.y+11,'madera').setScale(0.2,0.5).setAlpha(0.01)
      .setInteractive().on('pointerdown', () => { this.scene.start('seleccion');  this.musicbackground.stop();} );

      this.add.image(scoreText.x,timeText.y+61,'madera').setScale(0.8,0.5).setAlpha(0.01)
      .setInteractive().on('pointerdown', () => {this.scene.start('info');  this.musicbackground.stop();});

      this.add.image(creditosText.x,creditosText.y+11,'madera').setScale(0.2,0.5).setAlpha(0.01)
      .setInteractive().on('pointerdown', () => {this.scene.start('creditos'); this.musicbackground.stop();})
    }
}
